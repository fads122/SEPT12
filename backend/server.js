const express = require('express');
const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const http = require('http');
const WebSocket = require('ws');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

const corsOptions = {
  origin: 'http://localhost:4200', // Ensure this matches your Angular app's origin
  credentials: true,
};
app.use(cors(corsOptions));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'Montesor123!',
  database: process.env.DB_NAME || 'kodigrow'
};
const pool = mysql.createPool(dbConfig);

const JWT_SECRET = process.env.JWT_SECRET || 'kodigrow2024';

// Middleware to verify JWT tokens
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401); // No token provided

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403); // Invalid token
    req.user = user;
    next();
  });
};

const primaryKeyMapping = {
  users: 'user_id',
  flashcards: 'flashcard_id',
  exams: 'exam_id',
  questions: 'question_id',
  answers: 'answer_id',
};


// Generate a unique exam code
const generateExamCode = () => {
  return crypto.randomBytes(3).toString('hex').toUpperCase(); // Adjust length as needed
};

// WebSocket server setup
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const examSessions = {}; // Store exam sessions and participants

wss.on('connection', (ws) => {
  ws.on('message', (message) => {
    const data = JSON.parse(message);
    switch (data.type) {
      case 'join_exam':
        handleJoinExam(data, ws);
        break;
      case 'submit_answer':
        handleSubmitAnswer(data, ws);
        break;
      default:
        console.error('Unknown message type:', data.type);
    }
  });

  ws.on('close', () => {
    // Handle client disconnection
  });
});

function handleJoinExam(data, ws) {
  const { examId, studentId } = data;

  if (!examSessions[examId]) {
    examSessions[examId] = { participants: [] };
  }

  examSessions[examId].participants.push({ studentId, ws });

  // Broadcast the updated participant list
  const participantList = examSessions[examId].participants.map(p => p.studentId);
  examSessions[examId].participants.forEach(p => {
    p.ws.send(JSON.stringify({ type: 'update_participants', participants: participantList }));
  });
}

function handleSubmitAnswer(data, ws) {
  const { examId, studentId, questionId, answerId, timeTaken } = data;

  // Retrieve the correct answer from the database
  const getCorrectAnswer = async (examId, questionId) => {
    const [rows] = await pool.execute('SELECT answer_id FROM answers WHERE question_id = ? AND is_correct = 1', [questionId]);
    return rows.length > 0 ? rows[0].answer_id : null;
  };
  
  getCorrectAnswer(examId, questionId).then(correctAnswer => {
    if (answerId === correctAnswer) {
      // Calculate ranking based on time taken
      const ranking = calculateRanking(examId);

      examSessions[examId].participants.forEach(p => {
        p.ws.send(JSON.stringify({ type: 'update_ranking', ranking }));
      });
    }
  }).catch(err => {
    console.error('Error fetching correct answer:', err);
  });
}

function calculateRanking(examId) {
  // Implement ranking calculation based on answers and time taken
  return []; // Return ranking data as an array of objects
}

app.get('/api/test', (req, res) => {
  res.send('Test endpoint works!');
});

// User sign-up route
app.post('/signup', async (req, res) => {
  const { email, password, accountType } = req.body;

  if (!email || !password || !accountType) {
    return res.status(400).send({ message: 'Missing required fields' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const sql = 'INSERT INTO users (email, password, account_type) VALUES (?, ?, ?)';
    const [result] = await pool.execute(sql, [email, hashedPassword, accountType]);

    res.status(201).send({ id: result.insertId, email, accountType });
  } catch (error) {
    console.error('Error during sign-up:', error);
    res.status(500).send({ message: 'Server error.' });
  }
});



// Add this inside your server.js file

app.post('/admin/login', async (req, res) => {
  const { email, password } = req.body;
  if (email === 'admin' && password === 'admin') {
    // In a real application, never hardcode credentials and always hash passwords
    const token = jwt.sign({ email }, JWT_SECRET); // No `expiresIn` option, so it doesn't expire
    res.status(200).send({ message: 'Admin login successful', token });
  } else {
    res.status(401).send({ message: 'Invalid credentials' });
  }
});




app.post('/signin', async (req, res) => {
  const { email, password } = req.body;

  try {
    const [rows] = await pool.execute('SELECT * FROM users WHERE email = ?', [email]);
    const user = rows[0];

    if (user && await bcrypt.compare(password, user.password)) {
      const token = jwt.sign({ userId: user.user_id, accountType: user.account_type }, JWT_SECRET, { expiresIn: '1h' });
      res.json({ token, user: { userID: user.user_id, email: user.email, accountType: user.account_type } });
    } else {
      return res.status(401).send({ message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Error during sign-in:', error.message);
    return res.status(500).send({ message: 'An error occurred during sign-in.', error: error.message });
  }
});

app.post('/api/join-exam', async (req, res) => {
  const { examCode, userId } = req.body;

  if (!examCode || !userId) {
    return res.status(400).send({ message: 'Missing required fields' });
  }

  try {
    const [examRows] = await pool.execute('SELECT * FROM exams WHERE exam_code = ?', [examCode]);
    if (examRows.length === 0) {
      return res.status(404).send({ message: 'Invalid Exam Code' });
    }

    const exam = examRows[0];
    res.status(200).send({ message: 'Exam joined successfully', examDetails: { exam } });
  } catch (error) {
    console.error('Error joining exam:', error);
    res.status(500).send({ message: 'Server error.' });
  }
});

// Get questions by exam ID route
app.get('/api/questions/:examId', authenticateToken, async (req, res) => {
  const { examId } = req.params;

  if (!examId) {
    return res.status(400).send({ message: 'Exam ID is required' });
  }

  const query = `
    SELECT questions.question_id, questions.question_text, questions.question_type, questions.time_limit,
           answers.answer_id, answers.answer_text, answers.is_correct
    FROM questions
    LEFT JOIN answers ON questions.question_id = answers.question_id
    WHERE questions.exam_id = ?
  `;

  try {
    const [results] = await pool.execute(query, [examId]);

    if (results.length === 0) {
      return res.status(404).send({ message: 'Questions not found' });
    }

    const questions = results.reduce((acc, row) => {
      const question = acc.find(q => q.question_id === row.question_id);
      if (question) {
        question.answers.push({
          answer_id: row.answer_id,
          answer_text: row.answer_text,
          is_correct: row.is_correct,
        });
      } else {
        acc.push({
          question_id: row.question_id,
          question_text: row.question_text,
          question_type: row.question_type,
          time_limit: row.time_limit,
          answers: [{
            answer_id: row.answer_id,
            answer_text: row.answer_text,
            is_correct: row.is_correct,
          }],
        });
      }
      return acc;
    }, []);

    res.json({ questions });
  } catch (error) {
    console.error('Error retrieving questions:', error);
    res.status(500).send({ message: 'Error retrieving questions', error: error.message });
  }
});

// Protected route example
app.get('/protected', authenticateToken, (req, res) => {
  res.json({ user: req.user });
});

// Create exam route
app.post('/exams', authenticateToken, async (req, res) => {
  const { title } = req.body;
  const userId = req.user.userId;

  if (!title) {
    return res.status(400).send({ message: 'Missing required fields' });
  }

  try {
    const examCode = generateExamCode();
    const sql = 'INSERT INTO exams (title, user_id, exam_code) VALUES (?, ?, ?)';
    const [result] = await pool.execute(sql, [title, userId, examCode]);

    res.status(201).send({ examId: result.insertId, examCode });
  } catch (error) {
    console.error('Error creating exam:', error);
    res.status(500).send({ message: 'Error creating exam', error: error.message });
  }
});

app.post('/questions', authenticateToken, async (req, res) => {
  const { examId, questionText, questionType, timeLimit } = req.body;
  const userId = req.user.userId;

  if (!examId || !questionText || !questionType || timeLimit === undefined) {
    return res.status(400).send({ message: 'Missing required fields' });
  }

  try {
    const sql = 'INSERT INTO questions (exam_id, question_text, question_type, time_limit) VALUES (?, ?, ?, ?)';
    const [result] = await pool.execute(sql, [examId, questionText, questionType, timeLimit]);

    res.status(201).send({ questionId: result.insertId });
  } catch (error) {
    console.error('Error creating question:', error);
    res.status(500).send({ message: 'Error creating question', error: error.message });

  }
});

// Create answer route
app.post('/answers', authenticateToken, async (req, res) => {
  const { questionId, answerText, isCorrect } = req.body;

  if (questionId === undefined || !answerText || isCorrect === undefined) {
    return res.status(400).send({ message: 'Missing required fields' });
  }

  try {
    // Check if the question exists
    const [questionRows] = await pool.execute('SELECT * FROM questions WHERE question_id = ?', [questionId]);
    if (questionRows.length === 0) {
      return res.status(404).send({ message: 'Question not found' });
    }

    // Check if there are already 4 answers for this question
    const [answerRows] = await pool.execute('SELECT COUNT(*) AS count FROM answers WHERE question_id = ?', [questionId]);
    if (answerRows[0].count >= 4) {
      return res.status(400).send({ message: 'A question can only have up to 4 choices.' });
    }

    const sql = 'INSERT INTO answers (question_id, answer_text, is_correct) VALUES (?, ?, ?)';
    await pool.execute(sql, [questionId, answerText, isCorrect]);

    res.status(201).send({ message: 'Answer created successfully' });
  } catch (error) {
    console.error('Error creating answer:', error);
    res.status(500).send({ message: 'Error creating answer', error: error.message });
  }
});

// Create flashcard route
app.post('/flashcards', authenticateToken, async (req, res) => {
  const { title, content } = req.body;
  const userId = req.user.userId;

  if (!title || !content) {
    return res.status(400).send({ message: 'Title and content are required' });
  }

  try {
    const sql = 'INSERT INTO flashcards (user_id, title, content) VALUES (?, ?, ?)';
    const [result] = await pool.execute(sql, [userId, title, content]);

    res.status(201).send({ flashcardId: result.insertId, title, content });
  } catch (error) {
    console.error('Error creating flashcard:', error);
    res.status(500).send({ message: 'Error creating flashcard', error: error.message });
  }
});

// Get flashcards by user ID route
app.get('/flashcards', authenticateToken, async (req, res) => {
  const userId = req.query.userId; // Retrieve userId from query parameters

  if (!userId) {
    return res.status(400).json({ error: 'User ID is required' });
  }

  try {
    // Query to fetch flashcards based on userId
    const [results] = await pool.execute('SELECT * FROM flashcards WHERE user_id = ?', [userId]);
    res.json(results);
  } catch (error) {
    console.error('Error fetching flashcards:', error);
    res.status(500).json({ error: 'Database query failed' });
  }
});

// Admin route to get all users
app.get('/api/users', authenticateToken, async (req, res) => {
  try {
    // Only allow admins to access this route
    if (req.user.accountType !== 'admin') {
      return res.status(403).send({ message: 'Access denied' });
    }

    const [users] = await pool.execute('SELECT user_id, email, account_type FROM users');
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).send({ message: 'Server error' });
  }
});

// Admin route to delete a user
app.delete('/api/users/:userId', authenticateToken, async (req, res) => {
  const { userId } = req.params;

  try {
    // Only allow admins to access this route
    if (req.user.accountType !== 'admin') {
      return res.status(403).send({ message: 'Access denied' });
    }

    await pool.execute('DELETE FROM users WHERE user_id = ?', [userId]);
    res.status(200).send({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).send({ message: 'Server error.' });
  }
});

// Logout route
app.post('/logout', authenticateToken, (req, res) => {
  // Here we don't need to do much because the token is stateless
  // In a real-world application, you might want to add the token to a blacklist
  // Here, just inform the client to remove the token on their side
  res.status(200).send({ message: 'Logged out successfully' });
});

// Route to fetch records from a table (no token authentication)
app.get('/api/admin/tables/:tableName', async (req, res) => {
  const { tableName } = req.params;

  try {
    const [rows] = await pool.query('SELECT * FROM ??', [tableName]);
    res.json(rows);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).send('Error fetching data');
  }
});


// Route to update a record in a table
app.put('/api/admin/tables/:tableName/:id', (req, res) => {
  const tableName = req.params.tableName;
  const id = req.params.id;
  const updates = req.body;

  // Map table names to primary key columns if necessary
  const primaryKeyMapping = {
    'users': 'user_id',
    'flashcards': 'flashcard_id',
    'exams': 'exam_id',
    'questions': 'question_id',
    'answers': 'answer_id'
  };

  const primaryKey = primaryKeyMapping[tableName];
  if (!primaryKey) {
    return res.status(400).send('Table not found or unsupported');
  }

  const sql = `UPDATE ${tableName} SET ? WHERE ${primaryKey} = ?`;
  const values = [updates, id];

  pool.query(sql, values, (error, results) => {
    if (error) {
      console.error('Error updating record:', error);
      return res.status(500).send('Error updating record');
    }
    res.status(200).send('Record updated successfully');
  });
});


/// Route to delete a record from a table
app.delete('/api/admin/tables/:tableName/:id', (req, res) => {
  const tableName = req.params.tableName;
  const id = req.params.id;

  // Map table names to primary key columns if necessary
  const primaryKeyMapping = {
    'users': 'user_id',
    'flashcards': 'flashcard_id',
    'exams': 'exam_id',
    'questions': 'question_id',
    'answers': 'answer_id'
  };

  const primaryKey = primaryKeyMapping[tableName];
  if (!primaryKey) {
    return res.status(400).send('Table not found or unsupported');
  }

  if (!id) {
    return res.status(400).send('Record ID is missing');
  }

  const sql = `DELETE FROM ${tableName} WHERE ${primaryKey} = ?`;
  console.log('SQL Query:', sql);
  const values = [id];

  pool.query(sql, values, (error, results) => {
    if (error) {
      console.error('Error deleting record:', error);
      return res.status(500).send('Error deleting record');
    }
    res.status(200).send('Record deleted successfully');
  });
});


app.get('/api/admin/users', async (req, res) => {
  try {
    const [users] = await pool.execute('SELECT * FROM users');
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).send({ message: 'Server error.' });
  }
});

app.get('/api/admin/flashcards', async (req, res) => {
  try {
    const [flashcards] = await pool.execute('SELECT * FROM flashcards');
    res.json(flashcards);
  } catch (error) {
    console.error('Error fetching flashcards:', error);
    res.status(500).send({ message: 'Server error.' });
  }
});

app.get('/api/admin/exams', async (req, res) => {
  try {
    const [exams] = await pool.execute('SELECT * FROM exams');
    res.json(exams);
  } catch (error) {
    console.error('Error fetching exams:', error);
    res.status(500).send({ message: 'Server error.' });
  }
});

app.get('/api/admin/questions', async (req, res) => {
  try {
    const [questions] = await pool.execute('SELECT * FROM questions');
    res.json(questions);
  } catch (error) {
    console.error('Error fetching questions:', error);
    res.status(500).send({ message: 'Server error.' });
  }
});

app.get('/api/admin/answers', async (req, res) => {
  try {
    const [answers] = await pool.execute('SELECT * FROM answers');
    res.json(answers);
  } catch (error) {
    console.error('Error fetching answers:', error);
    res.status(500).send({ message: 'Server error.' });
  }
});

app.get('/api/admin/tables', async (req, res) => {
  try {
    const tables = ['users', 'flashcards', 'exams', 'questions', 'answers']; // List of tables/entities you want to expose
    res.json(tables);
  } catch (error) {
    console.error('Error fetching table names:', error);
    res.status(500).send({ message: 'Server error.' });
  }
});

app.get('/api/admin/tables/users', authenticateToken, async (req, res) => {
  try {
    // Only allow admins to access this route
    if (req.user.accountType !== 'admin') {
      return res.status(403).send({ message: 'Access denied' });
    }

    const [users] = await pool.execute('SELECT * FROM users');
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).send({ message: 'Server error' });
  }
});

// Route to fetch data for the admin dashboard
app.get('/api/admin/viewData', async (req, res) => {
  try {
    // Example: Fetch all users (you can modify this query based on your specific data requirements)
    const [rows] = await pool.execute('SELECT * FROM users');

    // Send the fetched data as a response
    res.status(200).json({ data: rows });
  } catch (error) {
    console.error('Error fetching data for admin:', error);
    res.status(500).send({ message: 'Server error fetching admin data.' });
  }
});



app.get('/api/exam-results/:examId', async (req, res) => {
  const { examId } = req.params;
  try {
    // Fetch exam results from the database
    const [results] = await pool.query(`
      SELECT u.name as studentName, r.score
      FROM results r
      JOIN users u ON r.user_id = u.user_id
      WHERE r.exam_id = ?
      ORDER BY r.score DESC
    `, [examId]);

    res.json(results);
  } catch (error) {
    console.error('Error fetching exam results:', error);
    res.status(500).send('Error fetching exam results');
  }
});





server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

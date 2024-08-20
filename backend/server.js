

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

// Create question route
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


server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

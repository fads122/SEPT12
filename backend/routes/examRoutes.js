const express = require('express');
const router = express.Router();
const mysql = require('mysql2/promise');
require('dotenv').config();

// Create a database connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'Montesor123!',
  database: process.env.DB_NAME || 'kodigrow',
});

// Validate exam code and join waiting room
router.post('/join', async (req, res) => {
  const { examCode, studentId } = req.body;

  try {
    const [exam] = await pool.execute('SELECT * FROM exams WHERE exam_code = ?', [examCode]);

    if (exam.length) {
      res.status(200).json({ examId: exam[0].exam_id });
    } else {
      res.status(404).json({ message: 'Invalid exam code' });
    }
  } catch (error) {
    console.error('Error during exam join:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Start exam
router.post('/start', async (req, res) => {
  const { examId } = req.body;

  try {
    // Logic to start the exam can be implemented here
    res.status(200).json({ message: 'Exam started' });
  } catch (error) {
    console.error('Error during exam start:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Submit answer
router.post('/submit-answer', async (req, res) => {
  const { examId, questionId, studentId, answerId, timeTaken } = req.body;

  try {
    // Logic to store the answer and calculate ranking
    res.status(200).json({ message: 'Answer submitted' });
  } catch (error) {
    console.error('Error during answer submission:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

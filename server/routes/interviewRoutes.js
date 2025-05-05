
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

// Mock database for interview sessions (replace with a real database in production)
const interviewSessions = [];

// JWT secret (use environment variable in production)
const JWT_SECRET = 'interviewace-secret-key';

// Middleware to authenticate JWT token
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ message: 'Access denied' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }
    req.user = user;
    next();
  });
}

// Create a new interview session
router.post('/sessions', authenticateToken, (req, res) => {
  try {
    const { role, level, type, mode, category } = req.body;
    
    const newSession = {
      id: interviewSessions.length + 1,
      userId: req.user.id,
      role,
      level,
      type,
      mode,
      category,
      questions: generateQuestions(mode, category),
      createdAt: new Date(),
      responses: [],
      completed: false
    };
    
    interviewSessions.push(newSession);
    
    res.status(201).json({
      message: 'Interview session created',
      session: newSession
    });
  } catch (error) {
    console.error('Create session error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user's interview sessions
router.get('/sessions', authenticateToken, (req, res) => {
  try {
    const userSessions = interviewSessions.filter(session => 
      session.userId === req.user.id
    );
    
    res.json(userSessions);
  } catch (error) {
    console.error('Get sessions error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get a specific interview session
router.get('/sessions/:id', authenticateToken, (req, res) => {
  try {
    const session = interviewSessions.find(
      s => s.id === parseInt(req.params.id) && s.userId === req.user.id
    );
    
    if (!session) {
      return res.status(404).json({ message: 'Session not found' });
    }
    
    res.json(session);
  } catch (error) {
    console.error('Get session error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Submit a response to an interview question
router.post('/sessions/:id/responses', authenticateToken, (req, res) => {
  try {
    const { questionId, response } = req.body;
    
    const session = interviewSessions.find(
      s => s.id === parseInt(req.params.id) && s.userId === req.user.id
    );
    
    if (!session) {
      return res.status(404).json({ message: 'Session not found' });
    }
    
    session.responses.push({
      questionId,
      response,
      submittedAt: new Date()
    });
    
    // Check if all questions have been answered
    if (session.responses.length === session.questions.length) {
      session.completed = true;
    }
    
    res.json({
      message: 'Response submitted',
      session
    });
  } catch (error) {
    console.error('Submit response error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Complete an interview session
router.put('/sessions/:id/complete', authenticateToken, (req, res) => {
  try {
    const session = interviewSessions.find(
      s => s.id === parseInt(req.params.id) && s.userId === req.user.id
    );
    
    if (!session) {
      return res.status(404).json({ message: 'Session not found' });
    }
    
    session.completed = true;
    session.completedAt = new Date();
    
    // Generate feedback for the session
    session.feedback = generateFeedback(session);
    
    res.json({
      message: 'Interview session completed',
      session
    });
  } catch (error) {
    console.error('Complete session error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Helper function to generate questions
function generateQuestions(mode, category) {
  const behavioralQuestions = [
    { id: 1, text: "Tell me about yourself." },
    { id: 2, text: "What is your greatest strength?" },
    { id: 3, text: "What is your greatest weakness?" },
    { id: 4, text: "Why do you want to work for this company?" },
    { id: 5, text: "Describe a challenging situation at work and how you handled it." }
  ];
  
  const technicalQuestions = {
    javascript: [
      { id: 6, text: "Explain closures in JavaScript." },
      { id: 7, text: "What is the difference between let, const, and var?" },
      { id: 8, text: "Explain how prototypal inheritance works in JavaScript." }
    ],
    react: [
      { id: 9, text: "Explain the virtual DOM in React." },
      { id: 10, text: "What are hooks in React and why were they introduced?" },
      { id: 11, text: "Explain the component lifecycle in React." }
    ],
    algorithms: [
      { id: 12, text: "Explain the time complexity of quicksort." },
      { id: 13, text: "How would you implement a binary search?" },
      { id: 14, text: "Explain the difference between a stack and a queue." }
    ]
  };
  
  if (mode === "behavioral") {
    return behavioralQuestions;
  } else if (mode === "technical") {
    return technicalQuestions[category] || technicalQuestions.javascript;
  }
  
  return behavioralQuestions; // Default
}

// Helper function to generate feedback
function generateFeedback(session) {
  return {
    overallScore: Math.floor(Math.random() * 5) + 1,
    strengths: [
      "Clear and concise communication",
      "Good examples to support answers"
    ],
    areasForImprovement: [
      "Could provide more detailed technical explanations",
      "Consider structuring answers with the STAR method"
    ],
    tips: [
      "Practice more technical questions",
      "Work on providing more specific examples"
    ]
  };
}

module.exports = router;

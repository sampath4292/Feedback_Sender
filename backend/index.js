require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/edtech-feedback', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Models
const Feedback = mongoose.model('Feedback', new mongoose.Schema({
  sessionId: String,
  clarity: Number,
  content: Number,
  interaction: Number,
  comments: String,
  createdAt: { type: Date, default: Date.now },
}));

const Session = mongoose.model('Session', new mongoose.Schema({
  sessionId: String,
  trainerEmail: String,
  title: String,
}));

// Routes
app.post('/feedback', async (req, res) => {
  try {
    const feedback = new Feedback(req.body);
    await feedback.save();
    res.status(201).json({ message: 'Feedback saved' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.get('/session/:id', async (req, res) => {
  const session = await Session.findOne({ sessionId: req.params.id });
  if (!session) return res.status(404).json({ error: 'Session not found' });
  res.json(session);
});

app.get('/feedback/summary/:sessionId', async (req, res) => {
  const feedbacks = await Feedback.find({ sessionId: req.params.sessionId });
  if (feedbacks.length === 0) return res.json({ avgClarity: 0, avgContent: 0, avgInteraction: 0 });
  const avg = (arr, key) => arr.reduce((a, b) => a + b[key], 0) / arr.length;
  res.json({
    avgClarity: avg(feedbacks, 'clarity'),
    avgContent: avg(feedbacks, 'content'),
    avgInteraction: avg(feedbacks, 'interaction'),
    count: feedbacks.length,
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); 
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  dbName: 'Feedback',
})
  .then(() => console.log('📦 Connected to MongoDB'))
  .catch((err) => console.error('❌ MongoDB Error:', err));

// Feedback schema
const Feedback = mongoose.model('Feedback', new mongoose.Schema({
  sessionId: String,
  clarity: Number,
  content: Number,
  interaction: Number,
  comments: String,
  createdAt: { type: Date, default: Date.now },
}));

// Feedback route
app.post('/feedback', async (req, res) => {
  try {
    const { sessionId, clarity, content, interaction, comments } = req.body;
    const feedback = new Feedback({ sessionId, clarity, content, interaction, comments });
    await feedback.save();
    res.status(201).json({ message: 'Feedback submitted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Serve frontend
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, 'public')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));

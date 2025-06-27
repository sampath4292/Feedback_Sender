const mongoose = require('mongoose');
const dotenv = require('dotenv');
const nodemailer = require('nodemailer');
const path = require('path');

// Load env vars
dotenv.config({ path: path.resolve(__dirname, '../.env') });

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

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: 'Feedback',
}).then(() => console.log('📦 Connected to MongoDB'))
  .catch((err) => console.error('❌ DB error:', err));

// Email config
const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE || 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

async function sendSummaryEmails() {
  try {
    const sessions = await Session.find();

    for (const session of sessions) {
      console.log(`🔁 Session: ${session.sessionId} - Email: ${session.trainerEmail}`);

      const feedbacks = await Feedback.find({ sessionId: session.sessionId });
      console.log(`📝 Found ${feedbacks.length} feedbacks`);

      if (feedbacks.length === 0) continue;

      const avg = (key) =>
        (feedbacks.reduce((a, b) => a + b[key], 0) / feedbacks.length).toFixed(2);

      const emailBody = `
📊 Feedback Summary for ${session.title || session.sessionId}:

- Clarity: ${avg('clarity')}
- Content: ${avg('content')}
- Interaction: ${avg('interaction')}
- Total feedbacks: ${feedbacks.length}

Comments:
${feedbacks.map((f, i) => `${i + 1}. ${f.comments || 'No comment'}`).join('\n')}
      `;

      try {
        await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: session.trainerEmail,
          subject: `📬 Feedback Summary – ${session.title || session.sessionId}`,
          text: emailBody,
        });

        console.log(`✅ Email sent to ${session.trainerEmail}`);
      } catch (err) {
        console.error(`❌ Failed to send email to ${session.trainerEmail}:`, err);
      }
    }
  } catch (error) {
    console.error('❌ Error in sendSummaryEmails():', error);
  } finally {
    mongoose.disconnect();
  }
}

module.exports = sendSummaryEmails;

// If you want this file to run directly via node cron/emailSummary.js
if (require.main === module) {
  sendSummaryEmails();
}

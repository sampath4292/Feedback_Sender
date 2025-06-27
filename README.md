# 📘 EdTech Feedback System - Backend

This is the backend for the **EdTech Feedback System**, built with **Node.js**, **Express**, and **MongoDB**. It collects daily feedback from students and sends a summarized report to trainers every day. At the end of each day, all feedback is cleared to collect fresh responses for the next day.

---

## 🔧 Features

- 📝 Collects feedback from students
- 📬 Sends daily summary emails to trainers
- ♻️ Clears feedback data daily using cron jobs
- 🌐 RESTful API support
- 🔒 Environment variable support using `.env`

---

## 📁 Project Structure


edtech-feedback-backend/
├── cron/
│ └── emailSummary.js # Cron job logic for sending emails and clearing DB
├── models/
│ └── Feedback.js # Mongoose schema for feedback
├── routes/
│ └── feedback.js # Routes for handling feedback API
├── .env # Environment variables (not committed)
├── .gitignore # Git ignore rules
├── server.js # Main Express server
├── package.json


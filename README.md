# 📘 EdTech Feedback System - Backend

This is the backend for the **EdTech Feedback System**, built with **Node.js**, **Express**, and **MongoDB**. It collects daily feedback from students and sends a summarized report to trainers every day. At the end of each day, all feedback is cleared to collect fresh responses for the next day.

Live Link --- https://edtech-feedback-system.onrender.com/
---

## 🔧 Features

- 📝 Collects feedback from students
- 📬 Sends daily summary emails to trainers
- ♻️ Clears feedback data daily using cron jobs
- 🌐 RESTful API support
- 🔒 Environment variable support using `.env`

---

## 📁 Project Structure


edtech-feedback-backend<br>
├── cron<br>
&nbsp;&nbsp;&nbsp;└── emailSummary.js # Cron job logic for sending emails and clearing DB<br>
├── models<br>
&nbsp;&nbsp;&nbsp; └── Feedback.js # Mongoose schema for feedback<br>
├── routes<br>
&nbsp;&nbsp;&nbsp; └── feedback.js # Routes for handling feedback API<br>
├── .env # Environment variables (not committed)<br>
├── .gitignore # Git ignore rules<br>
├── server.js # Main Express server<br>
├── package.json


![image](https://github.com/user-attachments/assets/45e6ec47-3117-4523-bfb5-3d5aafeb736d)
![image](https://github.com/user-attachments/assets/42cf5e57-00c8-4598-9050-a7303d12fe32)

![image](https://github.com/user-attachments/assets/760cce01-dea2-4772-af13-f181f5dd856d)




// src/services/emailService.js
const nodemailer = require('nodemailer');

// Configure the email transport using SMTP
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER, // SMTP username
    pass: process.env.SMTP_PASS, // SMTP password
  },
});

// Function to send an email
exports.sendEmail = async ({ to, subject, text }) => {
  try {
    const info = await transporter.sendMail({
      from: '"Weekly Update" <no-reply@weeklyupdate.com>',
      to: to.join(','),
      subject,
      text,
    });

    console.log('Email sent: %s', info.messageId);
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};

require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // To parse JSON bodies

app.post('/submit-form', async (req, res) => {
    const { name, email, message } = req.body;

    // Input validation
    if (!email.match(/^[^@\s]+@[^@\s]+\.[^@\s]+$/) || !name.trim() || !message.trim()) {
        return res.status(400).send('Invalid input.');
    }

    // Nodemailer transporter configuration
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD
        }
    });

    const mailOptions = {
        from: email,
        to: process.env.RECEIVER_EMAIL, // Use environment variable for receiver email
        subject: `New contact form submission from ${name}`,
        text: message,
        // Optionally, you can use HTML content
        // html: `<p>${message}</p>`
    };

    try {
        // Send email
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
        res.send('Thank you for your message. We will get back to you soon.');
    } catch (error) {
        console.error('Failed to send email:', error);
        res.status(500).send('Failed to send message.');
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});

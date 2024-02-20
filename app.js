const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const app = express();

require('dotenv').config(); // This is needed to load the .env file contents into process.env

app.use(bodyParser.urlencoded({ extended: true }));

app.post('/submit-form', (req, res) => {
    const { name, email, message } = req.body;
    // Input validation and sanitization should be added here.

    // NodeMailer transporter configuration
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USERNAME, // Email from which you are sending
            pass: process.env.EMAIL_PASSWORD  // Email password
        }
    });

    const mailOptions = {
        from: email, // Sender's email, make sure this is allowed by your SMTP provider
        to: 'markoswebdesign@gmail.com', // Replace with your email where you want to receive messages
        subject: `New contact form submission from ${name}`,
        text: message // Plain text body
        // html: '<p>HTML version of your message</p>' // Uncomment to use HTML in the email
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
            res.status(500).send('Something went wrong.');
        } else {
            console.log('Email sent: ' + info.response);
            res.send('Thank you for your message. We will get back to you soon.');
        }
    });
});

app.listen(3000, () => {
    console.log('Server started on port 3000');
});

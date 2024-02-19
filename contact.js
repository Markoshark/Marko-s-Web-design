const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.post('/submit-form', (req, res) => {
    const { name, email, message } = req.body;
    // Here you would typically add input validation and perhaps sanitize the input.

    // Example: Sending the form input as an email using NodeMailer.
    const transporter = nodemailer.createTransport({
        // transport config (e.g., SMTP server details)
    });

    const mailOptions = {
        from: email,
        to: 'your-email@example.com',
        subject: `New contact form submission from ${name}`,
        text: message
        // You can use `html` property to send as HTML email
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
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

require('dotenv').config(); // Load environment variables from .env file

const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const app = express();

// Middleware to parse URL-encoded bodies (as sent by HTML forms)
app.use(bodyParser.urlencoded({ extended: true }));

// POST route to handle form submission
app.post('/submit-form', (req, res) => {
    const { name, email, message } = req.body;

    
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USERNAME, 
            pass: process.env.EMAIL_PASSWORD  
        }
    });

   
    const mailOptions = {
        from: email, 
        to: 'markoswebdesign@gmail.com', 
        subject: `New contact form submission from ${name}`, 
        text: `You have received a new message from ${name} (${email}): ${message}`
       
    };

   
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.status(500).send('Something went wrong.');
        } else {
            console.log('Email sent: ' + info.response);
            res.send('Thank you for your message, ' + name + '. We will get back to you soon.');
        }
    });
});


app.listen(3000, () => {
    console.log('Server started on port 3000');
});

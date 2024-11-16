const express = require('express');
const nodemailer = require('nodemailer');
const path = require('path'); 
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 3000;

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));


app.use(express.static(path.join(__dirname, 'public')));

// Serve index.html at the root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Contact form route to handle email sending
app.post('/send-email', (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).send('Error: Missing form fields');
    }

    // Set up Nodemailer transporter
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        },
    });
    

    // Set up email data with better formatting
    const mailOptions = {
        from: email,
        to: 'priyanshu6055@gmail.com', // Your email where messages will be sent
        subject: `New Contact Form Submission from ${name}`,
        text: `You have received a new message from the contact form on your website:\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error("Error sending email:", error);
            res.status(500).send('Error: Could not send message. Please try again later.');
        } else {
            console.log('Message sent: %s', info.messageId);
            res.status(200).send('Message sent successfully!');
        }
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

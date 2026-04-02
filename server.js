const express = require('express');
const path = require('path');
const fs = require('fs');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Email configuration
const transporter = nodemailer.createTransport({
    service: 'gmail', // or your email service
    auth: {
        user: process.env.EMAIL_USER || 'kfikreselassie@gmail.com', // sender email
        pass: process.env.EMAIL_PASS || 'your-app-password' // use app password for Gmail
    }
});

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'home.html'));
});

app.get('/rooms', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'rooms.html'));
});

app.get('/booking', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'booking.html'));
});

app.get('/gallery', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'gallery.html'));
});

app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'about.html'));
});

app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'contact.html'));
});

app.get('/card-validation', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'card-validation.html'));
});

app.get('/google-pay', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'google-pay.html'));
});

app.get('/payment-success', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'payment-success.html'));
});

// API routes (basic)
app.post('/api/contact', async (req, res) => {
    // Handle contact form
    console.log('Contact form:', req.body);
    
    // Send email
    const mailOptions = {
        from: req.body.email || 'noreply@salamabluelodge.net',
        to: 'kfikreselassie@gmail.com', // the provided email
        subject: 'New Contact Message from Salama Blue Lodge Website',
        text: `Name: ${req.body.name}\nEmail: ${req.body.email}\nMessage: ${req.body.message}`
    };
    
    try {
        await transporter.sendMail(mailOptions);
        res.json({ success: true, message: 'Message sent successfully' });
    } catch (error) {
        console.error('Email send error:', error);
        res.status(500).json({ success: false, message: 'Failed to send message' });
    }
});

app.post('/api/booking', async (req, res) => {
    // Handle booking
    console.log('Booking:', req.body);
    
    // Send email
    const mailOptions = {
        from: req.body.email || 'noreply@salamabluelodge.net',
        to: 'kfikreselassie@gmail.com', // the provided email
        subject: 'New Booking Request from Salama Blue Lodge Website',
        text: `Name: ${req.body.name}\nEmail: ${req.body.email}\nPhone: ${req.body.phone}\nCheck-in: ${req.body.checkin}\nCheck-out: ${req.body.checkout}\nGuests: ${req.body.guests}\nRoom Type: ${req.body.roomType}\nMessage: ${req.body.message}`
    };
    
    try {
        await transporter.sendMail(mailOptions);
        res.json({ success: true, message: 'Booking request submitted' });
    } catch (error) {
        console.error('Email send error:', error);
        res.status(500).json({ success: false, message: 'Failed to submit booking' });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

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
app.post('/api/contact', (req, res) => {
    // Handle contact form
    console.log('Contact form:', req.body);
    res.json({ success: true, message: 'Message sent successfully' });
});

app.post('/api/booking', (req, res) => {
    // Handle booking
    console.log('Booking:', req.body);
    res.json({ success: true, message: 'Booking request submitted' });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
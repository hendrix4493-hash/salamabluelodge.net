# Salama Blue Lodge - Node.js Website

A full Node.js website for Salama Blue Lodge, a luxury hotel in Lusaka, Zambia.

## Features

- **Full Node.js Server**: Professional Express.js server
- **Static HTML Pages**: No React, pure HTML/CSS/JavaScript
- **Responsive Design**: Mobile-friendly layout
- **Room Showcase**: Display of available rooms with pricing
- **Contact Forms**: Basic form handling
- **Modern UI**: Glass effects and animations

## Installation

1. Clone or download the project
2. Navigate to the project directory
3. Install dependencies:
   ```bash
   npm install
   ```

## Running the Server

Start the development server:
```bash
npm start
```

The website will be available at `http://localhost:3000`

## Project Structure

```
nodejs-site/
├── server.js          # Main Express server
├── package.json       # Dependencies
├── views/             # HTML pages
│   ├── home.html
│   └── rooms.html
└── public/            # Static assets
    ├── css/
    │   └── styles.css
    ├── js/
    │   └── main.js
    └── images/        # Images and media
```

## Pages

- **Home** (`/`): Welcome page with hero section, features, and call-to-action
- **Rooms** (`/rooms`): Room listings with details, pricing, and booking buttons
- **Booking** (`/booking`): Interactive booking form with date selection and payment options
- **Gallery** (`/gallery`): Photo and video gallery with filtering capabilities
- **About** (`/about`): Company story, founder biography, values, and facilities
- **Contact** (`/contact`): Contact information, contact form, and embedded map
- **Card Validation** (`/card-validation`): Payment processing page with Google Pay integration
- **Payment Success** (`/payment-success`): Booking confirmation and receipt page

## Features

- **Fully Responsive**: Mobile-first design that works on all devices
- **Interactive Forms**: Working booking and contact forms with validation
- **Payment Integration**: Google Pay simulation and payment processing
- **Gallery Filtering**: Filter between photos and videos
- **WhatsApp Integration**: Direct messaging for booking confirmations
- **Professional UI**: Glass effects, animations, and modern design
- **SEO Ready**: Proper HTML structure and meta tags

## API Endpoints

- `POST /api/contact`: Handle contact form submissions
- `POST /api/booking`: Handle booking requests

## Technologies Used

- **Node.js**: Server runtime
- **Express.js**: Web framework
- **HTML5**: Markup
- **CSS3**: Styling with modern features
- **Vanilla JavaScript**: Client-side interactions

## Development

The server is configured for production use with proper middleware for security and performance. All static assets are served efficiently, and the site is fully responsive across devices.
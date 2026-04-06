// Payment page functionality
document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);

    // Get booking details from URL with localStorage fallback
    const room = urlParams.get('room') || 'standard';
    const nights = parseInt(urlParams.get('nights') || '1');
    const total = parseFloat(urlParams.get('total') || '0');
    const currency = urlParams.get('currency') || 'ZMW';
    const checkIn = urlParams.get('checkIn') || '';
    const bookingStorage = JSON.parse(localStorage.getItem('sbl_booking') || '{}');
    const email = urlParams.get('email') || bookingStorage.email || '';
    const guestName = urlParams.get('name') || bookingStorage.name || '';
    const method = urlParams.get('method') || 'online';

    // If no booking data, show start booking option
    if (!guestName || guestName === '') {
        showStartBooking();
        return;
    }

    // Room name mapping
    const roomNames = {
        standard: 'Standard Room',
        executive: 'Executive Room',
        deluxe: 'Deluxe Family Room'
    };

    // Update summary
    document.getElementById('guestName').textContent = guestName;
    document.getElementById('guestEmail').textContent = email;
    document.getElementById('roomName').textContent = roomNames[room] || room;
    document.getElementById('checkIn').textContent = checkIn;
    document.getElementById('nights').textContent = nights;
    document.getElementById('total').textContent = `${currency} ${total.toLocaleString()}`;

    // Auto-process based on method
    if (method === 'at_checkin') {
        processReservation();
    }
});

function showStartBooking() {
    const summaryDiv = document.querySelector('.summary');
    const actionDiv = document.querySelector('.payment-action');

    summaryDiv.innerHTML = '<h2>Ready to Book?</h2><p>Fill out our booking form to get started.</p>';
    actionDiv.innerHTML = '<a href="/booking" class="btn">Start Booking</a>';
}

function payOnline() {
    const statusDiv = document.getElementById('paymentStatus');
    statusDiv.innerHTML = '<p style="color: blue;">Redirecting to Google Pay...</p>';

    // Get current URL params
    const urlParams = new URLSearchParams(window.location.search);

    // Redirect to Google Pay page with booking details
    setTimeout(() => {
        window.location.href = `/google-pay?${urlParams.toString()}`;
    }, 1000);
}

function payAtCheckin() {
    const statusDiv = document.getElementById('paymentStatus');
    statusDiv.innerHTML = '<p style="color: green;">Processing reservation...</p>';

    setTimeout(() => {
        processReservation();
    }, 1000);
}

function processPayment() {
    // Simulate successful payment
    const bookingId = 'SB-' + Math.floor(Math.random() * 1000000);

    // Redirect to success page
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('id', bookingId);
    urlParams.set('status', 'paid');

    window.location.href = `/payment-success?${urlParams.toString()}`;
}

function processReservation() {
    // Get booking data
    const urlParams = new URLSearchParams(window.location.search);
    const bookingData = {
        name: urlParams.get('name') || '',
        email: urlParams.get('email') || '',
        roomType: urlParams.get('room') || 'standard',
        checkin: urlParams.get('checkIn') || '',
        checkout: '', // not available
        guests: '1', // not available
        phone: '', // not available
        message: 'Pay at check-in reservation'
    };

    // Send to backend
    fetch('/api/booking', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(bookingData)
    }).then(response => response.json()).then(data => {
        console.log('Booking submitted:', data);
    }).catch(error => {
        console.error('Error submitting booking:', error);
    });

    // Simulate successful reservation
    const bookingId = 'RSV-' + Math.floor(Math.random() * 1000000);

    // Redirect to success page
    const urlParams2 = new URLSearchParams(window.location.search);
    urlParams2.set('id', bookingId);
    urlParams2.set('status', 'reserved');

    window.location.href = `/payment-success?${urlParams2.toString()}`;
}
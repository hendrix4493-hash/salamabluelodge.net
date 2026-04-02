// Payment page functionality
document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);

    // Get booking details from URL
    const room = urlParams.get('room') || 'standard';
    const nights = parseInt(urlParams.get('nights') || '1');
    const total = parseFloat(urlParams.get('total') || '0');
    const currency = urlParams.get('currency') || 'ZMW';
    const checkIn = urlParams.get('checkIn') || '';
    const email = urlParams.get('email') || '';
    const guestName = urlParams.get('name') || '';
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
    // Simulate successful reservation
    const bookingId = 'RSV-' + Math.floor(Math.random() * 1000000);

    // Redirect to success page
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('id', bookingId);
    urlParams.set('status', 'reserved');

    window.location.href = `/payment-success?${urlParams.toString()}`;
}
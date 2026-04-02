// Payment success page functionality
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
    const bookingId = urlParams.get('id') || '';
    const status = urlParams.get('status') || 'paid';

    // Room name mapping
    const roomNames = {
        standard: 'Standard Room',
        executive: 'Executive Room',
        deluxe: 'Deluxe Family Room'
    };

    // Update page based on status
    if (status === 'reserved') {
        document.getElementById('confirmationTitle').textContent = 'Reservation Received!';
        document.getElementById('amountLabel').textContent = 'Amount to Pay';
        document.getElementById('transactionId').textContent = `Reservation ID: ${bookingId}`;
    } else {
        document.getElementById('confirmationTitle').textContent = 'Booking Confirmed!';
        document.getElementById('amountLabel').textContent = 'Amount Paid';
        document.getElementById('transactionId').textContent = `Transaction ID: ${bookingId}`;
    }

    // Update details
    document.getElementById('guestName').textContent = guestName;
    document.getElementById('guestEmail').textContent = email;
    document.getElementById('roomName').textContent = roomNames[room] || room;
    document.getElementById('checkIn').textContent = checkIn;
    document.getElementById('nights').textContent = `${nights} Night(s)`;
    document.getElementById('total').textContent = `${currency} ${total.toLocaleString()}`;

    // Store booking data for WhatsApp
    window.bookingData = {
        guestName,
        email,
        roomName: roomNames[room] || room,
        checkIn,
        nights,
        total,
        currency,
        bookingId,
        status
    };
});

function sendWhatsApp(number) {
    const data = window.bookingData;
    const title = data.status === 'reserved' ? '*Salama Blue Lodge - Reservation*' : '*Salama Blue Lodge - Booking Confirmation*';
    const idLabel = data.status === 'reserved' ? '*Reservation ID:*' : '*Transaction ID:*';
    const amountLabel = data.status === 'reserved' ? '*Amount to Pay:*' : '*Total Paid:*';

    const message = `${title}\n\n` +
        `*Guest Name:* ${data.guestName}\n` +
        `*Guest Email:* ${data.email}\n` +
        `${idLabel} ${data.bookingId}\n` +
        `*Room:* ${data.roomName}\n` +
        `*Check-in Date:* ${data.checkIn}\n` +
        `*Duration:* ${data.nights} night(s)\n` +
        `${amountLabel} ${data.currency} ${data.total.toLocaleString()}\n\n` +
        `Thank you for choosing Salama Blue Lodge!`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${number}?text=${encodedMessage}`, '_blank');
}
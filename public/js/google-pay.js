// Google Pay page functionality
document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);

    // Get payment details from URL
    const total = urlParams.get('total') || '0';
    const currency = urlParams.get('currency') || 'ZMW';

    // Update amount display
    document.getElementById('amount').textContent = `${currency} ${parseFloat(total).toLocaleString()}`;
});

function completePayment() {
    const statusDiv = document.getElementById('paymentStatus');
    statusDiv.innerHTML = '<p style="color: blue;">Processing payment with Google Pay...</p>';

    // Simulate Google Pay processing
    setTimeout(() => {
        // Get current params
        const urlParams = new URLSearchParams(window.location.search);
        const bookingParams = new URLSearchParams();

        // Copy booking details
        ['room', 'nights', 'total', 'currency', 'checkIn', 'email', 'name'].forEach(key => {
            if (urlParams.get(key)) {
                bookingParams.set(key, urlParams.get(key));
            }
        });

        // Send to backend
        const bookingData = {
            name: urlParams.get('name') || '',
            email: urlParams.get('email') || '',
            roomType: urlParams.get('room') || 'standard',
            checkin: urlParams.get('checkIn') || '',
            checkout: '', // calculate if possible
            guests: '1',
            phone: '',
            message: `Online payment via Google Pay - ${urlParams.get('currency')} ${urlParams.get('total')}`
        };

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

        // Add payment status
        bookingParams.set('status', 'paid');
        bookingParams.set('id', 'GP-' + Math.floor(Math.random() * 1000000));

        // Redirect to success page
        window.location.href = `/payment-success?${bookingParams.toString()}`;
    }, 2000);
}
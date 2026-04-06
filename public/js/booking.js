// Booking form functionality
const roomPrices = {
    standard: 600,
    executive: 800,
    deluxe: 1000
};

let currentCurrency = 'ZMW';
let exchangeRate = 1;

function updatePrice() {
    const roomSelect = document.getElementById('roomType');
    const roomType = roomSelect.value;
    const roomName = roomSelect.options[roomSelect.selectedIndex].text.split(' - ')[0];

    document.getElementById('summaryRoom').textContent = roomName;

    calculateNights();
}

function calculateNights() {
    const checkIn = document.getElementById('checkIn').value;
    const checkOut = document.getElementById('checkOut').value;

    if (checkIn && checkOut) {
        const start = new Date(checkIn);
        const end = new Date(checkOut);
        const diffTime = Math.abs(end.getTime() - start.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        const nights = diffDays;
        document.getElementById('summaryNights').textContent = nights;

        const roomType = document.getElementById('roomType').value;
        const basePrice = roomPrices[roomType] * nights;
        const convertedPrice = basePrice * exchangeRate;

        document.getElementById('summaryTotal').textContent = formatPrice(convertedPrice, currentCurrency);
    }
}

function updatePaymentMethod() {
    const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked').value;
    const submitBtn = document.getElementById('submitBtn');

    if (paymentMethod === 'online') {
        submitBtn.innerHTML = '<img src="/images/Google-Pay-Acceptance/Google Pay Mark/GPay_Acceptance_Mark_800.png" alt="Continue to Google Pay" style="height: 40px;">';
    } else {
        submitBtn.innerHTML = 'Confirm Reservation';
    }
}

function formatPrice(amount, currency) {
    if (currency === 'ZMW') {
        return `ZMW ${amount.toLocaleString()}`;
    }
    return `${currency} ${amount.toFixed(2)}`;
}

function handleBooking(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const bookingData = Object.fromEntries(formData);

    // Calculate total
    const roomType = bookingData.roomType;
    const checkIn = new Date(bookingData.checkIn);
    const checkOut = new Date(bookingData.checkOut);
    const diffTime = Math.abs(checkOut.getTime() - checkIn.getTime());
    const nights = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const total = roomPrices[roomType] * nights;

    // Create URL parameters
    const params = new URLSearchParams({
        room: roomType,
        nights: nights.toString(),
        total: total.toString(),
        currency: currentCurrency,
        checkIn: bookingData.checkIn,
        method: bookingData.paymentMethod,
        email: bookingData.email,
        name: bookingData.guestName
    });

    // Save booking personal data for fallback (prevents missing name/email downstream)
    localStorage.setItem('sbl_booking', JSON.stringify({
        name: bookingData.guestName,
        email: bookingData.email,
        room: roomType,
        checkIn: bookingData.checkIn,
        checkOut: bookingData.checkOut,
        guests: bookingData.guests
    }));

    // Redirect to card validation page
    window.location.href = `/card-validation?${params.toString()}`;
}

// Set minimum dates
document.addEventListener('DOMContentLoaded', function() {
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('checkIn').min = today;
    document.getElementById('checkOut').min = today;

    // Update guests summary
    document.getElementById('guests').addEventListener('change', function() {
        document.getElementById('summaryGuests').textContent = this.value;
    });
});
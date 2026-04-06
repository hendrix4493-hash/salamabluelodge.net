// Payment success page functionality
document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const bookingStorage = JSON.parse(localStorage.getItem('sbl_booking') || '{}');

    // Get booking details from URL with fallback
    const room = urlParams.get('room') || 'standard';
    const nights = parseInt(urlParams.get('nights') || '1');
    const total = parseFloat(urlParams.get('total') || '0');
    const currency = urlParams.get('currency') || 'ZMW';
    const checkIn = urlParams.get('checkIn') || bookingStorage.checkIn || '';
    const email = urlParams.get('email') || bookingStorage.email || '';
    const guestName = urlParams.get('name') || bookingStorage.name || '';
    const bookingId = urlParams.get('id') || '';
    const status = urlParams.get('status') || 'paid';

    // Room name mapping
    const roomNames = {
        standard: 'Standard Room',
        executive: 'Executive Room',
        deluxe: 'Deluxe Family Room'
    };

    // Update page based on status
    const isGooglePay = bookingId.startsWith('GP-');
    
    if (status === 'reserved') {
        document.getElementById('confirmationTitle').textContent = 'Room Reserved - Payment Pending';
        document.getElementById('amountLabel').textContent = 'Amount to Pay at Check-in';
        document.getElementById('transactionId').textContent = `Reservation ID: ${bookingId}`;
    } else {
        document.getElementById('confirmationTitle').textContent = 'Booking Confirmed!';
        document.getElementById('amountLabel').textContent = isGooglePay ? 'Amount Paid (Google Pay)' : 'Amount Paid';
        document.getElementById('transactionId').textContent = `Transaction ID: ${bookingId}`;
    }

    // Add Google Pay indicator and important receipt notice
    if (isGooglePay) {
        const receiptHeader = document.querySelector('.receipt-header');
        const googlePayIndicator = document.createElement('div');
        googlePayIndicator.className = 'google-pay-indicator';
        googlePayIndicator.innerHTML = `
            <div style="background: #4285f4; color: white; padding: 8px 16px; border-radius: 20px; font-size: 14px; display: inline-block; margin: 10px 0;">
                Paid with Google Pay
            </div>
        `;
        receiptHeader.appendChild(googlePayIndicator);
    }

    // Add important receipt notice
    const receiptDetails = document.querySelector('.receipt-details');
    const importantNotice = document.createElement('div');
    importantNotice.className = 'important-notice';
    const noticeTitle = status === 'reserved' ? 'IMPORTANT: Reservation Confirmation' : 'IMPORTANT: Keep This Receipt!';
    const noticeText = status === 'reserved' 
        ? 'Your room has been reserved but payment is pending. Please bring this reservation confirmation to reception and pay the outstanding amount upon arrival.'
        : 'Please download or print this receipt and present it at reception upon arrival. This receipt confirms your payment and is required for check-in.';
    
    importantNotice.innerHTML = `
        <div style="background: #fff3cd; border: 2px solid #ffc107; border-radius: 8px; padding: 15px; margin: 20px 0; text-align: center;">
            <h4 style="color: #856404; margin: 0 0 10px 0;">${noticeTitle}</h4>
            <p style="color: #856404; margin: 0; font-weight: bold;">
                ${noticeText}
            </p>
        </div>
    `;
    receiptDetails.appendChild(importantNotice);

    // Update important message based on status
    const importantMessage = document.getElementById('instructionText');
    if (importantMessage) {
        if (status === 'reserved') {
            importantMessage.innerHTML = `
                Your room has been reserved but payment is pending. Please download this reservation confirmation and bring it to reception upon arrival.<br>
                Payment of ${currency} ${total.toLocaleString()} will be due at check-in.
            `;
        } else {
            importantMessage.innerHTML = `
                This receipt is your proof of payment. Please download it now and bring it to reception upon check-in.<br>
                Notify our team via WhatsApp or call us to confirm your booking.
            `;
        }
    }

    // Store booking data for WhatsApp
    window.bookingData = {
        guestName,
        guestEmail: email,
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

function downloadReceipt() {
    const data = window.bookingData;
    const isGooglePay = data.bookingId.startsWith('GP-');
    
    // Create receipt content
    const receiptContent = `
<!DOCTYPE html>
<html>
<head>
    <title>Salama Blue Lodge - Receipt</title>
    <style>
        body { 
            font-family: Arial, sans-serif; 
            max-width: 600px; 
            margin: 0 auto; 
            padding: 20px;
            color: #333;
        }
        .header { 
            text-align: center; 
            border-bottom: 2px solid #333; 
            padding-bottom: 20px; 
            margin-bottom: 20px; 
        }
        .logo { 
            max-width: 150px; 
        }
        .details { 
            margin: 20px 0; 
        }
        .row { 
            display: flex; 
            justify-content: space-between; 
            padding: 8px 0; 
            border-bottom: 1px solid #eee; 
        }
        .total { 
            font-weight: bold; 
            font-size: 18px; 
            background: #f8f9fa;
            padding: 10px;
            margin-top: 10px;
        }
        .important { 
            background: #fff3cd; 
            border: 2px solid #ffc107; 
            padding: 15px; 
            border-radius: 8px; 
            margin: 20px 0;
            text-align: center;
        }
        .google-pay-badge {
            background: #4285f4;
            color: white;
            padding: 5px 10px;
            border-radius: 15px;
            display: inline-block;
            margin: 10px 0;
            font-size: 14px;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>Salama Blue Lodge</h1>
        <h2>${data.status === 'reserved' ? 'Reservation Receipt' : 'Payment Receipt'}</h2>
        <p><strong>${data.status === 'reserved' ? 'Reservation ID' : 'Transaction ID'}:</strong> ${data.bookingId}</p>
        ${isGooglePay ? '<div class="google-pay-badge">Paid with Google Pay</div>' : ''}
    </div>
    
    <div class="details">
        <div class="row">
            <span>Guest Name:</span>
            <strong>${data.guestName}</strong>
        </div>
        <div class="row">
            <span>Guest Email:</span>
            <strong>${data.guestEmail}</strong>
        </div>
        <div class="row">
            <span>Room Type:</span>
            <strong>${data.roomName}</strong>
        </div>
        <div class="row">
            <span>Check-in Date:</span>
            <strong>${data.checkIn}</strong>
        </div>
        <div class="row">
            <span>Duration:</span>
            <strong>${data.nights} night(s)</strong>
        </div>
        <div class="row total">
            <span>${data.status === 'reserved' ? 'Amount to Pay' : 'Amount Paid'}:</span>
            <strong>${data.currency} ${data.total.toLocaleString()}</strong>
        </div>
    </div>
    
    <div class="important">
        <h3>IMPORTANT</h3>
        <p>This receipt is your proof of ${data.status === 'reserved' ? 'reservation' : 'payment'}. Please keep it safe and present it at reception upon arrival.</p>
        <p><strong>Contact Numbers:</strong> +260 572 348 483 | +260 777 909 863</p>
    </div>
    
    <p style="text-align: center; margin-top: 30px; color: #666;">
        Thank you for choosing Salama Blue Lodge!<br>
        Generated on: ${new Date().toLocaleDateString()}
    </p>
</body>
</html>`;

    // Create a temporary element to hold the HTML
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = receiptContent;
    tempDiv.style.position = 'absolute';
    tempDiv.style.left = '-9999px';
    document.body.appendChild(tempDiv);

    // Configure PDF options
    const options = {
        margin: 0.5,
        filename: `Salama_Blue_Lodge_Receipt_${data.bookingId}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
    };

    // Generate and download PDF
    html2pdf()
        .set(options)
        .from(tempDiv)
        .save()
        .then(() => {
            // Clean up
            document.body.removeChild(tempDiv);
        })
        .catch((error) => {
            console.error('Error generating PDF:', error);
            // Fallback to HTML download if PDF fails
            const blob = new Blob([receiptContent], { type: 'text/html' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `Salama_Blue_Lodge_Receipt_${data.bookingId}.html`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            document.body.removeChild(tempDiv);
        });
}
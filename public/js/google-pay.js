// Google Pay integration
const baseRequest = {
  apiVersion: 2,
  apiVersionMinor: 0
};

const allowedCardNetworks = ["AMEX", "DISCOVER", "INTERAC", "JCB", "MASTERCARD", "VISA"];
const allowedCardAuthMethods = ["PAN_ONLY", "CRYPTOGRAM_3DS"];

const tokenizationSpecification = {
  type: 'PAYMENT_GATEWAY',
  parameters: {
    'gateway': 'example',
    'gatewayMerchantId': 'exampleGatewayMerchantId',
  }
};

const baseCardPaymentMethod = {
  type: 'CARD',
  parameters: {
    allowedAuthMethods: allowedCardAuthMethods,
    allowedCardNetworks: allowedCardNetworks
  }
};

const cardPaymentMethod = Object.assign(
  {},
  baseCardPaymentMethod,
  {
    tokenizationSpecification: tokenizationSpecification
  }
);

let paymentsClient = null;

function getGoogleIsReadyToPayRequest() {
  return Object.assign(
      {},
      baseRequest,
      {
        allowedPaymentMethods: [baseCardPaymentMethod]
      }
  );
}

function getGooglePaymentDataRequest() {
  const paymentDataRequest = Object.assign({}, baseRequest);
  paymentDataRequest.allowedPaymentMethods = [cardPaymentMethod];
  paymentDataRequest.transactionInfo = getGoogleTransactionInfo();
  paymentDataRequest.merchantInfo = {
    merchantName: 'Salama Blue Lodge'
  };
  return paymentDataRequest;
}

function getGoogleTransactionInfo() {
  const urlParams = new URLSearchParams(window.location.search);
  const total = parseFloat(urlParams.get('total') || '0');
  const currency = urlParams.get('currency') || 'ZMW';

  return {
    displayItems: [
      {
        label: "Lodge Booking",
        type: "LINE_ITEM",
        price: total.toString(),
      }
    ],
    countryCode: 'ZM',
    currencyCode: currency,
    totalPriceStatus: "FINAL",
    totalPrice: total.toString(),
    totalPriceLabel: "Total"
  };
}

function onGooglePayLoaded() {
  const paymentsClient = new google.payments.api.PaymentsClient({
    environment: 'TEST' // Change to 'PRODUCTION' for live
  });

  paymentsClient.isReadyToPay(getGoogleIsReadyToPayRequest())
    .then(function(response) {
      if (response.result) {
        addGooglePayButton();
      }
    })
    .catch(function(err) {
      console.error(err);
    });
}

function addGooglePayButton() {
  const paymentsClient = new google.payments.api.PaymentsClient({
    environment: 'TEST'
  });

  const button = paymentsClient.createButton({
    buttonColor: 'default',
    buttonType: 'book',
    buttonSizeMode: 'fill',
    buttonRadius: 4,
    onClick: onGooglePaymentButtonClicked
  });

  document.getElementById('google-pay-button').appendChild(button);
}

function onGooglePaymentButtonClicked() {
  const paymentDataRequest = getGooglePaymentDataRequest();
  paymentDataRequest.transactionInfo = getGoogleTransactionInfo();

  const paymentsClient = new google.payments.api.PaymentsClient({
    environment: 'TEST'
  });

  paymentsClient.loadPaymentData(paymentDataRequest)
    .then(function(paymentData) {
      // handle the response
      processPayment(paymentData);
    })
    .catch(function(err) {
      console.error(err);
    });
}

function processPayment(paymentData) {
  const statusDiv = document.getElementById('paymentStatus');
  statusDiv.innerHTML = '<p style="color: blue;">Processing payment with Google Pay...</p>';

  // In a real implementation, send the payment token to your server
  console.log('Payment token:', paymentData.paymentMethodData.tokenizationData.token);

  // Simulate processing
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

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  const urlParams = new URLSearchParams(window.location.search);
  const bookingStorage = JSON.parse(localStorage.getItem('sbl_booking') || '{}');

  // Get payment details from URL (fallback to stored)
  const total = urlParams.get('total') || '0';
  const currency = urlParams.get('currency') || 'ZMW';

  // Update amount display
  document.getElementById('amount').textContent = `${currency} ${parseFloat(total).toLocaleString()}`;

  // If no email/name in URL, preserve from localStorage by re-setting URL (optional, not absolutely needed)
  if (!urlParams.get('name') && bookingStorage.name) {
    urlParams.set('name', bookingStorage.name);
    urlParams.set('email', bookingStorage.email || '');
    history.replaceState(null, '', `${location.pathname}?${urlParams.toString()}`);
  }

  // Load Google Pay
  if (window.google && window.google.payments) {
    onGooglePayLoaded();
  } else {
    // Wait for script to load
    window.addEventListener('load', onGooglePayLoaded);
  }
});
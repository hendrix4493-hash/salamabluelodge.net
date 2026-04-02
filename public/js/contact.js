// Contact form functionality
function handleContact(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const contactData = Object.fromEntries(formData);

    // Send to server
    fetch('/api/contact', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(contactData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Message sent successfully! We will get back to you soon.');
            event.target.reset();
        } else {
            alert('Failed to send message. Please try again.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred. Please try again later.');
    });
}
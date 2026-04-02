// Mobile menu toggle
function toggleMenu() {
    const menu = document.getElementById('mobile-menu');
    const icon = document.querySelector('.menu-icon');
    menu.classList.toggle('active');
    if (menu.classList.contains('active')) {
        icon.textContent = '✕';
    } else {
        icon.textContent = '☰';
    }
}

function closeMenu() {
    const menu = document.getElementById('mobile-menu');
    const icon = document.querySelector('.menu-icon');
    menu.classList.remove('active');
    icon.textContent = '☰';
}

// Close menu when clicking outside
document.addEventListener('click', function(event) {
    const menu = document.getElementById('mobile-menu');
    const btn = document.querySelector('.mobile-menu-btn');
    if (!menu.contains(event.target) && !btn.contains(event.target)) {
        closeMenu();
    }
});
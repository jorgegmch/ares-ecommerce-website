// Logica back-end del NAV responsive

const menuButton = document.querySelector('.menu-responsive');
const overlay = document.querySelector('.menu-overlay');
const closeButton = document.querySelector('.menu-overlay-close');

// Abrir / cerrar menú
function toggleMenu() {
    menuButton.classList.toggle('active');
    overlay.classList.toggle('active');
}

function closeMenu() {
    menuButton.classList.remove('active');
    overlay.classList.remove('active');
}

menuButton.addEventListener('click', toggleMenu);

closeButton.addEventListener('click', closeMenu);


document.querySelectorAll('.main-menu a').forEach(link => {
    link.addEventListener('click', closeMenu);
});
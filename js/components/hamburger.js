// When the hamburger Menu is clicked 
document.addEventListener("DOMContentLoaded", function() {
    const hamburgerMenu = document.querySelector(".hamburger-menu");
    const hamburgerIcon = document.querySelector(".hamburger-icon");

    hamburgerIcon.addEventListener("click", function() {
        hamburgerMenu.classList.toggle("menu-open");
    });
});
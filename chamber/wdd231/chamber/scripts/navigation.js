// This file handles the navigation functionality across the website.

document.addEventListener('DOMContentLoaded', () => {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.site-nav');

    navToggle.addEventListener('click', () => {
        const expanded = navToggle.getAttribute('aria-expanded') === 'true' || false;
        navToggle.setAttribute('aria-expanded', !expanded);
        navMenu.classList.toggle('active');
    });

    // Close the navigation menu when a link is clicked
    navMenu.addEventListener('click', () => {
        if (navMenu.classList.contains('active')) {
            navToggle.setAttribute('aria-expanded', false);
            navMenu.classList.remove('active');
        }
    });
});
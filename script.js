document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
    const mobileLinks = document.querySelectorAll('.mobile-link');
    const body = document.body;

    function toggleMenu() {
        const isActive = mobileMenuOverlay.classList.contains('active');
        if (isActive) {
            mobileMenuOverlay.classList.remove('active');
            mobileMenuBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
            body.style.overflow = ''; // Restore scrolling
        } else {
            mobileMenuOverlay.classList.add('active');
            mobileMenuBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
            body.style.overflow = 'hidden'; // Prevent scrolling
        }
    }

    mobileMenuBtn.addEventListener('click', toggleMenu);

    // Close menu when a link is clicked
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mobileMenuOverlay.classList.contains('active')) {
                toggleMenu();
            }
        });
    });

    // 2. Navbar Styling on Scroll
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 3. Smooth Scrolling for Anchor Links (fallback for CSS scroll-behavior)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // 4. Fade-In Animations on Scroll (Intersection Observer)
    const fadeElements = document.querySelectorAll('.fade-in-section');

    const appearOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // Stop observing once visible
            }
        });
    }, appearOptions);

    fadeElements.forEach(element => {
        appearOnScroll.observe(element);
    });
    
    // Check initial state for elements already in view
    setTimeout(() => {
        fadeElements.forEach(element => {
            const rect = element.getBoundingClientRect();
            if (rect.top < window.innerHeight) {
                 element.classList.add('is-visible');
                 appearOnScroll.unobserve(element);
            }
        });
    }, 100);
});

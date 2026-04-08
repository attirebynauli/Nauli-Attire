/**
 * NAULI ATTIRE - Premium Kebaya Rental
 * JavaScript Interactive Features
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all modules
    initNavigation();
    initScrollEffects();
    initSmoothScroll();
    initSeriesScroll();
    initParallaxEffect();
    initColorHover();
});

/**
 * Navigation Module
 * Handles navbar scroll effect and mobile menu toggle
 */
function initNavigation() {
    const navbar = document.querySelector('.navbar');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Navbar scroll effect
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        // Add/remove scrolled class
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });

    // Mobile menu toggle
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });

        // Close menu when clicking on a link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (navMenu.classList.contains('active') &&
                !navMenu.contains(e.target) &&
                !navToggle.contains(e.target)) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
}

/**
 * Scroll Effects Module
 * Handles reveal animations on scroll
 */
function initScrollEffects() {
    const reveals = document.querySelectorAll('.series-section, .collection-card, .contact-card, .stat-item, .color-item');

    // Add reveal class to elements
    reveals.forEach(el => el.classList.add('reveal'));

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    reveals.forEach(el => revealObserver.observe(el));

    // Series sections animation
    const seriesSections = document.querySelectorAll('.series-section');
    seriesSections.forEach((section, index) => {
        section.style.transitionDelay = `${index * 0.1}s`;
    });
}

/**
 * Smooth Scroll Module
 * Handles smooth scrolling for anchor links
 */
function initSmoothScroll() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');

    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Series Scroll Module
 * Handles scroll to series when collection card is clicked
 */
function initSeriesScroll() {
    const collectionCards = document.querySelectorAll('.collection-card');

    collectionCards.forEach(card => {
        card.addEventListener('click', () => {
            const seriesId = card.dataset.series;
            const seriesElement = document.getElementById(seriesId);

            if (seriesElement) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = seriesElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Parallax Effect Module
 * Subtle parallax effect for hero section
 */
function initParallaxEffect() {
    const hero = document.querySelector('.hero');

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroContent = document.querySelector('.hero-content');

        if (heroContent && scrolled < window.innerHeight) {
            heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
            heroContent.style.opacity = 1 - (scrolled / window.innerHeight) * 0.8;
        }
    });
}

/**
 * Color Hover Module
 * Enhanced hover effects for color swatches
 */
function initColorHover() {
    const colorItems = document.querySelectorAll('.color-item');

    colorItems.forEach(item => {
        const swatch = item.querySelector('.color-swatch');

        item.addEventListener('mouseenter', () => {
            const color = swatch.style.backgroundColor;
            // Add subtle glow effect
            swatch.style.boxShadow = `0 4px 20px ${color}40`;
        });

        item.addEventListener('mouseleave', () => {
            swatch.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.3)';
        });
    });
}

/**
 * Utility: Debounce function
 * Limits the rate at which a function can fire
 */
function debounce(func, wait = 20) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Utility: Throttle function
 * Ensures a function is called at most once in a specified time period
 */
function throttle(func, limit = 100) {
    let inThrottle;
    return function executedFunction(...args) {
        if (!inThrottle) {
            func(...args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

/**
 * Handle page visibility change
 * Pause animations when tab is not visible
 */
document.addEventListener('visibilitychange', () => {
    const hero = document.querySelector('.hero');
    if (hero) {
        if (document.hidden) {
            hero.style.animationPlayState = 'paused';
        } else {
            hero.style.animationPlayState = 'running';
        }
    }
});

/**
 * Preload images for better performance
 */
function preloadImages() {
    const images = document.querySelectorAll('img[data-src]');

    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// Initialize image preloading
preloadImages();

/**
 * WhatsApp Floating Button Animation Enhancement
 */
function initWhatsAppButton() {
    const whatsappBtn = document.querySelector('.whatsapp-float');

    if (whatsappBtn) {
        // Add ripple effect on click
        whatsappBtn.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            ripple.style.cssText = `
                position: absolute;
                width: 100%;
                height: 100%;
                background: rgba(255,255,255,0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: rippleEffect 0.6s linear;
                pointer-events: none;
            `;

            this.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        });
    }
}

// Add ripple animation keyframes dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes rippleEffect {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Initialize WhatsApp button
initWhatsAppButton();

/**
 * Console Easter Egg
 */
console.log('%c✨ NAULI ATTIRE ✨', 'color: #c9a96e; font-size: 24px; font-weight: bold;');
console.log('%cPremium Kebaya Rental - Kota Sukabumi', 'color: #666; font-size: 14px;');
console.log('%cWhatsApp: 087777812020 | Instagram: @Attirebynauli_', 'color: #888; font-size: 12px;');

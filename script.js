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
    initColorModal();
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
            const href = this.getAttribute('href');

            // Skip if it's a modal button or calendar link
            if (href.startsWith('https://calendar') || href.startsWith('https://wa.me')) {
                return;
            }

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
            if (swatch) {
                const color = swatch.style.backgroundColor;
                swatch.style.boxShadow = `0 4px 20px ${color}40`;
            }
        });

        item.addEventListener('mouseleave', () => {
            if (swatch) {
                swatch.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.3)';
            }
        });
    });
}

/**
 * Mapping: "Series Warna" → Calendar ID
 * Format key: "[series]-[warna]" semua huruf kecil, spasi jadi strip
 */
const KALENDER_MAP = {
    'alanya-blush-pink'    : 'df1b73d3b55df935ce1c99967cabbaacb418a5d9f2a625a5e214ad7910329bf2@group.calendar.google.com',
    'alanya-butter-yellow' : '9cee55c933d247c1fc09a0af2fffdc46d852d6a66090f86d9e2b734fe11e9878@group.calendar.google.com',
    'alanya-creamy-nude'   : '086a6094dca451350eae678bcf7d068469198045d37c6c0bc71242a0716b53c1@group.calendar.google.com',
    'alanya-emerald'       : '1e346e7d111fe9f23a2a46d55f6fb97048442448e12522d9846ab4f64d88bcea@group.calendar.google.com',
    'alanya-rose-gold'     : '6f9756410114f3a8dfb53fc36521d30eeef5cfa93a6dd3aed5f8edf8d52d6436@group.calendar.google.com',
    'aurora-mahogany'      : '827d320dd5cbbcb303a8dfc695cc2a794e248fad40e04f56c9277da941419ec3@group.calendar.google.com',
    'calla-caramel'        : 'bdc61e52602fd7d6d3045d446b9a0321a8aed4521c295f07b3111b8edd76d0a6@group.calendar.google.com',
    'calla-grey'           : 'aec3261c1d9087836c7949e3852db359ee68234feecdc129c0cc147f093e0dfb@group.calendar.google.com',
    'calla-ice-blue'       : '7eb7efac902ab9dbeda69885ec9e61ce872a4218dcffa915aebcee41a71b0831@group.calendar.google.com',
    'calla-maroon'         : '1576b7a37c32e87928d73c9916d4fd7cada5cb7f02c982e767eb53b61850f4f7@group.calendar.google.com',
    'edita-blush-pink'     : 'a4caa7eaaddf0459f1970c869ef4e71689dc49ac929325df880b3db3e594229b@group.calendar.google.com',
    'edita-creamy-nude'    : '08b43e9e55f01fe0a4caf90e3174be5e2513f908efd0c6b2ffb0d48a0545c92e@group.calendar.google.com',
    'edita-navy'           : 'f45eedd13134fa255816d3a6dfacf5ae9b98e926007df96cc4440e959d07ffca@group.calendar.google.com',
    'edita-nude-pink'      : '77d0d1735cd66081e7b747bbe8b783593cbf7dc1c4bae285a71df150a6ec95c2@group.calendar.google.com',
    'edita-emerald-blue'   : '4e1c2165072a657abff5578af8ef9885e40ec06eb0915e00fb3e63d1a8e08d44@group.calendar.google.com',
    'elysian-baby-pink'    : 'a5905a2c1e0181b23a31b110fbb2000f64681d364af300bcbe73e3c45487c1a9@group.calendar.google.com',
    'elysian-blue-denim'   : 'b07f85d671d3672083813bd19853072fa91841c15ccc3abadd9449745fe8dbcb@group.calendar.google.com',
    'elysian-mauve'        : '43080ed42c35fc912329ab9c5c50ee42cfd4df962861342a2b05086b08203a9a@group.calendar.google.com',
    'shreya-burgundy'      : 'aa68f11602f4299ef5fda5d4747c2ec4d027df00df475f5a21e300b193e92612@group.calendar.google.com',
    'shreya-ice-blue'      : '219566b322fb300d396e11ec6196da34319f6a2a5b8867fcb4fe8aba4ca91b94@group.calendar.google.com',
};

/**
 * Buat calendar key dari series + colorName
 * Contoh: "Edita Series" + "Blush Pink" → "edita-blush-pink"
 */
function buatCalendarKey(series, colorName) {
    const seriesBersih = series.replace(/\s*series\s*/i, '').trim();
    const key = (seriesBersih + '-' + colorName)
        .toLowerCase()
        .replace(/\s+/g, '-');
    return key;
}

/**
 * Buka modal kalender dengan iframe sesuai kebaya
 */
function bukaKalender(key, namaDisplay) {
    const id = KALENDER_MAP[key];
    if (!id) {
        console.warn('Kalender tidak ditemukan untuk key:', key);
        return;
    }
    const src = `https://calendar.google.com/calendar/embed?src=${encodeURIComponent(id)}&ctz=Asia%2FJakarta&mode=MONTH&showTitle=0&showNav=1&showPrint=0&showTabs=0`;
    document.getElementById('iframeKalender').src = src;
    document.getElementById('judulKalender').textContent = '📅 Ketersediaan — ' + namaDisplay;
    document.getElementById('modalKalender').style.display = 'flex';
}

/**
 * Tutup modal kalender
 */
function tutupKalender() {
    document.getElementById('modalKalender').style.display = 'none';
    document.getElementById('iframeKalender').src = '';
}

// Tutup modal kalender kalau klik di luar
document.addEventListener('DOMContentLoaded', function() {
    const modalKal = document.getElementById('modalKalender');
    if (modalKal) {
        modalKal.addEventListener('click', function(e) {
            if (e.target === this) tutupKalender();
        });
    }
});

/**
 * Color Modal Module
 * Handles modal popup for color item details
 * + integrasi tombol kalender per kebaya
 */
function initColorModal() {
    const modal = document.getElementById('colorModal');
    const modalClose = document.getElementById('modalClose');
    const colorItems = document.querySelectorAll('.color-item');

    // Modal elements
    const modalImage = document.getElementById('modalImage');
    const modalSeries = document.getElementById('modalSeries');
    const modalColorName = document.getElementById('modalColorName');
    const modalPrice = document.getElementById('modalPrice');
    const modalPackageList = document.getElementById('modalPackageList');

    // Open modal when clicking color item
    colorItems.forEach(item => {
        item.addEventListener('click', () => {
            const series = item.dataset.series || '';
            const colorName = item.dataset.colorName || '';
            const price = item.dataset.price || '';
            const packageItems = item.dataset.package || '';
            const image = item.dataset.image || '';

            // Set modal content
            modalImage.src = image;
            modalImage.alt = colorName;
            modalSeries.textContent = series;
            modalColorName.textContent = colorName;
            modalPrice.textContent = price;

            // Parse and display package items
            if (packageItems) {
                const items = packageItems.split(' + ');
                modalPackageList.innerHTML = items.map(i => `<li>${i.trim()}</li>`).join('');
            }

            // =============================================
            // UPDATE TOMBOL KALENDER sesuai kebaya ini
            // =============================================
            const calKey = buatCalendarKey(series, colorName);
            const namaDisplay = series + ' ' + colorName;
            const btnKalender = document.querySelector('.modal-btn-calendar');
            if (btnKalender) {
                // Ubah dari <a href> menjadi onclick
                btnKalender.removeAttribute('href');
                btnKalender.setAttribute('target', '');
                btnKalender.onclick = function(e) {
                    e.preventDefault();
                    bukaKalender(calKey, namaDisplay);
                };
            }
            // =============================================

            // Show modal
            modal.classList.add('active');
            document.body.classList.add('modal-open');
        });
    });

    // Close modal function
    function closeModal() {
        modal.classList.remove('active');
        document.body.classList.remove('modal-open');
    }

    // Close button click
    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }

    // Click outside modal to close
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Press Escape to close
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
}

/**
 * Utility: Debounce function
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

preloadImages();

/**
 * WhatsApp Floating Button Animation Enhancement
 */
function initWhatsAppButton() {
    const whatsappBtn = document.querySelector('.whatsapp-float');

    if (whatsappBtn) {
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

initWhatsAppButton();

/**
 * Console Easter Egg
 */
console.log('%c NAULI ATTIRE ', 'color: #c9a96e; font-size: 24px; font-weight: bold;');
console.log('%cPremium Kebaya Rental - Kota Sukabumi', 'color: #666; font-size: 14px;');
console.log('%cWhatsApp: 087777812020 | Instagram: @Attirebynauli_', 'color: #888; font-size: 12px;');

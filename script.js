/* =============================================
   NAULI ATTIRE — Universal Script
   Runs safely on index.html AND all series pages
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {
    initNavbar();
    initNavDropdown();
    initMobileMenu();
    initFilterPills();
    initReveal();
    initSmoothScroll();
    initProductCards();
    initModalClose();
    initCustomerSlideshow();
    initMobileBottomBar();
    initHeroSlideshow();
});

/* ── NAVBAR SCROLL ── */
function initNavbar() {
    const nb = document.getElementById('navbar');
    if (!nb) return;
    window.addEventListener('scroll', () => {
        nb.classList.toggle('scrolled', window.scrollY > 60);
    }, { passive: true });
}

/* ── NAVBAR DROPDOWN — ACCORDION TOGGLE ── */
function initNavDropdown() {
    const wraps = document.querySelectorAll('.nav-dropdown-wrap');
    if (!wraps.length) return;

    wraps.forEach(wrap => {
        const trigger = wrap.querySelector('.nav-dropdown-trigger');
        if (!trigger) return;

        // Click/tap on trigger toggles accordion
        trigger.addEventListener('click', e => {
            e.preventDefault();
            e.stopPropagation();
            const isOpen = wrap.classList.contains('dd-open');
            // Close all other accordions first
            wraps.forEach(w => w.classList.remove('dd-open'));
            // Toggle current
            if (!isOpen) {
                wrap.classList.add('dd-open');
            }
        });
    });

    // Close accordion when clicking outside navbar
    document.addEventListener('click', e => {
        if (!e.target.closest('.navbar')) {
            wraps.forEach(w => w.classList.remove('dd-open'));
        }
    });

    // Close on Escape
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') wraps.forEach(w => w.classList.remove('dd-open'));
    });

    // Close accordion after selecting a dropdown link
    document.querySelectorAll('.nav-drop-item').forEach(link => {
        link.addEventListener('click', () => {
            wraps.forEach(w => w.classList.remove('dd-open'));
        });
    });
}

/* ── MOBILE MENU ── */
function initMobileMenu() {
    const btn     = document.getElementById('hamburger');
    const overlay = document.getElementById('mobileOverlay');
    if (!btn || !overlay) return;

    // Prevent double-binding
    const newBtn = btn.cloneNode(true);
    btn.parentNode.replaceChild(newBtn, btn);

    const close = () => {
        overlay.classList.remove('open');
        newBtn.classList.remove('open');
        newBtn.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('no-scroll');
    };

    newBtn.addEventListener('click', () => {
        const open = overlay.classList.toggle('open');
        newBtn.classList.toggle('open', open);
        newBtn.setAttribute('aria-expanded', String(open));
        document.body.classList.toggle('no-scroll', open);
    });

    overlay.querySelectorAll('.mm-link, .mm-cta, .mm-series-item, .mm-all-link').forEach(a => {
        a.addEventListener('click', close);
    });
    overlay.addEventListener('click', e => { if (e.target === overlay) close(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });

    // Mobile Menu Accordion Toggle
    document.querySelectorAll('.mm-accordion-wrap').forEach(wrap => {
        const trigger = wrap.querySelector('.mm-accordion-trigger');
        if (!trigger) return;
        const newTrigger = trigger.cloneNode(true);
        trigger.parentNode.replaceChild(newTrigger, trigger);
        newTrigger.addEventListener('click', () => {
            wrap.classList.toggle('mm-open');
        });
    });
}
/* ── FILTER PILLS ── */
function initFilterPills() {
    const pills  = document.querySelectorAll('.pill');
    const groups = document.querySelectorAll('.series-group');
    if (!pills.length) return;

    pills.forEach(pill => {
        pill.addEventListener('click', () => {
            pills.forEach(p => { p.classList.remove('active'); p.setAttribute('aria-selected', 'false'); });
            pill.classList.add('active');
            pill.setAttribute('aria-selected', 'true');

            const filter = pill.dataset.filter;
            groups.forEach(group => {
                group.classList.toggle('hidden', filter !== 'all' && group.dataset.series !== filter);
            });

            if (filter !== 'all') {
                const target = document.getElementById(filter);
                if (target) {
                    const offset = (document.querySelector('.navbar')?.offsetHeight || 56) + 8;
                    setTimeout(() => {
                        window.scrollTo({ top: target.getBoundingClientRect().top + window.pageYOffset - offset, behavior: 'smooth' });
                    }, 50);
                }
            }
        });
    });
}

/* ── SCROLL REVEAL ── */
function initReveal() {
    const items = document.querySelectorAll('.product-card, .kcard, .stat-item, .cs-step, .syarat-col, .faq-item');
    if (!items.length) return;
    items.forEach(el => el.classList.add('reveal'));
    const obs = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                const delay = parseInt(e.target.dataset.delay || 0);
                setTimeout(() => e.target.classList.add('visible'), delay);
                obs.unobserve(e.target);
            }
        });
    }, { threshold: 0.05, rootMargin: '0px 0px -20px 0px' });
    items.forEach((el, i) => {
        el.dataset.delay = (i % 5) * 55;
        obs.observe(el);
    });
}

/* ── SMOOTH SCROLL ── */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', e => {
            const href = a.getAttribute('href');
            if (!href || href === '#') return;
            const target = document.querySelector(href);
            if (!target) return;
            e.preventDefault();
            const offset = (document.querySelector('.navbar')?.offsetHeight || 56) + 4;
            window.scrollTo({ top: target.getBoundingClientRect().top + window.pageYOffset - offset, behavior: 'smooth' });
        });
    });
}

/* ── PRODUCT CARDS (Mobile + Desktop) ── */
function initProductCards() {
    // Mobile cards
    document.querySelectorAll('.product-card, .bs-card, .pcard').forEach(card => {
        card.addEventListener('click', () => openModal(card));
    });
    // Desktop cards
    document.querySelectorAll('.product-card-desktop').forEach(card => {
        card.addEventListener('click', () => openModal(card));
    });
}

/* ── MODAL OPEN ── */
function openModal(item) {
    const series     = item.dataset.series    || '';
    const colorName  = item.dataset.colorName || '';
    const price      = item.dataset.price     || '';
    const packageStr = item.dataset.package   || '';
    const image      = item.dataset.image     || '';
    const photosRaw  = item.dataset.photos    || '[]';

    document.getElementById('modalImg').src            = image;
    document.getElementById('modalImg').alt            = colorName;
    document.getElementById('modalSeries').textContent = series;
    document.getElementById('modalColor').textContent  = colorName;
    document.getElementById('modalPrice').textContent  = price;

    const list = document.getElementById('modalPkg');
    list.innerHTML = '';
    packageStr.split(' + ').forEach(pkg => {
        const li = document.createElement('li');
        li.textContent = pkg.trim();
        list.appendChild(li);
    });

    const key = makeCalKey(series, colorName);
    document.getElementById('btnKalender').onclick = () => openCal(key);

    let photos = ['','','','',''];
    try { photos = JSON.parse(photosRaw); } catch(e) {}
    while (photos.length < 5) photos.push('');
    buildCustomerSlideshow(photos);

    document.getElementById('detailModal').classList.add('open');
    document.body.classList.add('no-scroll');
}

/* ── MODAL CLOSE ── */
function initModalClose() {
    const dm = document.getElementById('detailModal');
    const cm = document.getElementById('calModal');
    if (!dm) return;

    document.getElementById('modalClose')?.addEventListener('click', closeDetailModal);
    document.getElementById('calClose')?.addEventListener('click', closeCalModal);
    dm.addEventListener('click', e => { if (e.target === dm) closeDetailModal(); });
    cm?.addEventListener('click', e => { if (e.target === cm) closeCalModal(); });
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') { closeDetailModal(); closeCalModal(); }
    });
}
function closeDetailModal() {
    stopAutoplay();
    document.getElementById('detailModal')?.classList.remove('open');
    document.body.classList.remove('no-scroll');
}

/* ── CUSTOMER SLIDESHOW ── */
let mcPhotos  = [];
let mcCurrent = 0;
let mcTimer   = null;

function initCustomerSlideshow() {
    const prevBtn = document.getElementById('mcPrev');
    const nextBtn = document.getElementById('mcNext');
    const viewer  = document.getElementById('mcViewer');
    if (!prevBtn) return;

    prevBtn.addEventListener('click', () => { goTo((mcCurrent - 1 + mcPhotos.length) % mcPhotos.length); startAutoplay(); });
    nextBtn.addEventListener('click', () => { goTo((mcCurrent + 1) % mcPhotos.length); startAutoplay(); });

    document.getElementById('modalCustomer')?.addEventListener('mouseenter', stopAutoplay);
    document.getElementById('modalCustomer')?.addEventListener('mouseleave', startAutoplay);

    let tx = 0;
    viewer?.addEventListener('touchstart', e => { tx = e.touches[0].clientX; }, { passive: true });
    viewer?.addEventListener('touchend', e => {
        const dx = e.changedTouches[0].clientX - tx;
        if (Math.abs(dx) > 36) {
            goTo(dx < 0 ? (mcCurrent + 1) % mcPhotos.length : (mcCurrent - 1 + mcPhotos.length) % mcPhotos.length);
            startAutoplay();
        }
    }, { passive: true });
}

function buildCustomerSlideshow(photos) {
    mcPhotos = photos.slice(0, 5);
    mcCurrent = 0;
    const thumbsEl = document.getElementById('mcThumbs');
    if (!thumbsEl) return;
    thumbsEl.innerHTML = '';
    const totalEl = document.getElementById('mcTotal');
    if (totalEl) totalEl.textContent = mcPhotos.length;
    mcPhotos.forEach((src, i) => {
        if (src) {
            const img = document.createElement('img');
            img.src = src; img.alt = 'Customer ' + (i + 1);
            img.className = 'mc-thumb' + (i === 0 ? ' active' : '');
            img.loading = 'lazy';
            img.addEventListener('click', () => goTo(i));
            img.addEventListener('error', () => thumbsEl.replaceChild(makePh(i), img));
            thumbsEl.appendChild(img);
        } else {
            thumbsEl.appendChild(makePh(i));
        }
    });
    goTo(0);
    startAutoplay();
}
function makePh(i) {
    const ph = document.createElement('div');
    ph.className = 'mc-thumb-ph' + (i === 0 ? ' active' : '');
    ph.textContent = 'Foto ' + (i + 1);
    ph.addEventListener('click', () => goTo(i));
    return ph;
}
function goTo(index) {
    if (index < 0 || index >= mcPhotos.length) return;
    const mi  = document.getElementById('mcMainImg');
    const ph  = document.getElementById('mcPlaceholder');
    const cur = document.getElementById('mcCur');
    if (!mi) return;
    document.querySelectorAll('#mcThumbs .mc-thumb, #mcThumbs .mc-thumb-ph').forEach((t, i) => t.classList.toggle('active', i === index));
    if (cur) cur.textContent = index + 1;
    const src = mcPhotos[index];
    if (src) {
        mi.style.opacity = '0';
        mi.onload  = () => { mi.style.opacity = '1'; };
        mi.onerror = () => { mi.style.display = 'none'; if (ph) ph.style.display = 'flex'; };
        mi.style.display = 'block';
        if (ph) ph.style.display = 'none';
        mi.src = src;
        if (mi.complete) mi.style.opacity = '1';
    } else {
        mi.style.display = 'none';
        if (ph) ph.style.display = 'flex';
    }
    mcCurrent = index;
}
function startAutoplay() {
    stopAutoplay();
    if (mcPhotos.length > 1) mcTimer = setInterval(() => goTo((mcCurrent + 1) % mcPhotos.length), 3200);
}
function stopAutoplay() {
    if (mcTimer) { clearInterval(mcTimer); mcTimer = null; }
}

/* ── GOOGLE CALENDAR ── */
const KALENDER_MAP = {
    'alanya-blush-pink':    'df1b73d3b55df935ce1c99967cabbaacb418a5d9f2a625a5e214ad7910329bf2@group.calendar.google.com',
    'alanya-butter-yellow': '9cee55c933d247c1fc09a0af2fffdc46d852d6a66090f86d9e2b734fe11e9878@group.calendar.google.com',
    'alanya-creamy-nude':   '086a6094dca451350eae678bcf7d068469198045d37c6c0bc71242a0716b53c1@group.calendar.google.com',
    'alanya-emerald':       '1e346e7d111fe9f23a2a46d55f6fb97048442448e12522d9846ab4f64d88bcea@group.calendar.google.com',
    'alanya-rose-gold':     '6f9756410114f3a8dfb53fc36521d30eeef5cfa93a6dd3aed5f8edf8d52d6436@group.calendar.google.com',
    'aurora-mahogany':      '827d320dd5cbbcb303a8dfc695cc2a794e248fad40e04f56c9277da941419ec3@group.calendar.google.com',
    'calla-caramel':        'bdc61e52602fd7d6d3045d446b9a0321a8aed4521c295f07b3111b8edd76d0a6@group.calendar.google.com',
    'calla-grey':           'aec3261c1d9087836c7949e3852db359ee68234feecdc129c0cc147f093e0dfb@group.calendar.google.com',
    'calla-ice-blue':       '7eb7efac902ab9dbeda69885ec9e61ce872a4218dcffa915aebcee41a71b0831@group.calendar.google.com',
    'calla-maroon':         '1576b7a37c32e87928d73c9916d4fd7cada5cb7f02c982e767eb53b61850f4f7@group.calendar.google.com',
    'edita-blush-pink':     'a4caa7eaaddf0459f1970c869ef4e71689dc49ac929325df880b3db3e594229b@group.calendar.google.com',
    'edita-creamy-nude':    '08b43e9e55f01fe0a4caf90e3174be5e2513f908efd0c6b2ffb0d48a0545c92e@group.calendar.google.com',
    'edita-navy':           'f45eedd13134fa255816d3a6dfacf5ae9b98e926007df96cc4440e959d07ffca@group.calendar.google.com',
    'edita-nude-pink':      '77d0d1735cd66081e7b747bbe8b783593cbf7dc1c4bae285a71df150a6ec95c2@group.calendar.google.com',
    'edita-emerald-blue':   '4e1c2165072a657abff5578af8ef9885e40ec06eb0915e00fb3e63d1a8e08d44@group.calendar.google.com',
    'elysian-baby-pink':    'a5905a2c1e0181b23a31b110fbb2000f64681d364af300bcbe73e3c45487c1a9@group.calendar.google.com',
    'elysian-blue-denim':   'b07f85d671d3672083813bd19853072fa91841c15ccc3abadd9449745fe8dbcb@group.calendar.google.com',
    'elysian-mauve':        '43080ed42c35fc912329ab9c5c50ee42cfd4df962861342a2b05086b08203a9a@group.calendar.google.com',
    'shreya-burgundy':      'aa68f11602f4299ef5fda5d4747c2ec4d027df00df475f5a21e300b193e92612@group.calendar.google.com',
    'shreya-ice-blue':      '219566b322fb300d396e11ec6196da34319f6a2a5b8867fcb4fe8aba4ca91b94@group.calendar.google.com',
};
function makeCalKey(series, colorName) {
    return (series.replace(/\s*series\s*/i, '').trim() + '-' + colorName)
        .toLowerCase().replace(/\s+/g, '-');
}
function openCal(key) {
    const calId = KALENDER_MAP[key];
    if (!calId) return;
    const src = `https://calendar.google.com/calendar/embed?src=${encodeURIComponent(calId)}&ctz=Asia%2FJakarta&mode=MONTH&showTitle=0&showNav=1&showPrint=0&showTabs=0&showCalendars=0&showTz=0`;
    document.getElementById('calFrame').src = src;
    document.getElementById('calModal').classList.add('open');
}
function closeCalModal() {
    document.getElementById('calModal')?.classList.remove('open');
    const cf = document.getElementById('calFrame');
    if (cf) cf.src = '';
}

/* ── FAQ TOGGLE ── */
function toggleFaq(btn) {
    const item = btn.closest('.faq-item');
    const wasOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
    if (!wasOpen) item.classList.add('open');
}

/* ── MOBILE BOTTOM BAR ── */
function initMobileBottomBar() {
    const bar = document.getElementById('mobileBottomBar');
    if (!bar) return;
    bar.style.transition = 'transform .25s ease';
    bar.style.transform  = 'translateY(100%)';
    window.addEventListener('scroll', () => {
        bar.style.transform = window.scrollY < 80 ? 'translateY(100%)' : 'translateY(0)';
    }, { passive: true });
}

/* ── HERO SLIDESHOW ── */
function initHeroSlideshow() {
    const slides     = document.querySelectorAll('.hero-slide');
    const indicators = document.querySelectorAll('.hi');
    if (!slides.length) return;
    let current = 0;
    let timer   = null;

    function goToSlide(index) {
        slides[current].classList.remove('active');
        indicators[current]?.classList.remove('active');
        current = (index + slides.length) % slides.length;
        slides[current].classList.add('active');
        indicators[current]?.classList.add('active');
    }
    function startSlideshow() {
        timer = setInterval(() => goToSlide(current + 1), 4500);
    }
    indicators.forEach((ind, i) => {
        ind.addEventListener('click', () => { goToSlide(i); clearInterval(timer); startSlideshow(); });
    });
    startSlideshow();
}

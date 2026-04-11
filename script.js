document.addEventListener('DOMContentLoaded', () => {
    initNavbar();
    initReveal();
    initSmoothScroll();
    initSeriesNav();
    initColorModal();
    initBestsellerCards();
    initModalClose();
});

function initNavbar() {
    const navbar = document.getElementById('navbar');
    const toggle = document.getElementById('navToggle');
    const menu   = document.getElementById('navMenu');
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 60);
    }, { passive: true });
    toggle?.addEventListener('click', () => {
        toggle.classList.toggle('open');
        menu.classList.toggle('open');
        document.body.classList.toggle('no-scroll', menu.classList.contains('open'));
    });
    menu?.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', () => {
            toggle?.classList.remove('open');
            menu.classList.remove('open');
            document.body.classList.remove('no-scroll');
        });
    });
    document.addEventListener('click', e => {
        if (menu?.classList.contains('open') &&
            !menu.contains(e.target) && !toggle?.contains(e.target)) {
            toggle?.classList.remove('open');
            menu.classList.remove('open');
            document.body.classList.remove('no-scroll');
        }
    });
}

function initReveal() {
    const targets = document.querySelectorAll(
        '.stat-block, .about-layout > *, .collection-card, ' +
        '.series-block-header, .color-item, .contact-card, ' +
        '.bs-card, .syarat-group, .syarat-note'
    );
    targets.forEach(el => el.classList.add('reveal'));
    const obs = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
        });
    }, { threshold: 0.06, rootMargin: '0px 0px -40px 0px' });
    targets.forEach((el, i) => {
        el.style.transitionDelay = (i % 4) * 0.07 + 's';
        obs.observe(el);
    });
}

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', e => {
            const href = a.getAttribute('href');
            if (!href || href === '#') return;
            const target = document.querySelector(href);
            if (!target) return;
            e.preventDefault();
            const offset = document.querySelector('.navbar')?.offsetHeight || 70;
            window.scrollTo({ top: target.getBoundingClientRect().top + window.pageYOffset - offset, behavior: 'smooth' });
        });
    });
}

function initSeriesNav() {
    document.querySelectorAll('.collection-card').forEach(card => {
        card.addEventListener('click', () => {
            const target = document.getElementById(card.dataset.series);
            if (!target) return;
            const offset = document.querySelector('.navbar')?.offsetHeight || 70;
            window.scrollTo({ top: target.getBoundingClientRect().top + window.pageYOffset - offset, behavior: 'smooth' });
        });
    });
}

/* Bestseller cards — klik buka modal */
function initBestsellerCards() {
    document.querySelectorAll('.bs-card').forEach(card => {
        card.addEventListener('click', () => openDetailModal(card));
    });
}

/* ── Customer slideshow ── */
let mcPhotos  = [];
let mcCurrent = 0;
let mcTimer   = null;

function buildModalCustomer(photos) {
    mcPhotos  = photos.slice(0, 5);
    mcCurrent = 0;
const thumbsEl = document.getElementById('mcThumbs');
if (!thumbsEl) return;

thumbsEl.innerHTML = '';    const totalEl  = document.getElementById('mcTotal');
    thumbsEl.innerHTML = '';
    if (totalEl) totalEl.textContent = mcPhotos.length;
    mcPhotos.forEach((src, i) => {
        if (src) {
            const img = document.createElement('img');
            img.src       = src;
            img.alt       = 'Customer ' + (i + 1);
            img.className = 'mc-thumb' + (i === 0 ? ' active' : '');
            img.loading   = 'lazy';
            img.addEventListener('click', () => mcGoTo(i));
            img.addEventListener('error', () => {
                const ph = makePlaceholderThumb(i);
                thumbsEl.replaceChild(ph, img);
            });
            thumbsEl.appendChild(img);
        } else {
            thumbsEl.appendChild(makePlaceholderThumb(i));
        }
    });
    mcGoTo(0);
    mcStartAutoplay();
}

function makePlaceholderThumb(i) {
    const ph = document.createElement('div');
    ph.className = 'mc-thumb-ph' + (i === 0 ? ' active' : '');
    ph.textContent = 'Foto\n' + (i + 1);
    ph.addEventListener('click', () => mcGoTo(i));
    return ph;
}

function mcGoTo(index) {
    if (index < 0 || index >= mcPhotos.length) return;
    const mainImg     = document.getElementById('mcMainImg');
    const placeholder = document.getElementById('mcPlaceholder');
    const curEl       = document.getElementById('mcCur');
    const thumbEls    = document.querySelectorAll('#mcThumbs .mc-thumb, #mcThumbs .mc-thumb-ph');
    thumbEls.forEach((t, i) => t.classList.toggle('active', i === index));
    if (curEl) curEl.textContent = index + 1;
    const src = mcPhotos[index];
    if (src) {
        mainImg.style.opacity = '0';
        mainImg.onload = () => { mainImg.style.opacity = '1'; };
        mainImg.onerror = () => { mainImg.style.display = 'none'; placeholder.style.display = 'flex'; };
        mainImg.style.display = 'block';
        placeholder.style.display = 'none';
        mainImg.src = src;
        if (mainImg.complete) { mainImg.style.opacity = '1'; }
    } else {
        mainImg.style.display = 'none';
        placeholder.style.display = 'flex';
    }
    mcCurrent = index;
    thumbEls[index]?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
}

function mcStartAutoplay() {
    mcStopAutoplay();
    mcTimer = setInterval(() => { mcGoTo((mcCurrent + 1) % mcPhotos.length); }, 3000);
}

function mcStopAutoplay() {
    if (mcTimer) { clearInterval(mcTimer); mcTimer = null; }
}

document.getElementById('mcPrev')?.addEventListener('click', () => { mcGoTo((mcCurrent - 1 + mcPhotos.length) % mcPhotos.length); mcStartAutoplay(); });
document.getElementById('mcNext')?.addEventListener('click', () => { mcGoTo((mcCurrent + 1) % mcPhotos.length); mcStartAutoplay(); });
document.getElementById('modalCustomer')?.addEventListener('mouseenter', mcStopAutoplay);
document.getElementById('modalCustomer')?.addEventListener('mouseleave', mcStartAutoplay);

let mcTouchX = 0;
document.getElementById('mcViewer')?.addEventListener('touchstart', e => { mcTouchX = e.touches[0].clientX; }, { passive: true });
document.getElementById('mcViewer')?.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - mcTouchX;
    if (Math.abs(dx) > 40) { mcGoTo(dx < 0 ? (mcCurrent + 1) % mcPhotos.length : (mcCurrent - 1 + mcPhotos.length) % mcPhotos.length); mcStartAutoplay(); }
}, { passive: true });

/* ── Color / Bestseller Detail Modal ── */
function initColorModal() {
    document.querySelectorAll('.color-item').forEach(item => {
        item.addEventListener('click', () => openDetailModal(item));
    });
}

function openDetailModal(item) {
    const series     = item.dataset.series    || '';
    const colorName  = item.dataset.colorName || '';
    const price      = item.dataset.price     || '';
    const packageStr = item.dataset.package   || '';
    const image      = item.dataset.image     || '';
    const photosRaw  = item.dataset.photos    || '[]';
    document.getElementById('modalImg').src             = image;
    document.getElementById('modalImg').alt             = colorName;
    document.getElementById('modalSeries').textContent  = series;
    document.getElementById('modalColor').textContent   = colorName;
    document.getElementById('modalPrice').textContent   = price;
    const list = document.getElementById('modalPkg');
    list.innerHTML = '';
    packageStr.split(' + ').forEach(pkg => {
        const li = document.createElement('li');
        li.textContent = pkg.trim();
        list.appendChild(li);
    });
    const key = buatCalendarKey(series, colorName);
    document.getElementById('btnKalender').onclick = () => bukaKalender(key);
    let photos = ['','','','',''];
    try { photos = JSON.parse(photosRaw); } catch(e) {}
    while (photos.length < 5) photos.push('');
    buildModalCustomer(photos);
    document.getElementById('detailModal').classList.add('open');
    document.body.classList.add('no-scroll');
}

function initModalClose() {
    const detailModal = document.getElementById('detailModal');
    const calModal    = document.getElementById('calModal');
    document.getElementById('modalClose')?.addEventListener('click', closeDetailModal);
    document.getElementById('calClose')?.addEventListener('click', closeCalModal);
    detailModal?.addEventListener('click', e => { if (e.target === detailModal) closeDetailModal(); });
    calModal?.addEventListener('click',    e => { if (e.target === calModal)    closeCalModal(); });
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') { closeDetailModal(); closeCalModal(); }
    });
}

function closeDetailModal() {
    mcStopAutoplay();
    document.getElementById('detailModal')?.classList.remove('open');
    document.body.classList.remove('no-scroll');
}

/* ── Google Calendar ── */
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

function buatCalendarKey(series, colorName) {
    const s = series.replace(/\s*series\s*/i, '').trim();
    return (s + '-' + colorName).toLowerCase().replace(/\s+/g, '-');
}

function bukaKalender(key) {
    const calId = KALENDER_MAP[key];
    if (!calId) { console.warn('Kalender tidak ditemukan:', key); return; }
    const src = `https://calendar.google.com/calendar/embed?src=${encodeURIComponent(calId)}&ctz=Asia%2FJakarta&mode=MONTH&showTitle=0&showNav=1&showPrint=0&showTabs=0&showCalendars=0&showTz=0`;
    document.getElementById('calFrame').src = src;
    document.getElementById('calModal').classList.add('open');
}

function closeCalModal() {
    document.getElementById('calModal')?.classList.remove('open');
    document.getElementById('calFrame').src = '';
}

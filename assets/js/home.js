/* =============================================================
   NAULI ATTIRE — Homepage
   Butuh data.js dan main.js dimuat lebih dulu.

   Isi: preloader · slideshow hero · daftar series · foto customer · formulir booking
   ============================================================= */
(function () {
'use strict';
const { KONTAK, SERIES, ITEMS, pad, esc, waLink } = window.NAULI;
const $  = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;


/* ── PRELOADER 0% → 100% (sekali per sesi) ─────────────────── */
const revealHero = () => $$('.hero .split').forEach(el => el.classList.add('in'));
const loader = $('#loader');
if (loader) {
  let seen = false;
  try { seen = sessionStorage.getItem('na-seen') === '1'; sessionStorage.setItem('na-seen', '1'); } catch (e) {}
  const done = () => { loader.remove(); document.body.classList.remove('is-loading'); revealHero(); };

  if (seen || reduce) done();
  else {
    const num = $('#loaderNum'), bar = $('#loaderBar'), start = performance.now(), DUR = 1400;
    const step = now => {
      const p = Math.min(1, (now - start) / DUR), e = 1 - Math.pow(1 - p, 3);
      num.textContent = Math.round(e * 100) + '%';
      bar.style.transform = `scaleX(${e})`;
      if (p < 1) return requestAnimationFrame(step);
      setTimeout(() => {
        loader.classList.add('done');
        document.body.classList.remove('is-loading');
        revealHero();
        setTimeout(() => loader.remove(), 1000);
      }, 180);
    };
    requestAnimationFrame(step);
  }
} else revealHero();


/* ── HERO: slideshow foto + garis progres ───────────────────── */
const slides = $$('.hs');
if (slides.length) {
  const bar = $('#heroBar'), cap = $('#heroCap'), num = $('#heroNum'), DUR = 5500;
  let cur = 0, t0 = performance.now();
  const show = i => {
    slides[cur].classList.remove('on');
    cur = (i + slides.length) % slides.length;
    slides[cur].classList.add('on');
    cap.textContent = slides[cur].dataset.cap;
    num.textContent = `${pad(cur + 1)} / ${pad(slides.length)}`;
    t0 = performance.now();
  };
  const tick = now => {
    const p = Math.min(1, (now - t0) / DUR);
    bar.style.transform = `scaleX(${p})`;
    if (p >= 1 && !reduce) show(cur + 1);
    requestAnimationFrame(tick);
  };
  show(0);
  requestAnimationFrame(tick);
  $('.hero').addEventListener('click', e => { if (!e.target.closest('a, button')) show(cur + 1); });
}


/* ── SERIES: daftar 6 series + foto mengikuti kursor ───────── */
const idx = $('#idx');
if (idx) {
  idx.insertAdjacentHTML('beforeend', Object.entries(SERIES).map(([k, s], i) => {
    const its = ITEMS.filter(x => x.s === k);
    const min = Math.min(...its.map(x => x.price));
    const nw = its.filter(x => x.isNew).length;
    const cover = (its.find(x => x.fav) || its.find(x => !x.isNew) || its[0]).img;
    return `<a class="idx-row" href="katalog.html?series=${k}" data-img="${cover}">
      <span class="no">${pad(i + 1)}</span><span class="nm">${s.name}</span>
      <span class="meta m1">${pad(its.length)} Warna${nw ? ` · ${nw} Baru` : ''}</span>
      <span class="meta m2">Mulai ${min}K</span>
      <span class="go">Lihat →</span></a>`;
  }).join(''));

  const pv = $('#preview'), pvImg = pv && $('img', pv);
  if (pv && matchMedia('(hover:hover)').matches) {
    let x = 0, y = 0, cx = 0, cy = 0, raf;
    const follow = () => {
      cx += (x - cx) * .18; cy += (y - cy) * .18;
      pv.style.left = cx + 'px'; pv.style.top = cy + 'px';
      raf = requestAnimationFrame(follow);
    };
    idx.addEventListener('mousemove', e => { x = e.clientX; y = e.clientY; });
    $$('.idx-row', idx).forEach(row => row.addEventListener('mouseenter', e => {
      pvImg.src = row.dataset.img;
      x = cx = e.clientX; y = cy = e.clientY;
      pv.classList.add('on');
      cancelAnimationFrame(raf); follow();
    }));
    idx.addEventListener('mouseleave', () => { pv.classList.remove('on'); cancelAnimationFrame(raf); });
    pvImg.addEventListener('error', () => pv.classList.remove('on'));
  }
}


/* ── FOTO CUSTOMER (dari image/foto-customer/…) ────────────── */
const gram = $('#gram');
if (gram) {
  const pool = [...ITEMS.filter(i => i.fav).sort((a, b) => a.fav - b.fav), ...ITEMS.filter(i => !i.fav && !i.isNew)];
  const shots = [];
  [0, 1].forEach(n => pool.forEach(it => shots.push({ src: it.photos[n], label: `${it.series} ${it.color}` })));
  gram.innerHTML = shots.slice(0, 15).map(p =>
    `<a href="https://instagram.com/${KONTAK.ig}" target="_blank" rel="noopener"><img src="${p.src}" alt="Customer memakai ${esc(p.label)}" loading="lazy"><span>${esc(p.label)}</span></a>`
  ).join('');
  let left = gram.children.length;
  $$('img', gram).forEach(img => img.addEventListener('error', () => {
    img.parentElement.remove();
    if (--left === 0) $('#customer')?.remove();   // belum ada foto sama sekali → section disembunyikan
  }, { once: true }));
}


/* ── FORMULIR BOOKING → WhatsApp ───────────────────────────── */
const form = $('#bookForm');
const sel = $('#fKebaya');
if (sel) sel.insertAdjacentHTML('beforeend', Object.entries(SERIES).map(([k, s]) =>
  `<optgroup label="${s.name}">${ITEMS.filter(i => i.s === k).map(i => `<option>${s.name} – ${esc(i.color)}</option>`).join('')}</optgroup>`
).join(''));

form?.addEventListener('submit', e => {
  e.preventDefault();
  const f = new FormData(form);
  const tgl = f.get('tanggal')
    ? new Date(f.get('tanggal') + 'T00:00').toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
    : '-';
  const msg = [
    'Halo Nauli Attire, saya ingin booking kebaya.', '',
    `Nama: ${f.get('nama') || '-'}`,
    `Tanggal acara: ${tgl}`,
    `Kebaya: ${f.get('kebaya') || 'Belum memilih'}`,
    `Acara: ${f.get('acara') || '-'}`,
    `Catatan: ${f.get('catatan') || '-'}`, '',
    'Apakah tersedia?',
  ].join('\n');
  window.open(waLink(msg), '_blank', 'noopener');
});
})();
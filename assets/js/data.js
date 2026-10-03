/* =============================================================
   NAULI ATTIRE — DATA
   Satu-satunya file yang perlu diubah untuk menambah / mengubah kebaya,
   harga, atau kalender ketersediaan. Homepage & katalog ikut berubah.
   ============================================================= */
(function () {
'use strict';

/* ── KONTAK ─────────────────────────────────────────────────── */
const KONTAK = {
  wa: '6287777812020',          // nomor WhatsApp (format 62…)
  ig: 'attirebynauli_',
};

/* ── SERIES ─────────────────────────────────────────────────────
   Urutan di sini = urutan tampil di website.
   ld   : ukuran Lingkar Dada (kosongkan jika belum ada)
   veil : jenis veil di paket
   desc : satu kalimat di halaman katalog */
const SERIES = {
  edita:   { name: 'Edita',   ld: 'LD 98 max 105',  veil: 'Veil/Ceruti Lepas Pasang', desc: 'Siluet klasik dengan payet rapat dan veil/ceruti lepas pasang.' },
  calla:   { name: 'Calla',   ld: 'LD 98 max 105',  veil: 'Veil/Ceruti Lepas Pasang', desc: 'Palet hangat dan kalem, cocok untuk wisuda dan lamaran.' },
  shreya:  { name: 'Shreya',  ld: '',               veil: 'Veil Lepas Pasang',        desc: 'Warna tegas dengan detail payet berlapis.' },
  aurora:  { name: 'Aurora',  ld: '',               veil: 'Veil Lepas Pasang',        desc: 'Satu warna mahogany yang dalam dan berkarakter.' },
  elysian: { name: 'Elysian', ld: 'LD 100 max 115', veil: 'Veil Lepas Pasang',        desc: 'Ukuran lebih longgar, warna lembut dan modern.' },
  alanya:  { name: 'Alanya',  ld: 'LD 94 max 98',   veil: 'Veil Lepas Pasang',        desc: 'Series terlengkap — tujuh warna dari pastel hingga burgundy.' },
};

/* ── KELUARGA WARNA (filter "Warna" di katalog) ─────────────── */
const FAMILIES = {
  pink: 'Pink', nude: 'Nude & Cream', merah: 'Merah & Burgundy', biru: 'Biru',
  hijau: 'Hijau', kuning: 'Kuning', netral: 'Coklat & Abu',
};

/* ── KEBAYA ─────────────────────────────────────────────────────
   Satu baris = satu kebaya:
   ['series', 'Nama Warna', harga (ribu), '#kodeWarna', 'keluarga', { opsi }]

   opsi (boleh dikosongkan):
     new: true   → label "Baru" + tampil di "Koleksi Baru"
     fav: 1..n   → urutan di "Foto customer" homepage
     slug: '…'   → jika nama file foto berbeda dari nama warna

   Nama file foto mengikuti nama warna (huruf kecil, spasi → "-"):
     Foto produk  : image/<series>/<series>-<warna>.png
                    contoh: image/alanya/alanya-rose-pink.png
     Foto customer: image/foto-customer/<series>-<warna>/1.jpeg … 5.jpeg */
const KEBAYA = [
  ['alanya',  'Burgundy',       400, '#6B1E2B', 'merah',  { new: true }],
  ['alanya',  'Rose Pink',      400, '#D98A9B', 'pink',   { new: true }],
  ['edita',   'Blush Pink (2)', 350, '#E7B7BC', 'pink',   { new: true, slug: 'blush-pink-2' }],
  ['edita',   'Creamy Nude',    350, '#E3CDB5', 'nude',   { fav: 1 }],
  ['edita',   'Blush Pink',     350, '#EDC0C2', 'pink',   { fav: 3 }],
  ['edita',   'Navy',           350, '#1F2A4A', 'biru'],
  ['edita',   'Nude Pink',      350, '#DDB3A7', 'pink'],
  ['edita',   'Emerald Blue',   350, '#11605E', 'hijau'],
  ['calla',   'Caramel',        350, '#A8703F', 'netral', { fav: 2 }],
  ['calla',   'Grey',           350, '#9A9A98', 'netral'],
  ['calla',   'Ice Blue',       350, '#B9D3E2', 'biru'],
  ['calla',   'Maroon',         350, '#5E1A22', 'merah'],
  ['shreya',  'Burgundy',       350, '#701C30', 'merah'],
  ['shreya',  'Ice Blue',       350, '#BED6E4', 'biru'],
  ['aurora',  'Mahogany',       350, '#5A2A1E', 'netral'],
  ['elysian', 'Baby Pink',      390, '#F2C6D0', 'pink'],
  ['elysian', 'Blue Denim',     390, '#5C7AA6', 'biru'],
  ['elysian', 'Mauve',          350, '#A7809A', 'pink'],
  ['alanya',  'Blush Pink',     400, '#EBBCC0', 'pink',   { fav: 4 }],
  ['alanya',  'Rose Gold',      400, '#C99A86', 'nude'],
  ['alanya',  'Butter Yellow',  390, '#EFD98F', 'kuning'],
  ['alanya',  'Creamy Nude',    390, '#E6D2BC', 'nude'],
  ['alanya',  'Emerald',        350, '#155E4A', 'hijau'],
];

/* ── KALENDER KETERSEDIAAN (Google Calendar) ───────────────────
   Kunci = <series>-<warna> (sama dengan nama folder foto customer).
   Jika kosong, tombol berubah menjadi "Tanya Ketersediaan" via WhatsApp. */
const KALENDER = {
  'edita-creamy-nude':    '08b43e9e55f01fe0a4caf90e3174be5e2513f908efd0c6b2ffb0d48a0545c92e@group.calendar.google.com',
  'edita-blush-pink':     'a4caa7eaaddf0459f1970c869ef4e71689dc49ac929325df880b3db3e594229b@group.calendar.google.com',
  'edita-blush-pink-2':   'dd45bd4632aeb75d02e384a285401e1cc60cf13298f629f14f7f6471a8c9e162@group.calendar.google.com',
  'edita-navy':           'f45eedd13134fa255816d3a6dfacf5ae9b98e926007df96cc4440e959d07ffca@group.calendar.google.com',
  'edita-nude-pink':      '77d0d1735cd66081e7b747bbe8b783593cbf7dc1c4bae285a71df150a6ec95c2@group.calendar.google.com',
  'edita-emerald-blue':   '4e1c2165072a657abff5578af8ef9885e40ec06eb0915e00fb3e63d1a8e08d44@group.calendar.google.com',
  'calla-caramel':        'bdc61e52602fd7d6d3045d446b9a0321a8aed4521c295f07b3111b8edd76d0a6@group.calendar.google.com',
  'calla-grey':           'aec3261c1d9087836c7949e3852db359ee68234feecdc129c0cc147f093e0dfb@group.calendar.google.com',
  'calla-ice-blue':       '7eb7efac902ab9dbeda69885ec9e61ce872a4218dcffa915aebcee41a71b0831@group.calendar.google.com',
  'calla-maroon':         '1576b7a37c32e87928d73c9916d4fd7cada5cb7f02c982e767eb53b61850f4f7@group.calendar.google.com',
  'shreya-burgundy':      'aa68f11602f4299ef5fda5d4747c2ec4d027df00df475f5a21e300b193e92612@group.calendar.google.com',
  'shreya-ice-blue':      '219566b322fb300d396e11ec6196da34319f6a2a5b8867fcb4fe8aba4ca91b94@group.calendar.google.com',
  'aurora-mahogany':      '827d320dd5cbbcb303a8dfc695cc2a794e248fad40e04f56c9277da941419ec3@group.calendar.google.com',
  'elysian-baby-pink':    'a5905a2c1e0181b23a31b110fbb2000f64681d364af300bcbe73e3c45487c1a9@group.calendar.google.com',
  'elysian-blue-denim':   'b07f85d671d3672083813bd19853072fa91841c15ccc3abadd9449745fe8dbcb@group.calendar.google.com',
  'elysian-mauve':        '43080ed42c35fc912329ab9c5c50ee42cfd4df962861342a2b05086b08203a9a@group.calendar.google.com',
  'alanya-burgundy':      'f4dd9151bdaf84085ccab097c72e607d62e1d6ce3496d72ad0c88620c2d0bf8e@group.calendar.google.com',
  'alanya-rose-pink':     '7002be01e85af5540289a73b0a0cca8f25c7348104b986e19e993f60c80b1058@group.calendar.google.com',
  'alanya-blush-pink':    'df1b73d3b55df935ce1c99967cabbaacb418a5d9f2a625a5e214ad7910329bf2@group.calendar.google.com',
  'alanya-rose-gold':     '6f9756410114f3a8dfb53fc36521d30eeef5cfa93a6dd3aed5f8edf8d52d6436@group.calendar.google.com',
  'alanya-butter-yellow': '9cee55c933d247c1fc09a0af2fffdc46d852d6a66090f86d9e2b734fe11e9878@group.calendar.google.com',
  'alanya-creamy-nude':   '086a6094dca451350eae678bcf7d068469198045d37c6c0bc71242a0716b53c1@group.calendar.google.com',
  'alanya-emerald':       '1e346e7d111fe9f23a2a46d55f6fb97048442448e12522d9846ab4f64d88bcea@group.calendar.google.com',
};


/* ── (tidak perlu diubah) menyusun data lengkap tiap kebaya ─── */
const ITEMS = KEBAYA.map(([s, color, price, hex, fam, o = {}], id) => {
  const ser = SERIES[s];
  const slug = o.slug || color.toLowerCase().replace(/[()]/g, '').trim().replace(/\s+/g, '-');
  const key = `${s}-${slug}`;
  return {
    id, s, key, color, price, hex, fam,
    series: ser.name,
    ld: ser.ld,
    isNew: !!o.new,
    fav: o.fav || 0,
    priceTxt: 'Rp ' + (price * 1000).toLocaleString('id-ID'),
    img: `image/${s}/${key}.png`,
    photos: [1, 2, 3, 4, 5].map(n => `image/foto-customer/${key}/${n}.jpeg`),
    pkg: [ser.ld, 'Kebaya Full Payet', 'Rok Songket', 'Hijab', 'Manset', 'Long torso', 'Ciput Tile', ser.veil, 'Free laundry', 'Free Resize'].filter(Boolean),
    cal: KALENDER[key] || '',
  };
});

window.NAULI_DATA = { KONTAK, SERIES, FAMILIES, ITEMS };
})();
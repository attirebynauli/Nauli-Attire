# Nauli Attire — Website

Website sewa kebaya Nauli Attire: homepage (landing page) dan halaman katalog.
Tanpa framework dan tanpa proses build — hanya HTML, CSS, dan JavaScript biasa.

## Struktur folder

```
nauli-attire/
├── index.html              Homepage
├── katalog.html            Katalog (filter, cari, detail kebaya)
├── vercel.json             Keamanan + pengalihan link lama
├── README.md               Panduan ini
│
├── assets/
│   ├── css/
│   │   └── style.css       Semua tampilan (warna, huruf, layout)
│   └── js/
│       ├── data.js         ★ DATA: kebaya, harga, series, kalender, kontak
│       ├── main.js         Dipakai kedua halaman: kartu, menu, animasi, jendela detail
│       ├── home.js         Khusus homepage
│       └── katalog.js      Khusus katalog
│
├── image/                  Foto (tetap seperti sekarang)
│   ├── <series>/<series>-<warna>.png
│   └── foto-customer/<series>-<warna>/1.jpeg … 5.jpeg
│
└── favicon/                Ikon website (tetap seperti sekarang)
```

Urutan script di setiap halaman **harus** `data.js` → `main.js` → `home.js` / `katalog.js`.

## Yang paling sering diubah

| Ingin…                                 | File                    | Bagian                     |
|----------------------------------------|-------------------------|----------------------------|
| Tambah / hapus kebaya, ubah harga      | `assets/js/data.js`     | `KEBAYA = [ … ]`           |
| Isi ID Google Calendar                 | `assets/js/data.js`     | `KALENDER = { … }`         |
| Ubah ukuran LD / deskripsi series      | `assets/js/data.js`     | `SERIES = { … }`           |
| Ganti nomor WhatsApp (untuk pesan otomatis) | `assets/js/data.js` | `KONTAK`                 |
| Ubah warna / huruf                     | `assets/css/style.css`  | `:root { … }` paling atas  |
| Ubah teks homepage, FAQ, S&K           | `index.html`            | cari judul bagiannya       |
| Ganti foto hero / koleksi baru / momen | `index.html`            | cari nama file fotonya     |

> Nomor WhatsApp juga tertulis langsung di tombol-tombol `index.html` dan `katalog.html`
> (cari `wa.me/`). Jika nomor berganti, ubah di sana juga.

### Menambah kebaya baru
1. Upload foto produk: `image/<series>/<series>-<warna>.png`
   contoh `image/alanya/alanya-sage-green.png`
2. (Opsional) foto customer: `image/foto-customer/alanya-sage-green/1.jpeg` … `5.jpeg`
3. Tambah satu baris di `KEBAYA` pada `assets/js/data.js`:
   ```js
   ['alanya', 'Sage Green', 350, '#9CAF88', 'hijau', { new: true }],
   ```
   Urutan isi: series, nama warna, harga (ribu), kode warna, keluarga warna, opsi.
   Keluarga warna: `pink`, `nude`, `merah`, `biru`, `hijau`, `kuning`, `netral`.
4. (Opsional) tambahkan ID kalender di `KALENDER` dengan kunci `'alanya-sage-green'`.
   Jika kosong, tombol otomatis menjadi "Tanya Ketersediaan" lewat WhatsApp.

Homepage dan katalog ikut berubah otomatis.

## Mencoba di komputer
Buka terminal di folder ini, lalu jalankan:
```
npx serve .
```
Buka `http://localhost:3000` di browser.

## Upload ke Vercel
```
git add -A
git commit -m "Susun ulang file website"
git push
```

## Link lama tetap jalan
`koleksi/edita.html`, `koleksi/alanya.html`, dan seterusnya otomatis dialihkan ke
`katalog.html?series=…` (diatur di `vercel.json`). Link katalog bisa dibagikan sudah
terfilter, misalnya `katalog.html?series=alanya`, `katalog.html?warna=pink`, `katalog.html?baru=1`.

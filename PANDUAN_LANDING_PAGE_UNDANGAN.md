# Panduan Pembuatan Landing Page Undangan Pernikahan Adat Jawa

Dokumen ini menjelaskan cara membuat landing page undangan digital berdasarkan desain PDF (`Undangan_pernikahan_adat_jawa_...pdf`) dan paket aset (`assets.rar`). Setiap bagian menyebutkan **aset mana yang dipakai di mana**, aset mana yang **dihapus**, dan aset mana yang **perlu diperbaiki**.

---

## 1. Ringkasan Proyek

| Item | Keterangan |
|---|---|
| Jenis | Landing page satu halaman (single page), undangan pernikahan digital |
| Tema | Adat Jawa: krem, cokelat tua, emas; ornamen gunungan, wayang, batik |
| Mempelai | M. Solihin & Naila Nur Ayna |
| Tanggal | Jumat, 25 Mei 2029 |
| Acara | Akad Nikah 08.00 WIB, Resepsi 10.00 WIB, Kediaman mempelai wanita, Jl. Anggur no.10 |
| Perangkat utama | Ponsel (mobile-first). Di layar lebar, undangan tampil sebagai kolom tengah |
| Teknologi disarankan | HTML + CSS + JavaScript biasa, tanpa framework |

Desain terdiri dari **6 layar**. Tiap layar menjadi satu `<section>` setinggi layar (`min-height: 100svh`).

| No | Layar | Isi singkat |
|---|---|---|
| 1 | Cover | Gunungan, judul, tanggal, nama tamu, tombol Buka Undangan |
| 2 | Mempelai (hero) | Ilustrasi pasangan, monogram S & N, nama, tanggal |
| 3 | Undangan | Salam, kata pengantar, nama mempelai dan orang tua |
| 4 | Acara | Akad Nikah, Resepsi, hitung mundur |
| 5 | Ayat | Q.S. An-Nur: 32 |
| 6 | Penutup | Ucapan terima kasih, salam penutup |

---

## 2. Struktur Folder yang Disarankan

```
undangan/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── main.js
└── assets/
    ├── img/        ← gambar WebP hasil konversi (lihat bagian 9)
    ├── svg/        ← SVG ringan yang dipertahankan
    └── audio/      ← musik latar (opsional, belum ada)
```

---

## 3. Desain Dasar (Design Tokens)

### Warna (diambil dari PDF)

| Nama | Hex | Dipakai untuk |
|---|---|---|
| Krem (latar) | `#F6E9D4` | Latar semua layar |
| Cokelat tua | `#4B2809` | Judul "The Wedding Of", "Kepada Yth." |
| Cokelat tombol | `#5B3411` | Tombol Buka Undangan |
| Emas | `#B4781B` | Nama mempelai di cover, nama tamu, kotak hitung mundur, referensi ayat |
| Hijau tua | sekitar `#1F4A2B` (perkiraan, cocokkan dengan PDF) | Teks isi pada layar 3 sampai 6 |

Aturan: **jangan menambah warna lain**. Seluruh warna cukup dari tabel di atas.

### Huruf

Font di PDF dibuat di Canva, sehingga sebagian berbayar. Berikut padanan yang gratis di Google Fonts.

| Font di PDF | Dipakai untuk | Pakai di web |
|---|---|---|
| Boston Angel Light | Judul besar ("The Wedding Of", "Solihin & Naila", "M. Solihin") | **Cormorant Garamond** (Light/Medium) |
| Alex Brush | Nama bergaya tulisan tangan dan monogram "S & N" (layar 2) | **Alex Brush** (sama persis) |
| TAN Angleton | Judul "Akad Nikah" dan "Resepsi" | **Pinyon Script** |
| Caslon 540 | Paragraf pada layar 3 dan 6 | **Libre Caslon Text** |
| Montserrat | Detail acara (tanggal, jam, alamat) | **Montserrat** (sama persis) |
| Poppins Italic | Terjemahan ayat | **Poppins** italic (sama persis) |
| TeX Gyre Termes | Angka hitung mundur, tulisan tombol | **Tinos** (mirip Times) |
| Palatino Arabic / Noto Sans Arabic | Teks Arab ayat | **Amiri** |
| Kief Tek | Salam Arab ("Assalamu'alaikum...") | **Amiri** (tebal) |

### Tata letak umum

- Lebar kolom: `min(100vw, 480px)`, rata tengah. Di luar kolom (layar laptop), pakai warna cokelat gelap polos.
- Semua ornamen sudut memakai `position: absolute`, `pointer-events: none`, dan diletakkan **di belakang teks** (`z-index` lebih rendah).
- Sudut kanan dibuat dengan **membalik sudut kiri** (`transform: scaleX(-1)`). Tidak perlu aset terpisah.

```css
.sudut { position: absolute; pointer-events: none; }
.sudut--atas-kiri    { top: 0;    left: 0;  width: 40%; }
.sudut--atas-kanan   { top: 0;    right: 0; width: 40%; transform: scaleX(-1); }
.sudut--bawah-kiri   { bottom: 0; left: 0;  width: 45%; }
.sudut--bawah-kanan  { bottom: 0; right: 0; width: 45%; transform: scaleX(-1); }
```

---

## 4. Daftar Aset dan Statusnya

Isi `assets.rar` ternyata **campur aduk**: ada yang dipakai di desain, ada yang tidak, ada duplikat, dan ada yang sangat berat. Hasil pemeriksaannya:

### 4.1 Dipakai di desain

| File asli | Isi sebenarnya | Nama baru | Dipakai di |
|---|---|---|---|
| `7.svg` | **Dua gambar dalam satu file**: sudut atas cokelat (ukiran gunungan) dan sudut bawah (wayang, batik, awan emas) | `sudut-atas.webp` dan `sudut-bawah-wayang.webp` | Layar 1 sampai 6 (pojok atas dan bawah) |
| `wayang.svg` | Gunungan emas | `gunungan.svg` | Layar 1, tengah atas |
| `10.svg` | Dua tokoh chibi **terpisah**: pria (beskap krem, blangkon) dan wanita (kebaya krem, hijab) | `mempelai-pria.webp` dan `mempelai-wanita.webp` | Layar 2 |
| `9.svg` | Ornamen empat daun kecil | `ornamen-empat-daun.webp` | Layar 3, di kiri dan kanan tanda "&" |
| `11.svg` | Garis dengan hiasan di tengah | `garis-hiasan.webp` | Layar 1 (atas dan bawah judul), layar 3 (atas dan bawah) |
| `Garis Ornamen.svg` | Garis tipis dengan berlian di tengah | `garis-berlian.webp` | Layar 1 (atas dan bawah tanggal), layar 4 (pemisah antara Akad dan Resepsi) |
| `Garis Ornamne.svg` | Hiasan sulur emas lebar | `garis-bunga.svg` | Layar 4 (di bawah judul "Akad Nikah" dan "Resepsi"), layar 6 (atas dan bawah teks) |

> Kecocokan ketiga aset garis dengan desain adalah perkiraan dari bentuknya. Bila hasilnya kurang mirip dengan PDF, tukar satu sama lain.

### 4.2 Opsional (tidak ada di desain, tetapi berguna bila ingin ditambah)

| File asli | Isi | Nama baru | Saran pemakaian |
|---|---|---|---|
| `bunga (1).svg` | Bunga mandala emas | `bunga-emas.webp` | Latar samar (opacity 8 sampai 12 persen) yang berputar sangat pelan di belakang pasangan pada layar 2 |
| `Sudut Orname.svg` | Sudut bingkai emas | `bingkai-sudut.svg` | Bingkai kartu bila menambah bagian baru (misalnya ucapan atau amplop digital) |
| `Anak Panah (1).svg` | Panah gaya ikon navigasi | `ikon-navigasi.svg` | Ikon pada tombol "Lihat Lokasi" |
| `Anak Panah (2).svg` | Panah ganda | `ikon-gulir.svg` | Petunjuk "gulir ke bawah" (diputar 90 derajat, bergerak naik turun) |
| `fauzan-aisyah.jpg` | Foto sepasang pengantin (663 x 828 px) | `foto-prewedding.jpg` | Bagian galeri tambahan. **Lihat peringatan di bawah** |

> **Peringatan foto:** nama file menyebut **"Fauzan" dan "Aisyah"**, bukan Solihin dan Naila, dan pada bagian atas foto tampak tulisan kecil seperti tanda air. Foto ini kemungkinan hanya contoh bawaan templat. Ganti dengan foto mempelai yang sebenarnya, atau jangan dipakai.
> Resolusinya juga terbatas, jadi tampilkan sebagai foto berukuran sedang (maksimal sekitar 330 px lebar di ponsel).

### 4.3 Dihapus

| File | Alasan |
|---|---|
| `bunga (2).svg` | Tampak identik dengan `bunga (1).svg`. Duplikat, dan berukuran 18,8 MB |
| `8.svg` | Fungsinya sama dengan `Anak Panah (1).svg`, hanya ditambah garis tepi putih |
| `Sudut Ornamen (2).svg` | Mirip `Sudut Orname.svg`, tetapi lima kali lebih berat (788 KB) |
| `Sudut ornamen.svg` | Berwarna hitam, tidak cocok dengan palet krem, cokelat, dan emas |
| `navbar ornmae.svg` | Berwarna hitam, dan desain tidak memiliki bilah navigasi |
| `Ornamen Biasa.svg` | Hanya satu helai sulur, tidak ada tempat yang pas di desain |

---

## 5. Penjelasan Per Layar

Prinsip umum: urutan lapisan dari belakang ke depan adalah **latar krem, ornamen sudut, garis dan hiasan, teks**.

### Layar 1: Cover

**Tujuan:** layar penuh yang menutupi seluruh undangan sampai tombol ditekan.

| Elemen | Isi dan aset | Posisi |
|---|---|---|
| Sudut atas kiri dan kanan | `sudut-atas.webp` (kanan dibalik) | Pojok atas, lebar sekitar 40% |
| Gunungan | `gunungan.svg` | Tengah atas, lebar sekitar 20% |
| Hiasan | `garis-hiasan.webp` | Di atas judul |
| Garis | `garis-berlian.webp` | Di atas dan di bawah blok judul |
| Judul | "The Wedding Of" (cokelat tua), "Solihin & Naila" (emas, ukuran paling besar), "25-05-2029" (hitam atau cokelat tua) | Tengah layar |
| Hiasan bawah | `garis-hiasan.webp` | Di bawah blok tanggal |
| Penerima | "Kepada Yth." (cokelat tua, tebal), nama tamu (emas) | Bagian bawah, di atas tombol |
| Tombol | "BUKA UNDANGAN", latar `#5B3411`, teks krem, huruf kapital, sudut membulat penuh | Bawah tengah |
| Sudut bawah kiri dan kanan | `sudut-bawah-wayang.webp` (kanan dibalik) | Pojok bawah, lebar sekitar 45% |

**Perilaku:**
1. Saat halaman dimuat, kunci gulir (`body { overflow: hidden }`).
2. Nama tamu diambil dari alamat, misalnya `undangan.com/?to=Budi+Santoso`. Bila tidak ada, tampilkan "Nama Tamu".
3. Saat tombol ditekan: cover bergeser ke atas (`translateY(-100%)`, sekitar 0,9 detik), gulir dibuka, dan musik latar mulai (bila ada). Pemutaran audio hanya diizinkan peramban setelah ada ketukan pengguna, dan tombol ini sudah memenuhinya.

```js
const nama = new URLSearchParams(location.search).get('to');
if (nama) document.querySelector('#nama-tamu').textContent = nama; // textContent, bukan innerHTML
```

### Layar 2: Mempelai (hero)

| Elemen | Isi dan aset |
|---|---|
| Sudut | `sudut-atas.webp` dan `sudut-bawah-wayang.webp` (sama seperti layar 1) |
| Monogram | "S & N" memakai font Alex Brush, cokelat tua, di bagian atas tengah. **Berupa teks, bukan gambar** |
| Pasangan | `mempelai-pria.webp` di kiri dan `mempelai-wanita.webp` di kanan, saling berdekatan, lebar gabungan sekitar 47% layar, di tengah vertikal |
| Latar samar (opsional) | `bunga-emas.webp` di belakang pasangan, opacity rendah, berputar pelan |
| Teks bawah | "The Wedding Of" (cokelat tua), "Solihin & Naila" (Alex Brush, emas), "25-05-2029" (emas, huruf tebal) |

Karena pria dan wanita adalah dua gambar terpisah, keduanya dapat **masuk dari sisi masing-masing lalu bertemu di tengah** saat layar ini terlihat.

### Layar 3: Undangan

| Elemen | Isi dan aset |
|---|---|
| Garis atas | `garis-hiasan.webp` |
| Salam | السَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللَّهِ وَبَرَكَاتُهُ |
| Pengantar | "Dengan penuh rasa syukur kepada Tuhan Yang Maha Esa, kami mengundang Bapak/Ibu/Saudara/i untuk hadir dan memberikan doa restu pada acara pernikahan putra-putri kami:" |
| Mempelai pria | **M. Solihin** (besar), "Putra Bapak Ishaq & Ibu Nina" |
| Pemisah | Tanda **&** (besar). `ornamen-empat-daun.webp` di kiri dan kanan, sisi kanan dibalik |
| Mempelai wanita | **Naila Nur Ayna** (besar), "Putri Bapak Anam & Ibu Rani" |
| Penutup | "Merupakan kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu." |
| Garis bawah | `garis-hiasan.webp` |
| Sudut | Sama seperti layar 1 |

### Layar 4: Acara dan hitung mundur

| Elemen | Isi dan aset |
|---|---|
| Judul 1 | "Akad Nikah" (Pinyon Script, cokelat tua, besar) + `garis-bunga.svg` di bawahnya |
| Detail 1 | Jumat, 25 Mei 2029 / Pukul 08.00 WIB / Kediaman mempelai wanita / Jl. Anggur no.10 |
| Pemisah | `garis-berlian.webp` |
| Judul 2 | "Resepsi" + `garis-bunga.svg` di bawahnya |
| Detail 2 | Jumat, 25 Mei 2029 / Pukul 10.00 WIB / Kediaman mempelai wanita / Jl. Anggur no.10 |
| Hitung mundur | Empat kotak membulat berlatar emas `#B4781B`, teks putih: **Hari, Jam, Menit, Detik** |
| Tombol lokasi (opsional) | "Lihat Lokasi" + `ikon-navigasi.svg` (butuh tautan Google Maps) |
| Sudut | Sama seperti layar 1 |

Angka pada PDF (20 hari 23 jam 59 menit 30 detik) hanyalah contoh. Di web, angka dihitung otomatis:

```js
const target = new Date('2029-05-25T08:00:00+07:00'); // 08.00 WIB
function hitung() {
  let sisa = Math.max(0, target - Date.now());
  const hari  = Math.floor(sisa / 864e5);  sisa %= 864e5;
  const jam   = Math.floor(sisa / 36e5);   sisa %= 36e5;
  const menit = Math.floor(sisa / 6e4);
  const detik = Math.floor((sisa % 6e4) / 1e3);
  // tulis ke empat kotak (hari, jam, menit, detik)
}
setInterval(hitung, 1000); hitung();
```

### Layar 5: Ayat

| Elemen | Isi |
|---|---|
| Teks Arab | Q.S. An-Nur: 32, font Amiri, warna emas, rata tengah |
| Terjemahan | Poppins italic, hijau tua |
| Sumber | "Q.S An-Nur: 32" (emas, huruf tebal) |
| Sudut | Sama seperti layar 1 |

**Teks pada PDF perlu dikoreksi** (lihat bagian 7).

### Layar 6: Penutup

| Elemen | Isi dan aset |
|---|---|
| Garis atas dan bawah | `garis-bunga.svg` |
| Teks | "Terima kasih atas doa dan kehadiran Bapak/Ibu/Saudara/i. Semoga Allah SWT membalas segala kebaikan dan memberkahi kita semua." |
| Salam | وَالسَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللَّهِ وَبَرَكَاتُهُ |
| Sudut | Sama seperti layar 1 |

---

## 6. Gerak dan Efek (Disarankan, Tetap Halus)

| Efek | Penerapan |
|---|---|
| Muncul saat digulir | Teks dan ornamen naik sedikit (sekitar 20 px) sambil memudar masuk, memakai `IntersectionObserver`, sekali saja |
| Gunungan | Turun pelan dari atas saat cover dibuka |
| Pasangan | Masuk dari kiri dan kanan, lalu berhenti berdekatan |
| Bunga emas (opsional) | Berputar sangat lambat, sekitar 60 detik per putaran |
| Efek 3D ringan (opsional) | Pasangan miring sedikit mengikuti gerak kursor atau sensor ponsel (`perspective` + `rotateX/Y`, maksimal sekitar 6 derajat) |
| Suara (opsional) | Musik latar dan bunyi kecil saat tombol Buka Undangan ditekan. Sediakan tombol mute melayang |

Wajib: hormati pengaturan `prefers-reduced-motion` (matikan animasi bila pengguna memintanya), dan hanya animasikan `transform` dan `opacity` agar tetap mulus di ponsel.

---

## 7. Koreksi Teks dari PDF

| Lokasi | Masalah | Perbaikan |
|---|---|---|
| Layar 5, teks Arab | Terpotong, dimulai dari tengah ayat ("عِبَادِكُمْ ...") | Tulis ayat penuh: وَاَنْكِحُوا الْاَيَامٰى مِنْكُمْ وَالصّٰلِحِيْنَ مِنْ عِبَادِكُمْ وَاِمَاۤىِٕكُمْۗ اِنْ يَّكُوْنُوْا فُقَرَاۤءَ يُغْنِهِمُ اللّٰهُ مِنْ فَضْلِهٖۗ وَاللّٰهُ وَاسِعٌ عَلِيْمٌ |
| Layar 5, terjemahan | Kata "memampukan" hilang: "Allah akan kemampuan mereka" | "Jika mereka miskin, Allah **akan memampukan** mereka dengan karunia-Nya." |
| Layar 3 | "Ishaq &Ibu Nina" kurang spasi setelah "&" | "Putra Bapak Ishaq & Ibu Nina" |
| Layar 4 | Penulisan "Jum'at" tidak baku | Bentuk baku menurut KBBI: "Jumat" (pilihan, sesuaikan selera) |

> Sebelum dipublikasikan, cocokkan teks Arab dan terjemahan ayat dengan sumber resmi (misalnya Qur'an Kemenag).

---

## 8. Hal yang Belum Ada dan Perlu Disiapkan

| Kebutuhan | Keterangan |
|---|---|
| Tautan Google Maps | Alamat hanya tertulis "Jl. Anggur no.10" tanpa kota. Perlu tautan peta bila ingin tombol lokasi |
| Foto mempelai | Pengganti `fauzan-aisyah.jpg` (bila galeri dipakai) |
| Musik latar | File audio `.mp3` (misalnya `assets/audio/musik.mp3`), bila ingin efek suara |
| Tekstur kertas | Latar pada PDF punya tekstur kertas yang sangat halus. Tidak ada asetnya. Cukup warna `#F6E9D4`, atau tambahkan tekstur sendiri dengan opacity rendah |
| Hosting | Hosting statis gratis sudah cukup (misalnya GitHub Pages, Netlify, Cloudflare Pages) |

---

## 9. Mengecilkan Aset yang Terlalu Berat

Beberapa SVG ternyata hanyalah **gambar PNG yang dibungkus SVG**, sehingga sangat berat dan tidak benar-benar vektor:

| File | Ukuran asli | Setelah dikonversi |
|---|---|---|
| `bunga (1).svg` | 18,9 MB | sekitar 170 KB |
| `7.svg` | 4,3 MB | sekitar 430 KB (dua file) |
| `10.svg` | 1,9 MB | sekitar 240 KB (dua file) |
| `9.svg`, `11.svg`, `Garis Ornamen.svg` | 22 sampai 62 KB | kurang dari 10 KB |

Total berkurang dari sekitar **25 MB menjadi kurang dari 1 MB**. Ini penting agar undangan terbuka cepat di ponsel dengan sinyal terbatas.

Skrip berikut (sudah diuji) mengekstrak gambar di dalam SVG tersebut, menggabungkan mask transparansinya, memangkas tepi kosong, lalu menyimpannya sebagai WebP dengan nama baru. SVG lain yang sudah ringan (`wayang.svg`, `Garis Ornamne.svg`, `Anak Panah`, dan `Sudut Orname.svg`) cukup **dinamai ulang dan disalin** ke `assets/svg/`.

Simpan sebagai `siapkan_aset.py`, lalu jalankan:

```
pip install pillow
python siapkan_aset.py assets assets_baru/img
```

```python
import base64, io, re, sys
from pathlib import Path
from PIL import Image

SRC, DST = Path(sys.argv[1]), Path(sys.argv[2])
DST.mkdir(parents=True, exist_ok=True)

# (file svg asli, lebar gambar di dalamnya) -> nama file baru
TARGET = {
    ("7.svg", 1212):             "sudut-atas.webp",
    ("7.svg", 1080):             "sudut-bawah-wayang.webp",
    ("10.svg", 409):             "mempelai-pria.webp",
    ("10.svg", 495):             "mempelai-wanita.webp",
    ("9.svg", 82):               "ornamen-empat-daun.webp",
    ("11.svg", 570):             "garis-hiasan.webp",
    ("Garis Ornamen.svg", 735):  "garis-berlian.webp",
    ("bunga (1).svg", 365):      "bunga-emas.webp",
}

pola = re.compile(r'xlink:href="data:image/png;base64,([^"]+)"')
for (nama_svg, lebar), nama_baru in TARGET.items():
    teks = (SRC / nama_svg).read_text(encoding="utf8")
    unik = {}
    for b64 in pola.findall(teks):
        im = Image.open(io.BytesIO(base64.b64decode(b64)))
        if im.width == lebar:
            unik.setdefault(im.mode, im.copy())   # 'L' = mask, 'RGB' = warna
    gambar = unik["RGB"].convert("RGBA")
    gambar.putalpha(unik["L"])
    gambar = gambar.crop(gambar.getchannel("A").getbbox())  # buang tepi kosong
    gambar.save(DST / nama_baru, "WEBP", quality=88, method=6)
    print(nama_baru, gambar.size)
```

---

## 10. Aturan Agar Hasil Rapi dan Tidak Terkesan "Template AI"

1. **Ikuti PDF.** Tata letak, urutan, dan teks mengikuti desain. Jangan menambah bagian yang tidak diminta.
2. **Hanya pakai aset di dokumen ini** untuk hiasan. Jangan membuat ornamen baru dari emoji, ikon bawaan, atau bentuk acak.
3. **Hanya tiga keluarga warna:** krem, cokelat, emas (ditambah hijau tua untuk teks isi). Tanpa gradasi ungu atau biru, tanpa kaca buram (glassmorphism), tanpa bayangan tebal.
4. **Tiap font punya satu peran** (lihat tabel huruf). Jangan memakai Inter, Roboto, atau Arial.
5. **Spasi lega.** Setiap layar boleh terasa "kosong". Itu memang gayanya.
6. **Gerak halus dan bermakna**, bukan semua elemen bergerak sekaligus.
7. **Teks sebagai teks** (bisa diseleksi dan dibaca pembaca layar), bukan dijadikan gambar.
8. Beri `alt=""` pada ornamen dekoratif, dan `alt` yang jelas pada gambar pasangan.
9. Uji di lebar 360, 390, dan 430 px, serta di laptop (kolom tengah 480 px).

---

## 11. Daftar Periksa Akhir

- [ ] Enam layar sesuai urutan PDF
- [ ] Cover mengunci gulir, lalu terbuka saat tombol ditekan
- [ ] `?to=` mengubah nama tamu, dan tulisan bawaan "Nama Tamu" muncul bila kosong
- [ ] Hitung mundur menuju 25 Mei 2029, 08.00 WIB, dan berhenti di nol
- [ ] Sudut kanan adalah cermin sudut kiri (bukan file terpisah)
- [ ] Ayat Arab lengkap dan terjemahan sudah dikoreksi
- [ ] Aset berstatus "Dihapus" sudah dihapus dari folder
- [ ] Total ukuran halaman di bawah sekitar 2 MB
- [ ] Foto `fauzan-aisyah.jpg` sudah diganti atau tidak dipakai
- [ ] Animasi mati bila `prefers-reduced-motion` aktif

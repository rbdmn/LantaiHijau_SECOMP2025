
<h1 align="center">
  <br>
  <a href="http://www.amitmerchant.com/electron-markdownify"><img src="https://github.com/user-attachments/assets/e2af3f5d-c40c-4016-bf81-e14cae7902b0" alt="LantaiHijau" width="200"></a>
  <br>
  LantaiHijau
  <br>
</h1>

<h4 align="center">Smart Planner Interaktif untuk Merancang, Merawat, dan Mencatat Hasil Panen Tanaman Pangan Indoor</h4>

<p align="center">
  <a href="#key-features">Fitur Utama</a> •
  <a href="#how-to-use">Panduang penggunaan</a> •
  <a href="#credits">Credits</a> •
  <a href="#related">Related</a> •
</p>

<img src="https://github.com/user-attachments/assets/1207a9d9-dce2-4df1-8aa5-c7b255a4b83b" height="1050" width="1050" />

## Fitur utama

* **Dashboard** : Pusat informasi hasil panen dan portal kebun virtual. Pengguna bisa membuat banyak kebun virtual (dengan input nama & ukuran), melihat To-Do List perawatan tanaman, dan hanya bisa diakses jika login.

* **Jurnal** : Catatan harian tanaman dengan tabel CRUD berisi nama tanaman, tanggal tanam & panen, catatan, dan foto.

* **Jelajahi Tanaman** : Daftar tanaman pangan dalam tabel interaktif dengan filter & search, klik nama tanaman untuk lihat detail.

* **Detail Tanaman** : Menampilkan info tanaman, panduan perawatan singkat, estimasi panen dari tanggal tanam, dan tombol tambah ke kebun virtual (hanya jika login).

* **Kebun Virtual** : Fitur utama untuk merancang kebun indoor secara grid dengan drag-and-drop pot/tanaman, pilihan warna, bayangan, dan detail tanaman per petak. Tombol “Panen” memindahkan tanaman ke menu Hasil Panen.

* **Hasil Panen** : Mencatat panen dari kebun virtual, mengisi kuantitas & harga, lalu menghitung otomatis total penghematan dibanding biaya modal.

## Panduan Penggunaan

Pastikan Anda telah menginstall:
- XAMPP atau web server lokal lainnya (untuk MySQL & PHP)
- Composer (untuk Laravel)
- Node.js (versi yang mendukung Next.js)
- Next.js v15.4.5 atau lebih

Setup Backend (Laravel)

Buka Command Prompt atau Terminal dan Jalankan perintah berikut:

```bash
# Git clone repo
git clone https://github.com/rbdmn/LantaiHijau_SECOMP2025.git 

# Masuk ke folder project, sesuaikan dengan nama folder projectnya
cd nama-folder-project

# Masuk ke folder backend Laravel:
cd backend-laravel

# Install dependencies Laravel:
composer install

# Jika Laravel Sanctum belum terinstall, jalankan:
composer require laravel/sanctum

# Salin file .env.example menjadi .env:
cp .env.example .env
```

Sesuaikan konfigurasi database di `.env`:
```bash
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=nama_database
DB_USERNAME=root
DB_PASSWORD=
```

Import database:
Buka phpMyAdmin di http://localhost/phpmyadmin

Buat database baru sesuai DB_DATABASE di `.env`

Import file SQL yang telah disediakan

Generate key Laravel:
```bash
# Generate key
php artisan key:generate

# Jalankan server Laravel:
php artisan serve
```

Setup Frontend (Next.js)

```bash
# Masuk ke folder frontend Next.js:
cd frontend

# Install dependencies:
npm install

# Sesuaikan file .env.local (jika ada) untuk API URL:
NEXT_PUBLIC_API_URL=http://localhost:8000

# Jalankan development server:
npm run dev
```

Akses Website
- Frontend (Next.js): http://localhost:3000
- Backend API (Laravel): http://localhost:8000
- phpMyAdmin: http://localhost/phpmyadmin

> **Note**
> If you're using Linux Bash for Windows, [see this guide](https://www.howtogeek.com/261575/how-to-run-graphical-linux-desktop-applications-from-windows-10s-bash-shell/) or use `node` from the command prompt.

## Credits

This software uses the following open source packages:

- [Electron](http://electron.atom.io/)
- [Node.js](https://nodejs.org/)
- [Marked - a markdown parser](https://github.com/chjj/marked)
- [showdown](http://showdownjs.github.io/showdown/)
- [CodeMirror](http://codemirror.net/)
- Emojis are taken from [here](https://github.com/arvida/emoji-cheat-sheet.com)
- [highlight.js](https://highlightjs.org/)

## Related

[Try Web version of Markdownify](https://notepad.js.org/markdown-editor/)

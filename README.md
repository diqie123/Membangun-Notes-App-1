# Notes App

Aplikasi Notes sederhana yang dibuat dengan JavaScript dan Webpack.

## Tentang Proyek

Proyek ini adalah aplikasi catatan sederhana yang memungkinkan pengguna untuk membuat dan menyimpan catatan. Aplikasi ini dibuat menggunakan JavaScript dan Webpack.

## Cara Menginstal dan Menjalankan

1. **Instal Dependensi**
   
   Folder `node_modules` sengaja tidak disertakan untuk mengurangi ukuran proyek. Untuk menginstal dependensi, jalankan perintah berikut:
   
   ```
   npm install
   ```
   
   atau
   
   ```
   npm ci
   ```
   
   untuk instalasi yang lebih konsisten berdasarkan package-lock.json.

2. **Menjalankan Aplikasi dalam Mode Pengembangan**
   
   ```
   npm start
   ```
   
   atau
   
   ```
   npm run start-dev
   ```
   
   Kedua perintah di atas akan menjalankan server pengembangan dan membuka aplikasi di browser. Perbedaannya adalah `npm run start-dev` secara eksplisit menjalankan dalam mode development.

3. **Build untuk Produksi**
   
   ```
   npm run prod
   ```
   
   Perintah ini akan membuat versi produksi dari aplikasi di folder `dist`.

## Struktur Proyek

- `src/` - Kode sumber aplikasi
  - `components/` - Komponen web
  - `data/` - Data aplikasi
  - `styles/` - File CSS
- `dist/` - Output build
- `package.json` - Konfigurasi dependensi dan skrip
- `webpack.config.js` - Konfigurasi Webpack
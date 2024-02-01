# Tahfidz Backend

Berikut ini step by step instalasi project tahfidz backend:

## Langkah 1: Prasyarat

Pastikan komputer Anda telah terinstall Node.js dan npm (Node Package Manager). Anda juga membutuhkan akses ke phpMyAdmin dan database MySQL yang telah disiapkan.

## Langkah 2: Clone Repository

Clone repository `tahfidz-be` ke komputer anda.

```
git clone https://github.com/cundus/tahfidz-be.git
```

## Langkah 3: Install Dependencies

Masuk ke dalam direktori proyek yang baru saja di-clone, dan instal semua dependencies yang diperlukan menggunakan npm:

```
cd tahfidz-be
npm install
```

## Langkah 4: Konfigurasi Database

Buka file `src/data-source.ts` lalu sesuaikan pengaturan koneksi database dengan pengaturan database MySQL Anda. Pastikan untuk memasukkan host, port, username, password, dan database yang sesuai.

## Langkah 5: Import Database ke phpMyAdmin

Buka phpMyAdmin di browser Anda dan buatlah database baru dengan nama yang sesuai. Setelah itu, impor skema database `tahfidz.sql` yang disediakan ke dalam database yang baru saja dibuat. Anda bisa melakukan ini dengan mengikuti langkah-langkah berikut:

1. Buka phpMyAdmin dan login.
2. Pilih database yang baru saja dibuat.
3. Klik pada tab "Import" di bagian atas.
4. Pilih file skema database `tahfidz.sql` yang disediakan.
5. ![Langkah 1: Klik Tab Import](/assets/1.png)
6. Klik tombol "Impor" untuk memulai proses import.
7. ![Langkah 2: Klik Tombol Impor](/assets/2.png)

## Langkah 6: Menjalankan Server

Setelah langkah-langkah di atas selesai, Anda dapat menjalankan server backend dengan menjalankan perintah berikut di terminal:

```
npm start
```

Server akan berjalan di port yang telah ditentukan (biasanya port 3000). Anda dapat mengaksesnya melalui browser atau menggunakan aplikasi HTTP client seperti Postman.

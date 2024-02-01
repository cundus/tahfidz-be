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

## Langkah 4: Konfigurasi Enviroment

Duplikat file .env.example dan ubah namanya menjadi .env. Kemudian, sesuaikan pengaturan koneksi database dengan pengaturan database MySQL Anda di dalam file .env. Pastikan untuk memasukkan host, nama pengguna, kata sandi, dan nama database yang sesuai.

```
PORT=3000
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=password
DB_NAME=your-database-name
```

Tambahkan konfigurasi Cloudinary di dalam file .env. Anda akan memerlukan CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, dan CLOUDINARY_API_SECRET yang dapat Anda dapatkan dari akun Cloudinary Anda.

```
CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
CLOUDINARY_API_KEY=your-cloudinary-api-key
CLOUDINARY_API_SECRET=your-cloudinary-api-secret
```

Tambahkan juga konfigurasi JWT_SECRET di dalam file .env. Ini akan digunakan untuk menghasilkan token JWT untuk otentikasi.

```
JWT_SECRET=your-secret-key-here
```

## Langkah 5: Import Database ke phpMyAdmin

Buka phpMyAdmin di browser Anda dan buatlah database baru dengan nama yang sesuai. Setelah itu, impor skema database `tahfidz.sql` yang disediakan ke dalam database yang baru saja dibuat. Anda bisa melakukan ini dengan mengikuti langkah-langkah berikut:

1. Buka phpMyAdmin dan login.
2. Pilih database yang baru saja dibuat.
3. Klik pada tab "Import" di bagian atas.
4. Pilih file skema database `tahfidz.sql` yang disediakan.

![Langkah 1: Klik Tab Import](/assets/1.png) 5. Klik tombol "Impor" untuk memulai proses import.

![Langkah 2: Klik Tombol Impor](/assets/2.png)

## Langkah 6: Menjalankan Server

Setelah langkah-langkah di atas selesai, Anda dapat menjalankan server backend dengan menjalankan perintah berikut di terminal:

```
npm start
```

Server akan berjalan di port yang telah ditentukan (biasanya port 3000). Anda dapat mengaksesnya melalui browser atau menggunakan aplikasi HTTP client seperti Postman.

-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 01 Feb 2024 pada 20.32
-- Versi server: 10.4.32-MariaDB
-- Versi PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `tahfidz`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `hafalan`
--

CREATE TABLE `hafalan` (
  `id` int(11) NOT NULL,
  `baris` varchar(255) NOT NULL,
  `surat_awal` varchar(255) NOT NULL,
  `surat_akhir` varchar(255) NOT NULL,
  `ayat_awal` varchar(255) NOT NULL,
  `ayat_akhir` varchar(255) NOT NULL,
  `nilai_hafalan` varchar(255) NOT NULL,
  `nilai_tajwid` varchar(255) NOT NULL,
  `type` varchar(255) NOT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `userId` int(11) DEFAULT NULL,
  `halaqohId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `halaqoh`
--

CREATE TABLE `halaqoh` (
  `id` int(11) NOT NULL,
  `nama_halaqoh` varchar(255) NOT NULL,
  `status` tinyint(4) NOT NULL DEFAULT 0,
  `createdAt` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `tahunAjaranId` int(11) DEFAULT NULL,
  `guruId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `meet`
--

CREATE TABLE `meet` (
  `id` int(11) NOT NULL,
  `meet` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL,
  `tanggal` datetime NOT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `userId` int(11) DEFAULT NULL,
  `halaqohId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `profile`
--

CREATE TABLE `profile` (
  `id` int(11) NOT NULL,
  `nama_lengkap` varchar(255) NOT NULL,
  `nomor_induk` varchar(255) NOT NULL,
  `tempat_lahir` varchar(255) NOT NULL,
  `tanggal_lahir` datetime NOT NULL,
  `jenis_kelamin` varchar(255) NOT NULL,
  `alamat` varchar(255) DEFAULT NULL,
  `foto` varchar(255) DEFAULT NULL,
  `nama_ayah` varchar(255) NOT NULL,
  `nama_ibu` varchar(255) NOT NULL,
  `nomor_telepon_ayah` varchar(255) DEFAULT NULL,
  `nomor_telepon_ibu` varchar(255) DEFAULT NULL,
  `pekerjaan_ayah` varchar(255) DEFAULT NULL,
  `pekerjaan_ibu` varchar(255) DEFAULT NULL,
  `status` tinyint(4) NOT NULL DEFAULT 0,
  `email` varchar(255) NOT NULL,
  `nomor_telepon` varchar(255) NOT NULL,
  `posisi` varchar(255) NOT NULL,
  `tanggal_bergabung` varchar(255) NOT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `userId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `sekolah`
--

CREATE TABLE `sekolah` (
  `id` int(11) NOT NULL,
  `nama_sekolah` varchar(255) NOT NULL,
  `nomor_telepon` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `alamat` varchar(255) NOT NULL,
  `website` varchar(255) DEFAULT NULL,
  `logo` varchar(255) DEFAULT NULL,
  `status` tinyint(4) NOT NULL DEFAULT 0,
  `createdAt` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `tahun_ajaran`
--

CREATE TABLE `tahun_ajaran` (
  `id` int(11) NOT NULL,
  `nama_tahun_ajaran` varchar(255) NOT NULL,
  `status` tinyint(4) NOT NULL DEFAULT 0,
  `createdAt` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `ujian`
--

CREATE TABLE `ujian` (
  `id` int(11) NOT NULL,
  `tanggal` datetime NOT NULL,
  `juz` int(11) NOT NULL,
  `kesalahan_hafalan` int(11) NOT NULL,
  `kesalahan_tajwid` int(11) NOT NULL,
  `nilai_hafalan` int(11) NOT NULL,
  `nilai_tajwid` int(11) NOT NULL,
  `total_nilai` int(11) NOT NULL,
  `keterangan` varchar(255) NOT NULL,
  `penguji` varchar(255) NOT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `userId` int(11) DEFAULT NULL,
  `halaqohId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `guruId` int(11) DEFAULT NULL,
  `profileId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `role`, `createdAt`, `updatedAt`, `guruId`, `profileId`) VALUES
(1, 'admin', '$2b$10$p4K7eu1dXbgpAeJKkXBF.eC/9wZ93xFCxFK.Sx/vl5wTnZS/ZQ12C', 'admin', '2024-02-02 02:27:56.475937', '2024-02-02 02:27:56.475937', NULL, NULL);

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `hafalan`
--
ALTER TABLE `hafalan`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_061b53213d59995a840709ad1c4` (`userId`),
  ADD KEY `FK_8075c19115af71d52b4829e93a3` (`halaqohId`);

--
-- Indeks untuk tabel `halaqoh`
--
ALTER TABLE `halaqoh`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_6d75b491294cc204eac5199923e` (`tahunAjaranId`),
  ADD KEY `FK_53102f024ac874b6e684254e373` (`guruId`);

--
-- Indeks untuk tabel `meet`
--
ALTER TABLE `meet`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_402eb2667c3c7e4a4a3efdf67b8` (`userId`),
  ADD KEY `FK_d7aaf25d489c8cdfb28408d98a6` (`halaqohId`);

--
-- Indeks untuk tabel `profile`
--
ALTER TABLE `profile`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `REL_a24972ebd73b106250713dcddd` (`userId`);

--
-- Indeks untuk tabel `sekolah`
--
ALTER TABLE `sekolah`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `tahun_ajaran`
--
ALTER TABLE `tahun_ajaran`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `ujian`
--
ALTER TABLE `ujian`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_bdfc90614ea4b3ec4af4fdc3335` (`userId`),
  ADD KEY `FK_23a5828e74a57587e4539508fc9` (`halaqohId`);

--
-- Indeks untuk tabel `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `REL_b1bda35cdb9a2c1b777f5541d8` (`profileId`),
  ADD KEY `FK_ddc18ab703d2ede2d82f56eb288` (`guruId`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `hafalan`
--
ALTER TABLE `hafalan`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `halaqoh`
--
ALTER TABLE `halaqoh`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `meet`
--
ALTER TABLE `meet`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `profile`
--
ALTER TABLE `profile`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `sekolah`
--
ALTER TABLE `sekolah`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `tahun_ajaran`
--
ALTER TABLE `tahun_ajaran`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `ujian`
--
ALTER TABLE `ujian`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `hafalan`
--
ALTER TABLE `hafalan`
  ADD CONSTRAINT `FK_061b53213d59995a840709ad1c4` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_8075c19115af71d52b4829e93a3` FOREIGN KEY (`halaqohId`) REFERENCES `halaqoh` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Ketidakleluasaan untuk tabel `halaqoh`
--
ALTER TABLE `halaqoh`
  ADD CONSTRAINT `FK_53102f024ac874b6e684254e373` FOREIGN KEY (`guruId`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_6d75b491294cc204eac5199923e` FOREIGN KEY (`tahunAjaranId`) REFERENCES `tahun_ajaran` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Ketidakleluasaan untuk tabel `meet`
--
ALTER TABLE `meet`
  ADD CONSTRAINT `FK_402eb2667c3c7e4a4a3efdf67b8` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_d7aaf25d489c8cdfb28408d98a6` FOREIGN KEY (`halaqohId`) REFERENCES `halaqoh` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Ketidakleluasaan untuk tabel `profile`
--
ALTER TABLE `profile`
  ADD CONSTRAINT `FK_a24972ebd73b106250713dcddd9` FOREIGN KEY (`userId`) REFERENCES `profile` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Ketidakleluasaan untuk tabel `ujian`
--
ALTER TABLE `ujian`
  ADD CONSTRAINT `FK_23a5828e74a57587e4539508fc9` FOREIGN KEY (`halaqohId`) REFERENCES `halaqoh` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_bdfc90614ea4b3ec4af4fdc3335` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Ketidakleluasaan untuk tabel `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `FK_b1bda35cdb9a2c1b777f5541d87` FOREIGN KEY (`profileId`) REFERENCES `profile` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_ddc18ab703d2ede2d82f56eb288` FOREIGN KEY (`guruId`) REFERENCES `halaqoh` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 09, 2025 at 12:12 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_lantaihijau`
--

-- --------------------------------------------------------

--
-- Table structure for table `cache`
--

CREATE TABLE `cache` (
  `key` varchar(255) NOT NULL,
  `value` mediumtext NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cache_locks`
--

CREATE TABLE `cache_locks` (
  `key` varchar(255) NOT NULL,
  `owner` varchar(255) NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `hasil_panen`
--

CREATE TABLE `hasil_panen` (
  `id` int(11) NOT NULL,
  `id_user` int(11) DEFAULT NULL,
  `id_tanaman` int(11) DEFAULT NULL,
  `tanggal` date DEFAULT NULL,
  `kuantitas_panen` int(11) DEFAULT NULL,
  `harga_tanam` decimal(10,2) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `jobs`
--

CREATE TABLE `jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `queue` varchar(255) NOT NULL,
  `payload` longtext NOT NULL,
  `attempts` tinyint(3) UNSIGNED NOT NULL,
  `reserved_at` int(10) UNSIGNED DEFAULT NULL,
  `available_at` int(10) UNSIGNED NOT NULL,
  `created_at` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `job_batches`
--

CREATE TABLE `job_batches` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `total_jobs` int(11) NOT NULL,
  `pending_jobs` int(11) NOT NULL,
  `failed_jobs` int(11) NOT NULL,
  `failed_job_ids` longtext NOT NULL,
  `options` mediumtext DEFAULT NULL,
  `cancelled_at` int(11) DEFAULT NULL,
  `created_at` int(11) NOT NULL,
  `finished_at` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `jurnal`
--

CREATE TABLE `jurnal` (
  `id` int(11) NOT NULL,
  `id_user` int(11) DEFAULT NULL,
  `id_tanaman` int(11) DEFAULT NULL,
  `mulai_menanam` date DEFAULT NULL,
  `tanggal_panen` date DEFAULT NULL,
  `catatan` text DEFAULT NULL,
  `foto_dokumentasi` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `kebun`
--

CREATE TABLE `kebun` (
  `id` int(11) NOT NULL,
  `id_user` int(11) DEFAULT NULL,
  `nama_kebun` varchar(100) DEFAULT NULL,
  `panjang` int(11) DEFAULT NULL,
  `lebar` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `grid_data` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`grid_data`))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `koleksi_tanaman`
--

CREATE TABLE `koleksi_tanaman` (
  `id` int(11) NOT NULL,
  `id_user` int(11) DEFAULT NULL,
  `id_tanaman` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '0001_01_01_000000_create_users_table', 1),
(2, '0001_01_01_000001_create_cache_table', 1),
(3, '0001_01_01_000002_create_jobs_table', 1),
(4, '2025_08_04_094304_create_personal_access_tokens_table', 2);

-- --------------------------------------------------------

--
-- Table structure for table `panduan_tanaman`
--

CREATE TABLE `panduan_tanaman` (
  `id` int(10) UNSIGNED NOT NULL,
  `tanaman_id` int(11) NOT NULL,
  `step_number` int(11) NOT NULL,
  `step_title` varchar(255) NOT NULL,
  `step_content` text NOT NULL,
  `alat_bahan` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`alat_bahan`)),
  `tips` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `panduan_tanaman`
--

INSERT INTO `panduan_tanaman` (`id`, `tanaman_id`, `step_number`, `step_title`, `step_content`, `alat_bahan`, `tips`, `created_at`, `updated_at`) VALUES
(47, 1, 1, 'Persiapan Alat dan Bahan', 'Siapkan semua alat dan bahan yang dibutuhkan untuk menanam cabai rawit. Pastikan media tanam memiliki drainase yang baik dan kaya nutrisi.', '[\"Pot diameter minimal 25cm\", \"Tanah subur\", \"Kompos/pupuk kandang\", \"Sekam bakar\", \"Benih cabai rawit berkualitas\", \"Gembor atau sprayer\"]', 'Pilih pot yang cukup besar karena cabai rawit membutuhkan ruang untuk perkembangan akar yang optimal.', NULL, NULL),
(48, 1, 2, 'Penyemaian Benih', 'Rendam benih cabai dalam air hangat selama 3-6 jam, kemudian semai di tray semai atau polybag kecil hingga tumbuh 3-4 daun sejati.', '[\"Benih cabai rawit\", \"Air hangat\", \"Tray semai/polybag\", \"Tanah halus\"]', 'Gunakan benih yang tenggelam saat direndam karena memiliki tingkat tumbuh yang lebih baik.', NULL, NULL),
(49, 1, 3, 'Penanaman Bibit', 'Pindahkan bibit cabai yang sudah cukup kuat ke pot utama dengan media tanam campuran tanah, kompos, dan sekam.', '[\"Bibit cabai rawit\", \"Pot utama (min 25cm)\", \"Media tanam (tanah+kompos+sekam)\"]', 'Tanam pada sore hari agar bibit tidak stres.', NULL, NULL),
(50, 1, 4, 'Perawatan Rutin', 'Siram tanaman cabai secara teratur pada pagi atau sore hari, beri pupuk organik setiap 2 minggu, dan pastikan terkena sinar matahari langsung.', '[\"Air\", \"Pupuk organik cair\", \"Pestisida nabati\"]', 'Periksa daun secara rutin untuk mengantisipasi hama.', NULL, NULL),
(51, 1, 5, 'Panen', 'Cabai rawit siap dipanen 60-90 hari setelah tanam, ditandai dengan warna buah yang mulai memerah.', '[\"Gunting panen\", \"Wadah panen\"]', 'Panen saat pagi hari; jangan panen setelah hujan.', NULL, NULL),
(52, 2, 1, 'Persiapan Alat dan Bahan', 'Siapkan semua alat dan bahan yang dibutuhkan untuk menanam tomat. Pastikan media tanam memiliki drainase yang baik dan kaya nutrisi.', '[\"Pot diameter minimal 25cm\", \"Tanah subur\", \"Kompos/pupuk kandang\", \"Sekam bakar\", \"Benih tomat berkualitas\", \"Gembor atau sprayer\", \"Tiang/penopang\"]', 'Pilih pot yang cukup besar karena tomat membutuhkan ruang untuk perkembangan akar yang optimal.', NULL, NULL),
(53, 2, 2, 'Penyemaian Benih', 'Rendam benih tomat dalam air hangat selama 3-6 jam, kemudian semai di tray semai atau polybag kecil hingga tumbuh 3-4 daun sejati.', '[\"Benih tomat\", \"Air hangat\", \"Tray semai/polybag\", \"Tanah halus\", \"Tiang/penopang\"]', 'Gunakan benih yang tenggelam saat direndam karena memiliki tingkat tumbuh yang lebih baik.', NULL, NULL),
(54, 2, 3, 'Penanaman Bibit', 'Pindahkan bibit tomat yang sudah cukup kuat ke pot utama dengan penopang (tiang/bambu) dengan media tanam campuran tanah, kompos, dan sekam.', '[\"Bibit tomat\", \"Pot utama (min 25cm)\", \"Media tanam (tanah+kompos+sekam)\", \"Tiang/penopang\"]', 'Tanam pada sore hari agar bibit tidak stres.', NULL, NULL),
(55, 2, 4, 'Perawatan Rutin', 'Siram tanaman tomat secara teratur pada pagi atau sore hari, beri pupuk organik setiap 2 minggu, dan pastikan terkena sinar matahari langsung.', '[\"Air\", \"Pupuk organik cair\", \"Pestisida nabati\", \"Tiang/penopang\"]', 'Periksa daun secara rutin untuk mengantisipasi hama.', NULL, NULL),
(56, 2, 5, 'Panen', 'Tomat siap dipanen 60-90 hari setelah tanam, ditandai dengan warna buah yang mulai memerah.', '[\"Gunting panen\", \"Wadah panen\", \"Tiang/penopang\"]', 'Panen saat pagi hari; jangan panen setelah hujan.', NULL, NULL),
(57, 3, 1, 'Persiapan Alat dan Bahan', 'Siapkan semua alat dan bahan yang dibutuhkan untuk menanam selada. Pastikan media tanam memiliki drainase yang baik dan kaya nutrisi.', '[\"Pot dangkal/box\", \"Media tanam gembur\", \"Kompos\", \"Benih selada\"]', 'Pilih pot yang cukup besar karena selada membutuhkan ruang untuk perkembangan akar yang optimal.', NULL, NULL),
(58, 3, 2, 'Penyemaian Benih', 'Rendam benih selada dalam air hangat selama 3-6 jam, kemudian semai di tray semai atau polybag kecil hingga tumbuh 3-4 daun sejati.', '[\"Pot dangkal/box\", \"Media tanam gembur\", \"Kompos\", \"Benih selada\"]', 'Gunakan benih yang tenggelam saat direndam karena memiliki tingkat tumbuh yang lebih baik.', NULL, NULL),
(59, 3, 3, 'Penanaman Bibit', 'Pindahkan bibit selada yang sudah cukup kuat ke pot utama dengan media tanam campuran tanah, kompos, dan sekam.', '[\"Pot dangkal/box\", \"Media tanam gembur\", \"Kompos\", \"Benih selada\"]', 'Tanam pada sore hari agar bibit tidak stres.', NULL, NULL),
(60, 3, 4, 'Perawatan Rutin', 'Siram tanaman selada secara teratur pada pagi atau sore hari, beri pupuk organik setiap 2 minggu, dan pastikan terkena sinar matahari langsung.', '[\"Pot dangkal/box\", \"Media tanam gembur\", \"Kompos\", \"Benih selada\"]', 'Periksa daun secara rutin untuk mengantisipasi hama.', NULL, NULL),
(61, 3, 5, 'Panen', 'Selada siap dipanen 60-90 hari setelah tanam, ditandai dengan warna buah yang mulai memerah.', '[\"Pot dangkal/box\", \"Media tanam gembur\", \"Kompos\", \"Benih selada\"]', 'Panen saat pagi hari; jangan panen setelah hujan.', NULL, NULL),
(62, 4, 1, 'Persiapan Alat dan Bahan', 'Tanam stek atau benih daun bawang pada media yang kaya nutrisi; dapat dipanen berulang.', '[\"Pot\", \"Campuran tanah + kompos\", \"Umbi/potongan daun bawang untuk stek\"]', 'Pilih pot yang cukup besar karena daun bawang membutuhkan ruang untuk perkembangan akar yang optimal.', NULL, NULL),
(63, 4, 2, 'Penyemaian Benih', 'Tanam stek atau benih daun bawang pada media yang kaya nutrisi; dapat dipanen berulang.', '[\"Pot\", \"Campuran tanah + kompos\", \"Umbi/potongan daun bawang untuk stek\"]', 'Gunakan benih yang tenggelam saat direndam karena memiliki tingkat tumbuh yang lebih baik.', NULL, NULL),
(64, 4, 3, 'Penanaman Bibit', 'Tanam stek atau benih daun bawang pada media yang kaya nutrisi; dapat dipanen berulang.', '[\"Pot\", \"Campuran tanah + kompos\", \"Umbi/potongan daun bawang untuk stek\"]', 'Tanam pada sore hari agar bibit tidak stres.', NULL, NULL),
(65, 4, 4, 'Perawatan Rutin', 'Tanam stek atau benih daun bawang pada media yang kaya nutrisi; dapat dipanen berulang.', '[\"Pot\", \"Campuran tanah + kompos\", \"Umbi/potongan daun bawang untuk stek\"]', 'Periksa daun secara rutin untuk mengantisipasi hama.', NULL, NULL),
(66, 4, 5, 'Panen', 'Tanam stek atau benih daun bawang pada media yang kaya nutrisi; dapat dipanen berulang.', '[\"Pot\", \"Campuran tanah + kompos\", \"Umbi/potongan daun bawang untuk stek\"]', 'Panen saat pagi hari; jangan panen setelah hujan.', NULL, NULL),
(67, 5, 1, 'Persiapan Alat dan Bahan', 'Siapkan semua alat dan bahan yang dibutuhkan untuk menanam strawberry. Pastikan media tanam memiliki drainase yang baik dan kaya nutrisi.', '[\"Pot diameter minimal 25cm\", \"Tanah subur\", \"Kompos/pupuk kandang\", \"Sekam bakar\", \"Benih strawberry berkualitas\", \"Gembor atau sprayer\", \"Pot gantung atau tray berlubang\"]', 'Pilih pot yang cukup besar karena strawberry membutuhkan ruang untuk perkembangan akar yang optimal.', NULL, NULL),
(68, 5, 2, 'Penyemaian Benih', 'Rendam benih strawberry dalam air hangat selama 3-6 jam, kemudian semai di tray semai atau polybag kecil hingga tumbuh 3-4 daun sejati.', '[\"Benih strawberry\", \"Air hangat\", \"Tray semai/polybag\", \"Tanah halus\", \"Pot gantung atau tray berlubang\"]', 'Gunakan benih yang tenggelam saat direndam karena memiliki tingkat tumbuh yang lebih baik.', NULL, NULL),
(69, 5, 3, 'Penanaman Bibit', 'Pindahkan bibit strawberry yang sudah cukup kuat ke pot utama dengan media tanam campuran tanah, kompos, dan sekam.', '[\"Bibit strawberry\", \"Pot utama (min 25cm)\", \"Media tanam (tanah+kompos+sekam)\", \"Pot gantung atau tray berlubang\"]', 'Tanam pada sore hari agar bibit tidak stres.', NULL, NULL),
(70, 5, 4, 'Perawatan Rutin', 'Siram tanaman strawberry secara teratur pada pagi atau sore hari, beri pupuk organik setiap 2 minggu, dan pastikan terkena sinar matahari langsung.', '[\"Air\", \"Pupuk organik cair\", \"Pestisida nabati\", \"Pot gantung atau tray berlubang\"]', 'Periksa daun secara rutin untuk mengantisipasi hama.', NULL, NULL),
(71, 5, 5, 'Panen', 'Strawberry siap dipanen 60-90 hari setelah tanam, ditandai dengan warna buah yang mulai memerah.', '[\"Gunting panen\", \"Wadah panen\", \"Pot gantung atau tray berlubang\"]', 'Panen saat pagi hari; jangan panen setelah hujan.', NULL, NULL),
(72, 6, 1, 'Persiapan Alat dan Bahan', 'Siapkan semua alat dan bahan yang dibutuhkan untuk menanam pandan. Pastikan media tanam memiliki drainase yang baik dan kaya nutrisi.', '[\"Pot besar\", \"Tanah subur\", \"Pupuk organik\", \"Anakan/potongan pandan\"]', 'Pilih pot yang cukup besar karena pandan membutuhkan ruang untuk perkembangan akar yang optimal.', NULL, NULL),
(73, 6, 2, 'Penyemaian Benih', 'Rendam benih pandan dalam air hangat selama 3-6 jam, kemudian semai di tray semai atau polybag kecil hingga tumbuh 3-4 daun sejati.', '[\"Pot besar\", \"Tanah subur\", \"Pupuk organik\", \"Anakan/potongan pandan\"]', 'Gunakan benih yang tenggelam saat direndam karena memiliki tingkat tumbuh yang lebih baik.', NULL, NULL),
(74, 6, 3, 'Penanaman Bibit', 'Pindahkan bibit pandan yang sudah cukup kuat ke pot utama dengan media tanam campuran tanah, kompos, dan sekam.', '[\"Pot besar\", \"Tanah subur\", \"Pupuk organik\", \"Anakan/potongan pandan\"]', 'Tanam pada sore hari agar bibit tidak stres.', NULL, NULL),
(75, 6, 4, 'Perawatan Rutin', 'Siram tanaman pandan secara teratur pada pagi atau sore hari, beri pupuk organik setiap 2 minggu, dan pastikan terkena sinar matahari langsung.', '[\"Pot besar\", \"Tanah subur\", \"Pupuk organik\", \"Anakan/potongan pandan\"]', 'Periksa daun secara rutin untuk mengantisipasi hama.', NULL, NULL),
(76, 6, 5, 'Panen', 'Pandan siap dipanen 60-90 hari setelah tanam, ditandai dengan warna buah yang mulai memerah.', '[\"Pot besar\", \"Tanah subur\", \"Pupuk organik\", \"Anakan/potongan pandan\"]', 'Panen saat pagi hari; jangan panen setelah hujan.', NULL, NULL),
(77, 7, 1, 'Persiapan Alat dan Bahan', 'Siapkan semua alat dan bahan yang dibutuhkan untuk menanam mint. Pastikan media tanam memiliki drainase yang baik dan kaya nutrisi.', '[\"Pot\", \"Media tanam gembur\", \"Pucuk mint/stek\"]', 'Pilih pot yang cukup besar karena mint membutuhkan ruang untuk perkembangan akar yang optimal.', NULL, NULL),
(78, 7, 2, 'Penyemaian Benih', 'Rendam benih mint dalam air hangat selama 3-6 jam, kemudian semai di tray semai atau polybag kecil hingga tumbuh 3-4 daun sejati.', '[\"Pot\", \"Media tanam gembur\", \"Pucuk mint/stek\"]', 'Gunakan benih yang tenggelam saat direndam karena memiliki tingkat tumbuh yang lebih baik.', NULL, NULL),
(79, 7, 3, 'Penanaman Bibit', 'Pindahkan bibit mint yang sudah cukup kuat ke pot utama dengan media tanam campuran tanah, kompos, dan sekam.', '[\"Pot\", \"Media tanam gembur\", \"Pucuk mint/stek\"]', 'Tanam pada sore hari agar bibit tidak stres.', NULL, NULL),
(80, 7, 4, 'Perawatan Rutin', 'Siram tanaman mint secara teratur pada pagi atau sore hari, beri pupuk organik setiap 2 minggu, dan pastikan terkena sinar matahari langsung.', '[\"Pot\", \"Media tanam gembur\", \"Pucuk mint/stek\"]', 'Periksa daun secara rutin untuk mengantisipasi hama.', NULL, NULL),
(81, 7, 5, 'Panen', 'Mint siap dipanen 60-90 hari setelah tanam, ditandai dengan warna buah yang mulai memerah.', '[\"Pot\", \"Media tanam gembur\", \"Pucuk mint/stek\"]', 'Panen saat pagi hari; jangan panen setelah hujan.', NULL, NULL),
(82, 8, 1, 'Persiapan Alat dan Bahan', 'Siapkan semua alat dan bahan yang dibutuhkan untuk menanam jahe. Pastikan media tanam memiliki drainase yang baik dan kaya nutrisi.', '[\"Pot dalam (min 40cm)\", \"Tanah gembur dan kaya kompos\", \"Rimpang/umbi (bibit)\"]', 'Gunakan pot dalam dan beri naungan sebagian pada 2-3 minggu pertama.', NULL, NULL),
(83, 8, 2, 'Penyemaian Benih', 'Rendam benih jahe dalam air hangat selama 3-6 jam, kemudian semai di tray semai atau polybag kecil hingga tumbuh 3-4 daun sejati.', '[\"Pot dalam (min 40cm)\", \"Tanah gembur dan kaya kompos\", \"Rimpang/umbi (bibit)\"]', 'Gunakan pot dalam dan beri naungan sebagian pada 2-3 minggu pertama.', NULL, NULL),
(84, 8, 3, 'Penanaman Bibit', 'Pindahkan bibit jahe yang sudah cukup kuat ke pot utama dengan media tanam campuran tanah, kompos, dan sekam.', '[\"Pot dalam (min 40cm)\", \"Tanah gembur dan kaya kompos\", \"Rimpang/umbi (bibit)\"]', 'Gunakan pot dalam dan beri naungan sebagian pada 2-3 minggu pertama.', NULL, NULL),
(85, 8, 4, 'Perawatan Rutin', 'Siram tanaman jahe secara teratur pada pagi atau sore hari, beri pupuk organik setiap 2 minggu, dan pastikan terkena sinar matahari langsung.', '[\"Pot dalam (min 40cm)\", \"Tanah gembur dan kaya kompos\", \"Rimpang/umbi (bibit)\"]', 'Gunakan pot dalam dan beri naungan sebagian pada 2-3 minggu pertama.', NULL, NULL),
(86, 8, 5, 'Panen', 'Jahe siap dipanen 60-90 hari setelah tanam, ditandai dengan warna buah yang mulai memerah.', '[\"Pot dalam (min 40cm)\", \"Tanah gembur dan kaya kompos\", \"Rimpang/umbi (bibit)\"]', 'Gunakan pot dalam dan beri naungan sebagian pada 2-3 minggu pertama.', NULL, NULL),
(87, 9, 1, 'Persiapan Alat dan Bahan', 'Siapkan semua alat dan bahan yang dibutuhkan untuk menanam kunyit. Pastikan media tanam memiliki drainase yang baik dan kaya nutrisi.', '[\"Pot dalam (min 40cm)\", \"Tanah gembur dan kaya kompos\", \"Rimpang/umbi (bibit)\"]', 'Gunakan pot dalam dan beri naungan sebagian pada 2-3 minggu pertama.', NULL, NULL),
(88, 9, 2, 'Penyemaian Benih', 'Rendam benih kunyit dalam air hangat selama 3-6 jam, kemudian semai di tray semai atau polybag kecil hingga tumbuh 3-4 daun sejati.', '[\"Pot dalam (min 40cm)\", \"Tanah gembur dan kaya kompos\", \"Rimpang/umbi (bibit)\"]', 'Gunakan pot dalam dan beri naungan sebagian pada 2-3 minggu pertama.', NULL, NULL),
(89, 9, 3, 'Penanaman Bibit', 'Pindahkan bibit kunyit yang sudah cukup kuat ke pot utama dengan media tanam campuran tanah, kompos, dan sekam.', '[\"Pot dalam (min 40cm)\", \"Tanah gembur dan kaya kompos\", \"Rimpang/umbi (bibit)\"]', 'Gunakan pot dalam dan beri naungan sebagian pada 2-3 minggu pertama.', NULL, NULL),
(90, 9, 4, 'Perawatan Rutin', 'Siram tanaman kunyit secara teratur pada pagi atau sore hari, beri pupuk organik setiap 2 minggu, dan pastikan terkena sinar matahari langsung.', '[\"Pot dalam (min 40cm)\", \"Tanah gembur dan kaya kompos\", \"Rimpang/umbi (bibit)\"]', 'Gunakan pot dalam dan beri naungan sebagian pada 2-3 minggu pertama.', NULL, NULL),
(91, 9, 5, 'Panen', 'Kunyit siap dipanen 60-90 hari setelah tanam, ditandai dengan warna buah yang mulai memerah.', '[\"Pot dalam (min 40cm)\", \"Tanah gembur dan kaya kompos\", \"Rimpang/umbi (bibit)\"]', 'Gunakan pot dalam dan beri naungan sebagian pada 2-3 minggu pertama.', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `penghematan_panen`
--

CREATE TABLE `penghematan_panen` (
  `id` int(11) NOT NULL,
  `id_tanaman` int(11) DEFAULT NULL,
  `id_hasil_panen` int(11) DEFAULT NULL,
  `total_penghematan` decimal(10,2) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` text NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `payload` longtext NOT NULL,
  `last_activity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tanaman`
--

CREATE TABLE `tanaman` (
  `id` int(11) NOT NULL,
  `nama_tanaman` varchar(100) NOT NULL,
  `level_kesulitan` tinyint(3) UNSIGNED DEFAULT NULL CHECK (`level_kesulitan` between 1 and 5),
  `suhu` varchar(50) DEFAULT NULL,
  `musim_panen` varchar(50) DEFAULT NULL,
  `waktu_tumbuh` int(11) DEFAULT NULL,
  `deskripsi` text DEFAULT NULL,
  `foto_tanaman` varchar(255) DEFAULT NULL,
  `rata_harga` decimal(10,2) DEFAULT NULL,
  `link_youtube` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tanaman`
--

INSERT INTO `tanaman` (`id`, `nama_tanaman`, `level_kesulitan`, `suhu`, `musim_panen`, `waktu_tumbuh`, `deskripsi`, `foto_tanaman`, `rata_harga`, `link_youtube`) VALUES
(1, 'Cabai', 2, '25–30°C', 'Sepanjang Tahun', 75, 'Tanaman bumbu pedas yang memerlukan cahaya matahari penuh dan tanah yang gembur. Cocok ditanam di pot dengan drainase baik.', 'cabai.png', 65000.00, 'https://www.youtube.com/watch?v=g1LYGplyewE'),
(2, 'Tomat', 2, '20–25°C', 'Sepanjang Tahun', 70, 'Tomat adalah sayuran buah yang mudah tumbuh dalam pot, memerlukan penopang, dan penyiraman rutin.', 'tomat.png', 15000.00, 'https://www.youtube.com/watch?v=5Dem9ahRGMg'),
(3, 'Selada', 1, '15–20°C', 'Dingin', 40, 'Selada adalah tanaman daun yang cepat panen, cocok ditanam di tempat sejuk atau teduh.', 'selada.png', 12000.00, 'https://www.youtube.com/watch?v=967jCvYqrAQ'),
(4, 'Daun Bawang', 2, '18–25°C', 'Sepanjang Tahun', 55, 'Daun bawang sangat cocok ditanam dalam pot dan bisa dipanen berulang kali.', 'bawang.png', 18000.00, 'https://www.youtube.com/watch?v=P9GORMMuBf0'),
(5, 'Strawberry', 3, '15–22°C', 'Dingin', 110, 'Strawberry cocok ditanam di pot gantung, memerlukan suhu sejuk dan sinar matahari pagi.', 'strawberry.png', 70000.00, 'https://www.youtube.com/watch?v=Z7KYAtVeIrw'),
(6, 'Pandan', 1, '25–30°C', 'Sepanjang Tahun', 150, 'Pandan adalah tanaman aromatik untuk memasak yang kuat dan tahan panas, cocok untuk pot besar.', 'pandan.png', 12000.00, 'https://www.youtube.com/watch?v=97_BpKpPIQg'),
(7, 'Mint', 1, '18–25°C', 'Sepanjang Tahun', 70, 'Mint tumbuh cepat dan sangat mudah dikembangbiakkan, tapi cenderung invasif sehingga cocok ditanam di pot.', 'mint.png', 30000.00, 'https://www.youtube.com/watch?v=TaUPJpnvNjM'),
(8, 'Jahe', 4, '22–28°C', 'Kemarau', 250, 'Tanaman rimpang yang memerlukan pot dalam dan media tanam yang kaya nutrisi. Butuh waktu panjang hingga panen.', 'jahe.png', 30000.00, 'https://www.youtube.com/watch?v=-mUeNy0rweM'),
(9, 'Kunyit', 4, '22–28°C', 'Kemarau', 260, 'Kunyit adalah rempah akar yang tumbuh lambat. Cocok untuk pot besar dengan media tanam gembur dan lembap.', 'kunyit.png', 28000.00, 'https://www.youtube.com/watch?v=OtfS4FVSAGI');

-- --------------------------------------------------------

--
-- Table structure for table `tanaman_kebun`
--

CREATE TABLE `tanaman_kebun` (
  `id` int(11) NOT NULL,
  `id_kebun` int(11) DEFAULT NULL,
  `id_tanaman` int(11) DEFAULT NULL,
  `tanggal_tanam` date DEFAULT NULL,
  `posisi_x` int(11) DEFAULT NULL,
  `posisi_y` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `todolist`
--

CREATE TABLE `todolist` (
  `id` int(11) NOT NULL,
  `id_user` int(11) DEFAULT NULL,
  `id_tanaman_kebun` int(11) DEFAULT NULL,
  `deskripsi` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `username` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cache`
--
ALTER TABLE `cache`
  ADD PRIMARY KEY (`key`);

--
-- Indexes for table `cache_locks`
--
ALTER TABLE `cache_locks`
  ADD PRIMARY KEY (`key`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `hasil_panen`
--
ALTER TABLE `hasil_panen`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_user` (`id_user`),
  ADD KEY `id_tanaman` (`id_tanaman`);

--
-- Indexes for table `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobs_queue_index` (`queue`);

--
-- Indexes for table `job_batches`
--
ALTER TABLE `job_batches`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `jurnal`
--
ALTER TABLE `jurnal`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_user` (`id_user`),
  ADD KEY `id_tanaman` (`id_tanaman`);

--
-- Indexes for table `kebun`
--
ALTER TABLE `kebun`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_user` (`id_user`);

--
-- Indexes for table `koleksi_tanaman`
--
ALTER TABLE `koleksi_tanaman`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_user` (`id_user`),
  ADD KEY `id_tanaman` (`id_tanaman`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `panduan_tanaman`
--
ALTER TABLE `panduan_tanaman`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_tanaman_id` (`tanaman_id`),
  ADD KEY `idx_step_number` (`step_number`);

--
-- Indexes for table `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `penghematan_panen`
--
ALTER TABLE `penghematan_panen`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_tanaman` (`id_tanaman`),
  ADD KEY `id_hasil_panen` (`id_hasil_panen`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`),
  ADD KEY `personal_access_tokens_expires_at_index` (`expires_at`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- Indexes for table `tanaman`
--
ALTER TABLE `tanaman`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tanaman_kebun`
--
ALTER TABLE `tanaman_kebun`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_kebun` (`id_kebun`),
  ADD KEY `id_tanaman` (`id_tanaman`);

--
-- Indexes for table `todolist`
--
ALTER TABLE `todolist`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_user` (`id_user`),
  ADD KEY `id_tanaman_kebun` (`id_tanaman_kebun`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `hasil_panen`
--
ALTER TABLE `hasil_panen`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `jurnal`
--
ALTER TABLE `jurnal`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `kebun`
--
ALTER TABLE `kebun`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `koleksi_tanaman`
--
ALTER TABLE `koleksi_tanaman`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `panduan_tanaman`
--
ALTER TABLE `panduan_tanaman`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=92;

--
-- AUTO_INCREMENT for table `penghematan_panen`
--
ALTER TABLE `penghematan_panen`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `tanaman`
--
ALTER TABLE `tanaman`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `tanaman_kebun`
--
ALTER TABLE `tanaman_kebun`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `todolist`
--
ALTER TABLE `todolist`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `hasil_panen`
--
ALTER TABLE `hasil_panen`
  ADD CONSTRAINT `hasil_panen_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `hasil_panen_ibfk_2` FOREIGN KEY (`id_tanaman`) REFERENCES `tanaman` (`id`);

--
-- Constraints for table `jurnal`
--
ALTER TABLE `jurnal`
  ADD CONSTRAINT `jurnal_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `jurnal_ibfk_2` FOREIGN KEY (`id_tanaman`) REFERENCES `tanaman` (`id`);

--
-- Constraints for table `kebun`
--
ALTER TABLE `kebun`
  ADD CONSTRAINT `kebun_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `user` (`id`);

--
-- Constraints for table `koleksi_tanaman`
--
ALTER TABLE `koleksi_tanaman`
  ADD CONSTRAINT `koleksi_tanaman_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `koleksi_tanaman_ibfk_2` FOREIGN KEY (`id_tanaman`) REFERENCES `tanaman` (`id`);

--
-- Constraints for table `panduan_tanaman`
--
ALTER TABLE `panduan_tanaman`
  ADD CONSTRAINT `panduan_tanaman_ibfk_1` FOREIGN KEY (`tanaman_id`) REFERENCES `tanaman` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `penghematan_panen`
--
ALTER TABLE `penghematan_panen`
  ADD CONSTRAINT `penghematan_panen_ibfk_1` FOREIGN KEY (`id_tanaman`) REFERENCES `tanaman` (`id`),
  ADD CONSTRAINT `penghematan_panen_ibfk_2` FOREIGN KEY (`id_hasil_panen`) REFERENCES `hasil_panen` (`id`);

--
-- Constraints for table `tanaman_kebun`
--
ALTER TABLE `tanaman_kebun`
  ADD CONSTRAINT `tanaman_kebun_ibfk_1` FOREIGN KEY (`id_kebun`) REFERENCES `kebun` (`id`),
  ADD CONSTRAINT `tanaman_kebun_ibfk_2` FOREIGN KEY (`id_tanaman`) REFERENCES `tanaman` (`id`);

--
-- Constraints for table `todolist`
--
ALTER TABLE `todolist`
  ADD CONSTRAINT `todolist_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `todolist_ibfk_2` FOREIGN KEY (`id_tanaman_kebun`) REFERENCES `tanaman_kebun` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

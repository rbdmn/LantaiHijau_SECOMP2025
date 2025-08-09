-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 09, 2025 at 10:25 AM
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

--
-- Dumping data for table `hasil_panen`
--

INSERT INTO `hasil_panen` (`id`, `id_user`, `id_tanaman`, `tanggal`, `kuantitas_panen`, `harga_tanam`, `created_at`, `updated_at`) VALUES
(18, 8, 4, '2025-08-09', 1000, 10000.00, NULL, NULL),
(20, 8, 4, '2025-08-09', 1000, 10000.00, NULL, NULL),
(21, 8, 4, '2025-08-09', 1000, 10000.00, NULL, NULL),
(22, 8, 1, '2025-08-09', 1000, 20000.00, NULL, NULL),
(23, 8, 7, '2025-08-09', NULL, NULL, NULL, NULL),
(24, 8, 1, '2025-08-09', NULL, NULL, NULL, NULL);

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

--
-- Dumping data for table `jurnal`
--

INSERT INTO `jurnal` (`id`, `id_user`, `id_tanaman`, `mulai_menanam`, `tanggal_panen`, `catatan`, `foto_dokumentasi`, `created_at`, `updated_at`) VALUES
(9, 8, 8, '2025-08-08', '2025-08-23', '13123123', 'Screenshot 2025-08-04 201941_1754668872.png', '2025-08-08 09:01:12', '2025-08-08 09:01:12');

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

--
-- Dumping data for table `kebun`
--

INSERT INTO `kebun` (`id`, `id_user`, `nama_kebun`, `panjang`, `lebar`, `created_at`, `updated_at`, `grid_data`) VALUES
(13, 8, 'My Garden', 20, 20, '2025-08-08 02:34:05', '2025-08-09 00:14:18', '{\"grid_size\":{\"x\":20,\"y\":20},\"tanaman\":[{\"id_tanaman\":5,\"posisi_x\":2,\"posisi_y\":2,\"ukuran\":{\"x\":1,\"y\":1}},{\"id_tanaman\":5,\"posisi_x\":3,\"posisi_y\":2,\"ukuran\":{\"x\":1,\"y\":1}},{\"id_tanaman\":5,\"posisi_x\":6,\"posisi_y\":2,\"ukuran\":{\"x\":1,\"y\":1}},{\"id_tanaman\":5,\"posisi_x\":7,\"posisi_y\":2,\"ukuran\":{\"x\":1,\"y\":1}},{\"id_tanaman\":4,\"posisi_x\":12,\"posisi_y\":2,\"ukuran\":{\"x\":1,\"y\":1}},{\"id_tanaman\":4,\"posisi_x\":13,\"posisi_y\":2,\"ukuran\":{\"x\":1,\"y\":1}},{\"id_tanaman\":4,\"posisi_x\":16,\"posisi_y\":2,\"ukuran\":{\"x\":1,\"y\":1}},{\"id_tanaman\":4,\"posisi_x\":17,\"posisi_y\":2,\"ukuran\":{\"x\":1,\"y\":1}},{\"id_tanaman\":5,\"posisi_x\":2,\"posisi_y\":3,\"ukuran\":{\"x\":1,\"y\":1}},{\"id_tanaman\":5,\"posisi_x\":7,\"posisi_y\":3,\"ukuran\":{\"x\":1,\"y\":1}},{\"id_tanaman\":4,\"posisi_x\":12,\"posisi_y\":3,\"ukuran\":{\"x\":1,\"y\":1}},{\"id_tanaman\":5,\"posisi_x\":2,\"posisi_y\":6,\"ukuran\":{\"x\":1,\"y\":1}},{\"id_tanaman\":5,\"posisi_x\":2,\"posisi_y\":7,\"ukuran\":{\"x\":1,\"y\":1}},{\"id_tanaman\":5,\"posisi_x\":3,\"posisi_y\":7,\"ukuran\":{\"x\":1,\"y\":1}},{\"id_tanaman\":5,\"posisi_x\":6,\"posisi_y\":7,\"ukuran\":{\"x\":1,\"y\":1}},{\"id_tanaman\":5,\"posisi_x\":7,\"posisi_y\":7,\"ukuran\":{\"x\":1,\"y\":1}},{\"id_tanaman\":4,\"posisi_x\":12,\"posisi_y\":7,\"ukuran\":{\"x\":1,\"y\":1}},{\"id_tanaman\":4,\"posisi_x\":13,\"posisi_y\":7,\"ukuran\":{\"x\":1,\"y\":1}},{\"id_tanaman\":4,\"posisi_x\":16,\"posisi_y\":7,\"ukuran\":{\"x\":1,\"y\":1}},{\"id_tanaman\":4,\"posisi_x\":17,\"posisi_y\":7,\"ukuran\":{\"x\":1,\"y\":1}},{\"id_tanaman\":6,\"posisi_x\":2,\"posisi_y\":12,\"ukuran\":{\"x\":1,\"y\":1}},{\"id_tanaman\":6,\"posisi_x\":3,\"posisi_y\":12,\"ukuran\":{\"x\":1,\"y\":1}},{\"id_tanaman\":6,\"posisi_x\":6,\"posisi_y\":12,\"ukuran\":{\"x\":1,\"y\":1}},{\"id_tanaman\":6,\"posisi_x\":7,\"posisi_y\":12,\"ukuran\":{\"x\":1,\"y\":1}},{\"id_tanaman\":3,\"posisi_x\":16,\"posisi_y\":12,\"ukuran\":{\"x\":1,\"y\":1}},{\"id_tanaman\":3,\"posisi_x\":17,\"posisi_y\":12,\"ukuran\":{\"x\":1,\"y\":1}},{\"id_tanaman\":6,\"posisi_x\":2,\"posisi_y\":13,\"ukuran\":{\"x\":1,\"y\":1}},{\"id_tanaman\":6,\"posisi_x\":7,\"posisi_y\":13,\"ukuran\":{\"x\":1,\"y\":1}},{\"id_tanaman\":3,\"posisi_x\":12,\"posisi_y\":13,\"ukuran\":{\"x\":1,\"y\":1}},{\"id_tanaman\":6,\"posisi_x\":2,\"posisi_y\":16,\"ukuran\":{\"x\":1,\"y\":1}},{\"id_tanaman\":6,\"posisi_x\":7,\"posisi_y\":16,\"ukuran\":{\"x\":1,\"y\":1}},{\"id_tanaman\":3,\"posisi_x\":12,\"posisi_y\":16,\"ukuran\":{\"x\":1,\"y\":1}},{\"id_tanaman\":3,\"posisi_x\":17,\"posisi_y\":16,\"ukuran\":{\"x\":1,\"y\":1}},{\"id_tanaman\":6,\"posisi_x\":2,\"posisi_y\":17,\"ukuran\":{\"x\":1,\"y\":1}},{\"id_tanaman\":6,\"posisi_x\":3,\"posisi_y\":17,\"ukuran\":{\"x\":1,\"y\":1}},{\"id_tanaman\":6,\"posisi_x\":6,\"posisi_y\":17,\"ukuran\":{\"x\":1,\"y\":1}},{\"id_tanaman\":6,\"posisi_x\":7,\"posisi_y\":17,\"ukuran\":{\"x\":1,\"y\":1}},{\"id_tanaman\":3,\"posisi_x\":12,\"posisi_y\":17,\"ukuran\":{\"x\":1,\"y\":1}},{\"id_tanaman\":3,\"posisi_x\":13,\"posisi_y\":17,\"ukuran\":{\"x\":1,\"y\":1}},{\"id_tanaman\":3,\"posisi_x\":16,\"posisi_y\":17,\"ukuran\":{\"x\":1,\"y\":1}},{\"id_tanaman\":3,\"posisi_x\":17,\"posisi_y\":17,\"ukuran\":{\"x\":1,\"y\":1}}],\"warna_grid\":{\"0_0\":\"#8B4513\",\"1_0\":\"#8B4513\",\"2_0\":\"#8B4513\",\"3_0\":\"#8B4513\",\"4_0\":\"#8B4513\",\"5_0\":\"#8B4513\",\"6_0\":\"#8B4513\",\"7_0\":\"#8B4513\",\"8_0\":\"#8B4513\",\"9_0\":\"#8B4513\",\"10_0\":\"#8B4513\",\"11_0\":\"#8B4513\",\"12_0\":\"#8B4513\",\"13_0\":\"#8B4513\",\"14_0\":\"#8B4513\",\"15_0\":\"#8B4513\",\"16_0\":\"#8B4513\",\"17_0\":\"#8B4513\",\"18_0\":\"#8B4513\",\"19_0\":\"#8B4513\",\"0_1\":\"#8B4513\",\"1_1\":\"#FF9800\",\"2_1\":\"#FF9800\",\"3_1\":\"#FF9800\",\"4_1\":\"#FF9800\",\"5_1\":\"#FF9800\",\"6_1\":\"#FF9800\",\"7_1\":\"#FF9800\",\"8_1\":\"#FF9800\",\"9_1\":\"#FFE4B5\",\"10_1\":\"#FFE4B5\",\"11_1\":\"#CD5C5C\",\"12_1\":\"#CD5C5C\",\"13_1\":\"#CD5C5C\",\"14_1\":\"#CD5C5C\",\"15_1\":\"#CD5C5C\",\"16_1\":\"#CD5C5C\",\"17_1\":\"#CD5C5C\",\"18_1\":\"#CD5C5C\",\"19_1\":\"#8B4513\",\"0_2\":\"#8B4513\",\"1_2\":\"#FF9800\",\"2_2\":\"#FFC107\",\"3_2\":\"#FFC107\",\"4_2\":\"#FFC107\",\"5_2\":\"#FFC107\",\"6_2\":\"#FFC107\",\"7_2\":\"#FFC107\",\"8_2\":\"#FF9800\",\"9_2\":\"#FFE4B5\",\"10_2\":\"#FFE4B5\",\"11_2\":\"#CD5C5C\",\"12_2\":\"#E9967A\",\"13_2\":\"#E9967A\",\"14_2\":\"#E9967A\",\"15_2\":\"#E9967A\",\"16_2\":\"#E9967A\",\"17_2\":\"#E9967A\",\"18_2\":\"#CD5C5C\",\"19_2\":\"#8B4513\",\"0_3\":\"#8B4513\",\"1_3\":\"#FF9800\",\"2_3\":\"#FFC107\",\"3_3\":\"#FFC107\",\"4_3\":\"#FFC107\",\"5_3\":\"#FFC107\",\"6_3\":\"#FFC107\",\"7_3\":\"#FFC107\",\"8_3\":\"#FF9800\",\"9_3\":\"#FFE4B5\",\"10_3\":\"#FFE4B5\",\"11_3\":\"#CD5C5C\",\"12_3\":\"#E9967A\",\"13_3\":\"#E9967A\",\"14_3\":\"#E9967A\",\"15_3\":\"#E9967A\",\"16_3\":\"#E9967A\",\"17_3\":\"#E9967A\",\"18_3\":\"#CD5C5C\",\"19_3\":\"#8B4513\",\"0_4\":\"#8B4513\",\"1_4\":\"#FF9800\",\"2_4\":\"#FFC107\",\"3_4\":\"#FFC107\",\"4_4\":\"#FFC107\",\"5_4\":\"#FFC107\",\"6_4\":\"#FFC107\",\"7_4\":\"#FFC107\",\"8_4\":\"#FFC107\",\"9_4\":\"#FFE4B5\",\"10_4\":\"#FFE4B5\",\"11_4\":\"#E9967A\",\"12_4\":\"#E9967A\",\"13_4\":\"#E9967A\",\"14_4\":\"#E9967A\",\"15_4\":\"#E9967A\",\"16_4\":\"#E9967A\",\"17_4\":\"#E9967A\",\"18_4\":\"#CD5C5C\",\"19_4\":\"#8B4513\",\"0_5\":\"#8B4513\",\"1_5\":\"#FF9800\",\"2_5\":\"#FFC107\",\"3_5\":\"#FFC107\",\"4_5\":\"#FFC107\",\"5_5\":\"#FFC107\",\"6_5\":\"#FFC107\",\"7_5\":\"#FFC107\",\"8_5\":\"#FFC107\",\"9_5\":\"#FFE4B5\",\"10_5\":\"#FFE4B5\",\"11_5\":\"#E9967A\",\"12_5\":\"#E9967A\",\"13_5\":\"#E9967A\",\"14_5\":\"#E9967A\",\"15_5\":\"#E9967A\",\"16_5\":\"#E9967A\",\"17_5\":\"#E9967A\",\"18_5\":\"#CD5C5C\",\"19_5\":\"#8B4513\",\"0_6\":\"#8B4513\",\"1_6\":\"#FF9800\",\"2_6\":\"#FFC107\",\"3_6\":\"#FFC107\",\"4_6\":\"#FFC107\",\"5_6\":\"#FFC107\",\"6_6\":\"#FFC107\",\"7_6\":\"#FFC107\",\"8_6\":\"#FF9800\",\"9_6\":\"#FFE4B5\",\"10_6\":\"#FFE4B5\",\"11_6\":\"#CD5C5C\",\"12_6\":\"#E9967A\",\"13_6\":\"#E9967A\",\"14_6\":\"#E9967A\",\"15_6\":\"#E9967A\",\"16_6\":\"#E9967A\",\"17_6\":\"#E9967A\",\"18_6\":\"#CD5C5C\",\"19_6\":\"#8B4513\",\"0_7\":\"#8B4513\",\"1_7\":\"#FF9800\",\"2_7\":\"#FFC107\",\"3_7\":\"#FFC107\",\"4_7\":\"#FFC107\",\"5_7\":\"#FFC107\",\"6_7\":\"#FFC107\",\"7_7\":\"#FFC107\",\"8_7\":\"#FF9800\",\"9_7\":\"#FFE4B5\",\"10_7\":\"#FFE4B5\",\"11_7\":\"#CD5C5C\",\"12_7\":\"#E9967A\",\"13_7\":\"#E9967A\",\"14_7\":\"#E9967A\",\"15_7\":\"#E9967A\",\"16_7\":\"#E9967A\",\"17_7\":\"#E9967A\",\"18_7\":\"#CD5C5C\",\"19_7\":\"#8B4513\",\"0_8\":\"#8B4513\",\"1_8\":\"#FF9800\",\"2_8\":\"#FF9800\",\"3_8\":\"#FF9800\",\"4_8\":\"#FFC107\",\"5_8\":\"#FFC107\",\"6_8\":\"#FF9800\",\"7_8\":\"#FF9800\",\"8_8\":\"#FF9800\",\"9_8\":\"#FFE4B5\",\"10_8\":\"#FFE4B5\",\"11_8\":\"#CD5C5C\",\"12_8\":\"#CD5C5C\",\"13_8\":\"#CD5C5C\",\"14_8\":\"#E9967A\",\"15_8\":\"#E9967A\",\"16_8\":\"#CD5C5C\",\"17_8\":\"#CD5C5C\",\"18_8\":\"#CD5C5C\",\"19_8\":\"#8B4513\",\"0_9\":\"#8B4513\",\"1_9\":\"#FFE4B5\",\"2_9\":\"#FFE4B5\",\"3_9\":\"#FFE4B5\",\"4_9\":\"#FFE4B5\",\"5_9\":\"#FFE4B5\",\"6_9\":\"#FFE4B5\",\"7_9\":\"#FFE4B5\",\"8_9\":\"#FFE4B5\",\"9_9\":\"#FFE4B5\",\"10_9\":\"#FFE4B5\",\"11_9\":\"#FFE4B5\",\"12_9\":\"#FFE4B5\",\"13_9\":\"#FFE4B5\",\"14_9\":\"#FFE4B5\",\"15_9\":\"#FFE4B5\",\"16_9\":\"#FFE4B5\",\"17_9\":\"#FFE4B5\",\"18_9\":\"#FFE4B5\",\"19_9\":\"#8B4513\",\"0_10\":\"#8B4513\",\"1_10\":\"#FFE4B5\",\"2_10\":\"#FFE4B5\",\"3_10\":\"#FFE4B5\",\"4_10\":\"#FFE4B5\",\"5_10\":\"#FFE4B5\",\"6_10\":\"#FFE4B5\",\"7_10\":\"#FFE4B5\",\"8_10\":\"#FFE4B5\",\"9_10\":\"#FFE4B5\",\"10_10\":\"#FFE4B5\",\"11_10\":\"#FFE4B5\",\"12_10\":\"#FFE4B5\",\"13_10\":\"#FFE4B5\",\"14_10\":\"#FFE4B5\",\"15_10\":\"#FFE4B5\",\"16_10\":\"#FFE4B5\",\"17_10\":\"#FFE4B5\",\"18_10\":\"#FFE4B5\",\"19_10\":\"#8B4513\",\"0_11\":\"#8B4513\",\"1_11\":\"#32CD32\",\"2_11\":\"#32CD32\",\"3_11\":\"#32CD32\",\"4_11\":\"#9ACD32\",\"5_11\":\"#9ACD32\",\"6_11\":\"#32CD32\",\"7_11\":\"#32CD32\",\"8_11\":\"#32CD32\",\"9_11\":\"#FFE4B5\",\"10_11\":\"#FFE4B5\",\"11_11\":\"#483D8B\",\"12_11\":\"#483D8B\",\"13_11\":\"#483D8B\",\"14_11\":\"#4682B4\",\"15_11\":\"#4682B4\",\"16_11\":\"#483D8B\",\"17_11\":\"#483D8B\",\"18_11\":\"#483D8B\",\"19_11\":\"#8B4513\",\"0_12\":\"#8B4513\",\"1_12\":\"#32CD32\",\"2_12\":\"#9ACD32\",\"3_12\":\"#9ACD32\",\"4_12\":\"#9ACD32\",\"5_12\":\"#9ACD32\",\"6_12\":\"#9ACD32\",\"7_12\":\"#9ACD32\",\"8_12\":\"#32CD32\",\"9_12\":\"#FFE4B5\",\"10_12\":\"#FFE4B5\",\"11_12\":\"#483D8B\",\"12_12\":\"#4682B4\",\"13_12\":\"#4682B4\",\"14_12\":\"#4682B4\",\"15_12\":\"#4682B4\",\"16_12\":\"#4682B4\",\"17_12\":\"#4682B4\",\"18_12\":\"#483D8B\",\"19_12\":\"#8B4513\",\"0_13\":\"#8B4513\",\"1_13\":\"#32CD32\",\"2_13\":\"#9ACD32\",\"3_13\":\"#9ACD32\",\"4_13\":\"#9ACD32\",\"5_13\":\"#9ACD32\",\"6_13\":\"#9ACD32\",\"7_13\":\"#9ACD32\",\"8_13\":\"#32CD32\",\"9_13\":\"#FFE4B5\",\"10_13\":\"#FFE4B5\",\"11_13\":\"#483D8B\",\"12_13\":\"#4682B4\",\"13_13\":\"#4682B4\",\"14_13\":\"#4682B4\",\"15_13\":\"#4682B4\",\"16_13\":\"#4682B4\",\"17_13\":\"#4682B4\",\"18_13\":\"#483D8B\",\"19_13\":\"#8B4513\",\"0_14\":\"#8B4513\",\"1_14\":\"#32CD32\",\"2_14\":\"#9ACD32\",\"3_14\":\"#9ACD32\",\"4_14\":\"#9ACD32\",\"5_14\":\"#9ACD32\",\"6_14\":\"#9ACD32\",\"7_14\":\"#9ACD32\",\"8_14\":\"#9ACD32\",\"9_14\":\"#FFE4B5\",\"10_14\":\"#FFE4B5\",\"11_14\":\"#4682B4\",\"12_14\":\"#4682B4\",\"13_14\":\"#4682B4\",\"14_14\":\"#4682B4\",\"15_14\":\"#4682B4\",\"16_14\":\"#4682B4\",\"17_14\":\"#4682B4\",\"18_14\":\"#483D8B\",\"19_14\":\"#8B4513\",\"0_15\":\"#8B4513\",\"1_15\":\"#32CD32\",\"2_15\":\"#9ACD32\",\"3_15\":\"#9ACD32\",\"4_15\":\"#9ACD32\",\"5_15\":\"#9ACD32\",\"6_15\":\"#9ACD32\",\"7_15\":\"#9ACD32\",\"8_15\":\"#9ACD32\",\"9_15\":\"#FFE4B5\",\"10_15\":\"#FFE4B5\",\"11_15\":\"#4682B4\",\"12_15\":\"#4682B4\",\"13_15\":\"#4682B4\",\"14_15\":\"#4682B4\",\"15_15\":\"#4682B4\",\"16_15\":\"#4682B4\",\"17_15\":\"#4682B4\",\"18_15\":\"#483D8B\",\"19_15\":\"#8B4513\",\"0_16\":\"#8B4513\",\"1_16\":\"#32CD32\",\"2_16\":\"#9ACD32\",\"3_16\":\"#9ACD32\",\"4_16\":\"#9ACD32\",\"5_16\":\"#9ACD32\",\"6_16\":\"#9ACD32\",\"7_16\":\"#9ACD32\",\"8_16\":\"#32CD32\",\"9_16\":\"#FFE4B5\",\"10_16\":\"#FFE4B5\",\"11_16\":\"#483D8B\",\"12_16\":\"#4682B4\",\"13_16\":\"#4682B4\",\"14_16\":\"#4682B4\",\"15_16\":\"#4682B4\",\"16_16\":\"#4682B4\",\"17_16\":\"#4682B4\",\"18_16\":\"#483D8B\",\"19_16\":\"#8B4513\",\"0_17\":\"#8B4513\",\"1_17\":\"#32CD32\",\"2_17\":\"#9ACD32\",\"3_17\":\"#9ACD32\",\"4_17\":\"#9ACD32\",\"5_17\":\"#9ACD32\",\"6_17\":\"#9ACD32\",\"7_17\":\"#9ACD32\",\"8_17\":\"#32CD32\",\"9_17\":\"#FFE4B5\",\"10_17\":\"#FFE4B5\",\"11_17\":\"#483D8B\",\"12_17\":\"#4682B4\",\"13_17\":\"#4682B4\",\"14_17\":\"#4682B4\",\"15_17\":\"#4682B4\",\"16_17\":\"#4682B4\",\"17_17\":\"#4682B4\",\"18_17\":\"#483D8B\",\"19_17\":\"#8B4513\",\"0_18\":\"#8B4513\",\"1_18\":\"#32CD32\",\"2_18\":\"#32CD32\",\"3_18\":\"#32CD32\",\"4_18\":\"#32CD32\",\"5_18\":\"#32CD32\",\"6_18\":\"#32CD32\",\"7_18\":\"#32CD32\",\"8_18\":\"#32CD32\",\"9_18\":\"#FFE4B5\",\"10_18\":\"#FFE4B5\",\"11_18\":\"#483D8B\",\"12_18\":\"#483D8B\",\"13_18\":\"#483D8B\",\"14_18\":\"#483D8B\",\"15_18\":\"#483D8B\",\"16_18\":\"#483D8B\",\"17_18\":\"#483D8B\",\"18_18\":\"#483D8B\",\"19_18\":\"#8B4513\",\"0_19\":\"#8B4513\",\"1_19\":\"#8B4513\",\"2_19\":\"#8B4513\",\"3_19\":\"#8B4513\",\"4_19\":\"#8B4513\",\"5_19\":\"#8B4513\",\"6_19\":\"#8B4513\",\"7_19\":\"#8B4513\",\"8_19\":\"#8B4513\",\"9_19\":\"#FFE4B5\",\"10_19\":\"#FFE4B5\",\"11_19\":\"#8B4513\",\"12_19\":\"#8B4513\",\"13_19\":\"#8B4513\",\"14_19\":\"#8B4513\",\"15_19\":\"#8B4513\",\"16_19\":\"#8B4513\",\"17_19\":\"#8B4513\",\"18_19\":\"#8B4513\",\"19_19\":\"#8B4513\"},\"bayangan\":[{\"posisi_x\":14,\"posisi_y\":11,\"warna\":\"#999999\"},{\"posisi_x\":15,\"posisi_y\":11,\"warna\":\"#999999\"},{\"posisi_x\":14,\"posisi_y\":12,\"warna\":\"#999999\"},{\"posisi_x\":15,\"posisi_y\":12,\"warna\":\"#999999\"},{\"posisi_x\":14,\"posisi_y\":13,\"warna\":\"#999999\"},{\"posisi_x\":15,\"posisi_y\":13,\"warna\":\"#999999\"},{\"posisi_x\":11,\"posisi_y\":14,\"warna\":\"#999999\"},{\"posisi_x\":12,\"posisi_y\":14,\"warna\":\"#999999\"},{\"posisi_x\":13,\"posisi_y\":14,\"warna\":\"#999999\"},{\"posisi_x\":14,\"posisi_y\":14,\"warna\":\"#999999\"},{\"posisi_x\":15,\"posisi_y\":14,\"warna\":\"#999999\"},{\"posisi_x\":11,\"posisi_y\":15,\"warna\":\"#999999\"},{\"posisi_x\":12,\"posisi_y\":15,\"warna\":\"#999999\"},{\"posisi_x\":13,\"posisi_y\":15,\"warna\":\"#999999\"},{\"posisi_x\":14,\"posisi_y\":15,\"warna\":\"#999999\"},{\"posisi_x\":15,\"posisi_y\":15,\"warna\":\"#999999\"}]}');

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

--
-- Dumping data for table `koleksi_tanaman`
--

INSERT INTO `koleksi_tanaman` (`id`, `id_user`, `id_tanaman`, `created_at`, `updated_at`) VALUES
(6, 8, 5, '2025-08-08 02:33:45', '2025-08-08 02:33:45'),
(7, 8, 4, '2025-08-08 05:48:37', '2025-08-08 05:48:37'),
(8, 8, 3, '2025-08-08 05:48:44', '2025-08-08 05:48:44'),
(9, 8, 6, '2025-08-08 05:48:49', '2025-08-08 05:48:49'),
(10, 8, 1, '2025-08-08 08:29:07', '2025-08-08 08:29:07'),
(11, 8, 7, '2025-08-09 00:12:48', '2025-08-09 00:12:48');

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

--
-- Dumping data for table `personal_access_tokens`
--

INSERT INTO `personal_access_tokens` (`id`, `tokenable_type`, `tokenable_id`, `name`, `token`, `abilities`, `last_used_at`, `expires_at`, `created_at`, `updated_at`) VALUES
(1, 'App\\Models\\User', 3, 'auth_token', '2de4a7a59a5e53f016277ea4afac70ace8727da76f68e8998605bb6ba879d8ed', '[\"*\"]', NULL, NULL, '2025-08-05 22:36:24', '2025-08-05 22:36:24'),
(2, 'App\\Models\\User', 4, 'auth_token', '2d4c641a4a50d04c40ac0b16e5f2fb3b0379be2233f09a6402109e5abe37fbc6', '[\"*\"]', NULL, NULL, '2025-08-05 22:36:53', '2025-08-05 22:36:53'),
(3, 'App\\Models\\User', 4, 'auth_token', 'c506a55756aa214f47e8dbcf74ee3f758b8fa4e2a8d6e0cb2f4fad678ee4075f', '[\"*\"]', NULL, NULL, '2025-08-05 22:37:11', '2025-08-05 22:37:11'),
(4, 'App\\Models\\User', 4, 'auth_token', '53af664d3980d00233c7f7412397cd4f8a5638568a8054d64ef52f7e1fceb0f1', '[\"*\"]', '2025-08-05 23:20:27', NULL, '2025-08-05 22:45:48', '2025-08-05 23:20:27'),
(5, 'App\\Models\\User', 4, 'auth_token', '77b2ac9f14f2d95539d5c2e40cddde536e8d0775bb5524065de559d9ba5586e0', '[\"*\"]', NULL, NULL, '2025-08-05 23:21:07', '2025-08-05 23:21:07'),
(6, 'App\\Models\\User', 5, 'auth_token', 'af4d418925ef241d9853b44e424a6c36885c41a12631463126e8b3f684072ca5', '[\"*\"]', NULL, NULL, '2025-08-05 23:22:52', '2025-08-05 23:22:52'),
(7, 'App\\Models\\User', 5, 'auth_token', '381971334cc81bfb59a4a7ac6d8d551ca9f16d45a2831d6b46f0d86fef1a247f', '[\"*\"]', '2025-08-05 23:25:04', NULL, '2025-08-05 23:23:05', '2025-08-05 23:25:04'),
(8, 'App\\Models\\User', 5, 'auth_token', '4e3b44ce632cc97128c37cf3bae6c60531c9d863051a77efde8d63d6d09480dc', '[\"*\"]', NULL, NULL, '2025-08-05 23:27:58', '2025-08-05 23:27:58'),
(9, 'App\\Models\\User', 5, 'auth_token', '38838145a43a868aa33aa27713675e6f7920aa375e5df4e0209dc88c7cfe1cbc', '[\"*\"]', NULL, NULL, '2025-08-06 00:28:15', '2025-08-06 00:28:15'),
(10, 'App\\Models\\User', 5, 'auth_token', 'df0ace637539acd9c2b413a8536f9c67af8a0526ce1a9d481e64331e23708d3c', '[\"*\"]', '2025-08-06 00:53:17', NULL, '2025-08-06 00:31:23', '2025-08-06 00:53:17'),
(11, 'App\\Models\\User', 5, 'auth_token', 'c8f351820a9d7cae6fb631b1ab54c05e8db1e281c45ff79fc6891ceaee38e260', '[\"*\"]', '2025-08-06 01:21:15', NULL, '2025-08-06 01:04:20', '2025-08-06 01:21:15'),
(12, 'App\\Models\\User', 5, 'auth_token', '7024cec142aed3e562e48845cad5e6bb75e70588f5c4fe0da869ebaba725d0a7', '[\"*\"]', '2025-08-06 02:11:30', NULL, '2025-08-06 01:15:26', '2025-08-06 02:11:30'),
(13, 'App\\Models\\User', 5, 'auth_token', '6db2f7a3b93840089d5936bfc1493fff021561791962fb4c495d328e5b58139d', '[\"*\"]', '2025-08-06 01:47:45', NULL, '2025-08-06 01:21:23', '2025-08-06 01:47:45'),
(14, 'App\\Models\\User', 4, 'auth_token', '980ddc8d8220732bca0e250dced1ad337d491c299cd17e795f55a041e6b1a635', '[\"*\"]', '2025-08-06 01:49:18', NULL, '2025-08-06 01:49:12', '2025-08-06 01:49:18'),
(15, 'App\\Models\\User', 5, 'auth_token', 'ddb195461c587cc8500c3c996af88b4be675d4b9660789d002a94a44f62d87d1', '[\"*\"]', '2025-08-06 02:30:34', NULL, '2025-08-06 01:49:29', '2025-08-06 02:30:34'),
(16, 'App\\Models\\User', 4, 'auth_token', '79bc99ccc658f33f837bb8f8def0ab97d25cabbd20398667f9a5dab077a522f7', '[\"*\"]', '2025-08-06 02:31:00', NULL, '2025-08-06 02:30:44', '2025-08-06 02:31:00'),
(17, 'App\\Models\\User', 5, 'auth_token', '0f41932710f1472fbc372cf988f4914d72a35866c0155b03f03fbc971b693c51', '[\"*\"]', '2025-08-06 05:13:30', NULL, '2025-08-06 02:31:06', '2025-08-06 05:13:30'),
(18, 'App\\Models\\User', 6, 'auth_token', '0d8d7df80e316b10894ab8e1be8b983cef66de81b2e2be879b3da59b958ff289', '[\"*\"]', NULL, NULL, '2025-08-06 22:15:51', '2025-08-06 22:15:51'),
(19, 'App\\Models\\User', 6, 'auth_token', 'e3f0006754c9e06c6ae5a32ddc9c9422ee548ae8dd64a7d2c0e28ff338a93691', '[\"*\"]', NULL, NULL, '2025-08-06 22:16:22', '2025-08-06 22:16:22'),
(20, 'App\\Models\\User', 6, 'auth_token', 'eea71728730058bd0ada05912fd07cea5618ff4f83eca21c7a8f69d8f2ead343', '[\"*\"]', '2025-08-06 22:32:47', NULL, '2025-08-06 22:24:37', '2025-08-06 22:32:47'),
(21, 'App\\Models\\User', 6, 'auth_token', '8b1ee7c43b75ad1af872533210a39039f145ef24a04dccd96d24330921f1b916', '[\"*\"]', '2025-08-07 01:57:44', NULL, '2025-08-06 22:34:17', '2025-08-07 01:57:44'),
(22, 'App\\Models\\User', 6, 'auth_token', 'bd890de84189092f55f4ef3d543a852579e51c9fe5e0ff36b7e5572b6f3be57f', '[\"*\"]', NULL, NULL, '2025-08-07 02:08:35', '2025-08-07 02:08:35'),
(23, 'App\\Models\\User', 6, 'auth_token', '18cdb2a7c150fd5062ac2de8f44d1e2f432a2421e4d11e3251675feaf33408a6', '[\"*\"]', '2025-08-07 07:43:06', NULL, '2025-08-07 07:42:47', '2025-08-07 07:43:06'),
(24, 'App\\Models\\User', 7, 'auth_token', '2047981683e42760e05d011e2bef08d4cd23771b38d0e5d898c61baf3cd4bb83', '[\"*\"]', NULL, NULL, '2025-08-07 07:58:13', '2025-08-07 07:58:13'),
(25, 'App\\Models\\User', 7, 'auth_token', '5acaacaa1917e497ef4c63e98c4a0303987cd59078e39d1c1d1de505e769aa97', '[\"*\"]', '2025-08-07 08:04:49', NULL, '2025-08-07 07:58:23', '2025-08-07 08:04:49'),
(26, 'App\\Models\\User', 7, 'auth_token', 'd581e842b794ea99d1f8af00f06b6ebf5b8a9a884c519c1cceb4aabeb5d60860', '[\"*\"]', '2025-08-07 09:17:57', NULL, '2025-08-07 08:44:01', '2025-08-07 09:17:57'),
(27, 'App\\Models\\User', 7, 'auth_token', 'e2bc63996848ace02a4bd2d9a2af226f575c2c99c80bcb184c4b24fede8d2109', '[\"*\"]', '2025-08-07 23:51:19', NULL, '2025-08-07 23:47:01', '2025-08-07 23:51:19'),
(28, 'App\\Models\\User', 8, 'auth_token', '09e1e93c6b02b466ece34a09a4f628b385b70b698a6e5e910da9b42f8c953735', '[\"*\"]', NULL, NULL, '2025-08-08 02:33:17', '2025-08-08 02:33:17'),
(29, 'App\\Models\\User', 8, 'auth_token', '2cdc1504470ca7f822e845093a963909c6bdb514e04e80a5491568d228296025', '[\"*\"]', '2025-08-08 03:28:11', NULL, '2025-08-08 02:33:29', '2025-08-08 03:28:11'),
(30, 'App\\Models\\User', 4, 'auth_token', '6bea19b2ab80c5cfd729cb515d7d12aaabcb8e2f37ef6be97f03024248ad1242', '[\"*\"]', '2025-08-08 03:30:39', NULL, '2025-08-08 03:28:33', '2025-08-08 03:30:39'),
(31, 'App\\Models\\User', 5, 'auth_token', '85a10b32cac1d26ea6fd91f4b68767a53511d4877defcd47b67b274227841569', '[\"*\"]', '2025-08-08 03:31:13', NULL, '2025-08-08 03:31:06', '2025-08-08 03:31:13'),
(32, 'App\\Models\\User', 8, 'auth_token', '8b23c9c697d10c586896f5b8a900cc514915c83bb586679a94359260c5760d0f', '[\"*\"]', '2025-08-08 04:28:00', NULL, '2025-08-08 03:31:36', '2025-08-08 04:28:00'),
(33, 'App\\Models\\User', 8, 'auth_token', '5bf26059032d00d80c7b75d978b4046f0e40abc0dbdf8765a305704c3ab197c8', '[\"*\"]', '2025-08-08 08:22:21', NULL, '2025-08-08 04:28:29', '2025-08-08 08:22:21'),
(34, 'App\\Models\\User', 8, 'auth_token', 'd1cce004198cabc80c8313e1bff836955699cfb9b497d675b8d25fd9fe1b98b5', '[\"*\"]', '2025-08-08 08:30:45', NULL, '2025-08-08 08:28:57', '2025-08-08 08:30:45'),
(35, 'App\\Models\\User', 8, 'auth_token', '46fd1c9536e0f0bdb98786373b69f23ad3899193ba6ef25e2012173391e08b9d', '[\"*\"]', '2025-08-08 09:01:58', NULL, '2025-08-08 09:00:22', '2025-08-08 09:01:58'),
(36, 'App\\Models\\User', 8, 'auth_token', '56cb22776b2db366057757bca353a86f312f8113614ca3db5bb79d7fb6cd62ad', '[\"*\"]', '2025-08-08 21:02:13', NULL, '2025-08-08 20:54:51', '2025-08-08 21:02:13'),
(37, 'App\\Models\\User', 8, 'auth_token', 'c4f546df940efb455557befb5d9aaecbc7e2fffe94edc13fbf4496f9ac3afcb4', '[\"*\"]', NULL, NULL, '2025-08-08 21:06:05', '2025-08-08 21:06:05'),
(38, 'App\\Models\\User', 8, 'auth_token', '0bc1e3777ff20b2af153f3162b83a959ca1f76041bf65440a7ce566c063619d1', '[\"*\"]', '2025-08-08 21:12:03', NULL, '2025-08-08 21:06:58', '2025-08-08 21:12:03'),
(39, 'App\\Models\\User', 8, 'auth_token', 'b215e20a6bbfbb1a6332e722fdafd3a433dd57f1e5f386d17befeaf336298a50', '[\"*\"]', '2025-08-08 22:00:22', NULL, '2025-08-08 21:57:07', '2025-08-08 22:00:22'),
(40, 'App\\Models\\User', 8, 'auth_token', '2e173aad941973b37f0d33b35bc2c23e674b37c94b482e608d7a53d9ad680de9', '[\"*\"]', '2025-08-09 00:16:02', NULL, '2025-08-09 00:12:03', '2025-08-09 00:16:02');

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

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`id`, `user_id`, `ip_address`, `user_agent`, `payload`, `last_activity`) VALUES
('GphOnx8SaIFw5onWw7gxKqUYSKKqEXeeL1Feekt0', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36 OPR/120.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiUzQzN280VG0xWFZKU092UmNFcGd6T0x3S1c5TXRRTDJ1ZldHRDhneCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1754376769),
('HRCDxFfMmJNIe4naWUKyP0FyGoflLQhO6fkh64mW', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36 OPR/120.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiSWNKNDd6OW5FRjRWemN6cll2b08xa1VGV1I1M000NTBuNGIwdzJTdCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1754455691),
('muvpSpPjdnYYBv9S3EdGOklVDnS90zx2pveP2Oyl', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36 OPR/120.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoia0xydGxDQTZjV0VHRnZQeWp4V3hqMTF2YkhUeUFZVmpESERaaFZDUyI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1754368615),
('ras6PKuEACrkl9Z45k0aD5rN1wHVUTwC0I3JBDub', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36 OPR/120.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiS2N2MklKT3hHSUo2MTFFMmNvYXp2YU04bjNlRzd4Rm93R0lHaDE4RSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1754314073);

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

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `username`, `email`, `password`, `created_at`, `updated_at`) VALUES
(1, 'testestes', 'testestes@gmail.com', '$2y$12$Y3dIRmZsgxSvxcULHCo9ku9zXvrj8yISP3MjTmi/hLl22XJ9fK4la', '2025-08-05 22:32:51', '2025-08-05 22:32:51'),
(2, 'asdasdasd', 'asdasdasd@gmail.com', '$2y$12$nMBHyLYxHtAtXilXZyjEGuYDQXp9ES1pEejpjjyXdujAHmgI5cDta', '2025-08-05 22:34:37', '2025-08-05 22:34:37'),
(3, 'wokwokw', 'wokwokw@gmail.com', '$2y$12$WP8n9noHtx8GYRHM2KVVkeZX1WD0cqBSy2j/QWJtATMq1pG8AdwHC', '2025-08-05 22:36:24', '2025-08-05 22:36:24'),
(4, 'lalalala', 'lalalala@gmail.com', '$2y$12$g.zbdRyG89JAtgCRMJ696eDqL89kKSlC6tOEJQkBX7cUfbpbMSpsW', '2025-08-05 22:36:53', '2025-08-05 22:36:53'),
(5, 'bayu', 'bayu@gmail.com', '$2y$12$1.3TtQntCXn3mTYZDJEtfOLwuGIHOgTtiNh4MLOC969..dn3T0ply', '2025-08-05 23:22:52', '2025-08-05 23:22:52'),
(6, 'marco', 'marco@gmail.com', '$2y$12$2AgyLj4XrwpQqYRqkZ0CkOe/zUV4SMVXZBe/DyvWc2/az27.EAPhu', '2025-08-06 22:15:51', '2025-08-06 22:15:51'),
(7, 'ujang', 'ujang@gmail.com', '$2y$12$Hshc0lhyIzIyVtOXx8QGzucbVP4NVyC0QGI/9sPL4YcKK3lKeF9uq', '2025-08-07 07:58:13', '2025-08-07 07:58:13'),
(8, 'a', 'a@gmail.com', '$2y$12$nuYOIpicDwyml3roFtXETO9imTsODZnFL8UcQHTwJUDKIW6X8Psr2', '2025-08-08 02:33:17', '2025-08-08 02:33:17');

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
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

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

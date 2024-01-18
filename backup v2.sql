-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: db
-- Waktu pembuatan: 18 Jan 2024 pada 03.09
-- Versi server: 8.1.0
-- Versi PHP: 8.2.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `bigio`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `Chapter`
--

CREATE TABLE `Chapter` (
  `chapter_id` int NOT NULL,
  `title` varchar(255) NOT NULL,
  `story` longtext NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `story_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `Statuses`
--

CREATE TABLE `Statuses` (
  `status_id` int NOT NULL,
  `status_name` enum('Publish','Draft') NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data untuk tabel `Statuses`
--

INSERT INTO `Statuses` (`status_id`, `status_name`, `created_at`, `updated_at`) VALUES
(1, 'Draft', '2024-01-18 02:50:40', '2024-01-18 02:50:40');

-- --------------------------------------------------------

--
-- Struktur dari tabel `Stories`
--

CREATE TABLE `Stories` (
  `story_id` int NOT NULL,
  `title` varchar(255) NOT NULL,
  `author` varchar(255) NOT NULL,
  `synopsis` longtext NOT NULL,
  `category` enum('Financial','Technology','Health') NOT NULL,
  `status_id` int DEFAULT NULL,
  `image_path` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data untuk tabel `Stories`
--

INSERT INTO `Stories` (`story_id`, `title`, `author`, `synopsis`, `category`, `status_id`, `image_path`, `created_at`, `updated_at`) VALUES
(1, 'test', 'test', 'haihia', 'Financial', 1, NULL, '2024-01-18 02:54:55', '2024-01-18 02:54:55'),
(2, 'test', 'test', 'haihia', 'Financial', 1, '@example.jpg', '2024-01-18 02:56:40', '2024-01-18 02:56:40'),
(3, 'test', 'test', 'haihia', 'Financial', 1, 'haishds', '2024-01-18 03:06:49', '2024-01-18 03:06:49');

-- --------------------------------------------------------

--
-- Struktur dari tabel `StoryTags`
--

CREATE TABLE `StoryTags` (
  `story_id` int NOT NULL,
  `tag_id` int NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `Tags`
--

CREATE TABLE `Tags` (
  `tag_id` int NOT NULL,
  `tag_name` varchar(50) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `Chapter`
--
ALTER TABLE `Chapter`
  ADD PRIMARY KEY (`chapter_id`),
  ADD KEY `story_id` (`story_id`);

--
-- Indeks untuk tabel `Statuses`
--
ALTER TABLE `Statuses`
  ADD PRIMARY KEY (`status_id`);

--
-- Indeks untuk tabel `Stories`
--
ALTER TABLE `Stories`
  ADD PRIMARY KEY (`story_id`),
  ADD KEY `status_id` (`status_id`);

--
-- Indeks untuk tabel `StoryTags`
--
ALTER TABLE `StoryTags`
  ADD PRIMARY KEY (`story_id`,`tag_id`),
  ADD KEY `tag_id` (`tag_id`);

--
-- Indeks untuk tabel `Tags`
--
ALTER TABLE `Tags`
  ADD PRIMARY KEY (`tag_id`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `Chapter`
--
ALTER TABLE `Chapter`
  MODIFY `chapter_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `Stories`
--
ALTER TABLE `Stories`
  MODIFY `story_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT untuk tabel `Tags`
--
ALTER TABLE `Tags`
  MODIFY `tag_id` int NOT NULL AUTO_INCREMENT;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `Chapter`
--
ALTER TABLE `Chapter`
  ADD CONSTRAINT `Chapter_ibfk_1` FOREIGN KEY (`story_id`) REFERENCES `Stories` (`story_id`);

--
-- Ketidakleluasaan untuk tabel `Stories`
--
ALTER TABLE `Stories`
  ADD CONSTRAINT `Stories_ibfk_1` FOREIGN KEY (`status_id`) REFERENCES `Statuses` (`status_id`);

--
-- Ketidakleluasaan untuk tabel `StoryTags`
--
ALTER TABLE `StoryTags`
  ADD CONSTRAINT `StoryTags_ibfk_1` FOREIGN KEY (`story_id`) REFERENCES `Stories` (`story_id`),
  ADD CONSTRAINT `StoryTags_ibfk_2` FOREIGN KEY (`tag_id`) REFERENCES `Tags` (`tag_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

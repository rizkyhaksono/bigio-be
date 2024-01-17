SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

CREATE TABLE `Statuses` (
  `StatusID` int NOT NULL,
  `StatusName` enum('Publish','Draft') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `Statuses` (`StatusID`, `StatusName`) VALUES
(1, 'Draft');

CREATE TABLE `Stories` (
  `StoryID` int NOT NULL,
  `Title` varchar(255) NOT NULL,
  `Author` varchar(255) NOT NULL,
  `Category` enum('Financial','Technology','Health') NOT NULL,
  `StatusID` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data untuk tabel `Stories`
--

INSERT INTO `Stories` (`StoryID`, `Title`, `Author`, `Category`, `StatusID`) VALUES
(1, 'Test 2', 'Test 2', 'Technology', 1);

-- --------------------------------------------------------

--
-- Struktur dari tabel `StoryTags`
--

CREATE TABLE `StoryTags` (
  `StoryID` int NOT NULL,
  `TagID` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `Tags`
--

CREATE TABLE `Tags` (
  `TagID` int NOT NULL,
  `TagName` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data untuk tabel `Tags`
--

INSERT INTO `Tags` (`TagID`, `TagName`) VALUES
(1, 'Test tag');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `Statuses`
--
ALTER TABLE `Statuses`
  ADD PRIMARY KEY (`StatusID`);

--
-- Indeks untuk tabel `Stories`
--
ALTER TABLE `Stories`
  ADD PRIMARY KEY (`StoryID`),
  ADD KEY `StatusID` (`StatusID`);

--
-- Indeks untuk tabel `StoryTags`
--
ALTER TABLE `StoryTags`
  ADD PRIMARY KEY (`StoryID`,`TagID`),
  ADD KEY `TagID` (`TagID`);

--
-- Indeks untuk tabel `Tags`
--
ALTER TABLE `Tags`
  ADD PRIMARY KEY (`TagID`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `Statuses`
--
ALTER TABLE `Statuses`
  MODIFY `StatusID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT untuk tabel `Stories`
--
ALTER TABLE `Stories`
  MODIFY `StoryID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT untuk tabel `Tags`
--
ALTER TABLE `Tags`
  MODIFY `TagID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `Stories`
--
ALTER TABLE `Stories`
  ADD CONSTRAINT `Stories_ibfk_1` FOREIGN KEY (`StatusID`) REFERENCES `Statuses` (`StatusID`);

--
-- Ketidakleluasaan untuk tabel `StoryTags`
--
ALTER TABLE `StoryTags`
  ADD CONSTRAINT `StoryTags_ibfk_1` FOREIGN KEY (`StoryID`) REFERENCES `Stories` (`StoryID`),
  ADD CONSTRAINT `StoryTags_ibfk_2` FOREIGN KEY (`TagID`) REFERENCES `Tags` (`TagID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

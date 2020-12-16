-- phpMyAdmin SQL Dump
-- version 4.9.5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Dec 16, 2020 at 10:52 PM
-- Server version: 5.7.24
-- PHP Version: 7.4.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `geo_escape`
--

-- --------------------------------------------------------

--
-- Table structure for table `joueurs`
--

CREATE TABLE `joueurs` (
  `id` int(11) NOT NULL,
  `Nom` varchar(15) NOT NULL,
  `Temps` time DEFAULT NULL,
  `Picture` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `joueurs`
--

INSERT INTO `joueurs` (`id`, `Nom`, `Temps`, `Picture`) VALUES
(9, 'Toto', '01:17:02', 'Yoshi.png'),
(10, 'gus', '06:26:03', 'Yoshi.png'),
(14, 'Thomas', '01:37:09', 'No_picture.png'),
(16, 'Floxi', '01:30:03', 'No_picture.png'),
(17, 'Floxi', '01:32:07', 'No_picture.png'),
(18, 'Floriane', '07:51:06', 'Birdo.png'),
(19, 'Floriane', '02:18:00', 'No_picture.png'),
(23, 'Audrey', '21:51:03', 'Mario.png'),
(24, 'Kerggy', '01:36:00', 'No_picture.png'),
(25, 'Floxi', '05:14:00', 'Birdo.png'),
(44, 'SuperThomas95', '01:07:05', 'No_picture.png'),
(45, 'MomoLeMoineau', '09:09:05', 'Daisy.png');

-- --------------------------------------------------------

--
-- Table structure for table `objet`
--

CREATE TABLE `objet` (
  `id` int(11) NOT NULL,
  `nom` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `coord_X` float NOT NULL,
  `coord_Y` float NOT NULL,
  `zoom` int(18) NOT NULL,
  `icon` varchar(50) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `objet`
--

INSERT INTO `objet` (`id`, `nom`, `coord_X`, `coord_Y`, `zoom`, `icon`) VALUES
(1, 'Goldie', 49.1177, 6.17899, 5, 'Goldie.png'),
(2, 'Clef', 49.1214, 6.17311, 19, 'Clef.png'),
(3, 'Sapin', 49.116, 6.17882, 18, 'Sapin.png'),
(4, 'Fontaine', 49.116, 6.17039, 16, 'Fontaine.png'),
(5, 'Gouverneur', 49.1134, 6.1685, 18, 'Gouverneur.png'),
(6, 'Tribunal', 49.1171, 6.17073, 18, 'Tribunal.png'),
(7, 'Gare', 49.1096, 6.17681, 16, 'Train.png'),
(8, 'Bateau', 49.1168, 6.1665, 16, 'Bateau.png'),
(13, 'poste', 49.1177, 6.1784, 18, 'Poste.png'),
(11, 'Commissariat', 49.1214, 6.17301, 19, 'Porte.png'),
(12, 'missive', 49.1176, 6.1784, 18, 'Missive.png');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `joueurs`
--
ALTER TABLE `joueurs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `objet`
--
ALTER TABLE `objet`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `joueurs`
--
ALTER TABLE `joueurs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

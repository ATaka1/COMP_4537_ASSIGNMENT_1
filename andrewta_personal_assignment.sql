-- phpMyAdmin SQL Dump
-- version 4.9.5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Mar 19, 2021 at 03:39 PM
-- Server version: 10.3.28-MariaDB-log
-- PHP Version: 7.3.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `andrewta_personal_assignment`
--

-- --------------------------------------------------------

--
-- Table structure for table `ANSWER`
--

CREATE TABLE `ANSWER` (
  `ANSWER_ID` int(11) NOT NULL,
  `QUESTION_ID` int(11) NOT NULL,
  `ANSWER` varchar(100) NOT NULL,
  `IS_ANSWER` tinyint(1) DEFAULT NULL,
  `ANSWER_INDEX` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `ANSWER`
--

INSERT INTO `ANSWER` (`ANSWER_ID`, `QUESTION_ID`, `ANSWER`, `IS_ANSWER`, `ANSWER_INDEX`) VALUES
(1, 1, 'IT GRABS ALL THE RECORDS FROM THE DB', 0, 1),
(2, 1, 'IT DOES NOT GRAB ALL THE VALUES FROM THE DB', 1, 1),
(3, 2, 'IT IS A QUERY WITHIN A QUERY', 1, 0),
(4, 2, 'IT IS A QUERY THAT CHECKS FOR REFERENTIAL INTEGRETY', 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `QUESTION`
--

CREATE TABLE `QUESTION` (
  `QUESTION_ID` int(11) NOT NULL,
  `DESCRIPTION` varchar(100) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `QUESTION`
--

INSERT INTO `QUESTION` (`QUESTION_ID`, `DESCRIPTION`) VALUES
(1, 'WHAT DOES SELECT * FROM DB DO?'),
(2, 'WHAT IS A SUBQUERY?');

-- --------------------------------------------------------

--
-- Table structure for table `QUIZ`
--

CREATE TABLE `QUIZ` (
  `QUIZ_ID` int(11) NOT NULL,
  `TITLE` varchar(50) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `QUIZ`
--

INSERT INTO `QUIZ` (`QUIZ_ID`, `TITLE`) VALUES
(1, 'A QUIZ ABOUT SQL');

-- --------------------------------------------------------

--
-- Table structure for table `QUIZ_QUESTION`
--

CREATE TABLE `QUIZ_QUESTION` (
  `QUIZ_ID` int(11) NOT NULL,
  `QUESTION_ID` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `QUIZ_QUESTION`
--

INSERT INTO `QUIZ_QUESTION` (`QUIZ_ID`, `QUESTION_ID`) VALUES
(1, 1),
(1, 2);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `ANSWER`
--
ALTER TABLE `ANSWER`
  ADD PRIMARY KEY (`ANSWER_ID`),
  ADD KEY `QUESTION_ID` (`QUESTION_ID`);

--
-- Indexes for table `QUESTION`
--
ALTER TABLE `QUESTION`
  ADD PRIMARY KEY (`QUESTION_ID`);

--
-- Indexes for table `QUIZ`
--
ALTER TABLE `QUIZ`
  ADD PRIMARY KEY (`QUIZ_ID`);

--
-- Indexes for table `QUIZ_QUESTION`
--
ALTER TABLE `QUIZ_QUESTION`
  ADD KEY `QUIZ_ID` (`QUIZ_ID`),
  ADD KEY `QUESTION_ID` (`QUESTION_ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `ANSWER`
--
ALTER TABLE `ANSWER`
  MODIFY `ANSWER_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `QUESTION`
--
ALTER TABLE `QUESTION`
  MODIFY `QUESTION_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `QUIZ`
--
ALTER TABLE `QUIZ`
  MODIFY `QUIZ_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

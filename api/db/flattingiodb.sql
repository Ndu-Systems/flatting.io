-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 22, 2018 at 03:39 PM
-- Server version: 10.1.30-MariaDB
-- PHP Version: 7.2.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `flattingiodb`
--

-- --------------------------------------------------------

--
-- Table structure for table `announcements`
--

CREATE TABLE `announcements` (
  `AnnouncementId` int(11) NOT NULL,
  `Title` varchar(225) NOT NULL,
  `Subject` varchar(225) NOT NULL,
  `Body` varchar(500) NOT NULL,
  `PostDate` date NOT NULL,
  `IsBroadCast` tinyint(1) NOT NULL,
  `TenantId` int(11) DEFAULT NULL,
  `BuildingId` int(11) NOT NULL,
  `RoomId` int(11) DEFAULT NULL,
  `StatusId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `buildings`
--

CREATE TABLE `buildings` (
  `BuildingId` int(11) NOT NULL,
  `BuildingName` varchar(225) NOT NULL,
  `AddressLine1` varchar(225) NOT NULL,
  `AddressLine2` varchar(225) NOT NULL,
  `AddressLine3` varchar(225) NOT NULL,
  `City` varchar(225) NOT NULL,
  `PostCode` varchar(15) NOT NULL,
  `ManagerId` int(11) NOT NULL,
  `StatusId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `buildings`
--

INSERT INTO `buildings` (`BuildingId`, `BuildingName`, `AddressLine1`, `AddressLine2`, `AddressLine3`, `City`, `PostCode`, `ManagerId`, `StatusId`) VALUES
(1, 'Eyethu House', 'Maboneng Precint', 'Main street 201', 'Jabavu', 'Johanessburg', '2000', 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `logs`
--

CREATE TABLE `logs` (
  `LogId` int(11) NOT NULL,
  `Notes` varchar(225) NOT NULL,
  `DateOfLog` date NOT NULL,
  `StatusId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `maintenance`
--

CREATE TABLE `maintenance` (
  `MaintenanceId` int(11) NOT NULL,
  `Description` varchar(225) NOT NULL,
  `LogDate` date NOT NULL,
  `TenantId` int(11) NOT NULL,
  `RoomId` int(11) NOT NULL,
  `BuildingId` int(11) NOT NULL,
  `StaffId` int(11) NOT NULL,
  `LogId` int(11) NOT NULL,
  `StatusId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `maintenance`
--

INSERT INTO `maintenance` (`MaintenanceId`, `Description`, `LogDate`, `TenantId`, `RoomId`, `BuildingId`, `StaffId`, `LogId`, `StatusId`) VALUES
(1, 'Leaking Sink', '2018-04-18', 1, 1, 1, 2, 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `payments`
--

CREATE TABLE `payments` (
  `PaymentId` int(11) NOT NULL,
  `TenantId` int(11) NOT NULL,
  `RoomId` int(11) NOT NULL,
  `BuildingId` int(11) NOT NULL,
  `AmountDue` decimal(10,0) NOT NULL,
  `AmountPaid` decimal(10,0) NOT NULL,
  `OutstandingAmount` decimal(10,0) NOT NULL,
  `PaymentMonth` datetime NOT NULL,
  `StatusId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `RoleId` int(11) NOT NULL,
  `Description` varchar(225) NOT NULL,
  `StatusId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`RoleId`, `Description`, `StatusId`) VALUES
(1, 'Manager', 1),
(2, 'Supervisor', 1),
(3, 'General-worker', 1),
(4, 'Tenant', 1),
(5, 'Visitor', 1),
(6, 'Delivery', 1);

-- --------------------------------------------------------

--
-- Table structure for table `rooms`
--

CREATE TABLE `rooms` (
  `RoomId` int(11) NOT NULL,
  `RoomNumber` varchar(25) NOT NULL,
  `Floor` varchar(25) NOT NULL,
  `TenantId` int(11) NOT NULL,
  `RoomTypeId` int(11) NOT NULL,
  `BuildingId` int(11) NOT NULL,
  `StatusId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `rooms`
--

INSERT INTO `rooms` (`RoomId`, `RoomNumber`, `Floor`, `TenantId`, `RoomTypeId`, `BuildingId`, `StatusId`) VALUES
(1, 'EH202', '2', 1, 1, 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `roomtypes`
--

CREATE TABLE `roomtypes` (
  `RoomTypeId` int(11) NOT NULL,
  `NumberOfRooms` int(11) NOT NULL,
  `Description` varchar(225) NOT NULL,
  `OccupationLimit` int(11) NOT NULL,
  `Availability` int(11) NOT NULL,
  `Add-Ons` varchar(225) NOT NULL,
  `StatusId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `roomtypes`
--

INSERT INTO `roomtypes` (`RoomTypeId`, `NumberOfRooms`, `Description`, `OccupationLimit`, `Availability`, `Add-Ons`, `StatusId`) VALUES
(1, 4, 'Deluxe 1 bedroom with open plan kitchen, dinning room an a 1 bathroom with a shower', 3, 20, 'Built in Kitchen board, with four plate stove', 1),
(2, 5, 'Deluxe 2 bedroom with open plan kitchen, dinning room an a 1 bathroom with a shower', 4, 20, 'Built in Kitchen board, with four plate stove', 1),
(3, 5, 'Deluxe 2 bedroom with open plan kitchen, dinning room and 2 bathroom(s) with a shower', 4, 20, 'Built in Kitchen board, with four plate stove and a fire place', 1),
(4, 6, 'Deluxe 3 bedroom(s) with open plan kitchen, dinning room an a 2 bathroom(s) with a shower', 3, 20, 'Built in Kitchen board, with four plate stove and a fire place', 1);

-- --------------------------------------------------------

--
-- Table structure for table `staff`
--

CREATE TABLE `staff` (
  `StaffId` int(11) NOT NULL,
  `StaffFirstName` varchar(225) NOT NULL,
  `StaffSurname` varchar(225) NOT NULL,
  `StaffEmail` varchar(225) NOT NULL,
  `ContactNumber` varchar(15) NOT NULL,
  `AddressLine1` varchar(225) NOT NULL,
  `AddressLine2` varchar(225) DEFAULT NULL,
  `AddressLine3` varchar(225) DEFAULT NULL,
  `City` varchar(225) NOT NULL,
  `PostCode` varchar(15) NOT NULL,
  `RoleId` int(11) NOT NULL,
  `ReportingToId` int(11) NOT NULL,
  `StatusId` int(11) NOT NULL,
  `BuildingId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `staff`
--

INSERT INTO `staff` (`StaffId`, `StaffFirstName`, `StaffSurname`, `StaffEmail`, `ContactNumber`, `AddressLine1`, `AddressLine2`, `AddressLine3`, `City`, `PostCode`, `RoleId`, `ReportingToId`, `StatusId`, `BuildingId`) VALUES
(1, 'John', 'Doe', 'john@eyethuhouse.co.za', '085505084', 'Unit 56 Soweto', 'Mbali Street', NULL, 'Johanessburg', '3002', 1, 2, 1, 1),
(2, 'King', 'Nkosi', 'king@eyethuhouse.co.za', '08425252850', 'Unit 70 Midrand', 'Flower Street', NULL, 'Johanessburg', '3002', 2, 1, 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `statuses`
--

CREATE TABLE `statuses` (
  `StatusId` int(11) NOT NULL,
  `StatusValue` varchar(225) NOT NULL,
  `RowState` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `statuses`
--

INSERT INTO `statuses` (`StatusId`, `StatusValue`, `RowState`) VALUES
(1, 'Active', 1),
(2, 'InActive', 1),
(3, 'On-Hold', 1),
(4, 'Awaiting Attention', 1),
(5, 'In-Progress', 1),
(6, 'Resolved', 1),
(7, 'Locked-Out', 1);

-- --------------------------------------------------------

--
-- Table structure for table `tenant`
--

CREATE TABLE `tenant` (
  `TenantId` int(11) NOT NULL,
  `ReferenceNumber` varchar(25) NOT NULL,
  `FirstName` varchar(225) NOT NULL,
  `Surname` varchar(225) NOT NULL,
  `Email` varchar(225) NOT NULL,
  `ContactNumber` varchar(15) NOT NULL,
  `NOKName` varchar(225) DEFAULT NULL,
  `NOKNumber` varchar(15) DEFAULT NULL,
  `WorkAddress` varchar(225) DEFAULT NULL,
  `WorkTelephone` varchar(15) DEFAULT NULL,
  `WorkName` varchar(225) DEFAULT NULL,
  `StatusId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tenant`
--

INSERT INTO `tenant` (`TenantId`, `ReferenceNumber`, `FirstName`, `Surname`, `Email`, `ContactNumber`, `NOKName`, `NOKNumber`, `WorkAddress`, `WorkTelephone`, `WorkName`, `StatusId`) VALUES
(1, '2018', 'Freedom', 'Khanyile', 'freedom@mail.com', '0746958064', 'Sabelo Ntombela', '0846958064', '192 Bram Fischer Drive, Randburg 2194', '0112709000', 'Innovation Group', 1),
(2, '2018', 'Ndumiso', 'Mthembu', 'ndumiso@mail.com', '0745006854', 'Siyabonga Nyawo', '0846958064', 'Killarney, Rosebank 2100', '0112709000', 'BBD Software Group', 1),
(3, '2018', 'Ntuthuko', 'Smith', 'mrnnmthembu@gmail.com', '0245484515', 'Mdu', '028857846545', 'G36 Eyethu House 270 Marshall Street', '01454545', 'BBD', 2);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `UserId` int(11) NOT NULL,
  `Email` varchar(225) NOT NULL,
  `Password` varchar(225) NOT NULL,
  `StatusId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `announcements`
--
ALTER TABLE `announcements`
  ADD PRIMARY KEY (`AnnouncementId`);

--
-- Indexes for table `buildings`
--
ALTER TABLE `buildings`
  ADD PRIMARY KEY (`BuildingId`);

--
-- Indexes for table `logs`
--
ALTER TABLE `logs`
  ADD PRIMARY KEY (`LogId`);

--
-- Indexes for table `maintenance`
--
ALTER TABLE `maintenance`
  ADD PRIMARY KEY (`MaintenanceId`);

--
-- Indexes for table `payments`
--
ALTER TABLE `payments`
  ADD PRIMARY KEY (`PaymentId`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`RoleId`);

--
-- Indexes for table `rooms`
--
ALTER TABLE `rooms`
  ADD PRIMARY KEY (`RoomId`);

--
-- Indexes for table `roomtypes`
--
ALTER TABLE `roomtypes`
  ADD PRIMARY KEY (`RoomTypeId`);

--
-- Indexes for table `staff`
--
ALTER TABLE `staff`
  ADD PRIMARY KEY (`StaffId`);

--
-- Indexes for table `statuses`
--
ALTER TABLE `statuses`
  ADD PRIMARY KEY (`StatusId`);

--
-- Indexes for table `tenant`
--
ALTER TABLE `tenant`
  ADD PRIMARY KEY (`TenantId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`UserId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `announcements`
--
ALTER TABLE `announcements`
  MODIFY `AnnouncementId` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `buildings`
--
ALTER TABLE `buildings`
  MODIFY `BuildingId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `logs`
--
ALTER TABLE `logs`
  MODIFY `LogId` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `maintenance`
--
ALTER TABLE `maintenance`
  MODIFY `MaintenanceId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `payments`
--
ALTER TABLE `payments`
  MODIFY `PaymentId` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `RoleId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `rooms`
--
ALTER TABLE `rooms`
  MODIFY `RoomId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `roomtypes`
--
ALTER TABLE `roomtypes`
  MODIFY `RoomTypeId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `staff`
--
ALTER TABLE `staff`
  MODIFY `StaffId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `statuses`
--
ALTER TABLE `statuses`
  MODIFY `StatusId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `tenant`
--
ALTER TABLE `tenant`
  MODIFY `TenantId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `UserId` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

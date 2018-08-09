-- phpMyAdmin SQL Dump
-- version 4.7.9
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 09, 2018 at 07:55 PM
-- Server version: 10.1.31-MariaDB
-- PHP Version: 7.2.3

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
(1, 'Eyethu House', 'Maboneng Precint', 'Main street 201', 'Jabavu', 'Johanessburg', '2001', 1, 1),
(2, 'Brentwood ', '35 China Cres, Cosmo City', 'Roodepoort, 2188', 'Roodepoort, 2188', 'Roodepoort', '2188', 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `invoice`
--

CREATE TABLE `invoice` (
  `InvoiceId` int(11) NOT NULL,
  `ReferenceNumber` int(11) NOT NULL,
  `Amount` decimal(10,0) NOT NULL,
  `Month` int(11) NOT NULL,
  `Name` varchar(225) NOT NULL,
  `RoomId` int(11) NOT NULL,
  `StatusId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `invoice`
--

INSERT INTO `invoice` (`InvoiceId`, `ReferenceNumber`, `Amount`, `Month`, `Name`, `RoomId`, `StatusId`) VALUES
(1, 2019, '5000', 7, 'Ndumiso Mthembu', 2, 2),
(2, 2018, '2500', 7, 'Free ', 3, 3),
(3, 2017, '9500', 7, 'Betty ', 2, 3),
(4, 2016, '2500', 7, 'Ronda ', 1, 1);

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
  `ReferenceNumber` int(11) NOT NULL,
  `AmountInvoiced` decimal(10,0) NOT NULL,
  `AmountPaid` decimal(10,0) NOT NULL,
  `OutstandingAmount` decimal(10,0) NOT NULL,
  `PaymentMonth` int(2) NOT NULL,
  `PaymentYear` int(5) NOT NULL,
  `PaymentDate` varchar(25) DEFAULT NULL,
  `StatusId` int(11) NOT NULL,
  `PaymentStatus` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `payments`
--

INSERT INTO `payments` (`PaymentId`, `TenantId`, `RoomId`, `BuildingId`, `ReferenceNumber`, `AmountInvoiced`, `AmountPaid`, `OutstandingAmount`, `PaymentMonth`, `PaymentYear`, `PaymentDate`, `StatusId`, `PaymentStatus`) VALUES
(1, 1, 1, 1, 2016, '2500', '0', '2500', 7, 2018, '7', 1, 'unpaid'),
(2, 1, 1, 1, 2017, '9500', '14000', '-4500', 7, 2018, '27/08/2018', 1, 'incomplete'),
(3, 1, 1, 1, 2019, '5000', '5000', '0', 7, 2018, '1/08/2018', 1, 'paid'),
(4, 1, 1, 1, 2018, '2500', '3000', '-500', 7, 2018, '7/08/2018', 1, 'incomplete'),
(5, 1, 1, 1, 2018, '2500', '0', '2500', 7, 2018, '7', 1, 'unpaid'),
(6, 1, 1, 1, 2016, '2500', '0', '2500', 7, 2018, '7', 1, 'unpaid'),
(7, 1, 1, 1, 2017, '9500', '10000', '-500', 7, 2018, '1/08/2018', 1, 'incomplete'),
(8, 1, 1, 1, 2016, '2500', '0', '2500', 7, 2018, '7', 1, 'unpaid'),
(9, 1, 1, 1, 2017, '9500', '4000', '5500', 7, 2018, '1/08/2018', 1, 'incomplete'),
(10, 1, 1, 1, 2018, '2500', '3000', '-500', 7, 2018, '7/08/2018', 1, 'incomplete'),
(11, 1, 1, 1, 2016, '2500', '0', '2500', 7, 2018, '7', 1, 'unpaid'),
(12, 1, 1, 1, 2017, '9500', '2000', '7500', 7, 2018, '1/08/2018', 1, 'incomplete'),
(13, 1, 1, 1, 2018, '2500', '3000', '-500', 7, 2018, '7/08/2018', 1, 'incomplete'),
(14, 1, 1, 1, 2016, '2500', '0', '2500', 7, 2018, '7', 1, 'unpaid'),
(15, 1, 1, 1, 2017, '9500', '2000', '7500', 7, 2018, '1/08/2018', 1, 'incomplete'),
(16, 1, 1, 1, 2018, '2500', '1500', '1000', 7, 2018, '7/08/2018', 1, 'incomplete');

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
(6, 'Delivery', 1),
(7, 'Admin', 1);

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
(1, 'EH202', '2', 1, 1, 1, 1),
(2, 'EH201', '2', 2, 1, 1, 1),
(3, 'EH203', '3', 3, 1, 1, 1);

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
(1, 'John', 'Doe', 'admin@mail.com', '085505084', 'Unit 56 Soweto', 'Mbali Street', NULL, 'Johanessburg', '3002', 7, 2, 1, 1),
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
(2, '2019', 'Ndumiso', 'Mthembu', 'ndumiso@mail.com', '0745006854', 'Siyabonga Nyawo', '0846958064', 'Killarney, Rosebank 2100', '0112709000', 'BBD Software Group', 1),
(4, '2017', 'Betty', 'Hlangabeza', 'bhlanga@mail.com', '0744552564', 'Wendy', '0745856642', 'Braamfontein ', '0112545888', 'Alexander Forbes', 1),
(5, '2016', 'Ronda', 'Smith', 'rsmith@mail.com', '0744552564', 'Wendy', '0745856642', 'Green Stone ', '0112545888', 'Liberty', 1),
(6, '2015', 'king', 'kau', 'king.kau@ndu-systems.net', '011754685', 'Freedom Khanyile', '0745658789', 'Braamfischer Drive', '0112709000', 'Innovation Group', 1),
(7, '2014', 'Nomzamo', 'Mbatha', 'mbathanom@mail.com', '0745652058', 'Khaya Mthethwa', '071542468', 'North World', '0712445134', 'DStv Live', 1);

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
-- Dumping data for table `users`
--

INSERT INTO `users` (`UserId`, `Email`, `Password`, `StatusId`) VALUES
(1, 'admin@mail.com', 'pass', 1);

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
-- Indexes for table `invoice`
--
ALTER TABLE `invoice`
  ADD PRIMARY KEY (`InvoiceId`);

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
  ADD PRIMARY KEY (`PaymentId`),
  ADD KEY `StatusId` (`StatusId`),
  ADD KEY `StatusId_2` (`StatusId`);

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
  MODIFY `BuildingId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `invoice`
--
ALTER TABLE `invoice`
  MODIFY `InvoiceId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

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
  MODIFY `PaymentId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `RoleId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `rooms`
--
ALTER TABLE `rooms`
  MODIFY `RoomId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

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
  MODIFY `TenantId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `UserId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

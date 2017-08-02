#CREATE DATABASE `finalProject_db`;

USE `finalProject_db`;
/*
CREATE TABLE `userInfo` (
`id` INT AUTO_INCREMENT,
`username` VARCHAR(255),
`userpassword` VARCHAR(255),
`admin` BOOLEAN DEFAULT FALSE,
PRIMARY KEY (`id`)
);
*/
CREATE TABLE `jobInfo` (
`id` INT AUTO_INCREMENT,
`user_id` INT DEFAULT NULL,
`dateOfAppt` VARCHAR(255),
`repairQuote` INT,
`repairType` VARCHAR(255),
`actualCost` INT,
PRIMARY KEY (`id`)
);
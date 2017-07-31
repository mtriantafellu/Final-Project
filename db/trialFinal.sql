
#customerinfoCREATE DATABASE `trialFinal`;

USE `trialFinal`;

CREATE TABLE `userInfo` (
id INT AUTO_INCREMENT,
userName VARCHAR(255),
googleEmail VARCHAR(255),
phone INT,
PRIMARY KEY (`id`)
);

CREATE TABLE `jobInfo` (
id INT AUTO_INCREMENT,
user_id INT DEFAULT NULL,
dateOfAppointment VARCHAR(255),
repairTitle VARCHAR(255),
repairQuote VARCHAR(255),
actualCost VARCHAR(255),
discounted BOOLEAN DEFAULT FALSE,
complete BOOLEAN DEFAULT FALSE,
completionDate VARCHAR(255),
PRIMARY KEY (`id`)
);

CREATE TABLE `customerInfo` (
id INT AUTO_INCREMENT,
user_id INT DEFAULT NULL,
name VARCHAR(255),
address VARCHAR(255),
phone INT,
email VARCHAR(255),
previousCustomer BOOLEAN DEFAULT FALSE,
goodCustomer VARCHAR(255),
PRIMARY KEY (`id`)
);

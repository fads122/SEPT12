-- MySQL dump 10.13  Distrib 8.0.39, for Linux (x86_64)
--
-- Host: localhost    Database: kodigrow
-- ------------------------------------------------------
-- Server version	8.0.39-0ubuntu0.22.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `admins`
--

DROP TABLE IF EXISTS `admins`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admins` (
  `admin_id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`admin_id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admins`
--

LOCK TABLES `admins` WRITE;
/*!40000 ALTER TABLE `admins` DISABLE KEYS */;
/*!40000 ALTER TABLE `admins` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `answers`
--

DROP TABLE IF EXISTS `answers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `answers` (
  `answer_id` int NOT NULL AUTO_INCREMENT,
  `question_id` int DEFAULT NULL,
  `answer_text` text NOT NULL,
  `is_correct` tinyint(1) NOT NULL,
  PRIMARY KEY (`answer_id`),
  KEY `question_id` (`question_id`),
  CONSTRAINT `answers_ibfk_1` FOREIGN KEY (`question_id`) REFERENCES `questions` (`question_id`)
) ENGINE=InnoDB AUTO_INCREMENT=124 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `answers`
--

LOCK TABLES `answers` WRITE;
/*!40000 ALTER TABLE `answers` DISABLE KEYS */;
INSERT INTO `answers` VALUES (1,3,'asd',0),(2,3,'asd',1),(3,3,'asd',0),(4,4,'asd',0),(5,4,'asd',0),(6,5,'asd',0),(7,5,'vvv',0),(8,4,'asd',0),(9,5,'aaa',1),(10,4,'asd',1),(11,6,'asd',1),(12,6,'asd',0),(13,6,'asd',0),(14,7,'asd',0),(15,7,'asd',1),(16,7,'asd',0),(17,8,'asd',1),(18,8,'asd',0),(19,8,'asd',0),(20,9,'as',0),(21,9,'ds',0),(22,9,'av',1),(23,10,'as',0),(24,10,'ds',0),(25,10,'av',1),(26,11,'tanga',1),(27,11,'magaling',0),(28,11,'mabait',0),(29,12,'tanga',1),(30,12,'mabait',0),(31,12,'magaling',0),(32,13,'tanga',1),(33,13,'magaling',0),(34,13,'mabait',0),(35,14,'asd',0),(36,14,'das',0),(37,14,'as',1),(38,15,'asd',0),(39,15,'as',1),(40,15,'das',0),(41,16,'asdasd',0),(42,16,'asdasdas',1),(43,17,'asdasdasd',0),(44,17,'asdasd',1),(45,18,'asd',0),(46,18,'ads',0),(47,18,'aa',1),(48,18,'asd',0),(49,19,'SELECT',1),(50,19,'WHERE',0),(51,19,'FROM',0),(52,20,'asd',1),(53,20,'aa',0),(54,20,'bb',0),(55,21,'ccc',0),(56,21,'eee',1),(57,21,'ddd',0),(58,22,'aaa',0),(59,22,'sss',0),(60,23,'bvvv',1),(61,22,'vvv',1),(62,23,'wwww',0),(63,23,'qqq',0),(64,24,'zzz',0),(65,24,'aaa',1),(66,24,'zzz',0),(67,25,'1',0),(68,25,'1',1),(69,25,'1',0),(70,25,'1',0),(71,25,'1',0),(72,26,'pl',1),(73,26,'sl',0),(74,26,'ql',0),(75,27,'asd',0),(76,27,'asd',0),(77,27,'asd',1),(78,28,'z',1),(79,28,'x',0),(80,28,'c',0),(81,28,'b',0),(82,28,'v',0),(83,29,'b',1),(84,29,'asd',0),(85,29,'asd',0),(86,29,'asd',0),(87,29,'asd',0),(88,30,'zxc',1),(89,30,'zxc',0),(90,30,'zxc',0),(91,30,'zxc',0),(92,31,'TRUNCATE',0),(93,31,'ADD',0),(94,31,'SELECT',1),(95,31,'INSERT',0),(96,32,'X',0),(97,32,'Y',1),(98,32,'A',0),(99,32,'Z',0),(100,33,'JAPANESE',0),(101,33,'ENGLISH',1),(102,33,'FILIPINO',0),(103,33,'RUSSIAN',0),(104,34,'asd',0),(105,34,'asd',0),(106,34,'asd',1),(107,34,'asd',0),(108,35,'a',0),(109,35,'b',0),(110,35,'c',0),(111,35,'d',1),(112,36,'INSERT',0),(113,36,'WHERE',0),(114,36,'DELETE',0),(115,36,'SELECT',1),(116,37,'SELECT',1),(117,37,'WHERE',0),(118,37,'DELETE',1),(119,37,'TRUNCATE',0),(120,38,'asdasd',0),(121,38,'as',0),(122,38,'as',1),(123,38,'asd',0);
/*!40000 ALTER TABLE `answers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `exams`
--

DROP TABLE IF EXISTS `exams`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `exams` (
  `exam_id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `user_id` int DEFAULT NULL,
  `exam_code` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`exam_id`),
  UNIQUE KEY `exam_code` (`exam_code`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `exams_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=56 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `exams`
--

LOCK TABLES `exams` WRITE;
/*!40000 ALTER TABLE `exams` DISABLE KEYS */;
INSERT INTO `exams` VALUES (5,'asd',116,'D9A2CF'),(6,'asd',117,'02DF21'),(7,'asd',116,'E355C0'),(8,'asd',118,NULL),(9,'what',119,NULL),(10,'asd',119,NULL),(11,'asd',119,NULL),(12,'wtf',120,NULL),(13,'wtf',120,NULL),(14,'wtf',120,NULL),(15,'asd',121,'A87949'),(16,'asd',121,'B044EF'),(17,'asd',121,'A95C85'),(18,'marvel',124,'71F2EE'),(19,'SQL',116,'C791A0'),(20,'laguna',129,'C2C92A'),(21,'aaa',132,'EA0865'),(22,'1st',116,'AD0A48'),(23,'Tite',138,'F672F0'),(24,'Tite',138,'C398FE'),(25,'Tite',138,'329061'),(26,'wert',138,'BB6A61'),(27,'wert',138,'65C487'),(28,'SQL',140,'C23BEA'),(29,'asd',116,'CF4674'),(30,'asd',116,'4A3504'),(31,'111',116,'7C0C43'),(32,'65',116,'BF1F2F'),(33,'12',142,'20FEAC'),(34,'mon ',142,'C93E81'),(35,'ccc',142,'C5CE45'),(36,'FRANCE',142,'C5F3C1'),(37,'FRANCE',142,'0CE9EE'),(38,'asd',142,'E61C3B'),(39,'asd',142,'3475EA'),(40,'asd',142,'E7976B'),(41,'zzz',116,'176CF1'),(42,'tara',144,'84A2DD'),(43,'Programming',151,'73D3A5'),(44,'asd',116,'C09077'),(45,'123',157,'4D2AAC'),(46,'bbb',157,'EA06CE'),(47,'zxc',157,'5217FC'),(48,'SQL COMMANDS',158,'135785'),(49,'PHYSICS',160,'6EF374'),(50,'ENGLISH',167,'F849D5'),(51,'a',116,'83D0F8'),(52,'abc',172,'93DEFA'),(53,'SQL COMMANDS',176,'40A12E'),(54,'SQL COMMANDS',176,'F7B123'),(55,'asdasd',116,'1159D1');
/*!40000 ALTER TABLE `exams` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `flashcards`
--

DROP TABLE IF EXISTS `flashcards`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `flashcards` (
  `flashcard_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `title` varchar(255) NOT NULL,
  `content` text NOT NULL,
  PRIMARY KEY (`flashcard_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `flashcards_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `flashcards`
--

LOCK TABLES `flashcards` WRITE;
/*!40000 ALTER TABLE `flashcards` DISABLE KEYS */;
INSERT INTO `flashcards` VALUES (1,16,'asd','asd'),(2,17,'SQL COMMANDS','SELECT * FROM \'table name\''),(3,18,'plant','plant'),(4,146,'asd','asd'),(5,147,'asdasdas','asdasdas'),(6,148,'aaa','aaa'),(7,148,'aaa1','aaa2'),(8,148,'zzza','za'),(9,149,'zxc','zxc'),(10,150,'asd','asd'),(11,150,'123','123'),(12,148,'asd','asd'),(13,148,'asd','asd'),(14,152,'SQL COMMANDS','SELECT * FROM table name'),(15,148,'sd','asddasd'),(16,153,'asd','aasd'),(17,159,'COMMAND TO CALL OUT A TABLE','SELECT * FROM TABLE NAME'),(18,161,'FLASHCARD','CONTENTS'),(19,163,'jdslfjkjlkjlkj','lkjlkjlkj'),(20,174,'zxczxc','zxczxc'),(21,174,'asdas','asdasd'),(22,177,'SQL','INSERT, WHERE'),(23,181,'asd','asd');
/*!40000 ALTER TABLE `flashcards` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `questions`
--

DROP TABLE IF EXISTS `questions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `questions` (
  `question_id` int NOT NULL AUTO_INCREMENT,
  `exam_id` int DEFAULT NULL,
  `question_text` text NOT NULL,
  `question_type` varchar(50) NOT NULL,
  `time_limit` int DEFAULT NULL,
  PRIMARY KEY (`question_id`),
  KEY `exam_id` (`exam_id`),
  CONSTRAINT `questions_ibfk_1` FOREIGN KEY (`exam_id`) REFERENCES `exams` (`exam_id`)
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `questions`
--

LOCK TABLES `questions` WRITE;
/*!40000 ALTER TABLE `questions` DISABLE KEYS */;
INSERT INTO `questions` VALUES (3,5,'asd','multiple-choice',30),(4,6,'asd','multiple-choice',20),(5,6,'asdasdasdasd','multiple-choice',5),(6,7,'asd','multiple-choice',5),(7,8,'asd','multiple-choice',5),(8,9,'is the what','multiple-choice',30),(9,10,'asd','multiple-choice',5),(10,11,'asd','multiple-choice',5),(11,12,'aleco','multiple-choice',5),(12,13,'aleco','multiple-choice',5),(13,14,'aleco','multiple-choice',5),(14,15,'asd','multiple-choice',5),(15,16,'asd','multiple-choice',5),(16,17,'as','multiple-choice',5),(17,17,'aasdasdasd','multiple-choice',5),(18,18,'asd','multiple-choice',5),(19,19,'what are','multiple-choice',5),(20,20,'asdasd','multiple-choice',20),(21,21,'bbb','multiple-choice',5),(22,22,'asdasd','multiple-choice',10),(23,22,'zzxczxc','multiple-choice',10),(24,41,'zzz','multiple-choice',5),(25,42,'tara','multiple-choice',30),(26,43,'What is programming?','multiple-choice',5),(27,44,'asd','multiple-choice',10),(28,45,'zxc','multiple-choice',5),(29,46,'bbb','multiple-choice',5),(30,47,'zxc','multiple-choice',5),(31,48,'TO SELECT A TABLE','multiple-choice',5),(32,49,'EQUATION','multiple-choice',5),(33,50,'What is the universal language?','multiple-choice',5),(34,51,'a','multiple-choice',5),(35,52,'abbc','multiple-choice',5),(36,53,'CALL TABLES','multiple-choice',5),(37,54,'CALL TABLES','multiple-choice',5),(38,55,'asdasdasd','multiple-choice',20);
/*!40000 ALTER TABLE `questions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `results`
--

DROP TABLE IF EXISTS `results`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `results` (
  `result_id` int NOT NULL AUTO_INCREMENT,
  `exam_id` int NOT NULL,
  `user_id` int NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `score` decimal(5,2) NOT NULL,
  PRIMARY KEY (`result_id`),
  KEY `exam_id` (`exam_id`),
  KEY `student_id` (`user_id`),
  CONSTRAINT `results_ibfk_1` FOREIGN KEY (`exam_id`) REFERENCES `exams` (`exam_id`),
  CONSTRAINT `results_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `results`
--

LOCK TABLES `results` WRITE;
/*!40000 ALTER TABLE `results` DISABLE KEYS */;
/*!40000 ALTER TABLE `results` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `account_type` enum('professor','student') NOT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `password` (`password`)
) ENGINE=InnoDB AUTO_INCREMENT=182 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'chanoo@gmail.com','$2b$10$uR5694B9lBlAIyV4wX7haendOBxPahLyCeQfLcwvoUQJ50qcO8VCi','professor'),(2,'noah@gmail.com','$2b$10$8rha.ksXwfxymYW9L2VIkOULqesowp9ZNqb9ZfiDK0Zu5KiJN7N06','student'),(3,'vee@gmail.com','$2b$10$ktI41tnZoqWr8lixQ2YbeegJrgwVGYr4XsVEFklVVDUiyddBEDpky','professor'),(4,'gino@gmail.com','$2b$10$nB1J1kR86IavLP.GVr591uzx1Y/yoZKflnMfjIj.uU.Z5YNh1nG3e','professor'),(5,'asd@gmail.com','$2b$10$4w3hmehRXFdCloYP/UTGL.jZeMmNgBcN7qWMHBTf/1ZL0HKmVcW1.','professor'),(6,'chanoo123@gmail.com','$2b$10$IrWfu4x5i3vB2vNZGj2SVO0DqooFUHkjEMGS70L9xnDFud2OooKuC','student'),(7,'aspas@gmail.com','$2b$10$RsxpuaeSW4cBkysDKL6zTOPuDhHPeX6DY8cGCRV.XR10JoRh/Nl8C','professor'),(8,'asas@gmail.com','$2b$10$guyiaRcdEWf1Cxm7o2C1.eo/gR.jZfgZK0MxjG1F8VklfQo/2.cwS','student'),(9,'aspas123@gmail.com','$2b$10$Z3hWCAMLsnf.AB.uYyjkWOLlci6ld0bWhgAV14e1tjFmytP0PQVBC','student'),(10,'wof@gmail.com','$2b$10$t7nR41dcVsmDfI6w8N76IOXgcom/qsVLJvao0UbGB5meds5lcKP9.','student'),(11,'ass@gmail.com','$2b$10$vQ5cctSXhnaVR9hD9CLVy.xWu3xauWjlYU7zLGFjy1oGTjK2shodm','student'),(12,'itel@gmail.com','$2b$10$7QC9dTIX8hR2d3nbvTCzn.pqL.G6Yk35mUjEaNt4kKE8CQTGRkJPa','student'),(13,'ph@gmail.com','$2b$10$9w6.bCg07xNIGnBZrbYLtO.NIknnnikEbmhgMjh0PBjWGpoTekvsm','student'),(14,'push@gmail.com','$2b$10$quGbeMfmgmrewCpUomnGfuDXBNLHDsWGG1QHbwNp5U6oUk6fbC.hm','student'),(15,'wild@gmail.com','$2b$10$dt7qHGkZMgHne1eguOIzMu9y2WiRzRpN.TEwreqgXvuQ9MMuNpM8m','student'),(16,'mirror@gmail.com','$2b$10$aHeJ.mooXIKuJ71FDVqnY.uwC.HB2yxUHU0ehFkHggwAqr.m9qsc2','student'),(17,'dado@gmail.com','$2b$10$uH7TlZHE4VPrbSfHwHeYdeyZYK7te/1jnjZ5wp2osFEU3A91gLW7S','student'),(18,'bag@gmail.com','$2b$10$vFR4LqMr4GGp7zR/uX/Q3uyLjLDAM9u2yew3SxJUMDK3DsrrbkBcy','student'),(19,'teacher@gmail.com','$2b$10$4bHGY/0/mW4gXRawbxr8zOWwt3X10kPvUn5xfVPupIJTvR0y46BmG','professor'),(20,'aass@gmail.com','$2b$10$q5g4sMc53ZDTbc6qj4Wa7e1OgRdqsrZNasR3oxcOjMmh3gL/hR9km','professor'),(21,'prof@gmail.com','$2b$10$0zKoI059HyZPhPItcCAnk.r/XIFaGpyUE9al8vVgrNjN2vz.rmH8y','professor'),(22,'stan@gmail.com','$2b$10$kEqwdE5cB0ZyseJq.KKilO6nLpz4bgiLHetdLyiFdaz3YjnS0R2zq','professor'),(23,'sleep@gmail.com','$2b$10$h4lvcaU9jAtb8eNzJkfX0OMPk3Dif2JZKACG3ISMfxg3q9ALvm6Pu','professor'),(24,'kook@gmail.com','$2b$10$O5tPpPS2lK0HiLNPiSxU2eICugdK.aDyH1tZ/Rzgnx7B6IUCwDAWC','professor'),(25,'mail@gmail.com','$2b$10$nwr8z6l2uj0HX2ZLJx62uemXjrahTsRrmbeJJjoNrddf1MTpOFdkC','professor'),(26,'firestore@gmail.com','$2b$10$gGtZ05lMnxYoEmVE1Pi8p.zVbGpryCHyc12Z41QsKv/5Z/bVsY0zK','professor'),(27,'today@gmail.com','$2b$10$GW/rXIhNXbOSfutWCtd3LuZ2wUjGoYOJqN0F/aS6khF1RIsGQpqjy','professor'),(28,'burn@gmail.com','$2b$10$N2UWtkMlW/prDbYLcNTusuNU/ldM0UaH.6Q7ZnOONU2oATRBM7.qy','professor'),(29,'mary@gmail.com','$2b$10$xC6wCmHVgEZCFuy4t03LQujk1yf5NWtp3MmMYV3KJc1LhVPmDjehm','professor'),(30,'toystory@gmail.com','$2b$10$.CLxIM2W/tRBqu/.83wc/ep.pdtR5p2KwAGadWF/WvbXa5id9tMP6','professor'),(31,'advance@gmail.com','$2b$10$.A8bzs8gVo3k/NpO8qRZbu6VctxC0UimrthHWExRmQnUi2lmoWhwG','professor'),(32,'version@gmail.com','$2b$10$grBNBHWD3FNA9QEc0yGE8eeNsQkfkjvQA7Lj1ESfT5BdgMQg9wpOy','professor'),(33,'rivero@gmail.com','$2b$10$BN/I/Iy0HCIho7z0cKVhW.Z1jBeZiootEc4z/DwiSGEKGynmy/adG','professor'),(34,'tiktok@gmail.com','$2b$10$pkZYCpcGA7H2S2YtfiuPg.BITYSNOyParSWM3zJbpy5rKNzpqxsti','student'),(35,'tiktok@gmail.com','$2b$10$Sn3DOkz4LairVKmZK4GmmOsKG/83k4i69LXXRJJXMv8RPVlKv3FUW','student'),(36,'adrea@gmail.com','$2b$10$dpDxI5cQfIWB/yg.mtCCsuYpgchXp4I2yf46ElWayT1Pn5ax9rxXS','professor'),(37,'flow@gmail.com','$2b$10$R5BHlnBBncT0Wva3EBDI8OjpvXDO2fnMcZI17I/A.AL3vDx96y1YK','professor'),(38,'kill@gmail.com','$2b$10$Nrr4mCip0K8Vo0y7QktWGO9ubP1bztaV29Lh.WYTIUohl52ilN.Gy','professor'),(39,'charge@gmail.com','$2b$10$9umDdO8IL/a6b8JQjuXuTeDZMi7n8Yb5MPQVHTbn6vnJo0NXGoo.i','professor'),(40,'tenz@gmail.com','$2b$10$1EqnpnrE5PavxRPVrL6aXehSZGc644lLdsu.g0mePcniukQbLjYn6','professor'),(41,'tao@gmail.com','$2b$10$qvPc.5vvlt61pUcOf63TS.WQk5i2fOdz/U/FnFYCYWuIwiCcJ91Pm','professor'),(42,'swipe@gmail.com','$2b$10$umWin/mmU9EByhc3x5wlDOA1HUXOasCFph67EPKtfFNsFLEkNCwki','student'),(43,'jp@gmail.com','$2b$10$/vwBvpTF4Vw.ylkukQ56SuX23uPXNCJJFCGPajxb6MKbEnonWdeki','professor'),(44,'rave@gmail.com','$2b$10$FKaxUZIYv0YvOKeQjjlRhuC7dGkj2lmRUiu9Py4iRpyl96Vg20qg.','professor'),(45,'ariana@gmail.com','$2b$10$wx5fR8VU.Wb30fnAWSeaXelU2ZogLt3vkTYvQO9.6Vi../S/j3o06','student'),(46,'asd','$2b$10$ZL1HjKR5s9viBbCVHomPoOsBFV8wIe3BYem2qFTXnBv.VTUEbLNby','professor'),(47,'pilots@gmail.com','$2b$10$K8mEZb.GC0gZGT5XnRzS3.wvPGFuwm/PLEheI8ma8UCKKkBu3YuUW','professor'),(48,'charlie@gmail.com','$2b$10$hs5LacxjjBJF9lkQ1G4txe0RPXwJPUIHOXa9sosWeARG3FQx/.rYa','professor'),(49,'puth@gmail.com','$2b$10$JkWZwOOwEC61YD8nskjo1e5bPgoEsLWNbQQQ1SO10Qz.Q7wZb62Sm','professor'),(50,'telegram@gmail.com','$2b$10$7jR1Os1h.BA3kqWEan92HOS2WPsqc7DKrAWnSWokuqhetBYhe7SQ6','professor'),(51,'kiyo@gmail.com','$2b$10$rEEu3ewygJNNsP55tSaQounhuk5ZPZq8JNZ4r775SMDNuJxbJfE1K','professor'),(52,'stay@gmail.com','$2b$10$HK2fZXq161nsi8frzUMeXO98OB7IQDv7cieMtwtU3OSk884ZlB2bm','professor'),(53,'gai@gmail.com','$2b$10$LKXXCv1ax8UkppQo/rF5ve5aI9aTNCyctqH7lwEnKCG2bSD6H5GtS','professor'),(54,'bruno@gmail.com','$2b$10$cMqV6JAdY.rkBTQVwifgQOIFyWa3tOcAyDciFg5D3OTAYrqpFxMbe','professor'),(55,'tama@gmail.com','$2b$10$UhdodpbBODTTXf3w6EFkZuAz0bYAEnj/fmPgZPsmsJWTVXbmKGy0a','professor'),(56,'mark@gmail.com','$2b$10$.MQA9ZM4/2nW689BcAQwhuxnRyq0TbsP1W3Dkj.1yIuWvvwE.Cxq.','professor'),(57,'balik@gmail.com','$2b$10$jS3WKA4iXTv/1W.mAHKoWedH575TInE1KhjQnH.D9dXvOE5J2mJKq','professor'),(58,'noah@gmail.com','$2b$10$M59vhxNzhvBFy8y5AdjCVuxmA12EPqgmLOHpdoSwfnpdrE640YB6y','professor'),(59,'flash@gmail.com','$2b$10$PwwY7CTUJVF6kLkzi2GOkOEdDWnShbZmTrtQRwF57SSlCc5cZ3ZlS','professor'),(60,'asspass@gmail.com','$2b$10$HUEc7q4nZcu9s7ssgMXMuuhgJPBvxImnVnNDAxXgumISqnBcQDGPG','professor'),(61,'forever@gmail.com','$2b$10$/682a6dZkGp5WjEYRt/j6Ox6GICWGymfQkmjufeMN5J6iNU3gPnYy','professor'),(62,'goku@gmail.com','$2b$10$ID71bQVrpvyuGrSEM31JsuTcy3jEilgET3GeqyQGrbSPIzz8PzXWK','professor'),(63,'mikha@gmail.com','$2b$10$p8iF.YmhwbeDbrtLHgmriOun8NGuTeDq4KQWPbDDx21bhwSSjLjme','professor'),(64,'chance@gmail.com','$2b$10$RTZoIuYPLKWB4cPGiMmkWOiMQ6/i9lBBKPFxiZfUvWBMwuoaUkvte','professor'),(65,'jom@gmail.com','$2b$10$mwiyepuh9AHKoAifPKvMfO0MK5YxUClj.Ne7L0nhSHNsYukKqxNYa','professor'),(66,'waving@gmail.com','$2b$10$sew1qhUX0BHGJDe03JUSY.51Fr1vUF2UJ9uVFloywOxsoU9/UFvf6','professor'),(67,'rachel@gmail.com','$2b$10$bjdDsX3NFhJ4BA/kFKcUIeir3i7al9ret3wKpsJnGSoOCLhvDdbRG','professor'),(68,'inside@gmail.com','$2b$10$MIBeWYTErkw5A2gu1hGPTe8lNN021En7rgSsmf45M8TOgNUxuRoaa','professor'),(69,'suka@gmail.com','$2b$10$z0/ltg34jXrCIxMR/MWr6e00qMnQS9xZPZH6Qoub9cdP9o2YW/XP.','professor'),(70,'sad@gmail.com','$2b$10$MAiPy3uqsO.F0LN6NIeBsuT4nT67VBCMI1MoX1FwA7UVybTZkmDwy','professor'),(71,'phone@gmail.com','$2b$10$zN0j.92IEnXyDeR9KtjutuDQL/9/YbEQrGWJ.9TYpWkdXAJ.Da9xC','professor'),(72,'argentina@gmail.com','$2b$10$Ful2tSqvyLedovD4xnGP.edBEPrNd3DJERv55TdVYS8JxlTMcz/8O','professor'),(73,'james@gmail.com','$2b$10$OncKDPphjT4JFVsNGQW9heORI7/j6MpAYgwJJ5U1xLWLaJGmug5jW','professor'),(74,'baby@gmail.com','$2b$10$hf/sqctWcYmbzcg..2JuFuznefatpHYQfaEg/AsXZtUPbGtT7hPf6','professor'),(75,'morning@gmail.com','$2b$10$WKSyw43vXXXoG4URcuDZT.hRur38NatHLmjFQE/YpaQRsngUe95/.','professor'),(76,'feel@gmail.com','$2b$10$w8Oun4YTN/9HDdwh/AJ/MOrD3H5xwj81Bv6P1XlcWH9rPDBDfuzPK','professor'),(77,'aljames@gmail.com','$2b$10$aZO/xHJ/F0A3qOsDR8/TpOae1y75wW07Rc3H1Tiq5cxlElWGkGn2K','professor'),(78,'justin@gmail.com','$2b$10$66qF7xJYuO91juWW8LbeCOMAerzJGzIsYQJ5/ZK7SQ6XO106CjoQW','professor'),(79,'maloi@gmail.com','$2b$10$fcY1i2TFCxIJ5ausBPbdSOG0EfgatiRTzRZtYW2SCZVpRVe0dCUvW','professor'),(80,'session@gmail.com','$2b$10$hki/lVh57zGuGTHPXlMrou719LumNahg5PSeURavcsXyhYDmqr7.e','professor'),(81,'voucher@gmail.com','$2b$10$wfTuxV9RGRH3Zo5pZFwUT.UWmUOPipgssMbk8iFfNCeYQV/Xme0zW','professor'),(82,'control@gmail.com','$2b$10$lG1lGZIgS1CZdxoSxYT3u.44ELKusRAs7uAhROJ76djLnv.1xPNnq','professor'),(83,'siopao@gmail.com','$2b$10$KycjLbY8kSx9PncqTujQjugHdMgU5iivtDrRpGif8eiR3Fxt35m26','professor'),(84,'drum@gmail.com','$2b$10$QzDpfi6Fa5hGR8s/CQQ3ouIwQTfHri34sWOFjhA5JjAIj0jLQHbNW','professor'),(85,'dog@gmail.com','$2b$10$hyr5p2FQ.0E5dwTbziByFeoRy8cNbYkkAMvVfGFd445mi/nMsao4C','professor'),(86,'boy@gmail.com','$2b$10$RmWQGphTyDOWFEa58.WCHOO5Kc9BDVhFu0zjMObHM/LoLcJn3EOXm','professor'),(87,'noo@gmail.com','$2b$10$2r2D1/FWCDDAqDAml93OSurYpZEngqEzOf10BF6ozaeYnv9xn4uCu','professor'),(88,'bibe@gmail.com','$2b$10$TKA57yZGm2j4w8ed0TvnyOiqPULvxVsALtOLeFJ706NEWVCNYxGgK','professor'),(89,'rain@gmail.com','$2b$10$rbfAJaTdETB4eCDdgLY16u8VcomXG6Ysrda6rcyyxuAc94A88SP4K','professor'),(90,'cana@gmail.com','$2b$10$iRIQDVwZQOXQ8hPmh9ZM8eBtQXMqdd5fwf.zs/8XAdu2RWuLMkMc2','professor'),(91,'use@gmail.com','$2b$10$c/dJ5Qnjq0hjDLY7iqijsev/nfTWdgumQ9Iui1r42.FBoJm/9KRfO','professor'),(92,'girl@gmail.com','$2b$10$jVZQSPVIXhDNwK0J0d2gm.87nN89MqEOmlHX7LbeyeGDTDRmPm6oa','professor'),(93,'soul@gmail.com','$2b$10$hOuTGPyBy2uy6C4Dx7y17.p1R0UOR0Yye5rGa8vMFdrTiKCVLg4Me','professor'),(94,'asado@gmail.com','$2b$10$..vM./apROt5vBM7aEGRCe3nQKS5ipkUfh3nFLMrZKIHEXw30r/zq','professor'),(95,'bob@gmail.com','$2b$10$uRe0EnsUTAp3qtF6BKZR7eN53wv.pCGP9.O/vZI5ySWgJo/Jgx02W','professor'),(96,'pwet@gmail.com','$2b$10$2cCt88e9kQrM2UqMNfbY6uT70NmbvCrVdm1dK58BH5a7DfWs94eOa','professor'),(97,'peek@gmail.com','$2b$10$61yb.F2D.S5Q/VaRVkcFCuIYJKKwfmOLBg0XJpY0/6O4GXcMotlMG','professor'),(98,'uno@gmail.com','$2b$10$GLPQ4YucMpyovwpTDBw7CO3TRLug6pYbFznHLbhUfJaKezGFrdQvK','professor'),(99,'bobo@gmail.com','$2b$10$zRuZb6rUbKSzH776/37kaO1K2tHpWbrNMMCLdOscwoM.8cdVNQjje','professor'),(100,'ayawkona@gmail.com','$2b$10$igUpIoGv39lb.F./oY9YmecjbK8ujaMl4urlIzkTOUUwL.sW2JKZO','professor'),(101,'sage@gmail.com','$2b$10$hmyQcuEAkCpoLrmNnpG0A.O3FFZsb5kr8hVIQ96rW0TcbZsVJXSiS','professor'),(102,'omen@gmail.com','$2b$10$q/udN6CPef8Hn/ORaWw7Tu4gFarNbSAujxcuN/HUrSyBs0P7QtPKW','professor'),(103,'chamber@gmail.com','$2b$10$2V6Y2jQgclDJfkNAND8MouU5z4.A980O0javRgABlsvu8pIIn5nH2','professor'),(104,'stepper@gmail.com','$2b$10$PrpRtonkJkPlDzOEame5keKDXhpzMBuHbRfwaTFGVfHxDcnqGvv..','professor'),(105,'iso@gmail.com','$2b$10$PN32h9I7t7MnJkqCOQLbLebkfC2ux/o6cmBF3l.xvGWvhZ8sxchAS','professor'),(106,'gap@gmail.com','$2b$10$edLpYthmwz6HUMkJidCq7Oj1JXveRDk9J4S9bwlJSazJezKUvZsgu','professor'),(107,'ako@gmail.com','$2b$10$o1ZHiprXhEcoZDQJQoznE.sAKhF6lBmf8YTu2.njlRksFb.RnIlkS','student'),(108,'coffee@gmail.com','$2b$10$sTlhtvBUFe7DXz6Kh/J4Neb/8pbE2.C9mMG3I5ydRz1Bvth2d.StW','professor'),(109,'jungle@gmail.com','$2b$10$10nE/y5Yc/D3bPuiNIZzL.6LVN1qEE7xWihF4dI1p7zEGEO1fLVXi','professor'),(110,'dada@gmail.com','$2b$10$MbUkKjiHg.T0xjki1l725edaZAWEfdr5HfaJrIpu6jvuRYlG8nFOu','student'),(111,'blind@gmail.com','$2b$10$VXvvWriJfbcBMJ7H2vPKYeHqIbxyKm8B0qxrXqhavRJh1IhDOA81K','professor'),(112,'fit@gmail.com','$2b$10$tpsMxUpcBXi2T4YdqLIw9eVhUYgVj3vf5Do4hmgDSKpBY3RBsVwx.','professor'),(113,'panel@gmail.com','$2b$10$MN.rRvQqm3IHKJ5ZD2KP2O96pvUZghULPa0APKjtTqyZCQCKIm0S6','professor'),(114,'testing@gmail.com','$2b$10$DnyjfV1lu172KAeMSocqEubciktk2G5ntyBKmeVlWw8YvzYnH7nrq','professor'),(115,'sige@gmail.com','$2b$10$V0SRJEBhnR6oOBsPjMnD1OAFB7tT/ahRS28kXQCztgWoqI13VQCCi','student'),(116,'gecko@gmail.com','$2b$10$iu2VW9Y7DA59pKHGxnKFrOBQbJ3s0OP3igt60JYP/q7lUl.IBnlci','professor'),(117,'jett@gmail.com','$2b$10$Ptnh0EjPhLVvD8DXWQPjr.4Fk5E.QBsjv2vL2JkhHLe28caFTXdDu','professor'),(118,'hamonado@gmail.com','$2b$10$oZK7Bt7zXHX2b70L5Ozi3OuErp6Q.YPfbw5vhDlFxCJd/MHE4KIlG','professor'),(119,'bunny@gmail.com','$2b$10$WK3l0MyQCLuyf0tcYdEfP.dvNwJunad5LYTfueJSJ1jH7umi9Orda','professor'),(120,'aleco@gmail.com','$2b$10$u8MPfwAkDogPVDOCCXc4Cu6YZrDaclJaq75taQxS1V/nsMgKDq9xO','professor'),(121,'ngipin@gmail.com','$2b$10$tUfCAjlX1uOIcdCRKxKvEe7fAfHyb/oWNnYJFvtavn6h7ZIQQeWNS','professor'),(122,'happy@gmail.com','$2b$10$x0Y9MQSbdjMMQmQn85YIlO8RxS66PTbCMNLijJu876lw9nMx.boWm','student'),(123,'cap@gmail.com','$2b$10$QHxad4X0HYNy5w1HuUeVSuhprPVaA3oyTy0gWebGFzk6vFDcf568O','professor'),(124,'patay@gmail.com','$2b$10$zgUwx23vxX6OtGiTAfE/p.V15dWC8nUXd4X.k/5ngDp76SYYbY5ky','professor'),(125,'whatif@gmail.com','$2b$10$nE6UlVDN9oSBkfoWZ14Y2e2nh4MJ/icwHJJpwvJcpNuQFj4VjClvC','student'),(126,'tele@gmail.com','$2b$10$j8jrehxUdR5V5MWYYBtLzeZYVowp6oEHiBaRAcQxMKIIcmAtjOvpu','student'),(127,'ginger@gmail.com','$2b$10$SqK6rFYygY8wzQxuG/rTgeQ2x0Rl0hxC4nFNkpI7ryZ0UGqkBsyL2','student'),(128,'gago@gmail.com','$2b$10$5YbuIOt/PFLL4sRObJdoturFMXBmu6l6DkwsXeCA42QOM2SKJUp6K','student'),(129,'toblerone@gmail.com','$2b$10$4siBw3lMC0CoyuI/cwsCKeK.0hpz/reZU494hN33zGbOzeMw0uqyO','professor'),(130,'parang@gmail.com','$2b$10$aSHAjb.8DSFuj2vaI8NH2eSiPruNk1d/LfxEc.21RVlAj8hGfb4JG','student'),(131,'kabila@gmail.com','$2b$10$yD0wqzbAPwIbMY9ekKCNwu/y8fYkfgCSH7fnI4g2lPNJyKF3Dvw9O','student'),(132,'babagsak@gmail.com','$2b$10$SysK0l8Mj6n7C9o2YPqxl.R0uCyq6uALENLhcDfp65PK620P7LFwW','professor'),(133,'papasa@gmail.com','$2b$10$qZ./FKInBNOIBHjJFqVhq.Kp7kx7dUl8PXTyXrt0aOklxzIRrqyle','student'),(134,'papasa@gmail.com','$2b$10$AFHedrhVfWuMlmQjAWoAouf0txmjQtm7.Iipu5WBuJrpjdUttbyF2','student'),(135,'papasa@gmail.com','$2b$10$m27BCGx16YpAs5/CPIFI8uL6L0//qN9BBQMnm8i6SOlFs3kxBx2dy','student'),(136,'safe@gmail.com','$2b$10$sPv8qPkYG3GPSmkqAbJfJu4cSDpXW4ChcsbPah5T/QQ29Vjszgyom','student'),(137,'dado@gmail.com','$2b$10$Sj53XPO40FxPAfDBrLr9Q.zW2Bgj13NhiRsiol4.AwZte8CZ7K1Tu','professor'),(138,'jit@gmail.com','$2b$10$QBMS87GpmEU0s30zPtT5UewPmBWIShl6b7EdFBDgUW14wfHSZylAi','professor'),(139,'jit1@gmail.com','$2b$10$MGqnabnBksmwVNd2Ntz5oOB51msyOkTelfwrFPmw.blSxKZ5tLLJ.','student'),(140,'christian@gmail.com','$2b$10$ijy92gX7uhgPEHZgkm9TmuXLqE28GZBUJ3SkFCanzaMt6AulJj5k.','professor'),(141,'astig@gmail.com','$2b$10$cJZO63ZiHG9cCwr2ygcdz.S369cpxXFfJYcifHvFIxWkyHWxtlR2i','professor'),(142,'escape@gmail.com','$2b$10$7uz4hftvHxBP8uUf/umo9O7em4g1Pfg/wewa5PlukjDTsgMzp8DtO','professor'),(143,'battle@gmail.com','$2b$10$Y4bG3LAkjT0YwNY8emDIwua2YcEsti7I9v8/IhcNJGea0yI3Chl3e','professor'),(144,'sen@gmail.com','$2b$10$JIazg1Ua9cyMQrdJ.9wlpOQlHpTg9MmcDrvMoaHnUlzVvQGpNppea','professor'),(145,'set@gmail.com','$2b$10$Y1v4VFoZRfJYYZHCMQW30usbt1hrmHqUzDi7HFCgJp.5BmjDuLAne','student'),(146,'oxva@gmail.com','$2b$10$sDn6E/h/PbM8OCS44qeD5O6e6x3gZVFWRXlUm6j3HYXPlyLxIBDeG','student'),(147,'bossing@gmail.com','$2b$10$E1lzCJIiU7PlTnrBtGcg7umvX/kLXwXDShXMB/BUkKIr4Oqb99fIO','student'),(148,'swim@gmail.com','$2b$10$Py4yDVxlJKB6OhoYVD6s6.ENAA2MJl3/WnSdAd5w0YpbvxeEXPpJO','student'),(149,'eyy@gmail.com','$2b$10$Vp9jUr3/BbrJR/2oj0nfkeYFG06lA4q7wH7PEvOXArEeCVSWbAwkW','student'),(150,'rumble@gmail.com','$2b$10$vCllbqEJZ2QudYG3TLbnm.3y/kaG4SOES8x0B3.w8VtK8y2phQc9q','student'),(151,'marilag_aljohn@dwc-legazpi.edu','$2b$10$oGipVVgWglPm515mPbVMOOXJKEi8Kjej68yqtHCknlVGjgjLE1Xpa','professor'),(152,'montesor123@gmail.com','$2b$10$/V8FKXN19wPcX0ZMM.RvPuD4wvBSfeEqXwgcl.w3gqAhttbFtoCxi','student'),(153,'flashcard@gmail.com','$2b$10$AtHh6koMZro0p.HiaxdUFOq8bPzDR2uNd.8jE9fsh5oAsucvAiQje','student'),(154,'swim@gmail.com','$2b$10$OSn9XHKcyouB7O79Simlk.U0/6FFXDBwZuZn5XYEdZBuoICmVnZ/q','student'),(155,'young@gmail.com','$2b$10$qP.d5Mm.G91wecsIJ4Ryk..O74H/w1PRXUfzulOU6dyu3JkiTzYrK','professor'),(156,'waa@gmail.com','$2b$10$UeM6w4XmhDQNLuPSXEq/xeWvuv7GvIAxznteOaFBN9.dSub2b0avO','professor'),(157,'google@gmail.com','$2b$10$FCOXm.ByGieE9HYC7qIJKef7tKXqCwN4rPXQGcaocGSMlRFn.VmgW','professor'),(158,'renzo@gmail.com','$2b$10$kQjXtyZca/Dj/IPw2pHt6OUtYTIWG5huKn./Zkt1Lh/ncsHPvFJ7a','professor'),(159,'student@gmail.com','$2b$10$wzzRl2RUhQ4dUxdKfk1Uj.Z9v3byZBfuBKCl0CB.LtGhBwaFbUb6y','student'),(160,'harley@gmail.com','$2b$10$/V1o56XNr8N.k948DzQlw.1WwtDmP4wT5FySYITdGqraAEd4Jg5PG','professor'),(161,'student123@gmail.com','$2b$10$rxvrQL2jl4lxyaeqrii8i.ORqr1wlO.pwjf8UGxyBe7Ml0DOSqV52','student'),(162,'jadeken@gmail.com','$2b$10$jNhYSUK2WQWOxtG6EsNaKOiASWEqHgFW0Phl3h4nLyLyNZiV91Sa2','student'),(163,'george12345678@gmail.com','$2b$10$fyptxTQ5tORo9sSvg39rVeocdPr/nzBlMBVa6Zc/fFR4erxn6HJM6','student'),(164,'angelee@gmail.com','$2b$10$5RXKrT9itm/bkXnzgiYFYeMSO8ZzStuaNXeNEG95VcLyQB5JO8cmy','student'),(165,'milletemea@gmail.com','$2b$10$DzlwOUh7Ta7gRL8//n9olOfE7r3fU7sWbBNQLASH6oCNpsMIKVe9a','student'),(166,'milletemea@gmail.com','$2b$10$UW6Y1erXeDLXlmVynA2u/O0HB7Kh0V80Nf9BRMKM5H4FO4W.p8hf2','student'),(167,'sirjay@gmail.com','$2b$10$8lqBLSH7/2WKJoGkReXi0OZymSaa7mLPisOoX4tVFpsnB3nkZxrM.','professor'),(168,'sirjay','$2b$10$QdXMIuNu7DFh18eLS6ZtwOqZfc8s0iIf.WW8KBaXi9O/eybhK/R7y','professor'),(169,'google@gmail.com','$2b$10$WvGreNFOAhTR2f3tEKCxUuNUiDTFCNZW5YaEUZgxepaCqFxSTCU7m','professor'),(170,'google@gmail.com','$2b$10$J7cB2eYOtQ7tY5KRmFwF9.ZSeZ0HHU0vs3ixRiCaFm6PdL.NTGcTK','professor'),(171,'google@gmail.com','$2b$10$96Kna4iDEn28xGr/gwmZmumqxLj5V1U9C79B1umnZ5BqmaNf7eifC','professor'),(172,'professor@gmail.com','$2b$10$zSjV9nnUiSKBFBL20Cczl.38eXnbwnxs1tQxoQx3zMs6RKZFIFI9i','professor'),(173,'serving@gmail.com','$2b$10$Llb/ArvaXEIo/y6czX6XZuI3F8udBEeiSdQafA9qudJa9/ynfEtMK','student'),(174,'bell@gmail.com','$2b$10$tn8Z/8tEGHJDU3Ju5EniPe7RmoXpcDXRy0D/.Unb6h.mfwlTMl6CW','student'),(175,'christian12345@gmail.com','$2b$10$DA/Dw9S.YZgkFpXXJdn.meQRyY7jIrBlzbync0h7MWGCw/vXpRXWK','professor'),(176,'johnraven@gmail.com','$2b$10$LWQ11dtrzrSiUXGH0OGzgOY2GBzFcqcscguZxYUspWKwO8GkFtKqy','professor'),(177,'student12345@gmail.com','$2b$10$RCf5feswQ3sXJdl7RZyExev/b6cjIot7RZgzovgMKqQahA9HHHVpe','student'),(178,'johnraven@gmail.com','$2b$10$MxSZZCQUE7J1wWplDVDpNOhUAT8rtSXGH.iF02pVtjJyiMY.KSnEi','professor'),(179,'maryane@gmail.com','$2b$10$3Q386avccRhxq3BGRHSYguhFOvKiSk/7CQXpU1rFmTa1kXSZU80M.','student'),(180,'boss@gmail.com','$2b$10$Td2ATeEUSA/GZQ9R8LSWPOeDy4tBDVztttFd814XonMOvN.RpkpkW','professor'),(181,'noahnoah@gmail.com','$2b$10$QPl.TWgVBmT/FqhrNm67FO.hT029rgJ0owRtSJhrnT6SlCbZoVBEu','student');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-09-02 22:08:57

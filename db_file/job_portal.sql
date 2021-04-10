-- Adminer 4.5.0 MySQL dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

DROP DATABASE IF EXISTS `job_portal`;
CREATE DATABASE `job_portal` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `job_portal`;

DROP TABLE IF EXISTS `authorise`;
CREATE TABLE `authorise` (
  `username` varchar(255) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

TRUNCATE `authorise`;
INSERT INTO `authorise` (`username`, `email`, `name`, `password`) VALUES
('swati',	'mahajan.swati90@gmail.com',	'Administrator',	'swati');

DROP TABLE IF EXISTS `category`;
CREATE TABLE `category` (
  `category_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`category_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

TRUNCATE `category`;
INSERT INTO `category` (`category_id`, `name`) VALUES
(1,	'Accounting Consulting'),
(2,	'Admin Support'),
(3,	'Customer Service'),
(4,	'Data Science Analytics'),
(5,	'Design Creative'),
(6,	'Engineering Architecture'),
(7,	'IT Networking'),
(8,	'Legal'),
(9,	'Sales Marketing'),
(10,	'Translation'),
(11,	'Web, Mobile Software Dev'),
(12,	'Writing');

DROP TABLE IF EXISTS `category_aud`;
CREATE TABLE `category_aud` (
  `category_id` bigint(20) NOT NULL,
  `rev` int(11) NOT NULL,
  `revtype` tinyint(4) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`category_id`,`rev`),
  KEY `FKc9m640crhsib2ws80um6xuk1w` (`rev`),
  CONSTRAINT `FKc9m640crhsib2ws80um6xuk1w` FOREIGN KEY (`rev`) REFERENCES `revinfo` (`rev`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

TRUNCATE `category_aud`;

DROP TABLE IF EXISTS `company`;
CREATE TABLE `company` (
  `company_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `address` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `company_name` varchar(255) DEFAULT NULL,
  `contact` varchar(255) DEFAULT NULL,
  `contact1` varchar(255) DEFAULT NULL,
  `contact2` varchar(255) DEFAULT NULL,
  `country` varchar(255) DEFAULT NULL,
  `email_id` varchar(255) DEFAULT NULL,
  `state` varchar(255) DEFAULT NULL,
  `user_account_id` bigint(20) NOT NULL,
  PRIMARY KEY (`company_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

TRUNCATE `company`;

DROP TABLE IF EXISTS `company_aud`;
CREATE TABLE `company_aud` (
  `company_id` bigint(20) NOT NULL,
  `rev` int(11) NOT NULL,
  `revtype` tinyint(4) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `company_name` varchar(255) DEFAULT NULL,
  `contact` varchar(255) DEFAULT NULL,
  `contact1` varchar(255) DEFAULT NULL,
  `contact2` varchar(255) DEFAULT NULL,
  `country` varchar(255) DEFAULT NULL,
  `email_id` varchar(255) DEFAULT NULL,
  `state` varchar(255) DEFAULT NULL,
  `user_account_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`company_id`,`rev`),
  KEY `FK4bojjw2sh9ku0m2giux40mu3h` (`rev`),
  CONSTRAINT `FK4bojjw2sh9ku0m2giux40mu3h` FOREIGN KEY (`rev`) REFERENCES `revinfo` (`rev`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

TRUNCATE `company_aud`;

DROP TABLE IF EXISTS `company_interest`;
CREATE TABLE `company_interest` (
  `company_interest_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `company_id` bigint(20) NOT NULL,
  `hiring_manager_id` varchar(255) DEFAULT NULL,
  `job_id` bigint(20) NOT NULL,
  `status` varchar(255) DEFAULT NULL,
  `student_id` bigint(20) NOT NULL,
  PRIMARY KEY (`company_interest_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

TRUNCATE `company_interest`;

DROP TABLE IF EXISTS `company_interest_aud`;
CREATE TABLE `company_interest_aud` (
  `company_interest_id` bigint(20) NOT NULL,
  `rev` int(11) NOT NULL,
  `revtype` tinyint(4) DEFAULT NULL,
  `company_id` bigint(20) DEFAULT NULL,
  `hiring_manager_id` varchar(255) DEFAULT NULL,
  `job_id` bigint(20) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `student_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`company_interest_id`,`rev`),
  KEY `FKs501ey76qom5jgi9qi6xd36wg` (`rev`),
  CONSTRAINT `FKs501ey76qom5jgi9qi6xd36wg` FOREIGN KEY (`rev`) REFERENCES `revinfo` (`rev`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

TRUNCATE `company_interest_aud`;

DROP TABLE IF EXISTS `education`;
CREATE TABLE `education` (
  `education_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `education_name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`education_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

TRUNCATE `education`;

DROP TABLE IF EXISTS `education_aud`;
CREATE TABLE `education_aud` (
  `education_id` bigint(20) NOT NULL,
  `rev` int(11) NOT NULL,
  `revtype` tinyint(4) DEFAULT NULL,
  `education_name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`education_id`,`rev`),
  KEY `FKf7yvnxuuy5ql1f96d2brlpfq` (`rev`),
  CONSTRAINT `FKf7yvnxuuy5ql1f96d2brlpfq` FOREIGN KEY (`rev`) REFERENCES `revinfo` (`rev`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

TRUNCATE `education_aud`;

DROP TABLE IF EXISTS `has_skill`;
CREATE TABLE `has_skill` (
  `has_skill_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `skill_id` bigint(20) NOT NULL,
  `student_id` bigint(20) NOT NULL,
  PRIMARY KEY (`has_skill_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

TRUNCATE `has_skill`;

DROP TABLE IF EXISTS `has_skill_aud`;
CREATE TABLE `has_skill_aud` (
  `has_skill_id` bigint(20) NOT NULL,
  `rev` int(11) NOT NULL,
  `revtype` tinyint(4) DEFAULT NULL,
  `skill_id` bigint(20) DEFAULT NULL,
  `student_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`has_skill_id`,`rev`),
  KEY `FKlu2u3wlso8q673yabd0jnk8c0` (`rev`),
  CONSTRAINT `FKlu2u3wlso8q673yabd0jnk8c0` FOREIGN KEY (`rev`) REFERENCES `revinfo` (`rev`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

TRUNCATE `has_skill_aud`;

DROP TABLE IF EXISTS `hiring_manager`;
CREATE TABLE `hiring_manager` (
  `hiring_manager_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `city` varchar(255) DEFAULT NULL,
  `company_id` bigint(20) NOT NULL,
  `contact1` varchar(255) DEFAULT NULL,
  `contact2` varchar(255) DEFAULT NULL,
  `country` varchar(255) DEFAULT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `middle_name` varchar(255) DEFAULT NULL,
  `registration_date` varchar(255) DEFAULT NULL,
  `state` varchar(255) DEFAULT NULL,
  `user_account_id` bigint(20) NOT NULL,
  `email_id` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`hiring_manager_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

TRUNCATE `hiring_manager`;

DROP TABLE IF EXISTS `hiring_manager_aud`;
CREATE TABLE `hiring_manager_aud` (
  `hiring_manager_id` bigint(20) NOT NULL,
  `rev` int(11) NOT NULL,
  `revtype` tinyint(4) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `company_id` bigint(20) DEFAULT NULL,
  `contact1` varchar(255) DEFAULT NULL,
  `contact2` varchar(255) DEFAULT NULL,
  `country` varchar(255) DEFAULT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `middle_name` varchar(255) DEFAULT NULL,
  `registration_date` varchar(255) DEFAULT NULL,
  `state` varchar(255) DEFAULT NULL,
  `user_account_id` bigint(20) DEFAULT NULL,
  `email_id` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`hiring_manager_id`,`rev`),
  KEY `FKq2fijojqmhmre8otda6gbpk54` (`rev`),
  CONSTRAINT `FKq2fijojqmhmre8otda6gbpk54` FOREIGN KEY (`rev`) REFERENCES `revinfo` (`rev`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

TRUNCATE `hiring_manager_aud`;

DROP TABLE IF EXISTS `job`;
CREATE TABLE `job` (
  `job_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `category_id` bigint(20) NOT NULL,
  `company_id` bigint(20) NOT NULL,
  `experience_req` varchar(255) DEFAULT NULL,
  `job_city` varchar(255) DEFAULT NULL,
  `job_description` varchar(255) DEFAULT NULL,
  `job_max_salary` varchar(255) DEFAULT NULL,
  `job_min_salary` varchar(255) DEFAULT NULL,
  `job_posted_date` varchar(255) DEFAULT NULL,
  `job_state` varchar(255) DEFAULT NULL,
  `job_status` varchar(255) DEFAULT NULL,
  `job_title` varchar(255) DEFAULT NULL,
  `jobtype_id` bigint(20) NOT NULL,
  PRIMARY KEY (`job_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

TRUNCATE `job`;

DROP TABLE IF EXISTS `job_aud`;
CREATE TABLE `job_aud` (
  `job_id` bigint(20) NOT NULL,
  `rev` int(11) NOT NULL,
  `revtype` tinyint(4) DEFAULT NULL,
  `category_id` bigint(20) DEFAULT NULL,
  `company_id` bigint(20) DEFAULT NULL,
  `experience_req` varchar(255) DEFAULT NULL,
  `job_city` varchar(255) DEFAULT NULL,
  `job_description` varchar(255) DEFAULT NULL,
  `job_max_salary` varchar(255) DEFAULT NULL,
  `job_min_salary` varchar(255) DEFAULT NULL,
  `job_posted_date` varchar(255) DEFAULT NULL,
  `job_state` varchar(255) DEFAULT NULL,
  `job_status` varchar(255) DEFAULT NULL,
  `job_title` varchar(255) DEFAULT NULL,
  `jobtype_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`job_id`,`rev`),
  KEY `FKr9cfk1qyryg69jgbfhniwebxy` (`rev`),
  CONSTRAINT `FKr9cfk1qyryg69jgbfhniwebxy` FOREIGN KEY (`rev`) REFERENCES `revinfo` (`rev`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

TRUNCATE `job_aud`;

DROP TABLE IF EXISTS `job_type`;
CREATE TABLE `job_type` (
  `job_type_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`job_type_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

TRUNCATE `job_type`;

DROP TABLE IF EXISTS `job_type_aud`;
CREATE TABLE `job_type_aud` (
  `job_type_id` bigint(20) NOT NULL,
  `rev` int(11) NOT NULL,
  `revtype` tinyint(4) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`job_type_id`,`rev`),
  KEY `FKlnqbvbontbsvo0b0al9httkwe` (`rev`),
  CONSTRAINT `FKlnqbvbontbsvo0b0al9httkwe` FOREIGN KEY (`rev`) REFERENCES `revinfo` (`rev`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

TRUNCATE `job_type_aud`;

DROP TABLE IF EXISTS `other_skill`;
CREATE TABLE `other_skill` (
  `other_skill_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `job_id` bigint(20) NOT NULL,
  `skill_id` bigint(20) NOT NULL,
  PRIMARY KEY (`other_skill_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

TRUNCATE `other_skill`;

DROP TABLE IF EXISTS `other_skill_aud`;
CREATE TABLE `other_skill_aud` (
  `other_skill_id` bigint(20) NOT NULL,
  `rev` int(11) NOT NULL,
  `revtype` tinyint(4) DEFAULT NULL,
  `job_id` bigint(20) DEFAULT NULL,
  `skill_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`other_skill_id`,`rev`),
  KEY `FKhgaiol6wmi1nfnfq5cdpiadb6` (`rev`),
  CONSTRAINT `FKhgaiol6wmi1nfnfq5cdpiadb6` FOREIGN KEY (`rev`) REFERENCES `revinfo` (`rev`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

TRUNCATE `other_skill_aud`;

DROP TABLE IF EXISTS `question`;
CREATE TABLE `question` (
  `question_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `question_text` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`question_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

TRUNCATE `question`;

DROP TABLE IF EXISTS `question_aud`;
CREATE TABLE `question_aud` (
  `question_id` bigint(20) NOT NULL,
  `rev` int(11) NOT NULL,
  `revtype` tinyint(4) DEFAULT NULL,
  `question_text` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`question_id`,`rev`),
  KEY `FK7b7vnhne6wrg69pvdmjtvutq0` (`rev`),
  CONSTRAINT `FK7b7vnhne6wrg69pvdmjtvutq0` FOREIGN KEY (`rev`) REFERENCES `revinfo` (`rev`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

TRUNCATE `question_aud`;

DROP TABLE IF EXISTS `revinfo`;
CREATE TABLE `revinfo` (
  `rev` int(11) NOT NULL AUTO_INCREMENT,
  `revtstmp` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`rev`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

TRUNCATE `revinfo`;
INSERT INTO `revinfo` (`rev`, `revtstmp`) VALUES
(1,	1615271444103),
(2,	1615271444103),
(3,	1615271447068),
(4,	1615764418991),
(5,	1615764421315),
(6,	1615764423027);

DROP TABLE IF EXISTS `skill`;
CREATE TABLE `skill` (
  `skill_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `skill_name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`skill_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

TRUNCATE `skill`;

DROP TABLE IF EXISTS `skill_aud`;
CREATE TABLE `skill_aud` (
  `skill_id` bigint(20) NOT NULL,
  `rev` int(11) NOT NULL,
  `revtype` tinyint(4) DEFAULT NULL,
  `skill_name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`skill_id`,`rev`),
  KEY `FKjv2nw7mttjdkyqeqe7nhm6hls` (`rev`),
  CONSTRAINT `FKjv2nw7mttjdkyqeqe7nhm6hls` FOREIGN KEY (`rev`) REFERENCES `revinfo` (`rev`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

TRUNCATE `skill_aud`;

DROP TABLE IF EXISTS `student_category`;
CREATE TABLE `student_category` (
  `student_category_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `category_id` bigint(20) NOT NULL,
  `subcategory_id` bigint(20) NOT NULL,
  `student_id` bigint(20) NOT NULL,
  PRIMARY KEY (`student_category_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

TRUNCATE `student_category`;
INSERT INTO `student_category` (`student_category_id`, `category_id`, `subcategory_id`, `student_id`) VALUES
(1,	1,	1,	1);

DROP TABLE IF EXISTS `student_category_aud`;
CREATE TABLE `student_category_aud` (
  `student_category_id` bigint(20) NOT NULL,
  `rev` int(11) NOT NULL,
  `revtype` tinyint(4) DEFAULT NULL,
  `category_id` bigint(20) DEFAULT NULL,
  `student_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`student_category_id`,`rev`),
  KEY `FK8bwthc4y6ot478fet9jb40dbh` (`rev`),
  CONSTRAINT `FK8bwthc4y6ot478fet9jb40dbh` FOREIGN KEY (`rev`) REFERENCES `revinfo` (`rev`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

TRUNCATE `student_category_aud`;

DROP TABLE IF EXISTS `student_certificate`;
CREATE TABLE `student_certificate` (
  `student_certificate_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `certificate_id` bigint(20) NOT NULL,
  `certificate_link` varchar(255) DEFAULT NULL,
  `certificate_name` varchar(255) DEFAULT NULL,
  `date_earned` varchar(255) DEFAULT NULL,
  `date_ended` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `provider` varchar(255) DEFAULT NULL,
  `student_id` bigint(20) NOT NULL,
  PRIMARY KEY (`student_certificate_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

TRUNCATE `student_certificate`;

DROP TABLE IF EXISTS `student_certificate_aud`;
CREATE TABLE `student_certificate_aud` (
  `student_certificate_id` bigint(20) NOT NULL,
  `rev` int(11) NOT NULL,
  `revtype` tinyint(4) DEFAULT NULL,
  `certificate_id` bigint(20) DEFAULT NULL,
  `certificate_link` varchar(255) DEFAULT NULL,
  `certificate_name` varchar(255) DEFAULT NULL,
  `date_earned` varchar(255) DEFAULT NULL,
  `date_ended` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `provider` varchar(255) DEFAULT NULL,
  `student_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`student_certificate_id`,`rev`),
  KEY `FKkibtj88fr7xjp0lpuu5xcq20x` (`rev`),
  CONSTRAINT `FKkibtj88fr7xjp0lpuu5xcq20x` FOREIGN KEY (`rev`) REFERENCES `revinfo` (`rev`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

TRUNCATE `student_certificate_aud`;

DROP TABLE IF EXISTS `student_education`;
CREATE TABLE `student_education` (
  `student_education_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `date` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `education_end_date` varchar(255) DEFAULT NULL,
  `education_start_date` varchar(255) DEFAULT NULL,
  `student_id` bigint(20) NOT NULL,
  `student_university_id` bigint(20) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`student_education_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

TRUNCATE `student_education`;

DROP TABLE IF EXISTS `student_education_aud`;
CREATE TABLE `student_education_aud` (
  `student_education_id` bigint(20) NOT NULL,
  `rev` int(11) NOT NULL,
  `revtype` tinyint(4) DEFAULT NULL,
  `date` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `education_end_date` varchar(255) DEFAULT NULL,
  `education_start_date` varchar(255) DEFAULT NULL,
  `student_id` bigint(20) DEFAULT NULL,
  `student_university_id` bigint(20) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`student_education_id`,`rev`),
  KEY `FKgpsl8t3mwgbw05pu3n852n833` (`rev`),
  CONSTRAINT `FKgpsl8t3mwgbw05pu3n852n833` FOREIGN KEY (`rev`) REFERENCES `revinfo` (`rev`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

TRUNCATE `student_education_aud`;

DROP TABLE IF EXISTS `student_experience`;
CREATE TABLE `student_experience` (
  `student_experience_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `date` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `experience_end_date` varchar(255) DEFAULT NULL,
  `experience_start_date` varchar(255) DEFAULT NULL,
  `student_id` bigint(20) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`student_experience_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

TRUNCATE `student_experience`;

DROP TABLE IF EXISTS `student_experience_aud`;
CREATE TABLE `student_experience_aud` (
  `student_experience_id` bigint(20) NOT NULL,
  `rev` int(11) NOT NULL,
  `revtype` tinyint(4) DEFAULT NULL,
  `date` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `experience_end_date` varchar(255) DEFAULT NULL,
  `experience_start_date` varchar(255) DEFAULT NULL,
  `student_id` bigint(20) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`student_experience_id`,`rev`),
  KEY `FKjx2nqsnu1e25mqojy2vviwi68` (`rev`),
  CONSTRAINT `FKjx2nqsnu1e25mqojy2vviwi68` FOREIGN KEY (`rev`) REFERENCES `revinfo` (`rev`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

TRUNCATE `student_experience_aud`;

DROP TABLE IF EXISTS `student_expertise`;
CREATE TABLE `student_expertise` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `skills` longtext NOT NULL,
  `others` longtext NOT NULL,
  `level` int(11) DEFAULT NULL COMMENT '1 - entry level, 2 - intermediate, 3 - expert ',
  `student_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

TRUNCATE `student_expertise`;
INSERT INTO `student_expertise` (`id`, `skills`, `others`, `level`, `student_id`) VALUES
(1,	'other',	'Software development, system administrator, application design',	2,	1);

DROP TABLE IF EXISTS `student_interest`;
CREATE TABLE `student_interest` (
  `student_interest_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `company_id` bigint(20) NOT NULL,
  `job_id` bigint(20) NOT NULL,
  `status` varchar(255) DEFAULT NULL,
  `student_id` bigint(20) NOT NULL,
  PRIMARY KEY (`student_interest_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

TRUNCATE `student_interest`;

DROP TABLE IF EXISTS `student_interest_aud`;
CREATE TABLE `student_interest_aud` (
  `student_interest_id` bigint(20) NOT NULL,
  `rev` int(11) NOT NULL,
  `revtype` tinyint(4) DEFAULT NULL,
  `company_id` bigint(20) DEFAULT NULL,
  `job_id` bigint(20) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `student_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`student_interest_id`,`rev`),
  KEY `FKjnjhea7v83spweg3xryg8ac8j` (`rev`),
  CONSTRAINT `FKjnjhea7v83spweg3xryg8ac8j` FOREIGN KEY (`rev`) REFERENCES `revinfo` (`rev`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

TRUNCATE `student_interest_aud`;

DROP TABLE IF EXISTS `student_job_type`;
CREATE TABLE `student_job_type` (
  `student_job_type_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `job_type_id` bigint(20) NOT NULL,
  `student_id` bigint(20) NOT NULL,
  `type` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`student_job_type_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

TRUNCATE `student_job_type`;

DROP TABLE IF EXISTS `student_job_type_aud`;
CREATE TABLE `student_job_type_aud` (
  `student_job_type_id` bigint(20) NOT NULL,
  `rev` int(11) NOT NULL,
  `revtype` tinyint(4) DEFAULT NULL,
  `job_type_id` bigint(20) DEFAULT NULL,
  `student_id` bigint(20) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`student_job_type_id`,`rev`),
  KEY `FKrm2wfjds0tajcqvkadet8tn7d` (`rev`),
  CONSTRAINT `FKrm2wfjds0tajcqvkadet8tn7d` FOREIGN KEY (`rev`) REFERENCES `revinfo` (`rev`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

TRUNCATE `student_job_type_aud`;

DROP TABLE IF EXISTS `student_project`;
CREATE TABLE `student_project` (
  `student_project_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `date` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `link` varchar(255) DEFAULT NULL,
  `project_end_date` varchar(255) DEFAULT NULL,
  `project_start_date` varchar(255) DEFAULT NULL,
  `student_id` bigint(20) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`student_project_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

TRUNCATE `student_project`;

DROP TABLE IF EXISTS `student_project_aud`;
CREATE TABLE `student_project_aud` (
  `student_project_id` bigint(20) NOT NULL,
  `rev` int(11) NOT NULL,
  `revtype` tinyint(4) DEFAULT NULL,
  `date` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `link` varchar(255) DEFAULT NULL,
  `project_end_date` varchar(255) DEFAULT NULL,
  `project_start_date` varchar(255) DEFAULT NULL,
  `student_id` bigint(20) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`student_project_id`,`rev`),
  KEY `FKgwl68bqxee1b3kwn0djpteima` (`rev`),
  CONSTRAINT `FKgwl68bqxee1b3kwn0djpteima` FOREIGN KEY (`rev`) REFERENCES `revinfo` (`rev`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

TRUNCATE `student_project_aud`;

DROP TABLE IF EXISTS `student_question`;
CREATE TABLE `student_question` (
  `student_question_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `answer` varchar(255) DEFAULT NULL,
  `question` varchar(255) DEFAULT NULL,
  `student_id` bigint(20) NOT NULL,
  PRIMARY KEY (`student_question_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

TRUNCATE `student_question`;

DROP TABLE IF EXISTS `student_question_aud`;
CREATE TABLE `student_question_aud` (
  `student_question_id` bigint(20) NOT NULL,
  `rev` int(11) NOT NULL,
  `revtype` tinyint(4) DEFAULT NULL,
  `answer` varchar(255) DEFAULT NULL,
  `question` varchar(255) DEFAULT NULL,
  `student_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`student_question_id`,`rev`),
  KEY `FKhee4yytj0go89r8vw3wflcr1l` (`rev`),
  CONSTRAINT `FKhee4yytj0go89r8vw3wflcr1l` FOREIGN KEY (`rev`) REFERENCES `revinfo` (`rev`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

TRUNCATE `student_question_aud`;

DROP TABLE IF EXISTS `student_record`;
CREATE TABLE `student_record` (
  `student_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `category_id` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `contact1` varchar(255) DEFAULT NULL,
  `contact2` varchar(255) DEFAULT NULL,
  `correspondence_address` varchar(255) DEFAULT NULL,
  `dob` varchar(255) DEFAULT NULL,
  `email_id` varchar(255) DEFAULT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `gender` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `linked_in_profile` varchar(255) DEFAULT NULL,
  `middle_name` varchar(255) DEFAULT NULL,
  `mobile_number` varchar(255) DEFAULT NULL,
  `nationality` varchar(255) DEFAULT NULL,
  `photo` varchar(255) DEFAULT NULL,
  `residential_address` varchar(255) DEFAULT NULL,
  `resume_link` varchar(255) DEFAULT NULL,
  `skill_set` varchar(255) DEFAULT NULL,
  `state` varchar(255) DEFAULT NULL,
  `user_account_id` bigint(20) NOT NULL,
  PRIMARY KEY (`student_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

TRUNCATE `student_record`;
INSERT INTO `student_record` (`student_id`, `category_id`, `city`, `contact1`, `contact2`, `correspondence_address`, `dob`, `email_id`, `first_name`, `gender`, `last_name`, `linked_in_profile`, `middle_name`, `mobile_number`, `nationality`, `photo`, `residential_address`, `resume_link`, `skill_set`, `state`, `user_account_id`) VALUES
(1,	NULL,	'LB',	'1234567890',	'2345678909',	'gsdytft',	'2021-03-16',	'nisarg205@gmail.com',	'Nisarg',	'Male',	'Pandya',	'jfuyu',	'P',	NULL,	'jyg',	NULL,	'fj',	'jfj',	NULL,	'California',	0),
(2,	NULL,	'Long Beach',	'2134567890',	'1234567890',	'hgujhgikhkj',	'2021-03-08',	'nisarg205@gmail.com',	'Nisarg',	'Male',	'Pandya',	'jgujj',	'P',	NULL,	'INdain',	NULL,	'fj',	'hgj',	NULL,	'California',	2);

DROP TABLE IF EXISTS `student_record_aud`;
CREATE TABLE `student_record_aud` (
  `student_id` bigint(20) NOT NULL,
  `rev` int(11) NOT NULL,
  `revtype` tinyint(4) DEFAULT NULL,
  `category_id` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `contact1` varchar(255) DEFAULT NULL,
  `contact2` varchar(255) DEFAULT NULL,
  `correspondence_address` varchar(255) DEFAULT NULL,
  `dob` varchar(255) DEFAULT NULL,
  `email_id` varchar(255) DEFAULT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `gender` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `linked_in_profile` varchar(255) DEFAULT NULL,
  `middle_name` varchar(255) DEFAULT NULL,
  `mobile_number` varchar(255) DEFAULT NULL,
  `nationality` varchar(255) DEFAULT NULL,
  `photo` varchar(255) DEFAULT NULL,
  `residential_address` varchar(255) DEFAULT NULL,
  `resume_link` varchar(255) DEFAULT NULL,
  `skill_set` varchar(255) DEFAULT NULL,
  `state` varchar(255) DEFAULT NULL,
  `user_account_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`student_id`,`rev`),
  KEY `FKadekhccoav5cydtgy0385h24b` (`rev`),
  CONSTRAINT `FKadekhccoav5cydtgy0385h24b` FOREIGN KEY (`rev`) REFERENCES `revinfo` (`rev`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

TRUNCATE `student_record_aud`;
INSERT INTO `student_record_aud` (`student_id`, `rev`, `revtype`, `category_id`, `city`, `contact1`, `contact2`, `correspondence_address`, `dob`, `email_id`, `first_name`, `gender`, `last_name`, `linked_in_profile`, `middle_name`, `mobile_number`, `nationality`, `photo`, `residential_address`, `resume_link`, `skill_set`, `state`, `user_account_id`) VALUES
(1,	1,	0,	NULL,	'LB',	'1234567890',	'2345678909',	'gsdytft',	'2021-03-16',	'nisarg205@gmail.com',	'Nisarg',	'Male',	'Pandya',	'jfuyu',	'P',	NULL,	'jyg',	NULL,	'fj',	'jfj',	NULL,	'California',	0),
(2,	6,	0,	NULL,	'Long Beach',	'2134567890',	'1234567890',	'hgujhgikhkj',	'2021-03-08',	'nisarg205@gmail.com',	'Nisarg',	'Male',	'Pandya',	'jgujj',	'P',	NULL,	'INdain',	NULL,	'fj',	'hgj',	NULL,	'California',	2);

DROP TABLE IF EXISTS `student_resume`;
CREATE TABLE `student_resume` (
  `student_resume_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `resume_link` varchar(255) DEFAULT NULL,
  `student_id` bigint(20) NOT NULL,
  `updated_time` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`student_resume_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

TRUNCATE `student_resume`;

DROP TABLE IF EXISTS `student_resume_aud`;
CREATE TABLE `student_resume_aud` (
  `student_resume_id` bigint(20) NOT NULL,
  `rev` int(11) NOT NULL,
  `revtype` tinyint(4) DEFAULT NULL,
  `resume_link` varchar(255) DEFAULT NULL,
  `student_id` bigint(20) DEFAULT NULL,
  `updated_time` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`student_resume_id`,`rev`),
  KEY `FK58ynoa37o0299lsg0mleqcoh5` (`rev`),
  CONSTRAINT `FK58ynoa37o0299lsg0mleqcoh5` FOREIGN KEY (`rev`) REFERENCES `revinfo` (`rev`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

TRUNCATE `student_resume_aud`;

DROP TABLE IF EXISTS `student_university`;
CREATE TABLE `student_university` (
  `student_university_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `city` varchar(255) DEFAULT NULL,
  `country` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `state` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`student_university_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

TRUNCATE `student_university`;

DROP TABLE IF EXISTS `student_university_aud`;
CREATE TABLE `student_university_aud` (
  `student_university_id` bigint(20) NOT NULL,
  `rev` int(11) NOT NULL,
  `revtype` tinyint(4) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `country` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `state` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`student_university_id`,`rev`),
  KEY `FKmx1rxouulg763bvf8o2xl5wuf` (`rev`),
  CONSTRAINT `FKmx1rxouulg763bvf8o2xl5wuf` FOREIGN KEY (`rev`) REFERENCES `revinfo` (`rev`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

TRUNCATE `student_university_aud`;

DROP TABLE IF EXISTS `subcategories`;
CREATE TABLE `subcategories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `category_id` int(11) NOT NULL,
  `subcategory_name` varchar(200) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

TRUNCATE `subcategories`;
INSERT INTO `subcategories` (`id`, `category_id`, `subcategory_name`) VALUES
(1,	1,	'Accounting'),
(2,	1,	'Financial Planning'),
(3,	1,	'Human Resources'),
(4,	1,	'Management Consulting'),
(5,	1,	'Other - Accounting &amp; Consulting'),
(6,	2,	'Data Entry'),
(7,	2,	'Other - Admin Support'),
(8,	2,	'Personal/Virtual Assistance'),
(9,	2,	'Project Management'),
(10,	2,	'Transcription'),
(11,	2,	'Web Research'),
(12,	3,	'Customer Service'),
(13,	3,	'Technical Support'),
(14,	4,	'A/B Testing'),
(15,	4,	'Data Extraction/ETL'),
(16,	4,	'Data Mining &amp; Management'),
(17,	4,	'Data Visualization'),
(18,	4,	'Machine Learning'),
(19,	4,	'Other - Data Science &amp; Analytics'),
(20,	4,	'Quantitative Analysis'),
(21,	5,	'Art &amp; Illustration'),
(22,	5,	'Audio &amp; Music Production'),
(23,	5,	'Branding'),
(24,	5,	'Gaming &amp; AR/VR'),
(25,	5,	'Graphic, Editorial &amp; Presentation Design'),
(26,	5,	'Performing Arts'),
(27,	5,	'Photography'),
(28,	5,	'Product Design'),
(29,	5,	'Video &amp; Animation'),
(30,	5,	'Voice Talent'),
(31,	6,	'3D Modeling &amp; CAD'),
(32,	6,	'Architecture'),
(33,	6,	'Chemical Engineering'),
(34,	6,	'Civil &amp; Structural Engineering'),
(35,	6,	'Contract Manufacturing'),
(36,	6,	'Electrical Engineering'),
(37,	6,	'Interior Design'),
(38,	6,	'Mechanical Engineering'),
(39,	6,	'Other - Engineering'),
(40,	6,	'Physical Sciences'),
(41,	7,	'Database Administration'),
(42,	7,	'ERP/CRM Software'),
(43,	7,	'Information Security'),
(44,	7,	'Network &amp; System Administration'),
(45,	7,	'Other - IT &amp; Networking'),
(46,	8,	'Contract Law'),
(47,	8,	'Corporate Law'),
(48,	8,	'Intellectual Property Law'),
(49,	8,	'Other - Legal'),
(50,	8,	'Paralegal Services'),
(51,	9,	'Display Advertising'),
(52,	9,	'Email &amp; Marketing Automation'),
(53,	9,	'Lead Generation'),
(54,	9,	'Market &amp; Customer Research'),
(55,	9,	'Marketing Strategy'),
(56,	9,	'Other - Sales &amp; Marketing'),
(57,	9,	'Public Relations'),
(58,	9,	'SEM - Search Engine Marketing'),
(59,	9,	'SEO - Search Engine Optimization'),
(60,	9,	'SMM - Social Media Marketing'),
(61,	9,	'Telemarketing &amp; Telesales'),
(62,	10,	'General Translation'),
(63,	10,	'Legal Translation'),
(64,	10,	'Medical Translation'),
(65,	10,	'Technical Translation'),
(66,	11,	'Desktop Software Development'),
(67,	11,	'Ecommerce Development'),
(68,	11,	'Game Development'),
(69,	11,	'Mobile Development'),
(70,	11,	'Other - Software Development'),
(71,	11,	'Product Management'),
(72,	11,	'QA &amp; Testing'),
(73,	11,	'Scripts &amp; Utilities'),
(74,	11,	'Web &amp; Mobile Design'),
(75,	11,	'Web Development'),
(76,	12,	'Content &amp; Copywriting'),
(77,	12,	'Creative Writing'),
(78,	12,	'Editing &amp; Proofreading'),
(79,	12,	'Grant Writing'),
(80,	12,	'Other - Writing'),
(81,	12,	'Resumes &amp; Cover Letters'),
(82,	12,	'Technical Writing');

DROP TABLE IF EXISTS `user_account`;
CREATE TABLE `user_account` (
  `user_account_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `account_type` varchar(255) DEFAULT NULL,
  `email_id` varchar(255) DEFAULT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `user_name` varchar(255) DEFAULT NULL,
  `profile_completed` int(11) DEFAULT NULL,
  PRIMARY KEY (`user_account_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

TRUNCATE `user_account`;
INSERT INTO `user_account` (`user_account_id`, `account_type`, `email_id`, `first_name`, `last_name`, `password`, `user_name`, `profile_completed`) VALUES
(1,	'Student',	'nisarg205@gmail.com',	'Nisarg',	'Pandya',	'202cb962ac59075b964b07152d234b70',	'Nisarg1',	3),
(2,	'Student',	'nisarg205@gmail.com',	'Nisarg',	'Pandya',	'Aa7LziB1',	'Nisarg2',	NULL),
(6,	'Student',	'j.meenesh@gmail.com',	'Meenesh',	'Jain',	'202cb962ac59075b964b07152d234b70',	'Meenesh',	NULL),
(7,	'Student',	'jamesbond@malinator.com',	'James',	'Bond',	'202cb962ac59075b964b07152d234b70',	'James',	NULL),
(8,	'Student',	'jamesbond1@malinator.com',	'James',	'Bond',	'202cb962ac59075b964b07152d234b70',	'James',	NULL),
(9,	'Student',	'jamesbond2@malinator.com',	'James',	'Bond',	'202cb962ac59075b964b07152d234b70',	'James',	NULL);

DROP TABLE IF EXISTS `user_account_aud`;
CREATE TABLE `user_account_aud` (
  `user_account_id` bigint(20) NOT NULL,
  `rev` int(11) NOT NULL,
  `revtype` tinyint(4) DEFAULT NULL,
  `account_type` varchar(255) DEFAULT NULL,
  `email_id` varchar(255) DEFAULT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `user_name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`user_account_id`,`rev`),
  KEY `FKhvfceciynu26iccnapnt5xb4y` (`rev`),
  CONSTRAINT `FKhvfceciynu26iccnapnt5xb4y` FOREIGN KEY (`rev`) REFERENCES `revinfo` (`rev`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

TRUNCATE `user_account_aud`;
INSERT INTO `user_account_aud` (`user_account_id`, `rev`, `revtype`, `account_type`, `email_id`, `first_name`, `last_name`, `password`, `user_name`) VALUES
(1,	2,	0,	'Student',	'nisarg205@gmail.com',	'Nisarg',	'Pandya',	'2XKYBYEt',	NULL),
(1,	3,	1,	'Student',	'nisarg205@gmail.com',	'Nisarg',	'Pandya',	'2XKYBYEt',	'Nisarg1'),
(2,	4,	0,	'Student',	'nisarg205@gmail.com',	'Nisarg',	'Pandya',	'Aa7LziB1',	NULL),
(2,	5,	1,	'Student',	'nisarg205@gmail.com',	'Nisarg',	'Pandya',	'Aa7LziB1',	'Nisarg2');

-- 2021-04-10 11:22:01

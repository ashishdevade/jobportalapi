-- Phase 2 changes 

DROP TABLE job;
DROP TABLE student_record;
DROP TABLE hiring_manager;
DROP TABLE education;
DROP TABLE company_interest;
DROP TABLE company;
DROP TABLE authorise;


INSERT INTO `user_account` (`account_type`, `email_id`, `first_name`, `last_name`, `password`, `user_name`, `profile_completed`, `is_registered_complete`, `hourly_rate`, `salary_expectation`, `service_fees`, `receive_rate`, `company_name`, `industry`, `other_industry`, `job_title`, `professional_overview`, `uploaded_jd`, `country`, `country_id`, `state`, `state_id`, `city`, `city_id`, `street_address`, `zipcode`, `country_calling_code`, `country_calling_id`, `phone_number`, `job_type`, `profile_photo`, `location_preference`, `prefered_country_id`, `prefered_country`, `prefered_state_id`, `prefered_state`, `location_preference_name`, `location_preference_id`, `prefered_street_address`, `prefered_zipcode`, `timeline_hiring`, `timeline_hiring_weeks`)
VALUES ('Admin', 'admin@zestboard.com', 'Super', 'Admin', md5('123'), 'admin@zestboard.com', '1', '1', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);


ALTER TABLE `user_account`
ADD `status` tinyint NULL COMMENT '1 - action | 0 - inactive' AFTER `password`

ALTER TABLE `user_account`
CHANGE `status` `status` tinyint(4) NULL DEFAULT '0' COMMENT '1 - action | 0 - inactive' AFTER `password`;

ALTER TABLE `user_account`
ADD `is_deleted` tinyint(4) NULL DEFAULT '0' AFTER `status`;

UPDATE user_account SET status = 1;

-- published 1/09/2021 - end 

-- start 2/09/2021

CREATE TABLE `job_posting` (
  `id` int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `company_id` int NOT NULL,
  `job_title` varchar(350) NOT NULL,
  `job_description` longtext NOT NULL,
  `candidate_required_description` longtext NOT NULL,
  `expert_level` varchar(200) NOT NULL COMMENT 'beginner |  intermediate | expert',
  `location_country_id` int NOT NULL,
  `location_country` varchar(200) NOT NULL,
  `category` int NOT NULL,
  `job_profile_id` int NOT NULL,
  `industry_id` int NOT NULL,
  `skills_list` text NOT NULL COMMENT 'Some skills multi select',
  `rate_type` int NOT NULL COMMENT 'hourly | fixed',
  `hourly_rate_from` varchar(20) NOT NULL,
  `hourly_rate_to` varchar(20) NOT NULL,
  `fixed_rate` varchar(20) NOT NULL COMMENT 'Complete work price',
  `project_type` varchar(20) NOT NULL COMMENT '1 - short term | 2 - long term ',
  `project_status` varchar(20) NOT NULL COMMENT '1 - new project | 2 - On going project',
  `project_length` varchar(150) NOT NULL COMMENT '1- 3 month | 3 - 6 month  | More than 6 months',
  `candidate_required_type` varchar(20) NOT NULL COMMENT 'part time | full time',
  `total_candidate_required` int NOT NULL,
  `minimum_hours_from_candidate` varchar(100) NOT NULL COMMENT '20 hours per week | 30 hours per week | 40 hours per week (full time)',
  `candidate_country` int NOT NULL DEFAULT '0' COMMENT 'optional field',
  `candidate_city` int NOT NULL DEFAULT '0',
  `candidate_language` int NOT NULL DEFAULT '374' COMMENT 'default for english',
  `job_status` varchar(20) NOT NULL COMMENT '2 - active | 3 - inactive | 1 - draft | 4 - expired',
  `hashtags` text NOT NULL COMMENT 'comma seperated ',
  `date_created` datetime NOT NULL,
  `date_updated` datetime NOT NULL
);

CREATE TABLE `user_company` (
  `id` int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `company_name` varchar(500) NOT NULL,
  `industry` int NOT NULL,
  `other_industry` varchar(200) NOT NULL,
  `created_date` datetime NULL,
  `updated_date` datetime NULL
);

-- end 31/09/2021
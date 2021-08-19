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
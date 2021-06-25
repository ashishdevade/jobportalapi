-- Alter 9 june 2021 (unpublished) START

ALTER TABLE `student_category`
ADD `team_department` varchar(200) NOT NULL AFTER `subcategory_id`;

CREATE TABLE `industry` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `industry_name` varchar(200) NOT NULL,
  `access_type` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

TRUNCATE `industry`;
INSERT INTO `industry` (`id`, `industry_name`, `access_type`) VALUES
(1, 'AGRICULTURE AND ALLIED INDUSTRIES',  'Company'),
(2, 'AUTOMOBILES',  'Company'),
(3, 'AUTO COMPONENTS',  'Company'),
(4, 'AVIATION', 'Company'),
(5, 'BANKING',  'Company'),
(6, 'BIOTECHNOLOGY',  'Company'),
(7, 'CEMENT', 'Company'),
(8, 'CHEMICALS',  'Company'),
(9, 'CONSUMER DURABLES',  'Company'),
(10,  'DEFENCE MANUFACTURING',  'Company'),
(11,  'E-COMMERCE', 'Company'),
(12,  'EDUCATION AND TRAINING', 'Company'),
(13,  'ELECTRONICS SYSTEM DESIGN & MANUFACTURING',  'Company'),
(14,  'ENGINEERING AND CAPITAL GOODS',  'Company'),
(15,  'FINANCIAL SERVICES', 'Company'),
(16,  'FMCG', 'Company'),
(17,  'GEMS AND JEWELLERY', 'Company'),
(18,  'HEALTHCARE', 'Company'),
(19,  'INFRASTRUCTURE', 'Company'),
(20,  'INSURANCE',  'Company'),
(21,  'IT & BPM', 'Company'),
(22,  'MANUFACTURING',  'Company'),
(23,  'MEDIA AND ENTERTAINMENT',  'Company'),
(24,  'MEDICAL DEVICES',  'Company'),
(25,  'METALS AND MINING',  'Company'),
(26,  'MSME', 'Company'),
(27,  'OIL AND GAS',  'Company'),
(28,  'PHARMACEUTICALS',  'Company'),
(29,  'PORTS',  'Company'),
(30,  'POWER',  'Company'),
(31,  'RAILWAYS', 'Company'),
(32,  'REAL ESTATE',  'Company'),
(33,  'RENEWABLE ENERGY', 'Company'),
(34,  'RETAIL', 'Company'),
(35,  'ROADS',  'Company'),
(36,  'SCIENCE AND TECHNOLOGY', 'Company'),
(37,  'SERVICES', 'Company'),
(38,  'STEEL',  'Company'),
(39,  'TELECOMMUNICATIONS', 'Company'),
(40,  'TEXTILES', 'Company'),
(41,  'TOURISM AND HOSPITALITY',  'Company'),
(42,  'Advertising ', 'Student'),
(43,  'Agriculture',  'Student'),
(44,  'Banking',  'Student'),
(45,  'Construction', 'Student'),
(46,  'Digital Sales and Media',  'Student'),
(47,  'E-Commerce', 'Student'),
(48,  'Education',  'Student'),
(49,  'Energy and Utilities', 'Student'),
(50,  'Finance',  'Student'),
(51,  'Government', 'Student'),
(52,  'Healthcare (Hospital) ', 'Student'),
(53,  'Healthcare and Insurance', 'Student'),
(54,  'Internet related services and Products (e.g., Google)',  'Student'),
(55,  'Manufacturing and Natural Resources (such as oil, minerals, gas, metals, agricultural products, etc)', 'Student'),
(56,  'Media and Entertainment',  'Student'),
(57,  'News and Media', 'Student'),
(58,  'Pharmaceutical', 'Student'),
(59,  'Retail', 'Student'),
(60,  'Sports', 'Student'),
(61,  'Telecommunication',  'Student'),
(62,  'Transportation', 'Student');

CREATE TABLE `job_profiles` (
  `id` int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `profile_name` varchar(200) NOT NULL
);

TRUNCATE `job_profiles`;
INSERT INTO `job_profiles` (`id`, `profile_name`) VALUES
(1, 'Data Analytics'),
(2, 'Data Engineering'),
(3, 'Data Science');

ALTER TABLE `student_category`
ADD `industry_description` text NOT NULL AFTER `subcategory_id`;

-- Alter 9 june 2021 (unpublished) END

-- ALter 21 june - start 
ALTER TABLE `student_category`
CHANGE `team_department` `team_department` varchar(200) COLLATE 'utf8_general_ci' NULL AFTER `industry_description`;
-- alter 21 june - end 
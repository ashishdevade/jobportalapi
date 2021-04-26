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

DROP TABLE IF EXISTS `countries`;
CREATE TABLE `countries` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `iso_code` varchar(250) NOT NULL,
  `country_name` varchar(255) NOT NULL,
  `call_prefix` int(11) DEFAULT NULL,
  `zipcode_format` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

TRUNCATE `countries`;
INSERT INTO `countries` (`id`, `iso_code`, `country_name`, `call_prefix`, `zipcode_format`) VALUES
(1,	'AF',	'Afghanistan',	93,	NULL),
(2,	'AL',	'Albania',	355,	'NNNN'),
(3,	'DZ',	'Algeria',	213,	'NNNNN'),
(4,	'AS',	'American Samoa',	1684,	NULL),
(5,	'AO',	'Angola',	244,	NULL),
(6,	'AI',	'Anguilla',	264,	NULL),
(7,	'AQ',	'Antartica',	6721,	NULL),
(8,	'AG',	'Antigua and Barbuda',	268,	NULL),
(9,	'AR',	'Argentina',	54,	'LNNNN'),
(10,	'AM',	'Armenia',	374,	'NNNN'),
(11,	'AW',	'Aruba',	297,	NULL),
(12,	'',	'Ashmore and Cartier Island',	0,	NULL),
(13,	'AU',	'Australia',	61,	'NNNN'),
(14,	'AT',	'Austria',	43,	'NNNN'),
(15,	'AZ',	'Azerbaijan',	994,	'CNNNN'),
(16,	'BS',	'Bahamas',	1242,	NULL),
(17,	'BH',	'Bahrain',	973,	NULL),
(18,	'BD',	'Bangladesh',	880,	'NNNN'),
(19,	'BB',	'Barbados',	246,	'CNNNNN'),
(20,	'BY',	'Belarus',	NULL,	'NNNNNN'),
(21,	'BE',	'Belgium',	32,	'NNNN'),
(22,	'BZ',	'Belize',	501,	NULL),
(23,	'BJ',	'Benin',	229,	NULL),
(24,	'BM',	'Bermuda',	1441,	NULL),
(25,	'BT',	'Bhutan',	975,	NULL),
(26,	'BO',	'Bolivia',	591,	NULL),
(27,	'BA',	'Bosnia and Herzegovina',	387,	NULL),
(28,	'BW',	'Botswana',	267,	NULL),
(29,	'BR',	'Brazil',	55,	'NNNNN-NNN'),
(30,	'VG',	'British Virgin Islands',	1284,	'CNNNN'),
(31,	'BN',	'Brunei',	673,	'LLNNNN'),
(32,	'BG',	'Bulgaria',	359,	'NNNN'),
(33,	'BF',	'Burkina Faso',	226,	NULL),
(34,	'MM',	'Myanmar',	95,	NULL),
(35,	'BI',	'Burundi',	257,	NULL),
(36,	'KH',	'Cambodia',	855,	'NNNNN'),
(37,	'CM',	'Cameroon',	237,	NULL),
(38,	'CA',	'Canada',	1,	'LNL NLN'),
(39,	'CV',	'Cape Verde',	238,	'NNNN'),
(40,	'KY',	'Cayman Islands',	1345,	NULL),
(41,	'CF',	'Central African Republic',	236,	NULL),
(42,	'TD',	'Chad',	235,	NULL),
(43,	'CL',	'Chile',	56,	'NNN-NNNN'),
(45,	'CN',	'China',	86,	'NNNNNN'),
(46,	'CX',	'Christmas Island',	0,	NULL),
(47,	'',	'Clipperton Island',	0,	NULL),
(48,	'CC',	'Cocos Keeling Islands',	0,	NULL),
(49,	'CO',	'Colombia',	57,	'NNNNNN'),
(50,	'KM',	'Comoros',	269,	NULL),
(51,	'CD',	'Congo, Democratic Republic of the',	243,	NULL),
(52,	'CG',	'Congo, Republic of the',	242,	NULL),
(53,	'CK',	'Cook Islands',	682,	NULL),
(54,	'CR',	'Costa Rica',	506,	'NNNNN'),
(55,	'HR',	'Croatia',	385,	'NNNNN'),
(56,	'CU',	'Cuba',	53,	NULL),
(57,	'CY',	'Cyprus',	357,	'NNNN'),
(58,	'CZ',	'Czeck Republic',	420,	'NNN NN'),
(59,	'DK',	'Denmark',	45,	'NNNN'),
(60,	'DJ',	'Djibouti',	253,	NULL),
(61,	'DM',	'Dominica',	1767,	NULL),
(62,	'DO',	'Dominican Republic',	1809,	NULL),
(63,	'EC',	'Ecuador',	593,	'CNNNNNN'),
(64,	'EG',	'Egypt',	20,	NULL),
(65,	'SV',	'El Salvador',	503,	NULL),
(66,	'GQ',	'Equatorial Guinea',	240,	NULL),
(67,	'ER',	'Eritrea',	291,	NULL),
(68,	'EE',	'Estonia',	372,	'NNNNN'),
(69,	'ET',	'Ethiopia',	251,	NULL),
(70,	'EU',	'Europa Island',	0,	NULL),
(71,	'FK',	'Falkland Islands',	500,	'LLLL NLL'),
(72,	'FO',	'Faroe Islands',	298,	NULL),
(73,	'FJ',	'Fiji',	679,	NULL),
(74,	'FI',	'Finland',	358,	'NNNNN'),
(75,	'FR',	'France',	33,	'NNNNN'),
(76,	'GF',	'French Guiana',	594,	NULL),
(77,	'PF',	'French Polynesia',	689,	NULL),
(78,	'TF',	'French Southern and Antarctic Lands',	0,	NULL),
(79,	'GA',	'Gabon',	241,	NULL),
(80,	'GM',	'Gambia, The',	220,	NULL),
(81,	'GZ',	'Gaza Strip',	970,	NULL),
(82,	'GE',	'Georgia',	995,	'NNNN'),
(83,	'DE',	'Germany',	49,	'NNNNN'),
(84,	'GH',	'Ghana',	233,	NULL),
(85,	'GI',	'Gibraltar',	350,	NULL),
(86,	'GO',	'Glorioso Islands',	0,	NULL),
(87,	'GR',	'Greece',	30,	'NNNNN'),
(88,	'GL',	'Greenland',	299,	NULL),
(89,	'GD',	'Grenada',	1473,	NULL),
(90,	'GP',	'Guadeloupe',	590,	NULL),
(91,	'GU',	'Guam',	1671,	NULL),
(92,	'GT',	'Guatemala',	502,	NULL),
(93,	'GG',	'Guernsey',	44,	'LLN NLL'),
(94,	'GN',	'Guinea',	224,	NULL),
(95,	'GW',	'Guinea-Bissau',	245,	NULL),
(96,	'GY',	'Guyana',	592,	NULL),
(97,	'HT',	'Haiti',	509,	NULL),
(98,	'HM',	'Heard Island and McDonald Islands',	0,	NULL),
(99,	'VA',	'Holy See In Vatican City',	379,	'NNNNN'),
(100,	'HN',	'Honduras',	504,	NULL),
(101,	'HK',	'Hong Kong',	852,	NULL),
(102,	'HQ',	'Howland Island',	NULL,	NULL),
(103,	'HU',	'Hungary',	36,	'NNNN'),
(104,	'IS',	'Iceland',	354,	'NNN'),
(105,	'IN',	'India',	91,	'NNNNNN'),
(106,	'ID',	'Indonesia',	62,	'NNNNN'),
(107,	'IR',	'Iran',	98,	'NNNNN-NNNNN'),
(108,	'IQ',	'Iraq',	964,	'NNNNN'),
(109,	'IE',	'Ireland',	353,	NULL),
(110,	'IE',	'Ireland, Northern',	44,	NULL),
(111,	'IL',	'Israel',	972,	'NNNNN'),
(112,	'IT',	'Italy',	39,	'NNNNN'),
(113,	'JM',	'Jamaica',	1876,	NULL),
(114,	'JP',	'Jan Mayen',	47,	'NNN-NNNN'),
(115,	'JP',	'Japan',	81,	'NNN-NNNN'),
(116,	'DQ',	'Jarvis Island',	0,	NULL),
(117,	'JE',	'Jersey',	0,	'CN NLL'),
(118,	'JQ',	'Johnston Atoll',	0,	NULL),
(119,	'JO',	'Jordan',	962,	NULL),
(120,	'JU',	'Juan de Nova Island',	0,	NULL),
(121,	'KZ',	'Kazakhstan',	7,	'NNNNNN'),
(122,	'KE',	'Kenya',	254,	NULL),
(123,	'KI',	'Kiribati',	686,	NULL),
(124,	'KP',	'Korea, North',	850,	NULL),
(125,	'KR',	'Korea, South',	82,	'NNN-NNN'),
(126,	'KW',	'Kuwait',	965,	NULL),
(127,	'KG',	'Kyrgyzstan',	996,	NULL),
(128,	'LA',	'Laos',	856,	NULL),
(129,	'LV',	'Latvia',	371,	'C-NNNN'),
(130,	'LB',	'Lebanon',	961,	NULL),
(131,	'LS',	'Lesotho',	266,	NULL),
(132,	'LR',	'Liberia',	231,	NULL),
(133,	'LY',	'Libya',	218,	NULL),
(134,	'LI',	'Liechtenstein',	423,	'NNNN'),
(135,	'LT',	'Lithuania',	370,	'NNNNN'),
(136,	'LU',	'Luxembourg',	352,	'NNNN'),
(137,	'MO',	'Macau',	853,	NULL),
(138,	'MK',	'Macedonia, Former Yugoslav Republic of',	389,	NULL),
(139,	'MG',	'Madagascar',	261,	NULL),
(140,	'MW',	'Malawi',	265,	NULL),
(141,	'MY',	'Malaysia',	60,	'NNNNN'),
(142,	'MV',	'Maldives',	960,	NULL),
(143,	'ML',	'Mali',	223,	NULL),
(144,	'MT',	'Malta',	356,	'LLL NNNN'),
(145,	'IM',	'Man, Isle of',	0,	'CN NLL'),
(146,	'MH',	'Marshall Islands',	692,	NULL),
(147,	'MQ',	'Martinique',	596,	NULL),
(148,	'MR',	'Mauritania',	222,	NULL),
(149,	'MU',	'Mauritius',	230,	NULL),
(150,	'YT',	'Mayotte',	262,	NULL),
(151,	'MX',	'Mexico',	52,	'NNNNN'),
(152,	'FM',	'Micronesia, Federated States of',	691,	NULL),
(153,	'MQ',	'Midway Islands',	0,	NULL),
(154,	'MD',	'Moldova',	373,	'NNNNN'),
(155,	'MC',	'Monaco',	377,	'980NN'),
(156,	'MN',	'Mongolia',	976,	NULL),
(157,	'ME',	'Montserrat',	1664,	NULL),
(158,	'MA',	'Morocco',	212,	'NNNNN'),
(159,	'MZ',	'Mozambique',	258,	NULL),
(160,	'NA',	'Namibia',	264,	NULL),
(161,	'NR',	'Nauru',	674,	NULL),
(162,	'NP',	'Nepal',	977,	NULL),
(163,	'NL',	'Netherlands',	31,	'NNNN LL'),
(164,	'AN',	'Netherlands Antilles',	599,	NULL),
(165,	'MC',	'New Caledonia',	687,	'C-NNNN'),
(166,	'NZ',	'New Zealand',	64,	'NNNN'),
(167,	'NI',	'Nicaragua',	505,	'NNNNNN'),
(168,	'NE',	'Niger',	227,	NULL),
(169,	'NG',	'Nigeria',	234,	NULL),
(170,	'NU',	'Niue',	683,	NULL),
(171,	'NF',	'Norfolk Island',	6723,	NULL),
(172,	'MP',	'Northern Mariana Islands',	0,	NULL),
(173,	'NO',	'Norway',	47,	'NNNN'),
(174,	'OM',	'Oman',	968,	NULL),
(175,	'PK',	'Pakistan',	92,	NULL),
(176,	'PW',	'Palau',	680,	NULL),
(177,	'PA',	'Panama',	507,	'NNNNNN'),
(178,	'PG',	'Papua New Guinea',	675,	NULL),
(179,	'PY',	'Paraguay',	595,	NULL),
(180,	'PE',	'Peru',	51,	NULL),
(181,	'PH',	'Philippines',	63,	'NNNN'),
(182,	'PC',	'Pitcaim Islands',	0,	NULL),
(183,	'PL',	'Poland',	48,	'NN-NNN'),
(184,	'PT',	'Portugal',	351,	'NNNN NNN'),
(185,	'PR',	'Puerto Rico',	1939,	'NNNNN'),
(186,	'QA',	'Qatar',	974,	NULL),
(187,	'RE',	'Reunion',	262,	NULL),
(188,	'RO',	'Romainia',	40,	'NNNNNN'),
(189,	'RU',	'Russia',	7,	'NNNNNN'),
(190,	'RW',	'Rwanda',	250,	NULL),
(191,	'SH',	'Saint Helena',	290,	NULL),
(192,	'KN',	'Saint Kitts and Nevis',	1869,	NULL),
(193,	'LC',	'Saint Lucia',	1758,	NULL),
(194,	'PM',	'Saint Pierre and Miquelon',	508,	NULL),
(195,	'VC',	'Saint Vincent and the Grenadines',	1784,	NULL),
(196,	'WS',	'Samoa',	685,	NULL),
(197,	'SM',	'San Marino',	NULL,	'NNNNN'),
(198,	'ST',	'Sao Tome and Principe',	239,	NULL),
(199,	'SA',	'Saudi Arabia',	966,	NULL),
(200,	'',	'Scotland',	44,	NULL),
(201,	'SN',	'Senegal',	221,	NULL),
(202,	'SC',	'Seychelles',	248,	NULL),
(203,	'SL',	'Sierra Leone',	232,	NULL),
(204,	'SG',	'Singapore',	65,	'NNNNNN'),
(205,	'SK',	'Slovakia',	421,	NULL),
(206,	'SI',	'Slovenia',	386,	'C-NNNN'),
(207,	'SB',	'Solomon Islands',	677,	NULL),
(208,	'',	'Somalia',	252,	NULL),
(209,	'ZA',	'South Africa',	27,	'NNNN'),
(210,	'GS',	'South Georgia and South Sandwich Islands',	0,	'LLLL NLL'),
(211,	'ES',	'Spain',	34,	'NNNNN'),
(212,	'',	'Spratly Islands',	0,	NULL),
(213,	'LK',	'Sri Lanka',	94,	'NNNNN'),
(214,	'SD',	'Sudan',	249,	NULL),
(215,	'SR',	'Suriname',	597,	NULL),
(216,	'SJ',	'Svalbard',	47,	NULL),
(217,	'SZ',	'Swaziland',	268,	NULL),
(218,	'SE',	'Sweden',	46,	'NNN NN'),
(219,	'CH',	'Switzerland',	41,	'NNNN'),
(220,	'SY',	'Syria',	963,	NULL),
(221,	'TW',	'Taiwan',	886,	'NNNNN'),
(222,	'TJ',	'Tajikistan',	992,	NULL),
(223,	'TZ',	'Tanzania',	255,	NULL),
(224,	'TH',	'Thailand',	66,	'NNNNN'),
(225,	'TT',	'Tobago',	1868,	NULL),
(226,	'',	'Toga',	228,	NULL),
(227,	'TK',	'Tokelau',	690,	NULL),
(228,	'TO',	'Tonga',	676,	NULL),
(229,	'TT',	'Trinidad',	1868,	NULL),
(230,	'TN',	'Tunisia',	216,	NULL),
(231,	'TR',	'Turkey',	90,	'NNNNN'),
(232,	'TM',	'Turkmenistan',	993,	NULL),
(233,	'TV',	'Tuvalu',	688,	NULL),
(234,	'UG',	'Uganda',	256,	NULL),
(235,	'UA',	'Ukraine',	380,	'NNNNN'),
(236,	'UE',	'United Arab Emirates',	971,	NULL),
(237,	'UK',	'United Kingdom',	44,	NULL),
(238,	'UY',	'Uruguay',	598,	NULL),
(239,	'US',	'USA',	1,	'NNNNN'),
(240,	'UZ',	'Uzbekistan',	998,	NULL),
(241,	'VU',	'Vanuatu',	678,	NULL),
(242,	'VE',	'Venezuela',	58,	NULL),
(243,	'VN',	'Vietnam',	84,	'NNNNNN'),
(244,	'VG',	'Virgin Islands',	1340,	'CNNNN'),
(245,	'',	'Wales',	44,	NULL),
(246,	'WF',	'Wallis and Futuna',	681,	NULL),
(247,	'',	'West Bank',	970,	NULL),
(248,	'EH',	'Western Sahara',	212,	NULL),
(249,	'YE',	'Yemen',	967,	NULL),
(250,	'',	'Yugoslavia',	381,	NULL),
(251,	'ZM',	'Zambia',	260,	NULL),
(252,	'ZW',	'Zimbabwe',	263,	NULL),
(253,	'ALA',	'Aland Islands',	358,	NULL),
(254,	'SRB',	'Serbia',	381,	'NNNNN'),
(255,	'UMI',	'US Outlying Islands',	NULL,	NULL),
(256,	'TCA',	'Turks and Caicos Islands',	1649,	'LLLL NLL'),
(257,	'TLS',	'Timor-Leste',	670,	NULL),
(258,	'IO',	'British Indian Ocean Territory',	NULL,	'LLLL NLL'),
(259,	'BVT',	'Bouvet Island',	74,	NULL),
(260,	'BQ',	'Bonaire',	NULL,	NULL),
(262,	'AD',	'Andorra',	376,	'CNNN');

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

DROP TABLE IF EXISTS `language_list`;
CREATE TABLE `language_list` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(250) CHARACTER SET utf8 DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

TRUNCATE `language_list`;
INSERT INTO `language_list` (`id`, `name`) VALUES
(1,	'Afrikaans'),
(2,	'Amharic'),
(3,	'Arabic'),
(4,	'Assamese'),
(5,	'Azerbaijani'),
(6,	'Belarusian'),
(7,	'Bulgarian'),
(8,	'Bhojpuri'),
(9,	'Bengali'),
(10,	'Bosnian'),
(11,	'Catalan, Valencian'),
(12,	'Cebuano'),
(13,	'Czech'),
(14,	'Danish'),
(15,	'German'),
(16,	'Greek, Modern'),
(17,	'Spanish'),
(18,	'Estonian'),
(19,	'Basque'),
(20,	'Persian'),
(21,	'Fula'),
(22,	'Finnish'),
(23,	'French'),
(24,	'Irish'),
(25,	'Galician'),
(26,	'Gujarati'),
(27,	'Hausa'),
(28,	'Hebrew (modern)'),
(29,	'Hindi'),
(30,	'Chhattisgarhi'),
(31,	'Croatian'),
(32,	'Hungarian'),
(33,	'Armenian'),
(34,	'Indonesian'),
(35,	'Igbo'),
(36,	'Icelandic'),
(37,	'Italian'),
(38,	'Japanese'),
(39,	'Syro-Palestinian Sign Language'),
(40,	'Javanese'),
(41,	'Georgian'),
(42,	'Kyrgyz'),
(43,	'Kazakh'),
(44,	'Khmer'),
(45,	'Kannada'),
(46,	'Korean'),
(47,	'Krio'),
(48,	'Kurdish'),
(49,	'Latin'),
(50,	'Lithuanian'),
(51,	'Latvian'),
(52,	'Magahi'),
(53,	'Maithili'),
(54,	'Macedonian'),
(55,	'Malayalam'),
(56,	'Mongolian'),
(57,	'Amharic'),
(58,	'Arabic'),
(59,	'Assamese'),
(60,	'Azerbaijani'),
(61,	'Belarusian'),
(62,	'Bulgarian'),
(63,	'Bhojpuri'),
(64,	'Bengali'),
(65,	'Bosnian'),
(66,	'Catalan, Valencian'),
(67,	'Cebuano'),
(68,	'Czech'),
(69,	'Danish'),
(70,	'German'),
(71,	'Greek, Modern'),
(72,	'Spanish'),
(73,	'Estonian'),
(74,	'Basque'),
(75,	'Persian'),
(76,	'Fula'),
(77,	'Finnish'),
(78,	'French'),
(79,	'Irish'),
(80,	'Galician'),
(81,	'Gujarati'),
(82,	'Hausa'),
(83,	'Hebrew (modern)'),
(84,	'Hindi'),
(85,	'Chhattisgarhi'),
(86,	'Croatian'),
(87,	'Hungarian'),
(88,	'Armenian'),
(89,	'Indonesian'),
(90,	'Igbo'),
(91,	'Icelandic'),
(92,	'Italian'),
(93,	'Japanese'),
(94,	'Syro-Palestinian Sign Language'),
(95,	'Javanese'),
(96,	'Georgian'),
(97,	'Kyrgyz'),
(98,	'Kazakh'),
(99,	'Khmer'),
(100,	'Kannada'),
(101,	'Korean'),
(102,	'Krio'),
(103,	'Kurdish'),
(104,	'Latin'),
(105,	'Lithuanian'),
(106,	'Latvian'),
(107,	'Magahi'),
(108,	'Maithili'),
(109,	'Macedonian'),
(110,	'Malayalam'),
(111,	'Mongolian'),
(112,	'Amharic'),
(113,	'Arabic'),
(114,	'Assamese'),
(115,	'Azerbaijani'),
(116,	'Belarusian'),
(117,	'Bulgarian'),
(118,	'Bhojpuri'),
(119,	'Bengali'),
(120,	'Bosnian'),
(121,	'Catalan, Valencian'),
(122,	'Cebuano'),
(123,	'Czech'),
(124,	'Danish'),
(125,	'German'),
(126,	'Greek, Modern'),
(127,	'Spanish'),
(128,	'Estonian'),
(129,	'Basque'),
(130,	'Persian'),
(131,	'Fula'),
(132,	'Finnish'),
(133,	'French'),
(134,	'Irish'),
(135,	'Galician'),
(136,	'Gujarati'),
(137,	'Hausa'),
(138,	'Hebrew (modern)'),
(139,	'Hindi'),
(140,	'Chhattisgarhi'),
(141,	'Croatian'),
(142,	'Hungarian'),
(143,	'Armenian'),
(144,	'Indonesian'),
(145,	'Igbo'),
(146,	'Icelandic'),
(147,	'Italian'),
(148,	'Japanese'),
(149,	'Syro-Palestinian Sign Language'),
(150,	'Javanese'),
(151,	'Georgian'),
(152,	'Kyrgyz'),
(153,	'Kazakh'),
(154,	'Khmer'),
(155,	'Kannada'),
(156,	'Korean'),
(157,	'Krio'),
(158,	'Kurdish'),
(159,	'Latin'),
(160,	'Lithuanian'),
(161,	'Latvian'),
(162,	'Magahi'),
(163,	'Maithili'),
(164,	'Macedonian'),
(165,	'Malayalam'),
(166,	'Mongolian'),
(167,	'Amharic'),
(168,	'Arabic'),
(169,	'Assamese'),
(170,	'Azerbaijani'),
(171,	'Belarusian'),
(172,	'Bulgarian'),
(173,	'Bhojpuri'),
(174,	'Bengali'),
(175,	'Bosnian'),
(176,	'Catalan, Valencian'),
(177,	'Cebuano'),
(178,	'Czech'),
(179,	'Danish'),
(180,	'German'),
(181,	'Greek, Modern'),
(182,	'Spanish'),
(183,	'Estonian'),
(184,	'Basque'),
(185,	'Persian'),
(186,	'Fula'),
(187,	'Finnish'),
(188,	'French'),
(189,	'Irish'),
(190,	'Galician'),
(191,	'Gujarati'),
(192,	'Hausa'),
(193,	'Hebrew (modern)'),
(194,	'Hindi'),
(195,	'Chhattisgarhi'),
(196,	'Croatian'),
(197,	'Hungarian'),
(198,	'Armenian'),
(199,	'Indonesian'),
(200,	'Igbo'),
(201,	'Icelandic'),
(202,	'Italian'),
(203,	'Japanese'),
(204,	'Syro-Palestinian Sign Language'),
(205,	'Javanese'),
(206,	'Georgian'),
(207,	'Kyrgyz'),
(208,	'Kazakh'),
(209,	'Khmer'),
(210,	'Kannada'),
(211,	'Korean'),
(212,	'Krio'),
(213,	'Kurdish'),
(214,	'Latin'),
(215,	'Lithuanian'),
(216,	'Latvian'),
(217,	'Magahi'),
(218,	'Maithili'),
(219,	'Macedonian'),
(220,	'Malayalam'),
(221,	'Mongolian'),
(222,	'Amharic'),
(223,	'Arabic'),
(224,	'Assamese'),
(225,	'Azerbaijani'),
(226,	'Belarusian'),
(227,	'Bulgarian'),
(228,	'Bhojpuri'),
(229,	'Bengali'),
(230,	'Bosnian'),
(231,	'Catalan, Valencian'),
(232,	'Cebuano'),
(233,	'Czech'),
(234,	'Danish'),
(235,	'German'),
(236,	'Greek, Modern'),
(237,	'Spanish'),
(238,	'Estonian'),
(239,	'Basque'),
(240,	'Persian'),
(241,	'Fula'),
(242,	'Finnish'),
(243,	'French'),
(244,	'Irish'),
(245,	'Galician'),
(246,	'Gujarati'),
(247,	'Hausa'),
(248,	'Hebrew (modern)'),
(249,	'Hindi'),
(250,	'Chhattisgarhi'),
(251,	'Croatian'),
(252,	'Hungarian'),
(253,	'Armenian'),
(254,	'Indonesian'),
(255,	'Igbo'),
(256,	'Icelandic'),
(257,	'Italian'),
(258,	'Japanese'),
(259,	'Syro-Palestinian Sign Language'),
(260,	'Javanese'),
(261,	'Georgian'),
(262,	'Kyrgyz'),
(263,	'Kazakh'),
(264,	'Khmer'),
(265,	'Kannada'),
(266,	'Korean'),
(267,	'Krio'),
(268,	'Kurdish'),
(269,	'Latin'),
(270,	'Lithuanian'),
(271,	'Latvian'),
(272,	'Magahi'),
(273,	'Maithili'),
(274,	'Macedonian'),
(275,	'Malayalam'),
(276,	'Mongolian'),
(277,	'Syro-Palestinian Sign Language'),
(278,	'Javanese'),
(279,	'Georgian'),
(280,	'Kyrgyz'),
(281,	'Kazakh'),
(282,	'Khmer'),
(283,	'Kannada'),
(284,	'Korean'),
(285,	'Krio'),
(286,	'Kurdish'),
(287,	'Latin'),
(288,	'Lithuanian'),
(289,	'Latvian'),
(290,	'Magahi'),
(291,	'Maithili'),
(292,	'Macedonian'),
(293,	'Malayalam'),
(294,	'Mongolian'),
(295,	'Marathi (Marāṭhī)'),
(296,	'Malay'),
(297,	'Maltese'),
(298,	'Burmese'),
(299,	'Nepali'),
(300,	'Dutch'),
(301,	'Norwegian'),
(302,	'Odia'),
(303,	'Oromo'),
(304,	'Panjabi, Punjabi'),
(305,	'Polish'),
(306,	'Pashto'),
(307,	'Portuguese'),
(308,	'Rundi'),
(309,	'Romanian, Moldavian, Moldovan'),
(310,	'Russian'),
(311,	'Kinyarwanda'),
(312,	'Sindhi'),
(313,	'Argentine Sign Language'),
(314,	'Brazilian Sign Language'),
(315,	'Chinese Sign Language'),
(316,	'Colombian Sign Language'),
(317,	'German Sign Language'),
(318,	'Algerian Sign Language'),
(319,	'Ecuadorian Sign Language'),
(320,	'Spanish Sign Language'),
(321,	'Ethiopian Sign Language'),
(322,	'French Sign Language'),
(323,	'British Sign Language'),
(324,	'Ghanaian Sign Language'),
(325,	'Irish Sign Language'),
(326,	'Indopakistani Sign Language'),
(327,	'Persian Sign Language'),
(328,	'Italian Sign Language'),
(329,	'Japanese Sign Language'),
(330,	'Kenyan Sign Language'),
(331,	'Korean Sign Language'),
(332,	'Moroccan Sign Language'),
(333,	'Mexican Sign Language'),
(334,	'Malaysian Sign Language'),
(335,	'Philippine Sign Language'),
(336,	'Polish Sign Language'),
(337,	'Portuguese Sign Language'),
(338,	'Russian Sign Language'),
(339,	'Saudi Arabian Sign Language'),
(340,	'El Salvadoran Sign Language'),
(341,	'Turkish Sign Language'),
(342,	'Tanzanian Sign Language'),
(343,	'Ukrainian Sign Language'),
(344,	'American Sign Language'),
(345,	'South African Sign Language'),
(346,	'Zimbabwe Sign Language'),
(347,	'Sinhala, Sinhalese'),
(348,	'Slovak'),
(349,	'Saraiki'),
(350,	'Slovene'),
(351,	'Somali'),
(352,	'Albanian'),
(353,	'Serbian'),
(354,	'Sunda'),
(355,	'Swedish'),
(356,	'Swahili'),
(357,	'Sylheti'),
(358,	'Tamil'),
(359,	'Telugu'),
(360,	'Tagalog'),
(361,	'Thai'),
(362,	'Tigrinya'),
(363,	'Turkish'),
(364,	'Uyghur'),
(365,	'Ukrainian'),
(366,	'Urdu'),
(367,	'Uzbek'),
(368,	'Vietnamese'),
(369,	'Yiddish'),
(370,	'Yoruba'),
(371,	'Cantonese'),
(372,	'Chinese'),
(373,	'Zulu'),
(374,	'English');

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
  `category_no` int(11) DEFAULT NULL,
  `category` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`skill_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

TRUNCATE `skill`;
INSERT INTO `skill` (`skill_id`, `skill_name`, `category_no`, `category`) VALUES
(1,	'SQL',	1,	'Languages'),
(2,	'NoSQL',	1,	'Languages'),
(3,	'R',	1,	'Languages'),
(4,	'Python',	1,	'Languages'),
(5,	'PL/SQL',	1,	'Languages'),
(6,	'Tableau ',	2,	'Data Visualization tools'),
(7,	'Looker',	2,	'Data Visualization tools'),
(8,	'Zoho Analytics',	2,	'Data Visualization tools'),
(9,	'Sisense',	2,	'Data Visualization tools'),
(10,	'IBM Cognos Analytics',	2,	'Data Visualization tools'),
(11,	'Qlik Sense',	2,	'Data Visualization tools'),
(12,	'Domo',	2,	'Data Visualization tools'),
(13,	'Microsoft Power BI',	2,	'Data Visualization tools'),
(14,	'Klipfolio',	2,	'Data Visualization tools'),
(15,	'SAP Analytics Cloud',	2,	'Data Visualization tools'),
(16,	'Alteryx ',	3,	'ETL Tools'),
(17,	'Xplenty ',	3,	'ETL Tools'),
(18,	'BiG EVAL ',	3,	'ETL Tools'),
(19,	'CData Sync ',	3,	'ETL Tools'),
(20,	'QuerySurge  ',	3,	'ETL Tools'),
(21,	'DBConvert ',	3,	'ETL Tools'),
(22,	'Qlik Real-Time ETL ',	3,	'ETL Tools'),
(23,	'Skyvia ',	3,	'ETL Tools'),
(24,	'IRI Voracity ',	3,	'ETL Tools'),
(25,	'Sprinkle ',	3,	'ETL Tools'),
(26,	'DBConvert Studio By SLOTIX s.r.o.  ',	3,	'ETL Tools'),
(27,	'Informatica PowerCenter ',	3,	'ETL Tools'),
(28,	'IBM Infosphere DataStage ',	3,	'ETL Tools'),
(29,	'Oracle Data Integrator ',	3,	'ETL Tools'),
(30,	'Microsoft  SQL Server Integrated Services (SSIS) ',	3,	'ETL Tools'),
(31,	'Ab Initio ',	3,	'ETL Tools'),
(32,	'Talend ',	3,	'ETL Tools'),
(33,	'CloverDX ',	3,	'ETL Tools'),
(34,	'Pentaho Data Integration ',	3,	'ETL Tools'),
(35,	'Apache Nifi ',	3,	'ETL Tools'),
(36,	'SAS ',	3,	'ETL Tools'),
(37,	'SAP BusinessObjects Data Integrator ',	3,	'ETL Tools'),
(38,	'Oracle Warehouse Builder ',	3,	'ETL Tools'),
(39,	'Sybase ETL ',	3,	'ETL Tools'),
(40,	'DBSoftlab ',	3,	'ETL Tools'),
(41,	'Jasper ',	3,	'ETL Tools'),
(42,	'Apache Camel ',	3,	'ETL Tools'),
(43,	'Azure Data factory ',	3,	'ETL Tools'),
(44,	'Blendo ',	3,	'ETL Tools'),
(45,	'AWS Glue ',	3,	'ETL Tools'),
(46,	'MSSQL ',	4,	'Realational Databases'),
(47,	'Oracle Database ',	4,	'Realational Databases'),
(48,	'MySQL ',	4,	'Realational Databases'),
(49,	'IBM Db2 ',	4,	'Realational Databases'),
(50,	'Amazon Aurora ',	4,	'Realational Databases'),
(51,	'Amazon Relational Database Service (RDS) ',	4,	'Realational Databases'),
(52,	'PostgreSQL ',	4,	'Realational Databases'),
(53,	'SAP HANA ',	4,	'Realational Databases'),
(54,	'IBM Informix ',	4,	'Realational Databases'),
(55,	'MariaDB ',	4,	'Realational Databases'),
(56,	'Redshift ',	4,	'Realational Databases'),
(57,	'AllegroGraph ',	5,	'Graph Databases'),
(58,	'Amazon Neptune ',	5,	'Graph Databases'),
(59,	'ArangoDB ',	5,	'Graph Databases'),
(60,	'Azure Cosmos DB ',	5,	'Graph Databases'),
(61,	'DEX/Sparksee ',	5,	'Graph Databases'),
(62,	'FlockDB ',	5,	'Graph Databases'),
(63,	'IBM DB2 ',	5,	'Graph Databases'),
(64,	'InfiniteGraph ',	5,	'Graph Databases'),
(65,	'MarkLogic ',	5,	'Graph Databases'),
(66,	'Neo4j ',	5,	'Graph Databases'),
(67,	'OpenLink Virtuoso ',	5,	'Graph Databases'),
(68,	'Oracle ',	5,	'Graph Databases'),
(69,	'OrientDB ',	5,	'Graph Databases'),
(70,	'OWLIM ',	5,	'Graph Databases'),
(71,	'Profium Sense ',	5,	'Graph Databases'),
(72,	'Sqrrl Enterprise ',	5,	'Graph Databases'),
(73,	'db4o ',	7,	'Object Databases'),
(74,	'GemStone/S ',	7,	'Object Databases'),
(75,	'InterSystems Caché ',	7,	'Object Databases'),
(76,	'JADE ',	7,	'Object Databases'),
(77,	'ObjectDatabase++ ',	7,	'Object Databases'),
(78,	'ObjectDB ',	7,	'Object Databases'),
(79,	'Objectivity/DB ',	7,	'Object Databases'),
(80,	'ObjectStore ',	7,	'Object Databases'),
(81,	'ODABA ',	7,	'Object Databases'),
(82,	'Perst ',	7,	'Object Databases'),
(83,	'Realm ',	7,	'Object Databases'),
(84,	'OpenLink Virtuoso ',	7,	'Object Databases'),
(85,	'Versant Object Database ',	7,	'Object Databases'),
(86,	'ZODB ',	7,	'Object Databases'),
(87,	'Apache Accumulo ',	8,	'Tabular Databases'),
(88,	'Bigtable ',	8,	'Tabular Databases'),
(89,	'Apache Hbase ',	8,	'Tabular Databases'),
(90,	'Hypertable ',	8,	'Tabular Databases'),
(91,	'Mnesia ',	8,	'Tabular Databases'),
(92,	'OpenLink Virtuoso ',	8,	'Tabular Databases'),
(93,	'Apache River ',	9,	'Tuple store'),
(94,	'GigaSpaces ',	9,	'Tuple store'),
(95,	'Tarantool ',	9,	'Tuple store'),
(96,	'TIBCO ActiveSpaces ',	9,	'Tuple store'),
(97,	'OpenLink Virtuoso ',	9,	'Tuple store'),
(98,	'AllegroGraph ',	10,	'Triple/quad store (RDF) database'),
(99,	'MarkLogic ',	10,	'Triple/quad store (RDF) database'),
(100,	'Ontotext-OWLIM ',	10,	'Triple/quad store (RDF) database'),
(101,	'Oracle NoSQL database ',	10,	'Triple/quad store (RDF) database'),
(102,	'Profium Sense ',	10,	'Triple/quad store (RDF) database'),
(103,	'Virtuoso Universal Server ',	10,	'Triple/quad store (RDF) database'),
(104,	'Azure Cosmos DB ',	10,	'Hosted'),
(105,	'Amazon DynamoDB ',	10,	'Hosted'),
(106,	'Amazon DocumentDB ',	10,	'Hosted'),
(107,	'Amazon SimpleDB ',	10,	'Hosted'),
(108,	'Clusterpoint database ',	10,	'Hosted'),
(109,	'Cloudant Data Layer (CouchDB) ',	10,	'Hosted'),
(110,	'Freebase ',	10,	'Hosted'),
(111,	'Google Cloud Datastore ',	10,	'Hosted'),
(112,	'Microsoft Azure Storage services ',	10,	'Hosted'),
(113,	'OpenLink Virtuoso ',	10,	'Hosted'),
(114,	'MongoDB ',	10,	'Hosted'),
(115,	'D3 Pick database',	11,	'Multivalue databases'),
(116,	'Extensible Storage Engine (ESE/NT)',	11,	'Multivalue databases'),
(117,	'InfinityDB',	11,	'Multivalue databases'),
(118,	'InterSystems Caché',	11,	'Multivalue databases'),
(119,	'jBASE Pick database',	11,	'Multivalue databases'),
(120,	'mvBase Rocket Software',	11,	'Multivalue databases'),
(121,	'mvEnterprise Rocket Software',	11,	'Multivalue databases'),
(122,	'Northgate Information Solutions Reality, the original Pick/MV Database',	11,	'Multivalue databases'),
(123,	'OpenQM',	11,	'Multivalue databases'),
(124,	'Revelation Software\'s OpenInsight (Windows) and Advanced Revelation (DOS)',	11,	'Multivalue databases'),
(125,	'UniData Rocket U2',	11,	'Multivalue databases'),
(126,	'UniVerse Rocket U2',	11,	'Multivalue databases'),
(127,	'Azure Cosmos DB',	12,	'Multimodel database'),
(128,	'Apache Ignite[26][27]',	12,	'Multimodel database'),
(129,	'ArangoDB',	12,	'Multimodel database'),
(130,	'Couchbase',	12,	'Multimodel database'),
(131,	'FoundationDB',	12,	'Multimodel database'),
(132,	'MarkLogic',	12,	'Multimodel database'),
(133,	'OrientDB',	12,	'Multimodel database'),
(134,	'Oracle Database',	12,	'Multimodel database'),
(135,	'SolarWinds Database Performance Analyzer',	13,	'Database management systems'),
(136,	'DbVisualizer',	13,	'Database management systems'),
(137,	'ManageEngine Applications Manager',	13,	'Database management systems'),
(138,	'Altibase',	13,	'Database management systems'),
(139,	'Oracle RDBMS',	13,	'Database management systems'),
(140,	'IBM DB2',	13,	'Database management systems'),
(141,	'Microsoft SQL Server',	13,	'Database management systems'),
(142,	'SAP Sybase ASE',	13,	'Database management systems'),
(143,	'Teradata',	13,	'Database management systems'),
(144,	'ADABAS',	13,	'Database management systems'),
(145,	'MySQL',	13,	'Database management systems'),
(146,	'FileMaker',	13,	'Database management systems'),
(147,	'Microsoft Access',	13,	'Database management systems'),
(148,	'Informix',	13,	'Database management systems'),
(149,	'SQLite',	13,	'Database management systems'),
(150,	'PostgresSQL',	13,	'Database management systems'),
(151,	'AmazonRDS',	13,	'Database management systems'),
(152,	'MongoDB',	13,	'Database management systems'),
(153,	'Redis',	13,	'Database management systems'),
(154,	'CouchDB',	13,	'Database management systems'),
(155,	'Neo4j',	13,	'Database management systems'),
(156,	'OrientDB',	13,	'Database management systems'),
(157,	'Couchbase',	13,	'Database management systems'),
(158,	'Toad',	13,	'Database management systems'),
(159,	'phpMyAdmin',	13,	'Database management systems'),
(160,	'SQL Developer',	13,	'Database management systems'),
(161,	'Seqel PRO',	13,	'Database management systems'),
(162,	'Robomongo',	13,	'Database management systems'),
(163,	'Hadoop HDFS',	13,	'Database management systems'),
(164,	'Cloudera',	13,	'Database management systems'),
(165,	'MariaDB',	13,	'Database management systems');

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
  `student_id` bigint(20) NOT NULL,
  `type` varchar(200) NOT NULL COMMENT 'license or certificate',
  `certificate_name` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `provider` varchar(255) DEFAULT NULL,
  `certificate_link` varchar(255) DEFAULT NULL,
  `date_earned` varchar(255) DEFAULT NULL,
  `date_ended` varchar(255) DEFAULT NULL,
  `uploaded_document` text,
  PRIMARY KEY (`student_certificate_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

TRUNCATE `student_certificate`;
INSERT INTO `student_certificate` (`student_certificate_id`, `student_id`, `type`, `certificate_name`, `description`, `provider`, `certificate_link`, `date_earned`, `date_ended`, `uploaded_document`) VALUES
(2,	1,	'license',	'Highcharts Demo',	'Description',	'Provider',	'http://www.google.com/test',	'2021-04-07T18:30:00.000Z',	'2021-04-16T18:30:00.000Z',	NULL),
(3,	1,	'license',	'Full stack developer ',	'Description',	'Provider',	'http://www.google.com/test',	'2021-04-07T18:30:00.000Z',	'2021-04-16T18:30:00.000Z',	NULL);

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
  `student_id` bigint(20) NOT NULL,
  `student_university_id` bigint(20) DEFAULT NULL,
  `school` varchar(255) DEFAULT NULL,
  `study` varchar(255) DEFAULT NULL,
  `degree` varchar(255) DEFAULT NULL,
  `from_year` varchar(255) DEFAULT NULL,
  `to_year` varchar(255) DEFAULT NULL,
  `description` longtext,
  PRIMARY KEY (`student_education_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

TRUNCATE `student_education`;
INSERT INTO `student_education` (`student_education_id`, `student_id`, `student_university_id`, `school`, `study`, `degree`, `from_year`, `to_year`, `description`) VALUES
(7,	1,	NULL,	'School 1 ',	'Area of Study',	'Degree',	'2008',	'2026',	'Description');

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
  `student_id` bigint(20) NOT NULL,
  `company_name` varchar(250) NOT NULL,
  `job_title` varchar(250) DEFAULT NULL,
  `location` varchar(250) DEFAULT NULL,
  `country` varchar(250) DEFAULT NULL,
  `from_month` varchar(250) DEFAULT NULL,
  `from_year` varchar(250) DEFAULT NULL,
  `to_month` varchar(250) DEFAULT NULL,
  `to_year` varchar(250) DEFAULT NULL,
  `job_description` longtext,
  PRIMARY KEY (`student_experience_id`),
  KEY `company_name` (`company_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

TRUNCATE `student_experience`;
INSERT INTO `student_experience` (`student_experience_id`, `student_id`, `company_name`, `job_title`, `location`, `country`, `from_month`, `from_year`, `to_month`, `to_year`, `job_description`) VALUES
(1,	1,	'Home',	'Title 1',	'Location 1',	'4',	'February',	'2020',	'April',	'2016',	'Description 1 ');

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
(1,	'other',	'Software development, system administrator, application design',	3,	1);

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

DROP TABLE IF EXISTS `student_languages`;
CREATE TABLE `student_languages` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `student_id` int(11) DEFAULT NULL,
  `language_id` int(250) DEFAULT NULL,
  `language_name` varchar(250) DEFAULT NULL,
  `proficiency` varchar(250) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

TRUNCATE `student_languages`;
INSERT INTO `student_languages` (`id`, `student_id`, `language_id`, `language_name`, `proficiency`) VALUES
(24,	1,	NULL,	'Hindi',	'Basic'),
(23,	1,	NULL,	'French',	'Conversational'),
(22,	1,	NULL,	'English',	'Basic');

DROP TABLE IF EXISTS `student_project`;
CREATE TABLE `student_project` (
  `student_project_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `student_id` bigint(20) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `date` varchar(255) DEFAULT NULL,
  `link` varchar(255) DEFAULT NULL,
  `project_start_date` varchar(255) DEFAULT NULL,
  `project_end_date` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`student_project_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

TRUNCATE `student_project`;
INSERT INTO `student_project` (`student_project_id`, `student_id`, `title`, `description`, `date`, `link`, `project_start_date`, `project_end_date`) VALUES
(1,	1,	'Test Project 2',	'test test test test test test test test ',	NULL,	'http://www.google.com/test',	'2019-10-31T18:30:00.000Z',	'2020-08-26T18:30:00.000Z'),
(3,	1,	'Highcharts Demo',	'Highcharts Demo',	NULL,	'http://www.google.com/test',	'2019-10-31T18:30:00.000Z',	'2020-08-26T18:30:00.000Z'),
(4,	1,	'Highcharts Demo',	'Highcharts Demo',	NULL,	'http://www.google.com/test',	NULL,	NULL);

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
  `hourly_rate` varchar(200) DEFAULT NULL,
  `service_fees` varchar(200) DEFAULT NULL,
  `receive_rate` varchar(200) DEFAULT NULL,
  `job_title` text,
  `professional_overview` longtext,
  `country` varchar(100) DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL,
  `street_address` varchar(100) DEFAULT NULL,
  `zipcode` varchar(100) DEFAULT NULL,
  `country_calling_code` varchar(50) DEFAULT NULL,
  `phone_number` varchar(100) DEFAULT NULL,
  `job_type` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`user_account_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

TRUNCATE `user_account`;
INSERT INTO `user_account` (`user_account_id`, `account_type`, `email_id`, `first_name`, `last_name`, `password`, `user_name`, `profile_completed`, `hourly_rate`, `service_fees`, `receive_rate`, `job_title`, `professional_overview`, `country`, `city`, `street_address`, `zipcode`, `country_calling_code`, `phone_number`, `job_type`) VALUES
(1,	'Student',	'nisarg205@gmail.com',	'Nisarg',	'Pandya',	'202cb962ac59075b964b07152d234b70',	'Nisarg1',	13,	'15',	'-3.00',	'12',	'Full stack developer ',	'I have worked on \n1. Node JS \n2. Angular \n3. react JS \n4. Core PHP\n5. Codeigniter \n6. Laravel \n7.  next js \n\nI like coding, I am workaholic and I like to travel\n',	'India',	'indore',	'194-B Clerk Colony Indore M.P',	'452001',	'91',	'9876543210',	'5'),
(2,	'Student',	'nisarg205@gmail.com',	'Nisarg',	'Pandya',	'Aa7LziB1',	'Nisarg2',	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL),
(6,	'Student',	'j.meenesh@gmail.com',	'Meenesh',	'Jain',	'202cb962ac59075b964b07152d234b70',	'Meenesh',	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL),
(7,	'Student',	'jamesbond@malinator.com',	'James',	'Bond',	'202cb962ac59075b964b07152d234b70',	'James',	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL),
(8,	'Student',	'jamesbond1@malinator.com',	'James',	'Bond',	'202cb962ac59075b964b07152d234b70',	'James',	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL),
(9,	'Student',	'jamesbond2@malinator.com',	'James',	'Bond',	'202cb962ac59075b964b07152d234b70',	'James',	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL);

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

-- 2021-04-26 10:55:19

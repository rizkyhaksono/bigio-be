CREATE TABLE `Statuses` (
  `status_id` int NOT NULL,
  `status_name` enum('Publish','Draft') NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`status_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `Stories` (
  `story_id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `author` varchar(255) NOT NULL,
  `synopsis` LONGTEXT NOT NULL,
  `category` enum('Financial','Technology','Health') NOT NULL,
  `status_id` int DEFAULT NULL,
  `image_path` varchar(255) DEFAULT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`story_id`),
  KEY `status_id` (`status_id`),
  CONSTRAINT `Stories_ibfk_1` FOREIGN KEY (`status_id`) REFERENCES `Statuses` (`status_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `Chapter` (
  `chapter_id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `story` LONGTEXT NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `story_id` int NOT NULL,
  PRIMARY KEY (`chapter_id`),
  KEY `story_id` (`story_id`),
  CONSTRAINT `Chapter_ibfk_1` FOREIGN KEY (`story_id`) REFERENCES `Stories` (`story_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `Tags` (
  `tag_id` int NOT NULL AUTO_INCREMENT,
  `tag_name` varchar(50) NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`tag_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `StoryTags` (
  `story_id` int NOT NULL,
  `tag_id` int NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`story_id`,`tag_id`),
  KEY `tag_id` (`tag_id`),
  CONSTRAINT `StoryTags_ibfk_1` FOREIGN KEY (`story_id`) REFERENCES `Stories` (`story_id`),
  CONSTRAINT `StoryTags_ibfk_2` FOREIGN KEY (`tag_id`) REFERENCES `Tags` (`tag_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

COMMIT;

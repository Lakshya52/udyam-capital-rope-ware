-- Udyam Capital CMS schema — import once via phpMyAdmin (XAMPP or Hostinger).
-- Then import seed.sql for the current site content.
CREATE DATABASE IF NOT EXISTS `udyam`
  CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `udyam`;

-- Services: 4 mains (parent_id NULL, is_main=1) + sub-services (parent_id set).
CREATE TABLE IF NOT EXISTS `services` (
  `id` VARCHAR(64) NOT NULL PRIMARY KEY,
  `parent_id` VARCHAR(64) NULL,
  `title` VARCHAR(255) NOT NULL,
  `description` TEXT NULL,
  `image` VARCHAR(255) NULL,
  `bg` VARCHAR(255) NULL,
  `hover_bg` VARCHAR(255) NULL,
  `title_class` VARCHAR(255) NULL,
  `desc_class` VARCHAR(255) NULL,
  `span` VARCHAR(255) NULL,
  `is_main` TINYINT(1) NOT NULL DEFAULT 0,
  `sort_order` INT NOT NULL DEFAULT 0,
  `status` ENUM('draft','published') NOT NULL DEFAULT 'published',
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT `fk_service_parent` FOREIGN KEY (`parent_id`)
    REFERENCES `services` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Rich detail copy per service (mains + subs). JSON columns mirror the
-- object shapes in src/data/services.js so the React swap is trivial.
CREATE TABLE IF NOT EXISTS `service_details` (
  `service_id` VARCHAR(64) NOT NULL PRIMARY KEY,
  `audience` TEXT NULL,
  `intro` MEDIUMTEXT NULL,
  `story` JSON NULL,
  `documents` JSON NULL,
  `benefits` JSON NULL,
  `process` JSON NULL,
  `faqs` JSON NULL,
  CONSTRAINT `fk_detail_service` FOREIGN KEY (`service_id`)
    REFERENCES `services` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `articles` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `slug` VARCHAR(255) NOT NULL UNIQUE,
  `title` VARCHAR(255) NOT NULL,
  `excerpt` TEXT NULL,
  `category` VARCHAR(100) NULL,
  `date` VARCHAR(50) NULL,
  `read_time` VARCHAR(50) NULL,
  `image` VARCHAR(255) NULL DEFAULT '',
  `author_name` VARCHAR(150) NULL,
  `author_role` VARCHAR(150) NULL,
  `tags` JSON NULL,
  `sections` JSON NULL,
  `status` ENUM('draft','published') NOT NULL DEFAULT 'published',
  `views` INT UNSIGNED NOT NULL DEFAULT 0,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX `idx_articles_status` (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `case_studies` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `client` VARCHAR(255) NOT NULL,
  `industry` VARCHAR(100) NULL,
  `service` VARCHAR(255) NULL,
  `title` VARCHAR(255) NOT NULL,
  `challenge` TEXT NULL,
  `solution` TEXT NULL,
  `stats` JSON NULL,
  `sort_order` INT NOT NULL DEFAULT 0,
  `status` ENUM('draft','published') NOT NULL DEFAULT 'published',
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- About page: overview paras, vision, mission, team + capability chips (JSON).
CREATE TABLE IF NOT EXISTS `about_content` (
  `key_name` VARCHAR(64) NOT NULL PRIMARY KEY,
  `value` MEDIUMTEXT NULL,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Single source for contact details (today duplicated in 3 frontend files).
CREATE TABLE IF NOT EXISTS `site_settings` (
  `key_name` VARCHAR(64) NOT NULL PRIMARY KEY,
  `value` TEXT NULL,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `admin_users` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `username` VARCHAR(100) NOT NULL UNIQUE,
  `password_hash` VARCHAR(255) NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Contact-form enquiries (replaces today's mailto: link).
CREATE TABLE IF NOT EXISTS `leads` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(150) NULL,
  `email` VARCHAR(190) NULL,
  `phone` VARCHAR(50) NULL,
  `service` VARCHAR(255) NULL,
  `message` TEXT NULL,
  `is_read` TINYINT(1) NOT NULL DEFAULT 0,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

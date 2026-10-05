-- Run once on databases created BEFORE this file existed
-- (phpMyAdmin → udyam → Import). Fresh database.sql + seed.sql
-- imports already include this row.
USE `udyam`;
INSERT IGNORE INTO site_settings (`key_name`, `value`)
VALUES ('content_revision', '1');

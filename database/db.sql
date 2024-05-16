CREATE DATABASE IF NOT EXISTS conversedb;
USE conversedb;
CREATE USER 'converse-sql-bot'@'localhost' IDENTIFIED BY 'converse123';
GRANT ALL PRIVILEGES ON conversedb.* TO 'converse-sql-bot'@'localhost';
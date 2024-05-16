CREATE DATABASE IF NOT EXISTS conversedb;
CREATE USER 'converse-sql-bot' IDENTIFIED BY 'converse123';
GRANT ALL PRIVILEGES ON conversedb.* TO 'converse-sql-bot';
USE conversedb;


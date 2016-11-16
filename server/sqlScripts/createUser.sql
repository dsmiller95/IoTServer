CREATE USER 'default'@'localhost' IDENTIFIED BY 'secret';
GRANT INSERT ON birdRecords.* TO 'default'@'localhost';
GRANT DELETE ON birdRecords.* TO 'default'@'localhost';
GRANT SELECT ON birdRecords.* TO 'default'@'localhost';
GRANT UPDATE ON birdRecords.* TO 'default'@'localhost';
FLUSH PRIVILEGES;
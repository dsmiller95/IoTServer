CREATE USER 'default'@'localhost' IDENTIFIED BY 'secret';
GRANT INSERT ON birdrecords.* TO 'default'@'localhost';
GRANT DELETE ON birdrecords.* TO 'default'@'localhost';
GRANT SELECT ON birdrecords.* TO 'default'@'localhost';
GRANT UPDATE ON birdrecords.* TO 'default'@'localhost';
FLUSH PRIVILEGES;
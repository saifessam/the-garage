DROP DATABASE thegarage;
CREATE DATABASE thegarage;
USE thegarage;

SELECT * FROM thegarage.users;
SELECT * FROM thegarage.service_providers;
SELECT * FROM thegarage.ads;
SELECT * FROM thegarage.reviews;
SELECT * FROM thegarage.cart;
SELECT * FROM thegarage.orders;

TRUNCATE `thegarage`.`users`;
TRUNCATE `thegarage`.`service_providers`;
TRUNCATE `thegarage`.`ads`;
TRUNCATE `thegarage`.`reviews`;

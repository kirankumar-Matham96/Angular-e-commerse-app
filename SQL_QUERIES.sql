--The SQL commands for e-commerce application using angular, sql-server, asp.net core web api.

CREATE DATABASE PRODUCTS_DB;

USE PRODUCTS_DB;

CREATE TABLE Products(
  id VARCHAR(50) PRIMARY KEY,
  title VARCHAR(255)
);

CREATE PROCEDURE sp_insert_products(@id VARCHAR(50), @name VARCHAR(255))
AS BEGIN
	INSERT INTO Products VALUES (@id, @name);
END;

EXEC sp_insert_products '1','Mobile';

CREATE PROCEDURE sp_update_products(@id VARCHAR(50), @name VARCHAR(255))
AS BEGIN
	UPDATE Products SET title = @name WHERE id = @id;
END;

EXEC sp_update_products '24_first_prod','Laptop';

CREATE PROCEDURE sp_delete_products(@id VARCHAR(50))
AS BEGIN
	DELETE FROM Products WHERE id = @id;
END;

EXEC sp_delete_products 2;


SELECT * FROM Products;
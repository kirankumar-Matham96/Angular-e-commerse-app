--The SQL commands for e-commerce application using angular, sql-server, asp.net core web api.

CREATE DATABASE PRODUCTS_DB;

USE PRODUCTS_DB;

DROP TABLE Products;

ALTER TABLE Products ALTER COLUMN description VARCHAR(MAX);

CREATE TABLE Products(
  id VARCHAR(250) PRIMARY KEY,
  title VARCHAR(255),
  description VARCHAR(MAX),
  price MONEY,
  category VARCHAR(30),
  stock INT,
  imageUrl VARCHAR(255)
);

--Inserting product
CREATE PROCEDURE sp_insert_products(
	@id VARCHAR(250),
	@title VARCHAR(255),
	@description VARCHAR(MAX),
	@price MONEY,
	@category VARCHAR(30),
	@stock INT,
	@img VARCHAR(255)
)
AS BEGIN
	INSERT INTO Products VALUES (@id, @title, @description, @price, @category, @stock, @img);
END;

EXEC sp_insert_products '3','Chart', 'Map that have treasure location', 58749654.99, 'Treasure', 1, '/assets/products/prod3.jpg';

--Updating product
CREATE PROCEDURE sp_update_products(
	@id VARCHAR(250),
	@title VARCHAR(255),
	@description VARCHAR(MAX),
	@price MONEY,
	@category VARCHAR(30),
	@stock INT,
	@img VARCHAR(255)
)
AS BEGIN
	UPDATE Products
	SET
	title = @title,
	description = @description,
	price = @price,
	category = @category,
	stock = @stock,
	imageUrl = @img
	WHERE id = @id;
END;

EXEC sp_update_products '1','Mobile', 'A good mobile', 19999.99, 'Unisex', 23, '/assets/products/prod1.jpg';

--Deleting product
CREATE PROCEDURE sp_delete_products(@id VARCHAR(250))
AS BEGIN
	DELETE FROM Products WHERE id = @id;
END;

EXEC sp_delete_products 2;


SELECT * FROM Products;
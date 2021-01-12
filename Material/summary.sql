USE master
DROP DATABASE IF EXISTS javaflorist;
GO
CREATE DATABASE javaflorist;
GO
USE [javaflorist];

CREATE TABLE [user] (
  [id] int NOT NULL IDENTITY,
  [active] int NOT NULL DEFAULT '1',
  [email] varchar(255) NOT NULL,
  [password] varchar(255) NOT NULL,
  [username] varchar(255) NOT NULL,
  [role] varchar(255) NOT NULL DEFAULT 'customer',
  [address] varchar(255) DEFAULT NULL,
  [birthday] datetime DEFAULT NULL,
  [name] varchar(255) DEFAULT NULL,
  [phonenumber] varchar(255) DEFAULT NULL,
  [imgName] varchar(1000) DEFAULT NULL,
  PRIMARY KEY ([id])
);

CREATE TABLE [product] (
  [id] int NOT NULL IDENTITY,
  [name] varchar(255) NOT NULL,
  [price] float NOT NULL,
  [description] varchar(500) NOT NULL,
  [imgName] varchar(255) DEFAULT NULL,
  PRIMARY KEY ([id])
);

CREATE TABLE [order] (
  [id] int NOT NULL IDENTITY PRIMARY KEY,
  [address] varchar(70) NOT NULL,
  [date] datetime NOT NULL,
  [deliverydate] datetime DEFAULT NULL,
  [email] varchar(255) NOT NULL,
  [note] varchar(200) DEFAULT NULL,
  [paymentmethod] varchar(255) NOT NULL,
  [phonenumber] varchar(255) NOT NULL,
  [message] varchar(255) NOT NULL,
  [receiver] varchar(255) NOT NULL,
  [status] varchar(255) NOT NULL DEFAULT 'processing',
  [totalmoney] float NOT NULL,
  [userid] int NOT NULL FOREIGN KEY REFERENCES [user](id)
);
CREATE TABLE [orderdetail] (
  [id] int NOT NULL IDENTITY PRIMARY KEY,
  [quantity] int NOT NULL,
  [orderid] int NOT NULL FOREIGN KEY REFERENCES [order](id),
  [productid] int NOT NULL FOREIGN KEY REFERENCES [product](id)
);

CREATE TABLE [cart] (
  [id] int NOT NULL IDENTITY PRIMARY KEY,
  [userid] int UNIQUE FOREIGN KEY REFERENCES [user](id)
);

CREATE TABLE [cartdetail] (
  [id] int NOT NULL IDENTITY PRIMARY KEY,
  [quanity] int NOT NULL,
  [cartid] int NOT NULL FOREIGN KEY REFERENCES [cart](id),
  [productid] int NOT NULL FOREIGN KEY REFERENCES [product](id),
);

CREATE TABLE [category] (
  [id] int NOT NULL IDENTITY,
  [categoryname] varchar(255) NOT NULL UNIQUE,
  [message] varchar(255) NOT NULL,
  PRIMARY KEY ([id])
);

CREATE TABLE [productcategory] (
  [productid] int NOT NULL FOREIGN KEY REFERENCES [product](id),
  [categoryname] varchar(255) NOT NULL FOREIGN KEY REFERENCES [category](categoryname)
);

CREATE TABLE [favorite] (
  [userid] int NOT NULL,
  [productid] int NOT NULL FOREIGN KEY REFERENCES [product](id)
);

CREATE TABLE [feedbackdata] (
  [userid] int NOT NULL FOREIGN KEY REFERENCES [user](id),
  [productid] int NOT NULL FOREIGN KEY REFERENCES [product](id),
  [feedback] varchar(8000) NOT NULL,
  [fbReply] varchar(8000) NOT NULL,
  [vote] int NOT NULL
);

CREATE TABLE [contact] (
  [id] int NOT NULL IDENTITY, 
  [name] varchar(255) NOT NULL,
  [email] varchar(255) NOT NULL,
  [message] varchar(255) NOT NULL,
  PRIMARY KEY ([id])
);

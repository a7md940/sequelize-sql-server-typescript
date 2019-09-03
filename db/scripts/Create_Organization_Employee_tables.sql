CREATE Database SequelizeDemo;
GO

Use SequelizeDemo
GO


CREATE TABLE Organization(
	Id INT IDENTITY(1,1) PRIMARY KEY,
	Name NVARCHAR(255) NOT NULL,
	Phone NVARCHAr(50) NULL,

)
GO


CREATE TABLE Employee(
	Id INT IDENTITY(1, 1) PRIMARY KEY,
	Name NVARCHAR(255),
	Age INT,
	OrganizationId INT NOT NULL,
	CONSTRAINT FK_Employee_Organization FOREIGN KEY (OrganizationId)
	REFERENCES Organization(Id)
)
GO
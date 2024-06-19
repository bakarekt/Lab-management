# Lab-management
<h2> Before first run<\h2>
npm install
# Run
npm start
# Edit css by scss (in split terminal)
npm run watch 

# Query mysql

Set up mysql in link: https://drive.google.com/file/d/1MjvESVyQR_AgovRXl_KEnkTnpnA7ydRt/view?usp=sharing

Process: https://pinnate-hourglass-9e7.notion.site/DRAFT-7876c1e07a79447db8639b6b28fdb743

-- Tạo cơ sở dữ liệu

CREATE DATABASE management-lab-dev;

-- Sử dụng cơ sở dữ liệu vừa tạo
USE management-lab-dev;

-- Tạo bảng lab_groups
CREATE TABLE lab_groups (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description VARCHAR(255),
    createdAt DATE NOT NULL,
    updatedAt DATE NOT NULL
);

-- Tạo bảng projects
CREATE TABLE projects (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description VARCHAR(255),
    createdAt DATE NOT NULL,
    updatedAt DATE NOT NULL,
    image VARCHAR(255)
);

-- Tạo bảng students
CREATE TABLE students (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    labGroupId INT,
    mssv VARCHAR(255),
    createdAt DATE NOT NULL,
    updatedAt DATE NOT NULL,
    description VARCHAR(255),
    phoneNumber VARCHAR(20),
    image VARCHAR(255),
    isAdmin TINYINT,
    FOREIGN KEY (labGroupId) REFERENCES lab_groups(id)
);

-- Tạo bảng group_projects
CREATE TABLE group_projects (
    labGroupId INT,
    projectId INT,
    PRIMARY KEY (labGroupId, projectId),
    FOREIGN KEY (labGroupId) REFERENCES lab_groups(id),
    FOREIGN KEY (projectId) REFERENCES projects(id)
);


# Set up connection database
<h2>src/config/database.js</h2>
const sequelize = new Sequelize('management-lab-dev', 'yourusername', 'yourpassword', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false,
});
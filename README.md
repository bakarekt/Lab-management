# lab-management
# before first run
npm install
# run
npm start
# edit css by scss
npm run watch (in split terminal)

# query mysql
-- Tạo cơ sở dữ liệu
CREATE DATABASE `management-lab-devlab_groupslab_groups`;

-- Sử dụng cơ sở dữ liệu vừa tạo
USE `management-lab-dev`;

-- Tạo bảng lab_groups;
CREATE TABLE lab_group (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description VARCHAR(255) NOT NULL, 
    createdAt DATE NOT NULL, 
    updatedAt DATE NOT NULL
);

-- Tạo bảng students với khóa ngoại liên kết tới bảng lab_group;
CREATE TABLE students (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    lab_group_id INT,
    mssv VARCHAR(255), 
    createdAt DATE ,
    updatedAt DATE ,
    description VARCHAR(255) ,
    phoneNumber VARCHAR(20) ,
    image VARCHAR(255),
    FOREIGN KEY (lab_group_id) REFERENCES lab_group(id)
);

-- Tạo bảng projects;
CREATE TABLE projects (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description VARCHAR(255) ,
    createdAt DATE ,
    updatedAt DATE ,
    image VARCHAR(255)
);

-- Tạo bảng liên kết group_project để biểu diễn mối quan hệ nhiều-nhiều giữa lab_group và projects;
CREATE TABLE group_project (
    group_id INT,
    project_id INT,
    PRIMARY KEY (group_id, project_id),
    FOREIGN KEY (group_id) REFERENCES lab_group(id),
    FOREIGN KEY (project_id) REFERENCES projects(id)
);

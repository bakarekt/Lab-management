# Instruct

## Query mysql

Set up mysql in link: https://drive.google.com/file/d/1MjvESVyQR_AgovRXl_KEnkTnpnA7ydRt/view?usp=sharing

### Create database

```mysql
CREATE DATABASE management-lab-dev;
USE management-lab-dev;

-- Create lab_groups table
CREATE TABLE lab_groups (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description VARCHAR(255),
    createdAt DATE NOT NULL,
    updatedAt DATE NOT NULL
);

-- Create projects table
CREATE TABLE projects (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description VARCHAR(255),
    createdAt DATE NOT NULL,
    updatedAt DATE NOT NULL,
    image VARCHAR(255)
);

-- Create students table
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

```
### Database like
![Mô tả ảnh](https://github.com/Quanghusst/Lab-management/blob/main/database%20lab%20management.png)




## Set up connection database
Fix your mysql [username] and [password]
```javascript
// src/config/database.js
const sequelize = new Sequelize('management-lab-dev', 'username', 'password', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false,
});
```

## Before first run
```bash
npm install 
```

## Run
```bash
npm start
```


## Edit css by scss (in split terminal)
```bash
npm run watch
```


## Beauty the code (in split terminal)
```bash
npm run beautiful
```

## Project structure

```txt
│   package.json
│   package-lock.json
│   README.md
├───node_modules
└───src
    │   index.js
    │
    ├───app
    │   ├───controllers
    │   │       AuthController.js
    │   │       GroupsController.js
    │   │       NewsController.js
    │   │       ProjectsController.js
    │   │       SiteController.js
    │   │       StudentsController.js
    │   │
    │   └───models
    │           groupModel.js
    │           groupProjectModel.js
    │           projectModel.js
    │           studentModel.js
    │
    ├───config
    │       database.js
    │
    ├───public
    │   ├───css
    │   │       app.css
    │   │
    │   └───img
    │       │   ico.png
    │       │   ryo_yamada.png
    │       │
    │       ├───projects
    │       │       DESKTOP_CAM.png
    │       │       DESKTOP_TRANG.png
    │       │
    │       └───students
    │               Quang.jpg
    │               ryo_yamada.png
    │
    ├───resources
    │   ├───scss
    │   │       app.scss
    │   │
    │   └───views
    │       │   home.handlebars
    │       │   news.handlebars
    │       │
    │       ├───auth
    │       │       login.handlebars
    │       │
    │       ├───groups
    │       │       create.handlebars
    │       │       details.handlebars
    │       │       edit.handlebars
    │       │
    │       ├───layouts
    │       │       main.handlebars
    │       │
    │       ├───partials
    │       │       footer.handlebars
    │       │       header.handlebars
    │       │       headerUserView.handlebars
    │       │       viewAdmin.handlebars
    │       │       viewUser.handlebars
    │       │
    │       ├───projects
    │       │       create.handlebars
    │       │       details.handlebars
    │       │       edit.handlebars
    │       │
    │       └───students
    │               create.handlebars
    │               details.handlebars
    │               edit.handlebars
    │
    ├───routes
    │       auth.js
    │       groups.js
    │       index.js
    │       news.js
    │       projects.js
    │       site.js
    │       students.js
    │
    └───util
            mysql.js
```


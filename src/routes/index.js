const express = require('express');
const siteRouter = require('./site');
const authRouter = require('./auth'); // Nếu bạn có auth routes riêng biệt
const groupsRouter = require('./groups');
const newsRouter = require('./news');
const projectsRouter = require('./projects');
const studentsRouter = require('./students');

function route(app) {
    app.use('/auth', authRouter); // Đường dẫn cho auth
    app.use('/groups', groupsRouter); // Đường dẫn cho groups
    app.use('/news', newsRouter); // Đường dẫn cho news
    app.use('/projects', projectsRouter); // Đường dẫn cho projects
    app.use('/students', studentsRouter); // Đường dẫn cho students
    app.use('/', siteRouter); // Đường dẫn cho trang chính
}

module.exports = route;

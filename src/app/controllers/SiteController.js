const Student = require('../models/studentModel');
const Group = require('../models/groupModel');
const Project = require('../models/projectModel');
const { mutipleSequelizeToObject } = require('../../util/mysql');

class SiteController {
    async login(req, res, next) {
        if (!req.session.student) {
            return res.redirect('/auth/login');
        }
        const isAdmin = req.session.student.isAdmin;
        try {
            const studentsData = await Student.findAll();
            const groupsData = await Group.findAll({
                include: [
                    {
                        model: Student,
                        as: 'students',
                    },
                    {
                        model: Project,
                        through: { attributes: [] }, // Loại bỏ các cột trung gian từ bảng group_project
                    },
                ],
            });

            const projectsData = await Project.findAll({
                include: [
                    {
                        model: Group,
                        through: { attributes: [] }, // Loại bỏ các cột trung gian từ bảng group_project
                    },
                ],
            });

            const students = mutipleSequelizeToObject(studentsData); // chuyển đổi không phải object -> object
            const groups = mutipleSequelizeToObject(groupsData);
            const projects = mutipleSequelizeToObject(projectsData);
            if (isAdmin) {
                res.render('home', {
                    layout: 'main',
                    admin: true,
                    student: req.session.student,
                    students,
                    groups,
                    projects,
                });
            } else {
                res.render('home', {
                    layout: 'main',
                    admin: false,
                    student: req.session.student,
                    students,
                    groups,
                    projects,
                });
            }
        } catch (err) {
            console.error('Error retrieving data:', err);
            res.status(500).send('Error retrieving data');
        }
    }
}
module.exports = new SiteController();

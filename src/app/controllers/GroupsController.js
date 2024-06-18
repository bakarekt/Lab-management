const Group = require('../models/groupModel');
const Student = require('../models/studentModel');
const Project = require('../models/projectModel');
const { mutipleSequelizeToObject, sequelizeToObject } = require('../../util/mysql');
const { sequelize } = require('../../config/database')

class GroupsController {
    // GET method students/:id/edit
    edit(req, res, next) {
        Group.findByPk(req.params.id, {
            include: [
                {
                    model: Student,
                    as: 'students',
                },
                {
                    model: Project,
                    as: 'projects',
                    through: { attributes: [] }, // Loại bỏ các cột trung gian từ bảng group_project
                },
            ],
        })
            .then(group => {
                if (!group) {
                    return res.status(404).send('ĐI LẠC R');
                }
                // Chuyển đổi đối tượng Group và các liên kết của nó
                const groupObject = sequelizeToObject(group);
                groupObject.students = mutipleSequelizeToObject(group.students);
                groupObject.projects = mutipleSequelizeToObject(group.projects);
                res.render('./groups/edit', {
                    group: groupObject,
                });
                // res.json(group)
                // console.log(group)
            })
            .catch(err => {
                console.error('Lỗi khi tìm kiếm khóa học:', err);
                next(err);
            });
    }
    // PUT method students/:id
    submit(req, res, next) {
        sequelize.transaction(async (t) => {
            try {
                const groupId = req.params.id;
                const { name, description, projects } = req.body;

                // Cập nhật thông tin của group
                await Group.update({ name, description }, { where: { id: groupId }, transaction: t });

                // Cập nhật thông tin của projects
                if (Array.isArray(projects)) {
                    for (const project of projects) {
                        await Project.update(
                            { name: project.name },
                            { where: { id: project.id }, transaction: t }
                        );
                    }
                }

                res.redirect('/');
            } catch (error) {
                next(error);
            }
        });
    }

    // DELETE method students/:id
    destroy(req, res, next) {
        Group.destroy({ where: { id: req.params.id } })
            .then(() => res.redirect('back'))
            .catch(next)
    }

    // GET method students/create
    create(req, res, next) {


        res.render('./groups/create')
    }
    save(req, res, next) {
        Group.create(req.body)
            .then(() => res.redirect('/'))
            .catch(next)

    }
    // GET method students/details/:id
    details(req, res, next) {
        Group.findByPk(req.params.id)
            .then(group => {
                if (!group) {
                    return res.status(404).send('ĐI LẠC R');
                }

                res.render('./groups/details', {
                    group: sequelizeToObject(group),
                });
            })
            .catch(err => {
                console.error('Lỗi khi tìm kiếm khóa học:', err);
                next(err);
            });
    }
}

module.exports = new GroupsController()

const Group = require('../models/groupModel');
const Student = require('../models/studentModel');
const Project = require('../models/projectModel');
const { mutipleSequelizeToObject, sequelizeToObject } = require('../../util/mysql');
const { sequelize } = require('../../config/database')

class ProjectsController {
    // GET method students/:id/edit
    edit(req, res, next) {
        Project.findByPk(req.params.id, {
            include: [
                {
                    model: Group,
                    as: 'lab_groups',
                    through: { attributes: [] }, // Loại bỏ các cột trung gian từ bảng group_project
                },
            ],
        })
            .then(project => {
                if (!project) {
                    return res.status(404).send('ĐI LẠC R');
                }
                // Chuyển đổi đối tượng Group và các liên kết của nó
                const projectObject = sequelizeToObject(project);
                projectObject.projects = mutipleSequelizeToObject(project.lab_groups);
                res.render('./projects/edit', {
                    project: projectObject,
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
                const projectId = req.params.id;
                const { name, description, image,  lab_groups} = req.body;

                // Cập nhật thông tin của group
                await Project.update({ name, description, image }, { where: { id: projectId }, transaction: t });

                // Cập nhật thông tin của projects
                if (Array.isArray(lab_groups)) {
                    for (const lab_group of lab_groups) {
                        await Group.update(
                            { name: lab_group.name },
                            { where: { id: lab_group.id }, transaction: t }
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
        Project.destroy({ where: { id: req.params.id } })
            .then(() => res.redirect('back'))
            .catch(next)
    }

    // GET method students/create
    create(req, res, next) {
        res.render('./projects/create')
    }
    save(req, res, next) {
        Project.create(req.body)
            .then(() => res.redirect('back'))
            .catch(next)

    }
    // GET method students/details/:id
    details(req, res, next) {
        Project.findByPk(req.params.id)
            .then(project => {
                const isAdmin = req.session.student.isAdmin
                if (!project) {
                    return res.status(404).send('ĐI LẠC R');
                }
                if (isAdmin) {
                    res.render('./projects/details', { admin: true, student: req.session.student, project: sequelizeToObject(project), });

                } else {
                    res.render('./projects/details', { admin: false, student: req.session.student, project: sequelizeToObject(project), });
                }
    
            })
            .catch(err => {
                console.error('Lỗi khi tìm kiếm khóa học:', err);
                next(err);
            });
    }
}

module.exports = new ProjectsController()

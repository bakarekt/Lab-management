const Group = require('../models/groupModel');
const Student = require('../models/studentModel');
const Project = require('../models/projectModel');
const GroupProject = require('../models/groupProjectModel');
const { mutipleSequelizeToObject, sequelizeToObject } = require('../../util/mysql');
const { sequelize } = require('../../config/database')

class GroupsController {
    // GET method students/:id/edit
    edit(req, res, next) {
        Promise.all([
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
            }),
            Project.findAll({
                include: [{
                    model: Group,
                    through: { attributes: [] }, // Loại bỏ các cột trung gian từ bảng group_project
                }],
            })
        ])
            .then(([group, projects]) => {
                if (!group) {
                    return res.status(404).send('ĐI LẠC R');
                }
                // Chuyển đổi đối tượng Group và các liên kết của nó
                const groupObject = sequelizeToObject(group);
                groupObject.students = mutipleSequelizeToObject(group.students);
                groupObject.projects = mutipleSequelizeToObject(group.projects);

                res.render('./groups/edit', {
                    group: groupObject,
                    projects: mutipleSequelizeToObject(projects),
                });
            })
            .catch(err => {
                console.error('Lỗi khi tìm kiếm khóa học:', err);
                next(err);
            });
    }

    // PUT method students/:id
    // submit(req, res, next) {
    //     sequelize.transaction(async (t) => {
    //         try {
    //             const groupId = req.params.id;
    //             const { name, description, projects } = req.body;
    //             // const { name, projects, description,  } = req.body;
    //             // res.json(req.body)
    //             // Cập nhật thông tin của group
    //             await Group.update({ name, description }, { where: { id: groupId }, transaction: t });

    //             // Cập nhật thông tin của projects
    //             for (const project of projects) {
    //                 if (project.id && typeof project.is_active === 'boolean') {
    //                     if (project.is_active) {
    //                         // Thêm bản ghi vào bảng group_projects nếu chưa tồn tại
    //                         await GroupProject.findOrCreate({
    //                             where: { labGroupId: groupId, },
    //                             transaction: t
    //                         });
    //                     } else {
    //                         // Xóa bản ghi khỏi bảng group_projects nếu tồn tại
    //                         await GroupProject.destroy({
    //                             where: { labGroupId: groupId, projectId: project.id },
    //                             transaction: t
    //                         });
    //                     }
    //                 }
    //             }
    //             await t.commit();
    //             res.redirect('/');
    //         } catch (error) {
    //             next(error);
    //         }
    //     });
    // }
    // async submit(req, res, next) {
    //     const t = await sequelize.transaction();
    //     try {
    //         const groupId = req.params.id;
    //         const { name, description, projects } = req.body;

    //         // Kiểm tra dữ liệu đầu vào
    //         if (!groupId || !name || !description || !Array.isArray(projects)) {
    //             throw new Error('Invalid input data');
    //         }

    //         // Cập nhật thông tin của group
    //         await Group.update(
    //             { name, description },
    //             { where: { id: groupId }, transaction: t }
    //         );

    //         // Xóa tất cả các mối quan hệ hiện tại giữa nhóm và các dự án
    //         await GroupProject.destroy({
    //             where: { labGroupId: groupId },
    //             transaction: t
    //         });

    //         // Thêm các mối quan hệ mới dựa trên danh sách project ID
    //         for (const projectId of projects) {
    //             await GroupProject.create({
    //                 labGroupId: groupId,
    //                 projectId: projectId
    //             }, { transaction: t });
    //         }

    //         // Commit transaction
    //         await t.commit();

    //         res.redirect('/');
    //     } catch (error) {
    //         // Rollback transaction nếu có lỗi
    //         await t.rollback();
    //         next(error);
    //     }
    // }
    // async submit(req, res, next) {
    //     try {
    //         const groupId = parseInt(req.params.id, 10);
    //         const { name, description, projects } = req.body;

    //         if (!groupId || !name || !description || !Array.isArray(projects)) {
    //             throw new Error('Invalid input data');
    //         }

    //         await Group.update(
    //             { name, description },
    //             { where: { id: groupId }, /* transaction: t */ }
    //         );

    //         console.log(`Group ID: ${groupId}`);
    //         console.log(`Projects: ${JSON.stringify(projects)}`);
    //         for (const projectId of projects) {
    //             await GroupProject.create({
    //                 labGroupId: groupId,
    //                 projectId: parseInt(projectId)
    //             }, /* { transaction: t } */);
    //         }

    //         res.redirect('/');
    //     } catch (error) {
    //         next(error);
    //     }
    // }

    async submit(req, res, next) {
        try {
            const groupId = parseInt(req.params.id, 10);
            const { name, description, projects } = req.body;

            if (isNaN(groupId) || !name || !description || !Array.isArray(projects)) {
                throw new Error('Invalid input data');
            }

            console.log('Updating group...');
            // Cập nhật thông tin của group
            await Group.update(
                { name, description },
                { where: { id: groupId } }
            );

            console.log(`Group ID: ${groupId}`);
            console.log(`Projects: ${JSON.stringify(projects)}`);

            console.log('Deleting existing relationships...');
            // Xóa tất cả các mối quan hệ hiện tại giữa nhóm và các dự án
            await GroupProject.destroy({
                where: { labGroupId: groupId }
            });

            console.log('Creating new relationships...');
            // Thêm các mối quan hệ mới dựa trên danh sách project ID
            for (const projectId of projects) {
                const projectIdInt = parseInt(projectId, 10); // Chuyển đổi projectId thành số nguyên
                console.log(`Creating relationship for project ID: ${projectIdInt}`);
                await GroupProject.create({
                    labGroupId: groupId,
                    projectId: projectIdInt
                });
            }

            console.log('Operations completed successfully.');
            res.redirect('/');
        } catch (error) {
            console.error('Operation failed:', error);
            next(error);
        }
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
                const isAdmin = req.session.student.isAdmin
                if (!group) {
                    return res.status(404).send('ĐI LẠC R');
                }
                if (isAdmin) {
                    res.render('./groups/details', { admin: true, student: req.session.student, group: sequelizeToObject(group), });

                } else {
                    res.render('./groups/details', { admin: false, student: req.session.student, group: sequelizeToObject(group), });
                }

            })
            .catch(err => {
                console.error('Lỗi khi tìm kiếm khóa học:', err);
                next(err);
            });

    }
}
module.exports = new GroupsController()

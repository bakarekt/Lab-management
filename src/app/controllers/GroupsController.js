const Group = require('../models/groupModel');
const Student = require('../models/studentModel');
const Project = require('../models/projectModel');
const GroupProject = require('../models/groupProjectModel');
const {
    mutipleSequelizeToObject,
    sequelizeToObject,
} = require('../../util/mysql');

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
                include: [
                    {
                        model: Group,
                        through: { attributes: [] }, // Loại bỏ các cột trung gian từ bảng group_project
                    },
                ],
            }),
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
            .catch((err) => {
                console.error('Lỗi khi tìm kiếm khóa học:', err);
                next(err);
            });
    }

    // PUT method students/:id
    async submit(req, res, next) {
        try {
            const groupId = parseInt(req.params.id, 10);
            const { name, description, projects } = req.body;

            if (
                isNaN(groupId) ||
                !name ||
                !description ||
                !Array.isArray(projects)
            ) {
                throw new Error('Invalid input data');
            }

            // Cập nhật thông tin của group
            await Group.update(
                { name, description },
                { where: { id: groupId } },
            );

            // Xóa tất cả các mối quan hệ hiện tại giữa nhóm và các dự án
            await GroupProject.destroy({
                where: { labGroupId: groupId },
            });

            // Thêm các mối quan hệ mới dựa trên danh sách project ID
            for (const projectId of projects) {
                const projectIdInt = parseInt(projectId, 10); // Chuyển đổi projectId thành số nguyên

                await GroupProject.create({
                    labGroupId: groupId,
                    projectId: projectIdInt,
                });
            }

            res.redirect('/');
        } catch (error) {
            console.error('Operation failed:', error);
            next(error);
        }
    }

    // DELETE method students/:id
    destroy(req, res, next) {
        const groupId = req.params.id;
        // Xóa các bản ghi liên quan trong bảng group_projects
        GroupProject.destroy({ where: { labGroupId: groupId } })
            .then(() => {
                // Sau khi xóa các bản ghi liên quan, xóa group
                return Group.destroy({ where: { id: groupId } });
            })
            .then(() => {
                // Redirect sau khi xóa thành công
                res.redirect('back');
            })
            .catch((error) => {
                // Xử lý lỗi nếu có
                console.error(
                    'Error deleting Group and related group projects:',
                    error,
                );
                next(error);
            });
    }
    // GET method students/create
    create(req, res, next) {
        res.render('./groups/create');
    }
    save(req, res, next) {
        Group.create(req.body)
            .then(() => res.redirect('/'))
            .catch(next);
    }
    // GET method students/details/:id
    details(req, res, next) {
        const groupId = req.params.id;

        // Find the group by its primary key
        const findGroup = Group.findByPk(groupId);

        // Find all students related to the group
        const findStudents = Student.findAll({
            where: { labGroupId: groupId }
        });

        Promise.all([findGroup, findStudents])
            .then(([group, students]) => {
                if (!group) {
                    return res.status(404).send('ĐI LẠC R');
                }
                res.render('./groups/details', {
              
                    group: sequelizeToObject(group),
                    students: students.map(student => sequelizeToObject(student))
                });
            })
            .catch((err) => {
                console.error('Lỗi khi tìm kiếm khóa học:', err);
                next(err);
            });
    }
}
module.exports = new GroupsController();

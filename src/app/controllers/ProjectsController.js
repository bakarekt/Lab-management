const Group = require('../models/groupModel');
const Project = require('../models/projectModel');
const GroupProject = require('../models/groupProjectModel');

const {
    mutipleSequelizeToObject,
    sequelizeToObject,
} = require('../../util/mysql');
const { sequelize } = require('../../config/database');

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
            .then((project) => {
                if (!project) {
                    return res.status(404).send('ĐI LẠC R');
                }
                // Chuyển đổi đối tượng Group và các liên kết của nó
                const projectObject = sequelizeToObject(project);
                projectObject.projects = mutipleSequelizeToObject(
                    project.lab_groups,
                );
                res.render('./projects/edit', {
                    project: projectObject,
                });
                // res.json(group)
                // console.log(group)
            })
            .catch((err) => {
                console.error('Lỗi khi tìm kiếm khóa học:', err);
                next(err);
            });
    }
    // PUT method students/:id
    submit(req, res, next) {
        if (req.file) {
            req.body.image = req.file.filename; // Sử dụng file đã tải lên nếu có
        }
        sequelize.transaction(async (t) => {
            try {
                const projectId = req.params.id;
                const { name, description, image, lab_groups } = req.body;
                // Cập nhật thông tin của group
                if (req.body.image === 'default_student.png' && student.image !== 'default_student.png') {
                    // Nếu req.body.image là mặc định nhưng sinh viên có ảnh từ trước, giữ nguyên ảnh cũ
                    req.body.image = student.image;
                }
                await Project.update(
                    { name, description, image },
                    { where: { id: projectId }, transaction: t },
                );

                // Cập nhật thông tin của projects
                if (Array.isArray(lab_groups)) {
                    for (const lab_group of lab_groups) {
                        await Group.update(
                            { name: lab_group.name },
                            { where: { id: lab_group.id }, transaction: t },
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
        const projectId = req.params.id;

        // Xóa các bản ghi liên quan trong bảng group_projects
        GroupProject.destroy({ where: { projectId } })
            .then(() => {
                // Sau khi xóa các bản ghi liên quan, xóa project
                return Project.destroy({ where: { id: projectId } });
            })
            .then(() => {
                // Redirect sau khi xóa thành công
                res.redirect('back');
            })
            .catch((error) => {
                // Xử lý lỗi nếu có
                console.error(
                    'Error deleting project and related group projects:',
                    error,
                );
                next(error);
            });
    }
    // GET method students/create
    create(req, res, next) {
        res.render('./projects/create');
    }
    save(req, res, next) {
        if (!req.file) {
            req.body.image = 'default_project.png'
        }else{
            req.body.image = req.file.filename
        }
        Project.create(req.body)
            .then(() => res.redirect('/'))
            .catch(next);
    }
    details(req, res, next) {
        const projectId = req.params.id;
    
        // Tìm dự án theo khóa chính của nó
        const findProject = Project.findByPk(projectId);
    
        // Tìm tất cả các liên kết nhóm-dự án liên quan đến dự án
        const findGroupProjects = GroupProject.findAll({
            where: { projectId: projectId }
        });
    
        Promise.all([findProject, findGroupProjects])
            .then(([project, groupProjects]) => {
                if (!project) {
                    return res.status(404).send('Không tìm thấy dự án');
                }
    
                // Lấy danh sách các ID nhóm từ các liên kết nhóm-dự án
                const groupIds = groupProjects.map(gp => gp.labGroupId);
    
                // Tìm tất cả các nhóm tham gia vào dự án
                return Promise.all([
                    project,
                    Group.findAll({
                        where: { id: groupIds }
                    })
                ]);
            })
            .then(([project, groups]) => {
                res.render('./projects/details', {
                    project: sequelizeToObject(project),
                    groups: groups.map(group => sequelizeToObject(group))
                });
            })
            .catch((err) => {
                console.error('Lỗi khi tìm kiếm dự án hoặc nhóm:', err);
                next(err);
            });
    }
    
}

module.exports = new ProjectsController();

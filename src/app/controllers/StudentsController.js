const Student = require('../models/studentModel');
const { mutipleSequelizeToObject, sequelizeToObject } = require('../../util/mysql');
const { sequelize } = require('../../config/database')

class StudentsController {
    // GET method students/:id/edit
    edit(req, res, next) {
        Student.findByPk(req.params.id)
            .then(student => {
                if (!student) {
                    return res.status(404).send('ĐI LẠC R');
                }
                res.render('./students/edit', {
                    student: sequelizeToObject(student),
                });
            })
            .catch(err => {
                console.error('Lỗi khi tìm kiếm khóa học:', err);
                next(err);
            });
    }
    // PUT method students/:id
    submit(req, res, next) {
        Student.update(req.body, { where: { id: req.params.id }})
            // .then(() => res.json(req.body))
            .then(() => res.redirect('/'))
            .catch(next)
    }
    // DELETE method students/:id
    destroy(req, res, next) {
        Student.destroy({where: {id: req.params.id } })
            .then(() => res.redirect('back'))
            .catch(next)
    }

    // GET method students/create
    create(req, res, next) {
        res.render('./students/create')
    }
    save(req, res, next) {
        Student.create(req.body)
            .then(() => res.redirect('/'))
            .catch(next)
    
    }
    // GET method students/details/:id
    details(req, res, next) {
        Student.findByPk(req.params.id)
        .then(student => {
            if (!student) {
                return res.status(404).send('ĐI LẠC R');
            }
            if (req.params.isAdmin) {
                res.render('./students/details', { admin: true, student: req.session.student, student: sequelizeToObject(student), });

            } else {
                res.render('./students/details', { admin: false, student: req.session.student, student: sequelizeToObject(student), });
            }
        })
        .catch(err => {
            console.error('Lỗi khi tìm kiếm khóa học:', err);
            next(err);
        });
    }
}

module.exports = new StudentsController()

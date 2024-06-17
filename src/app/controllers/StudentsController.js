const Student = require('../models/studentModel');


class StudentsController {
    // GET method students/:id/edit
    edit(req, res, next) {
        Student.getById(req.params.id, (err, student) => {
            if (err) return res.status(500).send('Lỗi lấy sinh viên')
                if (!student) {
                    return res.status(404).send('Không tìm thấy sinh viên');
                }
            res.render('./students/edit', {student})
           
        })

    }
    // PUT method students/:id
    submit(req, res, next){
        res.send('saved!!')
    }

}

module.exports = new StudentsController()

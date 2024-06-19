const Student = require('../models/studentModel');

class AuthController {
    // Hiển thị form đăng nhập
    showLoginForm(req, res) {
        res.render('auth/login', { layout: 'main' });
    }

    // Xử lý đăng nhập
    async login(req, res) {
        const { email, mssv } = req.body;

        try {
            const student = await Student.findOne({ where: { email } });

            if (student && student.mssv === mssv) {
                req.session.student = {
                    id: student.id,
                    name: student.name,
                    email: student.email,
                    labGroupId: student.labGroupId,
                    mssv: student.mssv,
                    description: student.description,
                    phoneNumber: student.phoneNumber,
                    image: student.image,
                    isAdmin: student.isAdmin,
                };

                return res.redirect('/');
            } else {
                res.render('auth/login', {
                    layout: 'main',
                    error: 'Email hoặc MSSV không đúng',
                });
            }
        } catch (error) {
            res.render('auth/login', {
                layout: 'main',
                error: 'Đã có lỗi xảy ra',
            });
        }
    }

    // Xử lý đăng xuất
    logout(req, res) {
        req.session.destroy();
        res.redirect('/auth/login');
    }
}

module.exports = new AuthController();

const multer = require('multer');
const path = require('path');

// Cấu hình multer để lưu trữ file
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'src/public/img/students/'); // Thư mục lưu trữ file upload
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Đổi tên file thành thời gian hiện tại + phần mở rộng file gốc
    }
});

const upload = multer({ storage: storage });

module.exports = upload;

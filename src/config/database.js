// config/database.js
const { Sequelize } = require('sequelize');

// Khởi tạo kết nối đến cơ sở dữ liệu MySQL
const sequelize = new Sequelize('management-lab-dev', 'root', '102112', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false,
});

// Test kết nối
async function testConnection() {
    try {
        await sequelize.authenticate();
        console.log('Kết nối MySQL đã thiết lập thành công.');
    } catch (error) {
        console.error('Không thể kết nối đến MySQL:', error);
    }
}
testConnection();
// Xuất đối tượng kết nối Sequelize để sử dụng trong các module khác
module.exports = {
    sequelize,
    testConnection,
};

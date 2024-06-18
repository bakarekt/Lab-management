const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../../config/database'); 

class Student extends Model {}

Student.init({
  name: {type: DataTypes.STRING(100), },
  email: {type: DataTypes.STRING(100), unique: true},
  // lab_group_id: {type: DataTypes.INTEGER, unique: true},
  mssv: {type: DataTypes.STRING(255), unique: true},
  description: {type: DataTypes.STRING(255), unique: true},
  image: {type: DataTypes.STRING(255), unique: true},
  phoneNumber: {type: DataTypes.STRING(255), unique: true},
  createdAt: {type: DataTypes.DATE,defaultValue: DataTypes.NOW },
  updatedAt: {type: DataTypes.DATE,defaultValue: DataTypes.NOW }
}, {
  sequelize,
  modelName: 'student'
});


module.exports = Student;
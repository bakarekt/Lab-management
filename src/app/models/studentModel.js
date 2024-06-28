const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../../config/database');

class Student extends Model {}

Student.init(
    {
        name: { type: DataTypes.STRING(100) },
        email: { type: DataTypes.STRING(100), unique: true },
        mssv: { type: DataTypes.STRING(255), unique: true },
        description: { type: DataTypes.TEXT, unique: true },
        image: { type: DataTypes.STRING(255), unique: true },
        isAdmin: { type: DataTypes.STRING(255) },
        phoneNumber: { type: DataTypes.STRING(255), unique: true },
        createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
        updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    },
    {
        sequelize,
        modelName: 'student',
    },
);

module.exports = Student;

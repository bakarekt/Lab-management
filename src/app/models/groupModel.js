const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../../config/database');
const Student = require('./studentModel');
const Project = require('./projectModel');
const Group_Project = require('./groupProjectModel');
class Group extends Model {}

Group.init(
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
        },
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
        updatedAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
    },
    {
        sequelize,
        modelName: 'lab_groups',
    },
);

Group.Student = Group.hasMany(Student);
Student.Group = Student.belongsTo(Group);

Group.belongsToMany(Project, { through: Group_Project });
Project.belongsToMany(Group, { through: Group_Project });
module.exports = Group;

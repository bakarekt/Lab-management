const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/database');

const GroupProject = sequelize.define(
    'GroupProject',
    {
        labGroupId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
        },
        projectId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
        },
    },
    {
        timestamps: false,
        tableName: 'group_projects',
    },
);

module.exports = GroupProject;

const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../../config/database');

class Project extends Model {}

Project.init(
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
        image: {
            type: DataTypes.STRING,
        },
    },
    {
        sequelize,
        modelName: 'projects',
    },
);

module.exports = Project;

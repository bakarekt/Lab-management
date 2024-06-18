// const { DataTypes, Model } = require('sequelize');

// class GroupProject extends Model {
//   static init(sequelize) {
//     return super.init({
//       labGroupId: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//         primaryKey: true,
//       },
//       projectId: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//         primaryKey: true,
//       },
//     }, {
//       sequelize,
//       modelName: 'group_project',
//       timestamps: false, // Bỏ qua các cột createdAt và updatedAt
//     });
//   }
// }

// module.exports = GroupProject;
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');
const GroupProject = sequelize.define('group_projects', {
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
}, { timestamps: false });
module.exports = GroupProject;


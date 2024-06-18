const Student = require('../models/studentModel');
const Group = require('../models/groupModel');
const Project = require('../models/projectModel');
const { mutipleSequelizeToObject } = require('../../util/mysql');

class SiteController {

  async index(req, res, next) {
    try {
      const studentsData = await Student.findAll();
      const groupsData = await Group.findAll({
        include: [{
          model: Student,
          as: 'students',
        }, {
          model: Project,
          through: { attributes: [] }, // Loại bỏ các cột trung gian từ bảng group_project
        }],
      });

      const projectsData = await Project.findAll(
        {
          include: [{
            model: Group,
            through: { attributes: [] }, // Loại bỏ các cột trung gian từ bảng group_project
          }],
        }
      );

      const students = mutipleSequelizeToObject(studentsData); // chuyển đổi không phải object -> object
      const groups = mutipleSequelizeToObject(groupsData);
      const projects = mutipleSequelizeToObject(projectsData);
      // res.json(groups)
      //  console.log(groups)
      res.render('home', { students, groups, projects });
    } catch (err) {
      console.error('Error retrieving data:', err);
      res.status(500).send('Error retrieving data');
    }
  }
  // async index(req, res, next) {
  //   try {
  //     const studentsData = await Student.findAll();
  //     const groupsData = await Group.findAll({
  //       include: [{
  //         model: Student,
  //         as: 'students',
  //       }, ],
  //     });
  //     const projectsData = await Project.findAll();

  //     const students = mutipleSequelizeToObject(studentsData); // chuyển đổi không phải object -> object
  //     const groups = mutipleSequelizeToObject(groupsData);
  //     const projects = mutipleSequelizeToObject(projectsData);

  //     res.render('home', { students, groups, projects });
  //   } catch (err) {
  //     console.error('Error retrieving data:', err);
  //     res.status(500).send('Error retrieving data');
  //   }
  // }
}
module.exports = new SiteController()
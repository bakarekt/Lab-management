const Student = require('../models/studentModel');
const Group = require('../models/groupModel');
const Project = require('../models/projectModel');
class SiteController {
    index(req, res, next) {
        // Student.getAll((err, students) => {
        //     if (err) {
        //         return res.status(500).send('Error retrieving students');
        //     }
        //     Group.getAll((err, groups) => {
        //         if (err) {
        //             return res.status(500).send('Error retrieving groups');
        //         }
        //         Project.getAll((err, projects) => {
        //             if (err) {
        //                 return res.status(500).send('Error retrieving projects');
        //             }
        //             res.render('home', { students, groups, projects });
        //         });
        //     });
        // });
        Student.getAll((err, students) => {
            if (err) {
                return res.status(500).send('Error retrieving students');
            }
            
                    res.render('home', { students });
            
         
        });
    }


}
module.exports = new SiteController()
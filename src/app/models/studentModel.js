const db = require('../../config/database.js');
const { getAll, getById } = require('../../util/mysql');

class Student {
  static getAll(callback) {
    getAll('students', callback);
  }

  static getById(id, callback) {
    getById('students', id, callback);
  }

 
}

module.exports = Student;

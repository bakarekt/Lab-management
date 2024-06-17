const db = require('../../config/database.js');
const { getAll, getById } = require('../../util/mysql');

class Project {
  static getAll(callback) {
      getAll('projects', callback);
  }

  static getById(id, callback) {
      getById('projects', id, callback);
  }
}

module.exports = Project;

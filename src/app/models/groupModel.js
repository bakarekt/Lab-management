const db = require('../../config/database.js');
const { getAll, getById } = require('../../util/mysql');

class Group {
  static getAll(callback) {
      getAll('lab_groups', callback);
  }

  static getById(id, callback) {
      getById('lab_groups', id, callback);
  }
}
module.exports = Group;

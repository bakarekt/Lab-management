const db = require('../config/database'); // Import database connection

const Student = {
    getAll: function (tableName, callback) {
        const query = `SELECT * FROM ??`;
        db.query(query, [tableName], callback);
    },

    getById: function (tableName, id, callback) {
        const query = `SELECT * FROM ?? WHERE id = ?`;
        db.query(query, [tableName, id], (err, results) => {
            if (err) {
                return callback(err, null);
            }
            if (results.length === 0) {
                // Handle case where no student found with the given id
                return callback(new Error('Student not found'), null);
            }
            // Assuming only one student is expected with this id, return the first result
            callback(null, results[0]);
        });
    }
};

module.exports = Student;

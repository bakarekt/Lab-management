const sequelize = require('sequelize');

module.exports = {
    mutipleSequelizeToObject: function (sequelizes) {
        return sequelizes.map((sequelize) => sequelize.get({ plain: true }));
    },

    sequelizeToObject: function (sequelize) {
        return sequelize ? sequelize.toJSON() : sequelize;
    },
};

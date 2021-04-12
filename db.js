const Sequelize = require("sequelize");

const sequelize = new Sequelize("postgres://postgres:3cdbe43e9d1d4a4b9a84ad462105c788@localhost:5432/WorkoutLog");

module.exports = sequelize;
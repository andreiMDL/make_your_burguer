const SequelizeAdapter = require("moleculer-db-adapter-sequelize");

const adapter = new SequelizeAdapter("mysql://root:22292254@localhost:3306/make_your_burger");

module.exports = adapter;
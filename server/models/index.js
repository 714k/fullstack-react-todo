const dbConfig = require("../db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: 0,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  },

  define: {
    underscored: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }

});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.todos = require("./Todo.js")(sequelize, Sequelize);

module.exports = db;
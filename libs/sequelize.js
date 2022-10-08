const { Sequelize } = require("sequelize");

const { config } = require("../config/config");
const setupModels = require("../db/models/");

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

const sequelize = new Sequelize(URI, {
  dialect: "postgres" /* logging: true */
}); // Se crea una instancia de Sequelize, ya gestiona el pooling.

setupModels(sequelize);
//sequelize.sync(); No es una buena práctica, mejor implementar migraciones.

module.exports = sequelize;

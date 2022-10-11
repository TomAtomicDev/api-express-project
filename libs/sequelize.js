const { Sequelize } = require("sequelize");

const { config } = require("../config/config");
const setupModels = require("../db/models/");

const options = {
  dialect: "postgres"
};

if (config.isProd) {
  options.dialectOptions = {
    ssl: {
      rejectUnauthorized: false
    }
  };
}

const sequelize = new Sequelize(config.dbUrl, options);
setupModels(sequelize);
//sequelize.sync(); No es una buena práctica, mejor implementar migraciones.

module.exports = sequelize;

const { Model, DataTypes, Sequelize } = require("sequelize");
const bcrypt = require("bcrypt");
const USER_TABLE = "users"; // nombre de la tabla

const UserSchema = {
  // El esquema define la estructura de la BD.
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  email: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true
  },
  password: {
    allowNull: false,
    type: DataTypes.STRING
  },
  role: {
    allowNull: false,
    type: DataTypes.STRING,
    defaultValue: "customer"
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: "created_at",
    defaultValue: Sequelize.NOW
  },
  recoveryToken: {
    field: "recovery_token",
    allowNull: true,
    type: DataTypes.STRING
  }
};

class User extends Model {
  static associate(models) {
    this.hasOne(models.Customer, {
      as: "customer",
      foreignKey: "userId"
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: USER_TABLE,
      modelName: "User",
      timestamps: false,
      hooks: {
        beforeCreate: async (user, options) => {
          const password = await bcrypt.hash(user.password, 10);
          user.password = password;
        },
        beforeUpdate: async (user, options) => {
          const password = await bcrypt.hash(user.password, 10);
          user.password = password;
        }
      }
    };
  }
}

module.exports = { USER_TABLE, UserSchema, User };

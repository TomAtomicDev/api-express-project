//Obtained from nico repo
const boom = require("@hapi/boom");

const { models } = require("../libs/sequelize");

class UserService {
  constructor() {}

  async create(data) {
    const newUser = await models.User.create(data);
    delete newUser.dataValues.password;
    return newUser;
  }

  async find() {
    const rta = await models.User.findAll({
      include: ["customer"]
    });
    return rta;
  }

  async findOne(id) {
    const user = await models.User.findByPk(id);
    if (!user) {
      throw boom.notFound("Sorry, user not found.");
    }
    return user;
  }

  async findByEmail(email) {
    const rta = await models.User.findOne({
      where: { email: email }
    });
    return rta;
  }

  async update(id, changes) {
    const user = await this.findOne(id);
    const rta = await user.update(changes);
    return rta;
  }

  async delete(id) {
    const user = await this.findOne(id);
    await user.destroy();
    return {
      id,
      message: "Se ha eliminado el user"
    };
  }
}

module.exports = UserService;

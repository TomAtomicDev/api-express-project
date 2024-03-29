const boom = require("@hapi/boom");
const { models } = require("../libs/sequelize");

class CustomerService {
  constructor() {}

  async find() {
    const rta = await models.Customer.findAll({
      include: ["user"]
    });
    return rta;
  }

  async findByUser(userId) {
    const customer = await models.Customer.findOne({
      where: { userId: userId }
    });
    if (!customer) {
      throw boom.notFound("Sorry, user not found");
    }
    return customer;
  }

  async findOne(id) {
    const customer = await models.Customer.findByPk(id);
    if (!customer) {
      throw boom.notFound("Sorry, customer not found");
    }
    return customer;
  }

  async create(data) {
    const newCustomer = await models.Customer.create(data, {
      include: ["user"]
    });
    delete newCustomer.user.dataValues.password;
    return newCustomer;
  }

  async update(id, changes) {
    const model = await this.findOne(id);
    const rta = await model.update(changes);
    return rta;
  }

  async delete(id) {
    const model = await this.findOne(id);
    await model.destroy();
    return { rta: true };
  }
}

module.exports = CustomerService;

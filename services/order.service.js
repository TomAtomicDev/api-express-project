const boom = require("@hapi/boom");

const { models } = require("./../libs/sequelize");
const ProductsService = require("./../services/product.service");

const productService = new ProductsService();

class OrderService {
  constructor() {}

  async create(data) {
    const newOrder = await models.Order.create(data);
    return newOrder;
  }

  async addItem(data) {
    const product = await productService.findOne(data.productId);

    if (!product) {
      throw boom.notFound("Sorry, this product does not exist.");
    } else {
      const newItem = await models.OrderProduct.create(data);
      return newItem;
    }
  }

  async find() {
    const allOrders = await models.Order.findAll({
      include: ["customer", "products"]
    });
    return allOrders;
  }

  async findOne(id) {
    const order = await models.Order.findByPk(id, {
      include: [
        {
          association: "customer",
          include: ["user"]
        },
        "products"
      ]
    });
    return order;
  }

  async findByUser(userId) {
    const orders = await models.Order.findAll({
      where: {
        "$customer.user.id$": userId
      },
      include: [
        {
          association: "customer",
          include: ["user"]
        }
      ]
    });
    return orders;
  }

  async update(id, changes) {
    return {
      id,
      changes
    };
  }

  async delete(id) {
    return { id };
  }
}

module.exports = OrderService;

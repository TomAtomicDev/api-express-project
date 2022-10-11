const { models } = require("../libs/sequelize");
const { Op } = require("sequelize");
const faker = require("faker");
faker.locale = "es";
const boom = require("@hapi/boom");

class ProductsService {
  constructor() {
    //this.generate();
  }

  /*   generate() {
    for (let index = 0; index < 100; index++) {
      this.products.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        image: faker.image.imageUrl(),
        isBlock: faker.datatype.boolean()
      });
    }
  } */

  async create(data) {
    const newProduct = await models.Product.create(data);
    return newProduct;
  }

  async find(query) {
    const optionsDefault = {
      include: ["category"],
      where: {}
    };

    const { limit, offset } = query;
    if (limit && offset) {
      optionsDefault.limit = limit;
      optionsDefault.offset = offset;
    }

    const { price, price_max, price_min } = query;
    if (price) {
      optionsDefault.where.price = price;
    }
    if (price_max && price_min) {
      optionsDefault.where.price = {
        [Op.between]: [price_min, price_max]
      };
    }

    const allProducts = await models.Product.findAll(optionsDefault);
    return allProducts;
  }

  async findOne(id) {
    const product = await models.Product.findByPk(id);
    if (!product) {
      throw boom.notFound("Product not found");
    }
    if (product.isBlock) {
      throw boom.conflict("El producto está bloqueado (409)");
    }
    return product;
  }

  async update(id, changes) {
    const product = await this.findOne(id);
    const modifiedProduct = await product.update(changes);
    return modifiedProduct;
  }

  async delete(id) {
    const product = await this.findOne(id);
    await product.destroy();

    return {
      id,
      message: "Se ha eliminado el objeto"
    };
  }
}

module.exports = ProductsService;

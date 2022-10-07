const sequelize = require("../libs/sequelize");
const faker = require("faker");
faker.locale = "es";
const boom = require("@hapi/boom");

class ProductsService {
  constructor() {
    this.products = []; //Deberíamos conectarnos a una DB externa pero por ahora usaremos la memoria.
    this.generate();
  }

  generate() {
    for (let index = 0; index < 100; index++) {
      this.products.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        image: faker.image.imageUrl(),
        isBlock: faker.datatype.boolean()
      });
    }
  }

  async create(data) {
    console.log("La data recibida para crear es..");
    console.log(data);
    const newProduct = {
      id: faker.datatype.uuid(),
      ...data //Aquí usamos el split operation para concatenar los valores de data
    };
    this.products.push(newProduct);
    return newProduct;
  }

  async find() {
    /* return new Promise ((resolve, reject)=>{
      setTimeout(()=>{
        resolve (this.products);// Estamos devolviendo el array que ya se creó en generate()
      },450)
    }) */
    const query = "SELECT * FROM tasks";
    const [data, metadata] = await sequelize.query(query);
    return data;
  }

  async findOne(id) {
    const product = this.products.find((item) => item.id === id); // acá usamos el método FIND de los arrays
    if (!product) {
      throw boom.notFound("Product not found");
    }
    if (product.isBlock) {
      throw boom.conflict("El producto está bloqueado (409)");
    }
    return product;
  }

  async update(id, changes) {
    const index = this.products.findIndex((item) => item.id === id);
    if (index === -1) {
      throw boom.notFound("Product not found");
    }
    const product = this.products[index];
    this.products[index] = {
      ...product,
      ...changes //hacemos esto para que la demás info no cambie
    };
    return this.products[index];
  }

  async delete(id) {
    const index = this.products.findIndex((item) => item.id === id);
    if (index === -1) {
      throw boom.notFound("Product not found");
    }
    this.products.slice(index, 1);

    return { message: "Se ha eliminado el objeto", id };
  }
}

module.exports = ProductsService;

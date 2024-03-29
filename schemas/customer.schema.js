const Joi = require("joi");
const { createUserSchema, updateUserSchema } = require("./user.schema");

const id = Joi.number().integer();
const name = Joi.string().min(3).max(30);
const lastName = Joi.string().max(30);
const phone = Joi.string();

const createCustomerSchema = Joi.object({
  name: name.required(),
  lastName: lastName.required(),
  phone: phone.required(),
  user: createUserSchema
});

const updateCustomerSchema = Joi.object({
  name: name,
  lastName: lastName,
  phone: phone,
  user: updateUserSchema
});

const getCustomerSchema = Joi.object({
  id: id.required()
});

module.exports = {
  createCustomerSchema,
  updateCustomerSchema,
  getCustomerSchema
};

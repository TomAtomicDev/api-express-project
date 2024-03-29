const express = require("express");
const passport = require("passport");

const OrderService = require("../services/order.service");
const CustomerService = require("./../services/customer.service");
const validatorHandler = require("../middlewares/validator.handler");
const {
  getOrderSchema,
  createOrderSchema,
  addItemSchema
} = require("../schemas/order.schema");

const router = express.Router();
const service = new OrderService();
const serviceCustomer = new CustomerService();

router.get("/", async (req, res, next) => {
  try {
    const orders = await service.find();
    res.json(orders);
  } catch (error) {
    next(error);
  }
});

router.get(
  "/:id",
  validatorHandler(getOrderSchema, "params"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const order = await service.findOne(id);
      res.json(order);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  validatorHandler(createOrderSchema, "body"),
  async (req, res, next) => {
    try {
      const customer = await serviceCustomer.findByUser(req.user.sub);
      const body = req.body;
      const newOrder = await service.create({
        ...body,
        customerId: customer.id
      });
      res.status(201).json({ newOrder });
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/add-item",
  validatorHandler(addItemSchema, "body"),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newItem = await service.addItem(body);
      res.status(201).json(newItem);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;

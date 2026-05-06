const express = require("express");
const controller = require("../controllers/customer.controller");

const router = express.Router();

router.get("/", controller.getAllCustomers);
router.get("/:id", controller.getCustomerById);
router.post("/", controller.createCustomer);
router.put("/:id", controller.updateCustomer);
router.delete("/:id", controller.deleteCustomer);

module.exports = router;

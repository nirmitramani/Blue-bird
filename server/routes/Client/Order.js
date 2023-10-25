const express = require("express");
const router = express.Router();
const OrderController = require("../../controllers/Client/OrderController");

// Apply the middleware to protect these routes
router.get("/count", OrderController.counts);
router.get("/", OrderController.index);
router.post("/", OrderController.store);
router.get("/:id", OrderController.show);
router.put("/status/:id", OrderController.statusChnage);
router.delete("/:id", OrderController.delete);

module.exports = router;

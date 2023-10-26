const express = require("express");
const router = express.Router();
const ProductStockAndSizeController = require("../../controllers/Admin/ProductStockAndSizeController");

// Apply the middleware to protect these routes
router.get("/count", ProductStockAndSizeController.counts);
router.get("/", ProductStockAndSizeController.index);
router.post("/", ProductStockAndSizeController.store);
router.get("/:id", ProductStockAndSizeController.show);
router.put("/:id", ProductStockAndSizeController.update);
router.put("/status/:id", ProductStockAndSizeController.statusChnage);
router.delete("/:id", ProductStockAndSizeController.delete);

module.exports = router;

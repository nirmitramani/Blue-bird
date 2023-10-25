const express = require("express");
const router = express.Router();
const EventsController = require("../../controllers/Admin/EventsController");
const UploadImage = require("../../middleware/UploadImage");

const eventImageUpload = UploadImage('events/');

// Apply the middleware to protect these routes
router.post("/reorder", EventsController.reorder);
router.get("/count", EventsController.counts);
router.get("/", EventsController.index);
router.post("/", eventImageUpload.single('eventimg'), EventsController.store);
router.get("/:id", EventsController.show);
router.put("/:id", eventImageUpload.single('eventimg'), EventsController.update);
router.put("/status/:id", EventsController.statusChnage);
router.delete("/:id", EventsController.delete);

module.exports = router;

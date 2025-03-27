const express = require("express");
const {
  createProperty,
  getProperties,
} = require("../controllers/propertyController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/", protect, createProperty);
router.get("/list", protect, getProperties);

module.exports = router;

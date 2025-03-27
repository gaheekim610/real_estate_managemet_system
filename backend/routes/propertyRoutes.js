const express = require("express");
const {
  createProperty,
  getProperties,
} = require("../controllers/propertyController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.route("/").post(protect, createProperty).get(protect, getProperties);

module.exports = router;

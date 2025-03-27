const express = require("express");
const {
  createProperty,
  getProperties,
  updateProperty,
} = require("../controllers/propertyController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.route("/").post(protect, createProperty).get(protect, getProperties);
router.route("/:id").put(protect, updateProperty);

module.exports = router;

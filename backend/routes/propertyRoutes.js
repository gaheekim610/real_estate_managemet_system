const express = require("express");
const {
  createProperty,
  getProperties,
  updateProperty,
  deleteProperty,
} = require("../controllers/propertyController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.route("/").post(protect, createProperty).get(protect, getProperties);

router
  .route("/:id")
  .put(protect, updateProperty)
  .delete(protect, deleteProperty);

module.exports = router;

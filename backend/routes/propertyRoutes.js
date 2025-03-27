const express = require("express");
const { createProperty } = require("../controllers/propertyController");
// const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/property", createProperty);

module.exports = router;

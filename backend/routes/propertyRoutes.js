const express = require("express");
const {
  createProperty,
  propertyList,
  updateUserProfile,
  deleteProperty,
} = require("../controllers/authController");
// const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/property", createProperty);
router.get("/propertyList", propertyList);
router.get("/deleteProperty", deleteProperty);
router.put("/updateproperty", updateUserProfile);

module.exports = router;

const mongoose = require("mongoose");

const PropertySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId },
  title: String,
  description: String,
  image: String,
});

module.exports = mongoose.model("Property", PropertySchema);

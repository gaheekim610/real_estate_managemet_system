const mongoose = require("mongoose");

const PropertySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, required: true },
  title: { type: String, required: true },
  description: { type: String },
  image: { type: String },
});

module.exports = mongoose.model("Property", PropertySchema);

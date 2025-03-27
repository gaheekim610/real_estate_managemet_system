const mongoose = require("mongoose");

const PropertySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, require: true },
  title: { type: String },
  description: { type: String },
  image: { type: String },
});

module.exports = mongoose.model("Property", PropertySchema);

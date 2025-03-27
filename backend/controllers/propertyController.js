const User = require("../models/User");
const Property = require("../models/Property");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

const createProperty = async (req, res) => {
  const currentUser = await User.findById(req.user.id);

  if (!currentUser || currentUser.role !== "agent") {
    return res
      .status(403)
      .json({ message: "Only agents can create property posting" });
  }
  const { title, description, image } = req.body;

  try {
    const property = await Property.create({
      title,
      description,
      image,
      user: req.user.id,
    });

    res.status(201).json({
      title,
      description,
      image,
      token: generateToken(property.user),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getProperties = async (req, res) => {
  try {
    const properties = await Property.find({ user: req.user.id });
    res.status(200).json(properties);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const updateProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    // ONly the person who write the property can edit it
    if (property.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorised" });
    }
    const { title, description, image } = req.body;

    property.title = title || property.title;
    property.description = description || property.description;
    property.image = image || property.image;

    const updatedProperty = await property.save();
    res.status(200).json(updatedProperty);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createProperty,
  getProperties,
  updateProperty,
};

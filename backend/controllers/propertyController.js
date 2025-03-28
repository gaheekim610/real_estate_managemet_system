const User = require("../models/User");
const Property = require("../models/Property");

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
      user: currentUser._id,
    });

    res.status(201).json(property);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getProperties = async (req, res) => {
  try {
    let properties;

    if (req.user.role === "agent") {
      properties = await Property.find({ user: req.user._id });
    } else {
      properties = await Property.find();
    }

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

const deleteProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    if (property.user.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "Only authorised user can delete" });
    }
    await property.deleteOne();

    res.status(200).json({ message: "Property deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createProperty,
  getProperties,
  updateProperty,
  deleteProperty,
};

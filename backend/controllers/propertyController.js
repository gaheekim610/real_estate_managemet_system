const User = require("../models/User");
const Property = require("../models/Property");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

// Create
const createProperty = async (req, res) => {
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
    // const userExists = await User.findOne({ email });
    // if (userExists)
    //   return res.status(400).json({ message: "User already exists" });

    // const property = await Property.create({
    //   title,
    //   description,
    //   image,
    // });

    // res.status(201).json({
    //   id: user.id,
    //   role: user.role,
    //   token: generateToken(user.id),
    // });
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

// const updateProperty = async (req, res) => {
//   try {
//     const user = await User.findById(req.user.id);
//     if (!user) return res.status(404).json({ message: "User not found" });

//     const { name, email, university, address } = req.body;
//     user.name = name || user.name;
//     user.email = email || user.email;
//     user.university = university || user.university;
//     user.address = address || user.address;

//     const updatedUser = await user.save();
//     res.json({
//       id: updatedUser.id,
//       name: updatedUser.name,
//       email: updatedUser.email,
//       university: updatedUser.university,
//       address: updatedUser.address,
//       token: generateToken(updatedUser.id),
//     });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

module.exports = {
  createProperty,
  getProperties,
  // updateProperty
};

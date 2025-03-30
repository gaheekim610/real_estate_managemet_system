const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const inputValidation = require("../utils/inputValidation");

const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

const registerUser = async (req, res) => {
  const { name, email, password, role, agentname, agentcode } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists)
      return res.status(400).json({ message: "User already exists" });

    const errors = inputValidation(req.body);
    if (errors.length > 0) {
      return res.status(400).json({ message: errors[0] });
    }

    const user = await User.create({
      name,
      email,
      password,
      role,
      agentname,
      agentcode,
    });

    res.status(201).json({
      id: user._id,
      name: user.name,
      email: user.email,
      password: user.password,
      role: user.role,
      agentname: user.agentname,
      agentcode: user.agentcode,
      token: generateToken(user.id, user.role),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      res.status(200).json({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        agentname: user.agentname,
        agentcode: user.agentcode,
        token: generateToken(user.id, user.role),
      });
    } else {
      res.status(400).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      name: user.name,
      email: user.email,
      password: user.password,
      role: user.role,
      agentname: user.agentname,
      agentcode: user.agentcode,
      token: generateToken(user.id),
      id: user.id,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const { name, email, agentname, agentcode } = req.body;
    user.name = name || user.name;
    user.email = email || user.email;
    user.agentname = agentname || user.agentname;
    user.agentcode = agentcode || user.agentcode;

    const updatedUser = await user.save();
    res.json({
      id: updatedUser.id,
      email: user.email,
      agentname: user.agentname,
      agentcode: user.agentcode,
      token: generateToken(user.id),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { registerUser, loginUser, updateUserProfile, getProfile };

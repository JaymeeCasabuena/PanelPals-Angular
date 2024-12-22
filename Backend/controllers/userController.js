const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const userController = {
  registerUser: async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ error: "All fields are required." });
    }

    try {
      const result = await userModel.registerUser(username, email, password);
      res
        .status(201)
        .json({ message: "User registered successfully.", data: result });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  loginUser: async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ error: "Email and password are required." });
    }

    try {
      const result = await userModel.loginUser(email, password);
      res.status(200).json({
        message: "User logged in successfully.",
        token: result.token,
        user: result.user,
      });
    } catch (err) {
      res.status(401).json({ error: err.message });
    }
  },

  getCurrentUser: async (req, res) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res
        .status(401)
        .json({ error: "Authorization token is required." });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      const userId = decoded.userId;
      const user = await userModel.getUserById(userId);
      res.status(200).json({
        message: "Current user retrieved successfully.",
        data: user,
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  deleteUser: async (req, res) => {
    const userId = req.params.id;

    try {
      const result = await userModel.deleteUser(userId);
      res.status(200).json({ message: result.message });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  editUserDetails: async (req, res) => {
    const userId = req.params.id;
    const updateData = req.body;

    try {
      const result = await userModel.editUserDetails(userId, updateData);
      res.status(200).json({ message: result.message });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  getUserById: async (req, res) => {
    const userId = req.params.id;
    if (!userId) {
      return res.status(400).json({ error: "User ID is required." });
    }

    try {
      const user = await userModel.getUserById(userId);
      res
        .status(200)
        .json({ message: "User retrieved successfully.", data: user });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};

module.exports = userController;

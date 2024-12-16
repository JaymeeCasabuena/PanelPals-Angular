const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const userController = {
  // Controller function to handle user registration
  registerUser: (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ error: "All fields are required." });
    }

    userModel.registerUser(username, email, password, (err, result) => {
      if (err) {
        return res.status(500).json({ error: err });
      }
      res
        .status(201)
        .json({ message: "User registered successfully.", data: result });
    });
  },

  // Controller function to handle user login
  loginUser: (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ error: "Email and password are required." });
    }

    userModel.loginUser(email, password, (err, result) => {
      if (err) {
        return res.status(401).json({ error: err });
      }
      res.status(200).json({
        message: "User logged in successfully.",
        token: result.token,
        user: result.user,
      });
    });
  },

  getCurrentUser: (req, res) => {
    console.log("HEY");
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res
        .status(401)
        .json({ error: "Authorization token is required." });
    }

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
      if (err) {
        console.error("Token verification error:", err); // Log the token verification error
        return res.status(401).json({ error: "Invalid or expired token." });
      }

      const userId = decoded.userId;

      console.log("Decoded userId:", userId); // Log the decoded user ID

      userModel.getUserById(userId, (err, user) => {
        if (err) {
          console.error("Database query error:", err); // Log any database error
          return res.status(500).json({ error: err });
        }

        if (!user) {
          return res.status(404).json({ error: "User not found." });
        }

        res.status(200).json({
          message: "Current user retrieved successfully.",
          data: user,
        });
      });
    });
  },

  // Controller function to handle user deletion
  deleteUser: (req, res) => {
    const userId = req.params.id;

    userModel.deleteUser(userId, (err, result) => {
      if (err) {
        return res.status(500).json({ error: err });
      }
      res.status(200).json({ message: "User deleted successfully." });
    });
  },

  // Controller function to handle editing user details
  editUserDetails: (req, res) => {
    const userId = req.params.id;
    const updateData = req.body;

    userModel.editUserDetails(userId, updateData, (err, result) => {
      if (err) {
        return res.status(500).json({ error: err });
      }
      res.status(200).json({ message: "User updated successfully." });
    });
  },

  getUserById: (req, res) => {
    const userId = req.params.id;
    if (!userId) {
      return res.status(400).json({ error: "User ID is required." });
    }

    userModel.getUserById(userId, (err, user) => {
      if (err) {
        return res.status(500).json({ error: err });
      }
      res
        .status(200)
        .json({ message: "User retrieved successfully.", data: user });
    });
  },
};

module.exports = userController;

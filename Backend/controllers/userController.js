const userModel = require("../models/userModel");

// Controller function to handle user registration
const registerUser = (req, res) => {
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
};

// Controller function to handle user login
const loginUser = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required." });
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
};

// Controller function to handle user deletion
const deleteUser = (req, res) => {
  const userId = req.params.id;

  userModel.deleteUser(userId, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    res.status(200).json({ message: "User deleted successfully." });
  });
};

// Controller function to handle editing user details
const editUserDetails = (req, res) => {
  const userId = req.params.id;
  const updateData = req.body;

  userModel.editUserDetails(userId, updateData, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    res.status(200).json({ message: "User updated successfully." });
  });
};

module.exports = {
  registerUser,
  loginUser,
  deleteUser,
  editUserDetails,
};

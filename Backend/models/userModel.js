const dbHelpers = require("../utils/dbHelper");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const UserModel = {
  registerUser: async (username, email, password) => {
    try {
      const sql = "SELECT * FROM User WHERE Email = ?";
      const user = await dbHelpers.getQuery(sql, [email]);

      if (user) {
        throw new Error("User already exists with this email.");
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const createUserQuery = `INSERT INTO User (Username, Email, Password) VALUES (?, ?, ?)`;
      const result = await dbHelpers.runQuery(createUserQuery, [
        username,
        email,
        hashedPassword,
      ]);

      return { userId: result.lastID };
    } catch (err) {
      throw new Error(err.message);
    }
  },

  loginUser: async (email, password) => {
    try {
      const query = `SELECT * FROM User WHERE Email = ?`;
      const user = await dbHelpers.getQuery(query, [email]);

      if (!user) {
        throw new Error("User not found");
      }

      const isPasswordValid = await bcrypt.compare(password, user.Password);
      if (!isPasswordValid) {
        throw new Error("Incorrect password");
      }

      const token = jwt.sign(
        { userId: user.Id, role: user.Role },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "1h" }
      );

      return { token, user };
    } catch (err) {
      throw new Error(err.message);
    }
  },

  deleteUser: async (userId) => {
    try {
      const query = `DELETE FROM User WHERE Id = ?`;
      await dbHelpers.runQuery(query, [userId]);
      return { message: "User deleted successfully" };
    } catch (err) {
      throw new Error(err.message);
    }
  },

  editUserDetails: async (userId, updateData) => {
    try {
      const { username, email, password, birthday, avatar } = updateData;
      let query = `UPDATE User SET `;
      let params = [];

      if (username) {
        query += `Username = ?, `;
        params.push(username);
      }
      if (email) {
        query += `Email = ?, `;
        params.push(email);
      }
      if (birthday) {
        query += `Birthday = ?, `;
        params.push(birthday);
      }
      if (avatar) {
        query += `Birthday = ?, `;
        params.push(birthday);
      }
      if (password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        query += `Password = ? `;
        params.push(hashedPassword);
      }

      query = query.slice(0, -2);
      query += ` WHERE Id = ?`;
      params.push(userId);

      await dbHelpers.runQuery(query, params);
      return { message: "User updated successfully" };
    } catch (err) {
      throw new Error(err.message);
    }
  },

  getUserById: async (userId) => {
    try {
      const query = `SELECT * FROM User WHERE Id = ?`;
      const user = await dbHelpers.getQuery(query, [userId]);

      if (!user) {
        throw new Error("User not found");
      }
      return user;
    } catch (err) {
      throw new Error(err.message);
    }
  },
};
module.exports = UserModel;

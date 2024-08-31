const db = require("../data/database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const registerUser = (username, email, password, callback) => {
  const sql = "SELECT * FROM Users Where Email = ?";
  db.get(sql, [email], (err, user) => {
    if (err) {
      return callback(err.message);
    }

    if (user) {
      return callback("User already exists with this email.");
    }

    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) {
        return callback(err.message);
      }

      const createUserQuery = `INSERT INTO Users (Username, Email, Password) VALUES (?, ?, ?)`;
      db.run(
        createUserQuery,
        [username, email, hashedPassword || "user"],
        (err) => {
          if (err) {
            return callback(err.message);
          }
          callback(null, { userId: this.lastID });
        }
      );
    });
  });
};

const loginUser = (email, password, callback) => {
  const query = `SELECT * FROM Users WHERE Email = ?`;
  db.get(query, [email], (err, user) => {
    if (err) {
      return callback(err.message);
    }
    if (!user) {
      return callback("User not found");
    }

    bcrypt.compare(password, user.Password, (err, result) => {
      if (err) {
        return callback(err.message);
      }
      if (!result) {
        return callback("Incorrect password");
      }

      const token = jwt.sign(
        { userId: user.Id, role: user.Role },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "1h" }
      );
      callback(null, { token, user });
    });
  });
};

const deleteUser = (userId, callback) => {
  const query = `DELETE FROM Users WHERE Id = ?`;
  db.run(query, [userId], function (err) {
    if (err) {
      return callback(err.message);
    }
    callback(null, { message: "User deleted successfully" });
  });
};

const editUserDetails = (userId, updateData, callback) => {
  const { username, email, password, birthday } = updateData;
  let query = `UPDATE Users SET `;
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
  if (password) {
    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) {
        return callback(err.message);
      }
      query += `Password = ? `;
      params.push(hashedPassword);

      query += `WHERE Id = ?`;
      params.push(userId);

      db.run(query, params, function (err) {
        if (err) {
          return callback(err.message);
        }
        callback(null, { message: "User updated successfully" });
      });
    });
  } else {
    query = query.slice(0, -2);
    query += ` WHERE Id = ?`;
    params.push(userId);

    db.run(query, params, function (err) {
      if (err) {
        return callback(err.message);
      }
      callback(null, { message: "User updated successfully" });
    });
  }
};

module.exports = { registerUser, loginUser, deleteUser, editUserDetails };

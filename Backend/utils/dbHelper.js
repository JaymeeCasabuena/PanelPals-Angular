const db = require("../data/database");

const dbHelpers = {
  runQuery: (query, params) =>
    new Promise((resolve, reject) => {
      db.run(query, params, function (err) {
        if (err) return reject(`Error executing query: ${err.message}`);
        resolve(this);
      });
    }),

  getQuery: (query, params) =>
    new Promise((resolve, reject) => {
      db.get(query, params, (err, row) => {
        if (err) return reject(`Error executing query: ${err.message}`);
        resolve(row);
      });
    }),
  getAllQuery: (query, params) =>
    new Promise((resolve, reject) => {
      db.all(query, params, (err, rows) => {
        if (err) {
          return reject(`Error executing query: ${err.message}`);
        }
        resolve(rows);
      });
    }),
};

module.exports = dbHelpers;

const db = require("../data/database");

const reviewModel = {
  createReview: (review, callback) => {
    const { BookId, UserId, ReviewText, Rating } = review;
    const sql = `
        INSERT INTO Reviews (BookId, UserId, ReviewText, Rating)
        VALUES (?, ?, ?, ?)
      `;
    db.run(sql, [BookId, UserId, ReviewText, Rating], function (err) {
      if (err) return callback(err);
      callback(null, { Id: this.lastID, ...review });
    });
  },

  editReview: (id, review, callback) => {
    const { ReviewText, Rating } = review;
    const sql = `
        UPDATE Reviews
        SET ReviewText = ?, Rating = ?
        WHERE Id = ?
      `;
    db.run(sql, [ReviewText, Rating, id], function (err) {
      if (err) return callback(err);
      callback(null, { Id: id, ...review });
    });
  },

  deleteReview: (id, callback) => {
    const sql = `DELETE FROM Reviews WHERE Id = ?`;
    db.run(sql, [id], function (err) {
      if (err) return callback(err);
      callback(null, { deletedId: id });
    });
  },

  getAllReviewsByBookId: (BookId, callback) => {
    const sql = `SELECT * FROM Reviews WHERE BookId = ?`;
    db.all(sql, [BookId], (err, rows) => {
      if (err) return callback(err);
      callback(null, rows);
    });
  },

  getAllReviewsByUserId: (UserId, callback) => {
    const sql = `SELECT * FROM Reviews WHERE UserId = ?`;
    db.all(sql, [UserId], (err, rows) => {
      if (err) return callback(err);
      callback(null, rows);
    });
  },
};

module.exports = reviewModel;

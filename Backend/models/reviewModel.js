const db = require("../data/database");

const reviewModel = {
  createReview: (review, callback) => {
    const { ComicId, UserId, ReviewText, Rating } = review;
    const sql = `
        INSERT INTO Review (ComicId, UserId, ReviewText, Rating)
        VALUES (?, ?, ?, ?)
      `;
    db.run(sql, [ComicId, UserId, ReviewText, Rating], function (err) {
      if (err) return callback(err);
      callback(null, { Id: this.lastID, ...review });
    });
  },

  editReview: (id, review, callback) => {
    const { ReviewText, Rating } = review;
    const sql = `
        UPDATE Review
        SET ReviewText = ?, Rating = ?
        WHERE Id = ?
      `;
    db.run(sql, [ReviewText, Rating, id], function (err) {
      if (err) return callback(err);
      callback(null, { Id: id, ...review });
    });
  },

  deleteReview: (id, callback) => {
    const sql = `DELETE FROM Review WHERE Id = ?`;
    db.run(sql, [id], function (err) {
      if (err) return callback(err);
      callback(null, { deletedId: id });
    });
  },

  getAllReviewsByComicId: (ComicId, callback) => {
    const sql = `SELECT * FROM Review WHERE ComicId = ?`;
    db.all(sql, [ComicId], (err, rows) => {
      if (err) return callback(err);
      callback(null, rows);
    });
  },

  getAllReviewsByUserId: (UserId, callback) => {
    const sql = `SELECT * FROM Review WHERE UserId = ?`;
    db.all(sql, [UserId], (err, rows) => {
      if (err) return callback(err);
      callback(null, rows);
    });
  },
};

module.exports = reviewModel;

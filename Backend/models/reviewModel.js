const dbHelpers = require("../utils/dbHelper");

const reviewModel = {
  createReview: async (review) => {
    try {
      const { ComicId, UserId, ReviewText, Rating } = review;
      const query = `
        INSERT INTO Review (ComicId, UserId, ReviewText, Rating)
        VALUES (?, ?, ?, ?)
      `;
      const result = await dbHelpers.runQuery(query, [
        ComicId,
        UserId,
        ReviewText,
        Rating,
      ]);
      return { Id: result.lastID, ...review };
    } catch (err) {
      console.error("Error creating review:", err.message);
      throw new Error("An error occurred while creating the review.");
    }
  },

  editReview: async (userId, id, review) => {
    try {
      const { reviewText, rating } = review;
      const query = `
        UPDATE Review
        SET ReviewText = ?, Rating = ?
        WHERE Id = ? AND UserId = ?;
      `;
      const result = await dbHelpers.runQuery(query, [
        reviewText,
        rating,
        id,
        userId,
      ]);
      if (result.changes === 0) {
        throw new Error("Unauthorized or no changes made.");
      }
      return { Id: id, ...review };
    } catch (err) {
      console.error("Error editing review:", err.message);
      throw new Error("An error occurred while editing the review.");
    }
  },

  deleteReview: async (userId, id) => {
    try {
      const query = `DELETE FROM Review WHERE Id = ? AND UserId = ?`;
      const result = await dbHelpers.runQuery(query, [id, userId]);
      return result.changes > 0 ? { success: true } : { success: false };
    } catch (err) {
      console.error("Error deleting review:", err.message);
      throw new Error("An error occurred while deleting the review.");
    }
  },

  getAllReviewsByComicId: async (ComicId) => {
    try {
      const query = `
        SELECT Review.Id, Review.ReviewText, Review.Rating, Review.DateCreated, 
              User.Username, COUNT(Comment.Id) AS ResponseCount
          FROM Review
          LEFT JOIN User ON Review.UserId = User.Id
          LEFT JOIN Comment ON Review.Id = Comment.ReviewId
          WHERE Review.ComicId = ?
          GROUP BY Review.Id;
      `;
      const rows = await dbHelpers.getAllQuery(query, [ComicId]);

      return rows;
    } catch (err) {
      console.error("Error fetching reviews by ComicId:", err.message);
      throw new Error("An error occurred while fetching reviews.");
    }
  },

  getCommentsByReview: async (reviewId) => {
    try {
      const commentsQuery = `
        SELECT Comment.Id, Comment.CommentText, Comment.CreatedAt, 
               User.Username
        FROM Comment
        LEFT JOIN User ON Comment.UserId = User.Id
        WHERE Comment.ReviewId = ?
        ORDER BY Comment.CreatedAt;
      `;
      const comments = await dbHelpers.getAllQuery(commentsQuery, [reviewId]);

      return { comments };
    } catch (err) {
      console.error("Error fetching comments by review ID:", err.message);
      throw new Error(
        "An error occurred while fetching comments by review ID."
      );
    }
  },

  getAllReviewsByUserId: async (UserId) => {
    try {
      const query = `SELECT * FROM Review WHERE UserId = ?`;
      const rows = await dbHelpers.getAllQuery(query, [UserId]);
      return rows;
    } catch (err) {
      console.error("Error fetching reviews by UserId:", err.message);
      throw new Error("An error occurred while fetching reviews.");
    }
  },
};

module.exports = reviewModel;

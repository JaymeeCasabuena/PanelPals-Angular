const dbHelpers = require("../utils/dbHelper");

const commentModel = {
  addComment: async (discussionId, reviewId, userId, commentText) => {
    try {
      const query = `
        INSERT INTO Comment (${
          discussionId ? "DiscussionId" : "ReviewId"
        }, UserId, CommentText)
        VALUES (?, ?, ?);
      `;
      const result = await dbHelpers.runQuery(query, [
        discussionId || reviewId,
        userId,
        commentText,
      ]);
      return { commentId: result.lastID };
    } catch (err) {
      console.error("Error creating discussion:", err.message);
      throw new Error("An error occurred while creating the discussion.");
    }
  },
  editComment: async (id, userId, commentText) => {
    try {
      const sql = `
        UPDATE Comment
        SET CommentText = ?
        WHERE Id = ? AND UserId = ?;
      `;
      const result = await dbHelpers.runQuery(sql, [commentText, id, userId]);
      if (result.changes === 0) {
        throw new Error("Unauthorized or no changes made.");
      }
      return { Id: id, CommentText: commentText };
    } catch (err) {
      console.error("Error editing comment:", err.message);
      throw new Error("An error occurred while editing the comment.");
    }
  },

  deleteComment: async (id, userId) => {
    try {
      const query = `DELETE FROM Comment WHERE Id = ? AND UserId = ?`;
      const result = await dbHelpers.runQuery(query, [id, userId]);
      return result.changes > 0 ? { success: true } : { success: false };
    } catch (err) {
      console.error("Error deleting comment:", err.message);
      throw new Error("An error occurred while deleting the comment.");
    }
  },
};

module.exports = commentModel;

const commentModel = require("../models/commentModel");

const commentController = {
  addComment: async (req, res) => {
    try {
      const { discussionId, reviewId, userId, commentText } = req.body;
      const result = await commentModel.addComment(
        discussionId,
        reviewId,
        userId,
        commentText
      );
      res.status(201).json({
        message: "Comment created successfully.",
        commentId: result.commentId,
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  editComment: async (req, res) => {
    const { id } = req.params;
    const { userId, commentText } = req.body;

    if (!commentText) {
      return res.status(400).json({ error: "CommentText is required" });
    }

    try {
      const updatedComment = await commentModel.editComment(
        id,
        userId,
        commentText
      );
      res.status(200).json(updatedComment);
    } catch (err) {
      console.error("Error editing comment:", err.message);
      res.status(500).json({ error: err.message });
    }
  },

  deleteComment: async (req, res) => {
    const { id } = req.params;
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    try {
      const result = await commentModel.deleteComment(id, userId);
      if (result.success) {
        res.status(200).json({ message: "Comment deleted successfully." });
      } else {
        res.status(400).json({
          message: "Failed to delete comment. Unauthorized or not found.",
        });
      }
    } catch (err) {
      console.error("Error deleting comment:", err.message);
      res.status(500).json({ error: err.message });
    }
  },
};

module.exports = commentController;

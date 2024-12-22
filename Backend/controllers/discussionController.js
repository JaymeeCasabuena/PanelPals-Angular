const discussionModel = require("../models/discussionModel");

const discussionController = {
  createDiscussion: async (req, res) => {
    try {
      const { userId, title, content } = req.body;
      const result = await discussionModel.createDiscussion(
        userId,
        title,
        content
      );
      res.status(201).json({
        message: "Discussion created successfully.",
        discussionId: result.discussionId,
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  getAllDiscussions: async (req, res) => {
    try {
      const discussions = await discussionModel.getAllDiscussions();
      res.status(200).json(discussions);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  getDiscussionById: async (req, res) => {
    try {
      const { discussionId } = req.params;
      const result = await discussionModel.getDiscussionById(discussionId);
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  editDiscussion: async (req, res) => {
    try {
      const { discussionId } = req.params.id;
      const { userId, content } = req.body;
      const result = await discussionModel.editDiscussion(
        discussionId,
        userId,
        content
      );
      if (result.success) {
        res.status(200).json({ message: "Discussion edited successfully." });
      } else {
        res.status(404).json({ message: "Discussion not found." });
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  deleteDiscussion: async (req, res) => {
    try {
      const { discussionId } = req.params;
      const result = await discussionModel.deleteDiscussion(discussionId);
      if (result.success) {
        res.status(200).json({ message: "Discussion deleted successfully." });
      } else {
        res.status(404).json({ message: "Discussion not found." });
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  getNewDiscussions: async (req, res) => {
    try {
      const discussions = await discussionModel.getNewDiscussions();
      res.status(200).json(discussions);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  getTrendingDiscussions: async (req, res) => {
    try {
      const discussions = await discussionModel.getTrendingDiscussions();
      res.status(200).json(discussions);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
};

module.exports = discussionController;

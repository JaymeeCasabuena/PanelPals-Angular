const { formatDiscussionDates } = require("../utils/dateHelper");
const discussionModel = require("../models/discussionModel");
const moment = require("moment");

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
      const formattedDiscussions = formatDiscussionDates(discussions);
      res.status(200).json(formattedDiscussions);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  getDiscussionById: async (req, res) => {
    try {
      const discussionId = req.params.id;
      const result = await discussionModel.getDiscussionById(discussionId);
      result.discussion.DateCreated = moment(
        result.discussion.DateCreated
      ).fromNow();
      result.comments = formatDiscussionDates(result.comments);
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  editDiscussion: async (req, res) => {
    try {
      const { id } = req.params;
      const { userId, content, title } = req.body;

      const result = await discussionModel.editDiscussion(
        id,
        userId,
        content,
        title
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
      const { id } = req.params;
      const { userId } = req.query;

      const result = await discussionModel.deleteDiscussion(userId, id);
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

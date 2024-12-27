const dbHelpers = require("../utils/dbHelper");

const discussionModel = {
  createDiscussion: async (userId, title, content) => {
    try {
      const query = `
          INSERT INTO Discussion (UserId, Title, Content)
          VALUES (?, ?, ?);
        `;
      const result = await dbHelpers.runQuery(query, [userId, title, content]);
      return { discussionId: result.lastID };
    } catch (err) {
      console.error("Error creating discussion:", err.message);
      throw new Error("An error occurred while creating the discussion.");
    }
  },

  getAllDiscussions: async () => {
    try {
      const query = `
          SELECT Discussion.Id, Discussion.Title, Discussion.Content, Discussion.DateCreated, 
                 User.Username, User.Avatar, COUNT(Comment.Id) AS ResponseCount
          FROM Discussion
          LEFT JOIN User ON Discussion.UserId = User.Id
          LEFT JOIN Comment ON Discussion.Id = Comment.DiscussionId
          GROUP BY Discussion.Id;
        `;
      const discussions = await dbHelpers.getAllQuery(query);
      return discussions;
    } catch (err) {
      console.error("Error fetching all discussions:", err.message);
      throw new Error("An error occurred while fetching all discussions.");
    }
  },

  getDiscussionById: async (discussionId) => {
    try {
      const query = `
          SELECT Discussion.Id, Discussion.Title, Discussion.Content, Discussion.DateCreated,
                 User.Username, COUNT(Comment.Id) AS ResponseCount
          FROM Discussion
          LEFT JOIN User ON Discussion.UserId = User.Id
          LEFT JOIN Comment ON Discussion.Id = Comment.DiscussionId
          WHERE Discussion.Id = ?
          GROUP BY Discussion.Id;
        `;
      const discussion = await dbHelpers.getQuery(query, [discussionId]);

      const commentsQuery = `
          SELECT Comment.Id, Comment.CommentText, Comment.DateCreated, 
                 User.Username
          FROM Comment
          LEFT JOIN User ON Comment.UserId = User.Id
          WHERE Comment.DiscussionId = ?
          ORDER BY Comment.DateCreated;
        `;
      const comments = await dbHelpers.getAllQuery(commentsQuery, [
        discussionId,
      ]);

      return { discussion, comments };
    } catch (err) {
      console.error("Error fetching discussion by ID:", err.message);
      throw new Error("An error occurred while fetching the discussion by ID.");
    }
  },

  editDiscussion: async (userId, id, content) => {
    try {
      const sql = `
        UPDATE Discussion
        SET Content = ?
        WHERE Id = ? AND UserId = ?;
      `;
      const result = await dbHelpers.runQuery(sql, [content, id, userId]);
      if (result.changes === 0) {
        throw new Error("Unauthorized or no changes made.");
      }
      return { discussionId: id, content: content };
    } catch (err) {
      console.error("Error editing discussion:", err.message);
      throw new Error("An error occurred while editing the discussion.");
    }
  },

  deleteDiscussion: async (userId, discussionId) => {
    try {
      const query = `DELETE FROM Discussion WHERE Id = ? AND UserId = ?`;
      const result = await dbHelpers.runQuery(query, [discussionId, userId]);
      return result.changes > 0 ? { success: true } : { success: false };
    } catch (err) {
      console.error("Error deleting discussion:", err.message);
      throw new Error("An error occurred while deleting the discussion.");
    }
  },

  getNewDiscussions: async () => {
    try {
      const query = `
          SELECT Discussion.Id, Discussion.Title, Discussion.Content, Discussion.DateCreated, 
                 User.Username
          FROM Discussion
          LEFT JOIN User ON Discussion.UserId = User.Id
          ORDER BY Discussion.DateCreated DESC
          LIMIT 10;
        `;
      const discussions = await dbHelpers.getAllQuery(query);
      return discussions;
    } catch (err) {
      console.error("Error fetching new discussions:", err.message);
      throw new Error("An error occurred while fetching new discussions.");
    }
  },

  getTrendingDiscussions: async () => {
    try {
      const query = `
          SELECT Discussion.Id, Discussion.Title, Discussion.Content, Discussion.DateCreated, 
                 User.Username, COUNT(Comment.Id) AS ResponseCount
          FROM Discussion
          LEFT JOIN User ON Discussion.UserId = User.Id
          LEFT JOIN Comment ON Discussion.Id = Comment.DiscussionId
          GROUP BY Discussion.Id
          ORDER BY ResponseCount DESC
          LIMIT 10;
        `;
      const discussions = await dbHelpers.getAllQuery(query);
      return discussions;
    } catch (err) {
      console.error("Error fetching trending discussions:", err.message);
      throw new Error("An error occurred while fetching trending discussions.");
    }
  },
};

module.exports = discussionModel;

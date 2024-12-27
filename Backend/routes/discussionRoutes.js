const express = require("express");
const discussionController = require("../controllers/discussionController");
const router = express.Router();

router.post("/", discussionController.createDiscussion);
router.get("/getAll", discussionController.getAllDiscussions);
router.get("/recent", discussionController.getNewDiscussions);
router.get("/trending", discussionController.getTrendingDiscussions);
router.get("/:id", discussionController.getDiscussionById);
router.put("/:id", discussionController.editDiscussion);
router.delete("/:id", discussionController.deleteDiscussion);

module.exports = router;

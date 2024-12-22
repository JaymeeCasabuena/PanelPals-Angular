const express = require("express");
const commentController = require("../controllers/commentController");
const router = express.Router();

router.post("/", commentController.addComment);
router.put("/:id", commentController.editComment);
router.delete("/:id", commentController.deleteComment);

module.exports = router;

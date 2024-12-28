const express = require("express");
const reviewController = require("../controllers/reviewController");

const router = express.Router();

router.post("/", reviewController.createReview);
router.put("/:id", reviewController.editReview);
router.delete("/:id", reviewController.deleteReview);
router.get("/comic/:ComicId", reviewController.getAllReviewsByComicId);
router.get("/user/:UserId", reviewController.getAllReviewsByUserId);

module.exports = router;

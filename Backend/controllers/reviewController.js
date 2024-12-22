const reviewModel = require("../models/reviewModel");

const reviewController = {
  createReview: async (req, res) => {
    const { ComicId, UserId, ReviewText, Rating } = req.body;
    if (!ComicId || !UserId || !ReviewText || !Rating) {
      return res.status(400).json({ error: "All fields are required" });
    }

    try {
      const review = await reviewModel.createReview({
        ComicId,
        UserId,
        ReviewText,
        Rating,
      });
      res.status(201).json(review);
    } catch (err) {
      console.error("Error creating review:", err.message);
      res.status(500).json({ error: err.message });
    }
  },

  editReview: async (req, res) => {
    const { reviewId } = req.params;
    const { reviewText, rating, userId } = req.body;

    if (!reviewText || !rating) {
      return res
        .status(400)
        .json({ error: "ReviewText and Rating are required" });
    }

    try {
      const updatedReview = await reviewModel.editReview(reviewId, {
        reviewText,
        rating,
        userId,
      });
      res.status(200).json(updatedReview);
    } catch (err) {
      console.error("Error editing review:", err.message);
      res.status(500).json({ error: err.message });
    }
  },

  deleteReview: async (req, res) => {
    const { reviewId } = req.params;
    const { userId } = req.body;

    try {
      const result = await reviewModel.deleteReview(reviewId, userId);
      if (result.success) {
        res.status(200).json({ message: "Review deleted successfully" });
      } else {
        res.status(400).json({ error: "Failed to delete review" });
      }
    } catch (err) {
      console.error("Error deleting review:", err.message);
      res.status(500).json({ error: err.message });
    }
  },

  getAllReviewsByComicId: async (req, res) => {
    const { ComicId } = req.params;

    try {
      const reviews = await reviewModel.getAllReviewsByComicId(ComicId);
      res.status(200).json(reviews);
    } catch (err) {
      console.error("Error fetching reviews by ComicId:", err.message);
      res.status(500).json({ error: err.message });
    }
  },

  getAllReviewsByUserId: async (req, res) => {
    const { UserId } = req.params;

    try {
      const reviews = await reviewModel.getAllReviewsByUserId(UserId);
      res.status(200).json(reviews);
    } catch (err) {
      console.error("Error fetching reviews by UserId:", err.message);
      res.status(500).json({ error: err.message });
    }
  },
};

module.exports = reviewController;

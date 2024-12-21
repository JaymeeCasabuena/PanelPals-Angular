const reviewModel = require("../models/reviewModel");

const reviewController = {
  createReview: (req, res) => {
    const { ComicId, UserId, ReviewText, Rating } = req.body;
    if (!ComicId || !UserId || !ReviewText || !Rating) {
      return res.status(400).json({ error: "All fields are required" });
    }

    reviewModel.createReview(
      { ComicId, UserId, ReviewText, Rating },
      (err, review) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json(review);
      }
    );
  },

  editReview: (req, res) => {
    const { id } = req.params;
    const { ReviewText, Rating } = req.body;

    if (!ReviewText || !Rating) {
      return res
        .status(400)
        .json({ error: "ReviewText and Rating are required" });
    }

    reviewModel.editReview(id, { ReviewText, Rating }, (err, updatedReview) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json(updatedReview);
    });
  },

  deleteReview: (req, res) => {
    const { id } = req.params;

    reviewModel.deleteReview(id, (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json(result);
    });
  },

  getAllReviewsByComicId: (req, res) => {
    const { ComicId } = req.params;

    reviewModel.getAllReviewsByComicId(ComicId, (err, reviews) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json(reviews);
    });
  },

  getAllReviewsByUserId: (req, res) => {
    const { UserId } = req.params;

    reviewModel.getAllReviewsByUserId(UserId, (err, reviews) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json(reviews);
    });
  },
};

module.exports = reviewController;

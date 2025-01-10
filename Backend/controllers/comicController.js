const comicModel = require("../models/comicModel");

const comicController = {
  addComic: async (req, res) => {
    const {
      title,
      yearPublished,
      genres,
      status,
      link,
      summary,
      authorName,
      cover,
    } = req.body;

    if (
      title == null ||
      yearPublished == null ||
      genres == null ||
      status == null ||
      link == null ||
      summary == null ||
      authorName == null ||
      cover == null
    ) {
      return res.status(400).json({ error: "All fields are required" });
    }

    try {
      const result = await comicModel.addComic(
        title,
        yearPublished,
        genres,
        status,
        link,
        summary,
        authorName,
        cover
      );
      res
        .status(201)
        .json({ message: "Comic added successfully.", data: result });
    } catch (err) {
      res.status(500).json({ error: err.message || "Internal server error" });
    }
  },

  getAllComics: async (req, res) => {
    try {
      const comics = await comicModel.getAllComics();
      res.status(200).json(comics);
    } catch (err) {
      res.status(500).json({ error: err.message || "Internal server error" });
    }
  },

  getPopularComics: async (req, res) => {
    try {
      const comics = await comicModel.getPopularComics();
      res.status(200).json(comics);
    } catch (err) {
      res.status(500).json({ error: err.message || "Internal server error" });
    }
  },

  getAllGenres: async (req, res) => {
    try {
      const genres = await comicModel.getAllGenres();
      res.status(200).json(genres);
    } catch (err) {
      res.status(500).json({ error: err.message || "Internal server error" });
    }
  },

  getComicById: async (req, res) => {
    const id = req.params.id;

    try {
      const comic = await comicModel.getComicById(id);
      if (!comic) {
        return res.status(404).json({ error: "Comic not found" });
      }
      res.status(200).json(comic);
    } catch (err) {
      res.status(500).json({ error: err.message || "Internal server error" });
    }
  },

  searchComics: async (req, res) => {
    const searchTerm = req.query.q;
    if (!searchTerm) {
      return res.status(400).json({ error: "Search term is required." });
    }
    try {
      const comics = await comicModel.searchComics(searchTerm);
      if (comics.length === 0) {
        return res.status(404).json({ error: "No results found." });
      }
      res.status(200).json(comics);
    } catch (err) {
      res.status(500).json({ error: err.message || "Internal server error." });
    }
  },
};

module.exports = comicController;

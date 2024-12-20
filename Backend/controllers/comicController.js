const comicModel = require("../models/comicModel");

const comicController = {
  addComic: (req, res) => {
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

    comicModel.addComic(
      title,
      yearPublished,
      genres,
      status,
      link,
      summary,
      authorName,
      cover,
      (err, result) => {
        if (err) {
          return res.status(500).json({ error: err });
        }
        res
          .status(201)
          .json({ message: "Comic added successfully.", data: result });
      }
    );
  },

  getAllComics: (req, res) => {
    comicModel.getAllComics((err, comics) => {
      if (err) {
        return res.status(500).json({ error: err });
      }
      res.status(200).json(comics);
    });
  },

  getAllGenres: (req, res) => {
    comicModel.getAllGenres((err, genres) => {
      if (err) {
        return res.status(500).json({ error: err });
      }
      res.status(200).json(genres);
    });
  },

  getComicById: (req, res) => {
    const id = req.params.id;

    comicModel.getComicById(id, (err, comic) => {
      if (err) {
        return res.status(500).json({ error: err });
      }
      if (!comic) {
        return res.status(404).json({ error: "Comic not found" });
      }
      res.status(200).json(comic);
    });
  },
};

module.exports = comicController;

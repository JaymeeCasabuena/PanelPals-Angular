const express = require("express");
const comicController = require("../controllers/comicController");
const router = express.Router();

router.post("/", comicController.addComic);
router.get("/getAll", comicController.getAllComics);
router.get("/getPopular", comicController.getPopularComics);
router.get("/genres", comicController.getAllGenres);
router.get("/:id", comicController.getComicById);

module.exports = router;

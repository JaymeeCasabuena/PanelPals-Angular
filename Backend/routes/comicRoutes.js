const express = require("express");
const comicController = require("../controllers/comicController");
const router = express.Router();

router.post("/addComic", comicController.addComic);
router.get("/getAllComics", comicController.getAllComics);
router.get("/getAllGenres", comicController.getAllGenres);
router.get("/getComicById/:id", comicController.getComicById);

module.exports = router;

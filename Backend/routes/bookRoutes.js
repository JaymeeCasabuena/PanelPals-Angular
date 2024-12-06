const express = require("express");
const bookController = require("../controllers/bookController");
const router = express.Router();

router.post("/addBook", bookController.addBook);
router.get("/getAllBooks", bookController.getAllBooks);
router.get("/getBookById/:id", bookController.getBookById);

module.exports = router;

const bookModel = require("../models/bookModel");

const addBook = (req, res) => {
  const { title, isbn, yearPublished, genre, summary, authorId, bookImg } =
    req.body;

  if (!title || !isbn || !yearPublished || !genre || !authorId || !bookImg) {
    return res.status(400).json({ error: "All fields are required" });
  }

  bookModel.addBook(
    title,
    isbn,
    yearPublished,
    genre,
    summary,
    authorId,
    bookImg,
    (err, result) => {
      if (err) {
        return res.status(500).json({ error: err });
      }
      res
        .status(201)
        .json({ message: "Book added successfully.", data: result });
    }
  );
};

const getAllBooks = (req, res) => {
  bookModel.getAllBooks((err, books) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: err });
    }
    res.status(200).json(books);
  });
};

module.exports = { addBook, getAllBooks };

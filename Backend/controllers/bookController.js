const bookModel = require("../models/bookModel");

const addBook = (req, res) => {
  const { title, isbn, yearPublished, genre, summary, authorId, bookImg } =
    req.body;

  if (
    !title ||
    !isbn ||
    !yearPublished ||
    !genre ||
    !summary ||
    !authorId ||
    !bookImg
  ) {
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

const getBookById = (req, res) => {
  const id = req.params.id;
  console.log(id, "HELLO");
  bookModel.getBookById(id, (err, book) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: err });
    }
    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }
    res.status(200).json(book);
    console.log(book, "HEY");
  });
};

module.exports = { addBook, getAllBooks, getBookById };

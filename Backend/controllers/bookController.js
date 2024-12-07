const bookModel = require("../models/bookModel");

const bookController = {
  addBook: (req, res) => {
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
  },

  getAllBooks: (req, res) => {
    bookModel.getAllBooks((err, books) => {
      if (err) {
        return res.status(500).json({ error: err });
      }
      res.status(200).json(books);
    });
  },

  getBookById: (req, res) => {
    const id = req.params.id;

    bookModel.getBookById(id, (err, book) => {
      if (err) {
        return res.status(500).json({ error: err });
      }
      if (!book) {
        return res.status(404).json({ error: "Book not found" });
      }
      res.status(200).json(book);
    });
  },
};

module.exports = bookController;

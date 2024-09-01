const db = require("../data/database");

// Function to add a new book
const addBook = (
  title,
  isbn,
  yearPublished,
  genre,
  summary,
  authorId,
  bookImg,
  isApproved = 0,
  callback
) => {
  const checkQuery = "SELECT * FROM Books Where ISBN = ?";
  db.get(checkQuery, [isbn], (err, book) => {
    if (err) {
      return callback(err.message);
    }

    if (book) {
      return callback("Book already exists with the same ISBN.");
    }
  });

  const insertBookQuery = `
      INSERT INTO Books (Title, ISBN, YearPublished, Genre, AuthorId, BookImg, IsApproved) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?);
    `;

  db.run(
    insertBookQuery,
    [title, isbn, yearPublished, genre, summary, authorId, bookImg, isApproved],
    function (err) {
      if (err) {
        return callback(err.message);
      }
      callback(null, { bookId: this.lastID });
    }
  );
};

// Function to get all books with author's full name
const getAllBooks = (callback) => {
  const selectBooksQuery = `
      SELECT 
        Books.Id, 
        Books.Title, 
        Books.ISBN, 
        Books.YearPublished, 
        Books.Genre, 
        Books.Summary,
        Authors.Name AS AuthorName,
        Books.BookImg,
        Books.IsApproved
      FROM Books
      JOIN Authors ON Books.AuthorId = Authors.Id;
    `;

  db.all(selectBooksQuery, [], (err, rows) => {
    if (err) {
      return callback(err.message);
    }
    callback(null, rows);
  });
};

module.exports = { addBook, getAllBooks };

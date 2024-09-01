const sqlite3 = require("sqlite3").verbose();
const dbName = "BookLovers.db";

let db = new sqlite3.Database(dbName, (err) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log("Connected to SQLite");

    // Run the table creation scripts sequentially
    db.serialize(() => {
      // Create Authors table
      db.run(
        `
        CREATE TABLE IF NOT EXISTS Authors (
          Id INTEGER PRIMARY KEY AUTOINCREMENT,
          Name TEXT NOT NULL
        );
      `,
        (err) => {
          if (err) {
            console.error("Error creating Authors table:", err.message);
          }
        }
      );

      // Create Books table
      db.run(
        `
        CREATE TABLE IF NOT EXISTS Books (
          Id INTEGER PRIMARY KEY AUTOINCREMENT,
          Title TEXT NOT NULL,
          ISBN TEXT NOT NULL UNIQUE,
          YearPublished INTEGER NOT NULL,
          Genre TEXT NOT NULL,
          Summary TEXT NOT NULL,
          AuthorId INTEGER NOT NULL,
          BookImg TEXT NOT NULL,
          IsApproved INTEGER DEFAULT 0,
          FOREIGN KEY (AuthorId) REFERENCES Authors(Id)
        );
      `,
        (err) => {
          if (err) {
            console.error("Error creating Books table:", err.message);
          }
        }
      );

      // Create Users table
      db.run(
        `
        CREATE TABLE IF NOT EXISTS Users (
          Id INTEGER PRIMARY KEY AUTOINCREMENT,
          Username TEXT NOT NULL UNIQUE,
          Email TEXT NOT NULL UNIQUE,
          Password TEXT NOT NULL,
          Birthday DATE,
          Role TEXT CHECK (Role IN ('user', 'moderator')) NOT NULL DEFAULT 'user'
        );
      `,
        (err) => {
          if (err) {
            console.error("Error creating Users table:", err.message);
          }
        }
      );

      // Create Reviews table
      db.run(
        `
        CREATE TABLE IF NOT EXISTS Reviews (
          Id INTEGER PRIMARY KEY AUTOINCREMENT,
          BookId INTEGER NOT NULL,
          UserId INTEGER NOT NULL,
          ReviewText TEXT NOT NULL,
          Rating INTEGER CHECK(Rating BETWEEN 1 AND 5),
          DateCreated DATE DEFAULT CURRENT_DATE,
          FOREIGN KEY (BookId) REFERENCES Books(Id),
          FOREIGN KEY (UserId) REFERENCES Users(Id)
        );
      `,
        (err) => {
          if (err) {
            console.error("Error creating Reviews table:", err.message);
          }
        }
      );

      // Create Posts table
      db.run(
        `
        CREATE TABLE IF NOT EXISTS Posts (
          Id INTEGER PRIMARY KEY AUTOINCREMENT,
          UserId INTEGER NOT NULL,
          PostText TEXT NOT NULL,
          DateCreated DATE DEFAULT CURRENT_DATE,
          FOREIGN KEY (UserId) REFERENCES Users(Id)
        );
      `,
        (err) => {
          if (err) {
            console.error("Error creating Posts table:", err.message);
          }
        }
      );

      // Create Comments table
      db.run(
        `
        CREATE TABLE IF NOT EXISTS Comments (
          Id INTEGER PRIMARY KEY AUTOINCREMENT,
          ReviewId INTEGER,
          PostId INTEGER,
          UserId INTEGER NOT NULL,
          CommentText TEXT NOT NULL,
          CreatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (ReviewId) REFERENCES Reviews(Id),
          FOREIGN KEY (PostId) REFERENCES Posts(Id),
          FOREIGN KEY (UserId) REFERENCES Users(Id)
        );
      `,
        (err) => {
          if (err) {
            console.error("Error creating Comments table:", err.message);
          }
        }
      );
    });
  }
});

module.exports = db;

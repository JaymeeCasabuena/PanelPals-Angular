const sqlite3 = require("sqlite3").verbose();
const dbName = "PanelPals.db";

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

      // Create Comics table
      db.run(
        `
        CREATE TABLE IF NOT EXISTS Comics (
          Id INTEGER PRIMARY KEY AUTOINCREMENT,
          Title TEXT NOT NULL,
          YearPublished INTEGER NOT NULL,
          Status INTEGER NOT NULL,
          Link TEXT,
          Summary TEXT NOT NULL,
          AuthorId INTEGER NOT NULL,
          Cover TEXT NOT NULL,
          IsApproved INTEGER DEFAULT 1,
          FOREIGN KEY (AuthorId) REFERENCES Authors(Id)
        );
      `,
        (err) => {
          if (err) {
            console.error("Error creating Comics table:", err.message);
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
          Avatar TEXT,
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
          ComicId INTEGER NOT NULL,
          UserId INTEGER NOT NULL,
          ReviewText TEXT NOT NULL,
          Rating INTEGER CHECK(Rating BETWEEN 1 AND 5),
          DateCreated DATE DEFAULT CURRENT_DATE,
          FOREIGN KEY (ComicId) REFERENCES Comics(Id),
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

      // Create Images table for both posts and comments
      db.run(
        `
        CREATE TABLE IF NOT EXISTS Images (
          Id INTEGER PRIMARY KEY AUTOINCREMENT,
          PostId INTEGER NOT NULL,
          CommentId INTEGER NOT NULL,
          ImageUrl TEXT NOT NULL,
          FOREIGN KEY (PostId) REFERENCES Posts(Id)
          FOREIGN KEY (CommentId) REFERENCES Comments(Id)
        );`,
        (err) => {
          if (err) {
            console.error("Error creating Posts table:", err.message);
          }
        }
      );

      // Create Genres table
      db.run(
        `
        CREATE TABLE IF NOT EXISTS Genres (
          Id INTEGER PRIMARY KEY AUTOINCREMENT,
          Name TEXT NOT NULL
        );`,
        (err) => {
          if (err) {
            console.error("Error creating Genres table:", err.message);
          }
        }
      );

      db.run(
        `
        CREATE TABLE IF NOT EXISTS BookGenres (
          ComicId INTEGER NOT NULL,
          GenreId INTEGER NOT NULL,
          FOREIGN KEY (ComicId) REFERENCES Comics(Id),
          FOREIGN KEY (GenreId) REFERENCES Genres(Id) 
        );`,
        (err) => {
          if (err) {
            console.error("Error creating BookGenres table:", err.message);
          }
        }
      );
    });
  }
});

module.exports = db;

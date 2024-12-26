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
        CREATE TABLE IF NOT EXISTS Author (
          Id INTEGER PRIMARY KEY AUTOINCREMENT,
          Name TEXT NOT NULL
        );
      `,
        (err) => {
          if (err) {
            console.error("Error creating Author table:", err.message);
          }
        }
      );

      // Create Comics table
      db.run(
        `
        CREATE TABLE IF NOT EXISTS Comic (
          Id INTEGER PRIMARY KEY AUTOINCREMENT,
          Title TEXT NOT NULL,
          YearPublished INTEGER NOT NULL,
          Status INTEGER NOT NULL,
          Link TEXT,
          Summary TEXT NOT NULL,
          AuthorId INTEGER NOT NULL,
          Cover TEXT NOT NULL,
          IsApproved INTEGER DEFAULT 1,
          FOREIGN KEY (AuthorId) REFERENCES Author(Id)
        );
      `,
        (err) => {
          if (err) {
            console.error("Error creating Comic table:", err.message);
          }
        }
      );

      // Create Users table
      db.run(
        `
        CREATE TABLE IF NOT EXISTS User (
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
            console.error("Error creating User table:", err.message);
          }
        }
      );

      // Create Reviews table
      db.run(
        `
        CREATE TABLE IF NOT EXISTS Review (
          Id INTEGER PRIMARY KEY AUTOINCREMENT,
          ComicId INTEGER NOT NULL,
          UserId INTEGER NOT NULL,
          ReviewText TEXT NOT NULL,
          Rating INTEGER CHECK(Rating BETWEEN 1 AND 5),
          DateCreated DATE DEFAULT CURRENT_DATE,
          FOREIGN KEY (ComicId) REFERENCES Comic(Id),
          FOREIGN KEY (UserId) REFERENCES User(Id)
        );
      `,
        (err) => {
          if (err) {
            console.error("Error creating Review table:", err.message);
          }
        }
      );

      // Create Discussion table
      db.run(
        `
        CREATE TABLE IF NOT EXISTS Discussion (
          Id INTEGER PRIMARY KEY AUTOINCREMENT,
          UserId INTEGER NOT NULL,
          Title TEXT NOT NULL,
          Content TEXT NOT NULL,
          DateCreated DATETIME DEFAULT (datetime('now', 'localtime')),
          FOREIGN KEY (UserId) REFERENCES User(Id)
        );
      `,
        (err) => {
          if (err) {
            console.error("Error creating Discussion table:", err.message);
          }
        }
      );

      // Create Comments table
      db.run(
        `
        CREATE TABLE IF NOT EXISTS Comment (
          Id INTEGER PRIMARY KEY AUTOINCREMENT,
          ReviewId INTEGER,
          DiscussionId INTEGER,
          UserId INTEGER NOT NULL,
          CommentText TEXT NOT NULL,
          CreatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (ReviewId) REFERENCES Review(Id),
          FOREIGN KEY (DiscussionId) REFERENCES Discussion(Id),
          FOREIGN KEY (UserId) REFERENCES User(Id)
        );
      `,
        (err) => {
          if (err) {
            console.error("Error creating Comments table:", err.message);
          }
        }
      );

      // Create Genres table
      db.run(
        `
        CREATE TABLE IF NOT EXISTS Genre (
          Id INTEGER PRIMARY KEY AUTOINCREMENT,
          Name TEXT NOT NULL
        );`,
        (err) => {
          if (err) {
            console.error("Error creating Genre table:", err.message);
          }
        }
      );

      db.run(
        `
        CREATE TABLE IF NOT EXISTS ComicGenre (
          ComicId INTEGER NOT NULL,
          GenreId INTEGER NOT NULL,
          FOREIGN KEY (ComicId) REFERENCES Comic(Id),
          FOREIGN KEY (GenreId) REFERENCES Genre(Id) 
        );`,
        (err) => {
          if (err) {
            console.error("Error creating ComicGenre table:", err.message);
          }
        }
      );
    });
  }
});

module.exports = db;

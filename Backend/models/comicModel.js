const db = require("../data/database");
const dbHelpers = require("../utils/dbHelper");

const comicModel = {
  addComic: (
    title,
    yearPublished,
    genres,
    status,
    link,
    summary,
    authorName,
    cover,
    isApproved = 1
  ) => {
    const getAuthorId = async (authorName) => {
      const author = await dbHelpers.getQuery(
        "SELECT Id FROM Authors WHERE Name = ?",
        [authorName]
      );
      if (author) return author.Id;

      const result = await dbHelpers.runQuery(
        "INSERT INTO Authors (Name) VALUES (?)",
        [authorName]
      );
      return result.lastID;
    };

    const insertComic = async (authorId) => {
      const insertComicQuery = `
        INSERT INTO Comics (Title, YearPublished, Status, Link, AuthorId, Summary, Cover, IsApproved)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?);
      `;
      const result = await dbHelpers.runQuery(insertComicQuery, [
        title,
        yearPublished,
        status,
        link,
        authorId,
        summary,
        cover,
        isApproved,
      ]);
      return result.lastID;
    };

    const insertGenres = async (comicId) => {
      if (!genres || genres.length === 0) return;
      const insertGenresQuery = `INSERT INTO BookGenres (ComicId, GenreId) VALUES (?, ?)`;
      await Promise.all(
        genres.map((genreId) =>
          dbHelpers.runQuery(insertGenresQuery, [comicId, genreId])
        )
      );
    };

    return getAuthorId(authorName)
      .then(insertComic)
      .then(insertGenres)
      .then((comicId) => ({ comicId }))
      .catch((err) => {
        console.error("Error occurred:", err);
        throw new Error(err);
      });
  },

  getAllComics: (callback) => {
    const selectComicsQuery = `
      SELECT 
        Comics.Id, 
        Comics.Title, 
        Comics.YearPublished,
        Comics.Status, 
        Comics.Link, 
        Comics.Summary,
        Authors.Name AS AuthorName,
        Comics.Cover,
        Comics.IsApproved,
        GROUP_CONCAT(Genres.Name, ', ') AS Genres
      FROM Comics
      JOIN Authors ON Comics.AuthorId = Authors.Id
      LEFT JOIN BookGenres ON Comics.Id = BookGenres.ComicId
      LEFT JOIN Genres ON BookGenres.GenreId = Genres.Id
      GROUP BY Comics.Id;
    `;

    db.all(selectComicsQuery, [], (err, rows) => {
      if (err) {
        return callback(err.message);
      }
      callback(null, rows);
    });
  },

  getComicById: (id, callback) => {
    const selectComicByIdQuery = `
      SELECT 
        Comics.Id, 
        Comics.Title, 
        Comics.YearPublished, 
        Comics.Status, 
        Comics.Link, 
        Comics.Summary,
        Authors.Name AS AuthorName,
        Comics.Cover,
        Comics.IsApproved,
        GROUP_CONCAT(Genres.Name) AS Genres
      FROM Comics
      JOIN Authors ON Comics.AuthorId = Authors.Id
      LEFT JOIN BookGenres ON Comics.Id = BookGenres.ComicId
      LEFT JOIN Genres ON BookGenres.GenreId = Genres.Id
      WHERE Comics.Id = ?
      GROUP BY Comics.Id;
    `;

    db.get(selectComicByIdQuery, [id], (err, row) => {
      if (err) {
        return callback(err.message);
      }
      callback(null, row);
    });
  },

  getAllGenres: (callback) => {
    const getGenresQuery = `
      SELECT * FROM Genres;
    `;
    db.all(getGenresQuery, [], (err, rows) => {
      if (err) {
        return callback(err.message);
      }
      callback(null, rows);
    });
  },
};

module.exports = comicModel;

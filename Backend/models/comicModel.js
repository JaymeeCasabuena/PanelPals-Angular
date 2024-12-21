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
        "SELECT Id FROM Author WHERE Name = ?",
        [authorName]
      );
      if (author) return author.Id;

      const result = await dbHelpers.runQuery(
        "INSERT INTO Author (Name) VALUES (?)",
        [authorName]
      );
      return result.lastID;
    };

    const insertComic = async (authorId) => {
      const insertComicQuery = `
        INSERT INTO Comic (Title, YearPublished, Status, Link, AuthorId, Summary, Cover, IsApproved)
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
      const insertGenresQuery = `INSERT INTO ComicGenre (ComicId, GenreId) VALUES (?, ?)`;
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
        Comic.Id, 
        Comic.Title, 
        Comic.YearPublished,
        Comic.Status, 
        Comic.Link, 
        Comic.Summary,
        Author.Name AS AuthorName,
        Comic.Cover,
        Comic.IsApproved,
        GROUP_CONCAT(Genre.Name, ', ') AS Genres
      FROM Comic
      JOIN Author ON Comic.AuthorId = Author.Id
      LEFT JOIN ComicGenre ON Comic.Id = ComicGenre.ComicId
      LEFT JOIN Genre ON ComicGenre.GenreId = Genre.Id
      GROUP BY Comic.Id;
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
        Comic.Id, 
        Comic.Title, 
        Comic.YearPublished, 
        Comic.Status, 
        Comic.Link, 
        Comic.Summary,
        Author.Name AS AuthorName,
        Comic.Cover,
        Comic.IsApproved,
        GROUP_CONCAT(Genre.Name) AS Genres
      FROM Comic
      JOIN Author ON Comic.AuthorId = Author.Id
      LEFT JOIN ComicGenre ON Comic.Id = ComicGenre.ComicId
      LEFT JOIN Genre ON ComicGenre.GenreId = Genre.Id
      WHERE Comic.Id = ?
      GROUP BY Comic.Id;
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
      SELECT * FROM Genre;
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

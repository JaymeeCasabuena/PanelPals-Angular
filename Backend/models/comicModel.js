const db = require("../data/database");

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
    isApproved = 1,
    callback
  ) => {
    const checkQuery = "SELECT * FROM Comics WHERE Title = ?";
    db.get(checkQuery, [title], (err, book) => {
      if (err) {
        return callback(err.message);
      }

      if (book) {
        return callback("Comic already exists.");
      }

      const getAuthorQuery = "SELECT id FROM Author WHERE Name = ?";
      db.get(getAuthorQuery, [authorName], (err, author) => {
        if (err) {
          return callback(err.message);
        }

        if (!author) {
          return callback("Author not found.");
        }

        const authorId = author.id;

        const insertComicQuery = `
          INSERT INTO Comics (Title, YearPublished, Status, Link, AuthorId, Summary, Cover, IsApproved) 
          VALUES (?, ?, ?, ?, ?, ?, ?, ?);
        `;

        db.run(
          insertComicQuery,
          [
            title,
            yearPublished,
            status,
            link,
            authorId,
            summary,
            cover,
            isApproved,
          ],
          function (err) {
            if (err) {
              return callback(err.message);
            }

            const comicId = this.lastID;

            if (genres && genres.length > 0) {
              const insertGenresQuery = `
                INSERT INTO BookGenres (BookId, GenreId)
                VALUES (?, ?);
              `;

              genres.forEach((genreId) => {
                db.run(insertGenresQuery, [comicId, genreId], (err) => {
                  if (err) {
                    return callback(err.message);
                  }
                });
              });
            }

            callback(null, { comicId });
          }
        );
      });
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
        GROUP_CONCAT(Genres.Name) AS Genres
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
};

module.exports = comicModel;

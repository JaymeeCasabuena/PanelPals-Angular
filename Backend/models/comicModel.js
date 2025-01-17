const dbHelpers = require("../utils/dbHelper");

const comicModel = {
  addComic: async (
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
    try {
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

      const authorId = await getAuthorId(authorName);
      const comicId = await insertComic(authorId);
      await insertGenres(comicId);

      return { comicId };
    } catch (err) {
      console.error("Error occurred:", err);
      throw new Error("An error occurred while adding the comic.");
    }
  },

  getAllComics: async () => {
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
        AVG(Review.Rating) AS AverageRating,
        COUNT(DISTINCT Review.Id) AS TotalReviews,
        GROUP_CONCAT(Genre.Name, ', ') AS Genres
      FROM Comic
      JOIN Author ON Comic.AuthorId = Author.Id
      LEFT JOIN ComicGenre ON Comic.Id = ComicGenre.ComicId
      LEFT JOIN Genre ON ComicGenre.GenreId = Genre.Id
      LEFT JOIN Review ON Comic.Id = Review.ComicId
      GROUP BY Comic.Id;
    `;
    try {
      const rows = await dbHelpers.getAllQuery(selectComicsQuery, []);
      return rows;
    } catch (err) {
      throw new Error("An error occurred while fetching comics.");
    }
  },

  getPopularComics: async () => {
    const query = `
      SELECT 
        Comic.Id, 
        Comic.Title, 
        Author.Name AS AuthorName,
        Comic.Cover,
        AVG(Review.Rating) AS AverageRating
      FROM Comic
      JOIN Author ON Comic.AuthorId = Author.Id
      LEFT JOIN Review ON Comic.Id = Review.ComicId
      GROUP BY Comic.Id
      ORDER BY AverageRating DESC
      LIMIT 10;
    `;
    try {
      const rows = await dbHelpers.getAllQuery(query, []);
      return rows;
    } catch (err) {
      throw new Error("An error occurred while fetching popular comics.");
    }
  },

  getComicById: async (id) => {
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
        AVG(Review.Rating) AS AverageRating,
        COUNT(DISTINCT Review.Id) AS TotalReviews,
        GROUP_CONCAT(DISTINCT Genre.Name) AS Genres
      FROM Comic
      JOIN Author ON Comic.AuthorId = Author.Id
      LEFT JOIN Review ON Comic.Id = Review.ComicId
      LEFT JOIN ComicGenre ON Comic.Id = ComicGenre.ComicId
      LEFT JOIN Genre ON ComicGenre.GenreId = Genre.Id
      WHERE Comic.Id = ?
      GROUP BY Comic.Id;
    `;
    try {
      const row = await dbHelpers.getQuery(selectComicByIdQuery, [id]);
      return row;
    } catch (err) {
      throw new Error("An error occurred while fetching the comic.");
    }
  },

  getAllGenres: async () => {
    const getGenresQuery = `
      SELECT * FROM Genre;
    `;
    try {
      const rows = await dbHelpers.getAllQuery(getGenresQuery, []);
      return rows;
    } catch (err) {
      throw new Error("An error occurred while fetching genres.");
    }
  },

  searchComics: async (searchTerm) => {
    const query = `
      SELECT 
        Comic.Id, 
        Comic.Title, 
        Author.Name AS AuthorName,
        GROUP_CONCAT(DISTINCT Genre.Name) AS Genres
      FROM Comic
      INNER JOIN Author ON Comic.AuthorId = Author.Id
      LEFT JOIN ComicGenre ON Comic.Id = ComicGenre.ComicId
      LEFT JOIN Genre ON ComicGenre.GenreId = Genre.Id
      WHERE 
        Comic.Title LIKE ? 
        OR Author.Name LIKE ? 
        OR Genre.Name LIKE ?
      GROUP BY Comic.Id;
    `;
    try {
      const rows = await dbHelpers.getAllQuery(query, [
        `%${searchTerm}%`,
        `%${searchTerm}%`,
        `%${searchTerm}%`,
      ]);
      return rows;
    } catch (err) {
      console.error("Database query error:", err);
      throw new Error("An error occurred while searching comics.");
    }
  },
};

module.exports = comicModel;

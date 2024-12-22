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
        GROUP_CONCAT(Genre.Name, ', ') AS Genres
      FROM Comic
      JOIN Author ON Comic.AuthorId = Author.Id
      LEFT JOIN ComicGenre ON Comic.Id = ComicGenre.ComicId
      LEFT JOIN Genre ON ComicGenre.GenreId = Genre.Id
      GROUP BY Comic.Id;
    `;
    try {
      const rows = await dbHelpers.getAllQuery(selectComicsQuery, []);
      console.log(rows, "Query result rows");
      return rows;
    } catch (err) {
      throw new Error("An error occurred while fetching comics.");
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
        GROUP_CONCAT(Genre.Name) AS Genres
      FROM Comic
      JOIN Author ON Comic.AuthorId = Author.Id
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
};

module.exports = comicModel;

const express = require("express");
const userRoutes = require("./routes/userRoutes");
const comicRoutes = require("./routes/comicRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const discussionRoutes = require("./routes/discussionRoutes");
const commentRoutes = require("./routes/commentRoutes");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:4200"],
  })
);

app.use("/users", userRoutes);
app.use("/comics", comicRoutes);
app.use("/reviews", reviewRoutes);
app.use("/discussions", discussionRoutes);
app.use("/comments", commentRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

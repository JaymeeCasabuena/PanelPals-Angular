const express = require("express");
const userRoutes = require("./routes/userRoutes");
const app = express();
const cors = require("cors");

console.log(typeof userRoutes); // Should log 'function' if correctly set up

app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:4200"],
  })
);

app.use("/users", userRoutes);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "React app URL");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

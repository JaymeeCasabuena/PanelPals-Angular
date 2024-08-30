const express = require("express");
const userRoutes = require("./routes/userRoutes");
const app = express();

console.log(typeof userRoutes); // Should log 'function' if correctly set up

app.use(express.json());
app.use("/users", userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

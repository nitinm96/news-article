const express = require("express");
const connectDB = require("./config/dbConnection");
const dotenv = require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();
app.use(express.json());

// Use the routes
app.use("/api/articles", require("./routes/articlesRoute"));
app.use("/api/users", require("./routes/usersRoute"));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

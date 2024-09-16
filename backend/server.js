const express = require("express");
const connectDB = require("./config/dbConnection");
const dotenv = require("dotenv").config();
const cors = require("cors");
const corsOptions = {
  origin: ["http://localhost:5173"],
};
const app = express();
const PORT = process.env.PORT || 5000;

connectDB();
app.use(express.json());
app.use(cors(corsOptions));

// Use the routes
app.use("/api/articles", require("./routes/articlesRoute"));
app.use("/api/users", require("./routes/usersRoute"));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

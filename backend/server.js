const express = require("express");
const connectDB = require("./config/dbConnection");
const dotenv = require("dotenv").config();
const swaggerJSdoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");
const cors = require("cors");
const { version } = require("mongoose");
const corsOptions = {
  origin: ["http://localhost:5173"],
};

const app = express();
const PORT = process.env.PORT || 5000;

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      version: "1.0.0",
      title: "News Application API",
      description:
        "News Application API Information to fetch news articles, save favorite articles and fetch user information.",
      contact: {
        name: "Nitin Minhas",
      },
      components: {
        securitySchemas: {
          bearerAuth: {
            type: "http",
            scheme: "bearer",
            bearerFormat: "JWT",
          },
        },
      },
      security: [
        {
          bearerAuth: [],
        },
      ],
      servers: [`http://localhost:${PORT}`],
    },
    schemes: ["http"],
  },
  apis: ["./routes/*.js", "./models/*.js"],
};

const swaggerDocs = swaggerJSdoc(swaggerOptions);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));

connectDB();
app.use(express.json());
app.use(cors(corsOptions));

// Use the routes
app.use("/api/articles", require("./routes/articlesRoute"));
app.use("/api/users", require("./routes/usersRoute"));

//verify the server is running
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(
    `API documentation is running at http://localhost:${PORT}/api-docs`
  );
});

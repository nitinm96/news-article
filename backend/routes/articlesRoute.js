const express = require("express");

const {
  getArticles,
  getFavoriteArticles,
  postFavoriteArticles,
  deleteFavoriteArticle,
} = require("../controllers/articleController");
const validateTokenHandler = require("../middleware/validateTokenHandler");

//Create a new router to handle /articles routes
const router = express.Router();

//Fetch news from Mediastack API
router.route("/").get(getArticles);

//Fetch favorite articles for authorized user
router.route("/favorites").get(validateTokenHandler, getFavoriteArticles);

//add articles to favorites for authorized user
router.route("/favorites").post(validateTokenHandler, postFavoriteArticles);

//delete articles from favorites for authorized user
router
  .route("/favorites/:id")
  .delete(validateTokenHandler, deleteFavoriteArticle);

module.exports = router;

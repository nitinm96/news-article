const express = require("express");

const router = express.Router();
const {
  getArticles,
  getFavoriteArticles,
  postFavoriteArticles,
  deleteFavoriteArticle,
} = require("../controllers/articleController");
const validateTokenHandler = require("../middleware/validateTokenHandler");

// Fetch news from Mediastack API
router.route("/").get(getArticles);

//Fetch Favorite Articles
router.route("/favorites").get(validateTokenHandler, getFavoriteArticles);

//add articles to favorites
router.route("/favorites").post(validateTokenHandler, postFavoriteArticles);

//delete articles from favorites
router
  .route("/favorites/:id")
  .delete(validateTokenHandler, deleteFavoriteArticle);

module.exports = router;

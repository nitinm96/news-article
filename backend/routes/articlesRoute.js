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

/**
 * @openapi
 * /api/articles:
 *  get:
 *    tags:
 *      - Articles
 *    summary: "get all articles from Mediastack API"
 *    responses:
 *      '200':
 *        description: "Articles fetched successfully"
 *      '500':
 *        description: "Error fetching articles"
 */
router.route("/").get(getArticles); //Fetch news from Mediastack API

/**
 * @openapi
 * /api/articles/favorites:
 *  get:
 *    tags:
 *      - Articles
 *    summary: "Get all favorite articles for logged in user"
 *    parameters:
 *      - name: userId
 *        in: path
 *        description: The ID of the user to fetch favorite articles
 *        required: true
 *    responses:
 *      '200':
 *        description: "Articles fetched successfully or user has 0 articles favorited"
 *      '404':
 *        description: "No article found for user or user not found"
 *      '500':
 *        description: "Failed to fetch favorite articles"
 *
 */
router.route("/favorites").get(validateTokenHandler, getFavoriteArticles); //Fetch favorite articles for authorized user

/**
 * @openapi
 * /api/articles/favorites:
 *  post:
 *    tags:
 *      - Articles
 *    summary: "Add an article to favorites for the logged-in user"
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Article'
 *    responses:
 *      '201':
 *        description: "Article added to favorites successfully"
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/PostArticleResponse'
 *      '400':
 *        description: "Client error, missing required fields"
 *      '404':
 *        description: "User not found"
 *      '500':
 *        description: "Failed to add the article to favorites"
 */

router.route("/favorites").post(validateTokenHandler, postFavoriteArticles); //add articles to favorites for authorized user

/**
 * @openapi
 * /api/articles/favorites/{id}:
 *  delete:
 *    tags:
 *      - Articles
 *    summary: "Delete an article from favorites by ID"
 *    parameters:
 *      - name: id
 *        in: path
 *        description: "ID of the article to be deleted"
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      '200':
 *        description: "Article removed from favorites successfully"
 *        content:
 *      '403':
 *        description: "User not authorized to delete this article"
 *      '404':
 *        description: "Article not found"
 *      '500':
 *        description: "Failed to delete article"
 */
router
  .route("/favorites/:id")
  .delete(validateTokenHandler, deleteFavoriteArticle); //delete articles from favorites for authorized user

module.exports = router;

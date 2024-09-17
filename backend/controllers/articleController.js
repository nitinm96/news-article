const axios = require("axios");
const Article = require("../models/articleModel");
const User = require("../models/userModel");
//@desc get all articles
//@route GET /api/articles
//@access Private

const getArticles = async (req, res) => {
  const { category } = req.query;
  try {
    let query = `http://api.mediastack.com/v1/news?access_key=${process.env.ARTICLES_API_KEY}&countries=us&languages=en&limit=100`;

    if (category) {
      query += `&categories=${encodeURIComponent(category)}`;
    }

    const { data } = await axios.get(query);
    res.json(data);
  } catch (error) {
    console.error(error.message);
    res
      .status(500)
      .json({ error: "Something went wrong while fetching news." });
  }
};

//@desc get all favorite articles for logged in user
//@route GET /api/articles/favorites
//@access Private

const getFavoriteArticles = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findOne({ _id: userId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    console.log(user);
    // Find fav articles with user id
    const articles = await Article.find({ userId: userId });
    console.log(articles);

    if (articles.length === 0) {
      return res.status(200).json({ message: "No Articles Favorited Yet." });
    }
    if (!articles.length) {
      return res
        .status(404)
        .json({ message: "No articles found for this user" });
    }
    // Return the articles
    res.json({ articles });
  } catch (error) {
    console.log(error.message);
    res
      .status(500)
      .json({ message: "Failed to fetch favorite articles", error });
  }
};

//@desc add articles to favorites
//@route POST /api/articles/favorites
//@access Private

const postFavoriteArticles = async (req, res) => {
  console.log("request body: ", req.body);
  //destructure the parameters from request body
  const {
    author,
    title,
    description,
    url,
    source,
    image,
    category,
    language,
    country,
    published_at,
  } = req.body;

  if (
    !author ||
    !title ||
    !description ||
    !url ||
    !source ||
    !image ||
    !category ||
    !language ||
    !country ||
    !published_at
  ) {
    return res.status(400).json({ error: "Please fill in all fields" });
  }

  const newFavArticle = await Article.create({
    userId: req.user.id,
    author,
    title,
    description,
    url,
    source,
    image,
    category,
    language,
    country,
    published_at,
  });
  res.status(201).json({ message: "Article added to favorites" });
};

//@desc delete articles from favorites
//@route DELETE /api/articles/favorites/:id
//@access Private

const deleteFavoriteArticle = async (req, res) => {
  const article = await Article.findById(req.params.id);
  if (!article) {
    return res.status(404).json({ message: "Article not found" });
  }
  if (article.userId.toString() !== req.user.id) {
    return res.status(403).json({ message: "User not authorized" });
  }
  await Article.deleteOne({
    _id: req.params.id,
  });
  res.status(200).json({ message: "Article removed from favorites" });
};

module.exports = {
  getArticles,
  getFavoriteArticles,
  postFavoriteArticles,
  deleteFavoriteArticle,
};

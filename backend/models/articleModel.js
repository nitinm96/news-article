const mongoose = require("mongoose");

/**
 * @openapi
 * components:
 *   schemas:
 *     Article:
 *       type: object
 *       required:
 *         - userId
 *         - author
 *         - title
 *         - description
 *         - url
 *         - source
 *         - category
 *         - language
 *         - country
 *         - publishedAt
 *       properties:
 *         author:
 *           type: string
 *           default: "James Gunn"
 *         title:
 *           type: string
 *           default: "This is the title"
 *         description:
 *           type: string
 *           default: "this is the description"
 *         url:
 *           type: string
 *           default: "article url"
 *         source:
 *           type: string
 *           default: "Article source"
 *         category:
 *           type: string
 *           default: "general"
 *         language:
 *           type: string
 *           default: "EN"
 *         country:
 *           type: string
 *           default: "US"
 *         publishedAt:
 *           type: string
 *           default: "article publishing date"
 *     PostArticleResponse:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         createdAt:
 *           type: string
 *         updatedAt:
 *           type: string
 */
const articleSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  author: { type: String, required: [true, "Please provide an author"] },
  title: { type: String, required: [true, "Please provide title"] },
  description: {
    type: String,
    required: [true, "Please provide a description"],
  },
  url: { type: String, required: [true, "Please provide a article url"] },
  source: { type: String, required: [true, "Please provide a source"] },
  category: String,
  language: String,
  country: String,
  publishedAt: String,
});

module.exports = mongoose.model("Article", articleSchema);

const mongoose = require("mongoose");

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

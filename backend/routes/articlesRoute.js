const express = require('express');
const axios = require('axios');
const router = express.Router();

// Fetch news from Mediastack API
router.get('/', async (req, res) => {
  try {
    const { data } = await axios.get(`http://api.mediastack.com/v1/news?access_key=${process.env.ARTICLES_API_KEY}& countries = au,-us& languages = en,-de&`);
    res.json(data);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Something went wrong while fetching news.' });
  }
});

module.exports = router;
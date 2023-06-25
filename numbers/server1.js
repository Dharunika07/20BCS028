const express = require('express');
const axios = require('axios');
const { uniq } = require('lodash');

const app = express();
const PORT = 3000;

// Helper function to make HTTP requests to the external API
const fetchNumbersFromUrl = async (url) => {
  try {
    const response = await axios.get(url);
    return response.data.numbers || [];
  } catch (error) {
    console.error(`Error fetching numbers from ${url}:`, error.message);
    return [];
  }
};

app.get('/numbers', async (req, res) => {
  const urls = req.query.urls;

  if (!urls || !Array.isArray(urls)) {
    return res.status(400).json({ error: 'Invalid or missing URLs' });
  }

  const responsePromises = urls.map(url => fetchNumbersFromUrl(url));

  try {
    const responses = await Promise.allSettled(responsePromises);

    const validResponses = responses
      .filter(response => response.status === 'fulfilled')
      .map(response => response.value)
      .flatMap(data => Array.isArray(data) ? data : [])
      .filter(Number.isInteger);

    const uniqueNumbers = uniq(validResponses.sort((a, b) => a - b));

    res.json({ numbers: uniqueNumbers });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Number Management Service is running on port ${PORT}`);
});

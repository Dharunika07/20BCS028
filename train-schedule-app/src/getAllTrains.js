const axios = require('axios');

const getAllTrains = async () => {
  try {
    const response = await axios.get('http://104.211.219.98/train/s', {
      headers: {
        Authorization: 'Bearer nSFqRI',
      },
    });

    console.log('Request successful!');
    console.log('Train details:', response.data);
  } catch (error) {
    console.error('Request failed:', error.message);
  }
};

getAllTrains();

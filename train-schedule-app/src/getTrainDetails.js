const axios = require('axios');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const getTrainDetails = async (trainNumber, authToken) => {
  try {
    const response = await axios.get(`http://104.211.219.98/train/trains/${trainNumber}`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    console.log('Request successful!');
    console.log('Train details:', response.data);
  } catch (error) {
    console.error('Request failed:', error.message);
  } finally {
    rl.close();
  }
};

rl.question('Enter the train number: ', (trainNumber) => {
  const authToken = 'nSFqRI';

  getTrainDetails(trainNumber, authToken);
});

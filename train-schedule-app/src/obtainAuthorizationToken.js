const axios = require('axios');

const obtainAuthorizationToken = async () => {
  try {
    const response = await axios.post('http://104.211.219.98/train/auth', {
      companyName: 'Train Central',
      clientID: 'YOUR_CLIENT_ID',
      ownerName: 'Ram',
      ownerEmail: 'ram@abc.edu.in',
      rollNo: '1',
      clientSecret: 'YOUR_CLIENT_SECRET',
    });

    console.log('Authorization successful!');
    console.log('Token Type:', response.data.token_type);
    console.log('Access Token:', response.data.access_token);
    console.log('Expires In:', response.data.expires_in);
  } catch (error) {
    console.error('Authorization failed:', error.message);
  }
};

obtainAuthorizationToken();

const axios = require('axios');

const registerCompany = async () => {
  try {
    const response = await axios.post('http://104.211.219.98/train/register', {
      companyName: 'Train Central',
      ownerName: 'Ram',
      rollno: '1',
      ownerEmail: 'ram@abc.edu.in',
      accessCode: 'FKDLJG',
    });

    console.log('Registration successful!');
    console.log('Company Name:', response.data.companyName);
    console.log('Client ID:', response.data.clientID);
    console.log('Client Secret:', response.data.clientSecret);
  } catch (error) {
    console.error('Registration failed:', error.message);
  }
};

registerCompany();

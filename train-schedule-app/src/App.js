import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import TrainList from './TrainList';
import SingleTrain from './SingleTrain';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TrainList />} />
        <Route path="/train/:trainNumber" element={<SingleTrain />} />
      </Routes>
    </Router>
  );
};

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

    // Store the client credentials in the component state
    setClientID(response.data.clientID);
    setClientSecret(response.data.clientSecret);
  } catch (error) {
    console.error('Registration failed:', error.message);
  }
};


export default App;

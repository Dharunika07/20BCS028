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

const express = require('express');
const axios = require('axios');
const readline = require('readline');

const app = express();
const port = 3000;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let clientID = '';
let clientSecret = '';

app.post('/train/register', async (req, res) => {
  try {
    const { companyName, ownerName, rollNo, ownerEmail, accessCode } = req.body;

    const response = await axios.post('http://104.211.219.98/train/register', {
      companyName,
      ownerName,
      rollno: rollNo,
      ownerEmail,
      accessCode,
    });

    console.log('Registration successful!');
    console.log('Company Name:', response.data.companyName);
    console.log('Client ID:', response.data.clientID);
    console.log('Client Secret:', response.data.clientSecret);

    clientID = response.data.clientID;
    clientSecret = response.data.clientSecret;

    res.sendStatus(200);
  } catch (error) {
    console.error('Registration failed:', error.message);
    res.sendStatus(500);
  }
});

app.get('/train/trains/:trainNumber', async (req, res) => {
  try {
    const trainNumber = req.params.trainNumber;
    const authToken = 'nSFqRI'; 

    const response = await axios.get(`http://104.211.219.98/train/trains/${trainNumber}`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    console.log('Request successful!');
    console.log('Train details:', response.data);

    res.status(200).json(response.data);
  } catch (error) {
    console.error('Request failed:', error.message);
    res.sendStatus(500);
  } finally {
    rl.close();
  }
});

rl.question('Enter the company name: ', (companyName) => {
  rl.question('Enter the owner name: ', (ownerName) => {
    rl.question('Enter the roll number: ', (rollNo) => {
      rl.question('Enter the owner email: ', (ownerEmail) => {
        rl.question('Enter the access code: ', (accessCode) => {
          axios
            .post('http://localhost:3000/train/register', {
              companyName,
              ownerName,
              rollNo,
              ownerEmail,
              accessCode,
            })
            .then(() => {
              rl.question('Enter the train number: ', (trainNumber) => {
                const authToken = 'nSFqRI'; 

                axios
                  .get(`http://localhost:3000/train/trains/${trainNumber}`, {
                    headers: {
                      Authorization: `Bearer ${authToken}`,
                    },
                  })
                  .then((response) => {
                    console.log('Train details:', response.data);
                  })
                  .catch((error) => {
                    console.error('Error:', error.message);
                  })
                  .finally(() => {
                    rl.close();
                  });
              });
            })
            .catch((error) => {
              console.error('Error:', error.message);
              rl.close();
            });
        });
      });
    });
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

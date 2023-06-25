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

export default App;

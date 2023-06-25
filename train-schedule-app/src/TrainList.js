import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TrainList = () => {
  const [trains, setTrains] = useState([]);

  useEffect(() => {
    const fetchTrains = async () => {
      const response = await axios.get('http://104.211.219.98/train/schedule');
      setTrains(response.data);
    };

    fetchTrains();
  }, []);

  return (
    <div>
      <h2>All Trains</h2>
      {trains.map(train => (
        <div key={train.trainNumber}>
          <h3>Train Number: {train.trainNumber}</h3>
          <p>Departure Time: {train.departureTime}</p>
          <p>Seats Available (Sleeper): {train.seatsAvailable.sleeper}</p>
          <p>Seats Available (AC): {train.seatsAvailable.ac}</p>
          <p>Price (Sleeper): {train.price.sleeper}</p>
          <p>Price (AC): {train.price.ac}</p>
        </div>
      ))}
    </div>
  );
};

export default TrainList;

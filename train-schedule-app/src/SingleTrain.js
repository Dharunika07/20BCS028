import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const SingleTrain = () => {
  const { trainNumber } = useParams();
  const [train, setTrain] = useState(null);

  useEffect(() => {
    const fetchTrain = async () => {
      const response = await axios.get(`http://104.211.219.98/train/schedule/${trainNumber}`);
      setTrain(response.data);
    };

    fetchTrain();
  }, [trainNumber]);

  if (!train) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Train Number: {train.trainNumber}</h2>
      <p>Departure Time: {train.departureTime}</p>
      <p>Seats Available (Sleeper): {train.seatsAvailable.sleeper}</p>
      <p>Seats Available (AC): {train.seatsAvailable.ac}</p>
      <p>Price (Sleeper): {train.price.sleeper}</p>
      <p>Price (AC): {train.price.ac}</p>
    </div>
  );
};

export default SingleTrain;

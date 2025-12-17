import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GetIpAddress = () => {
  const [ip, setIp] = useState(null);

  useEffect(() => {
    // Use an API to fetch the public IP address
    axios.get('https://api.ipify.org?format=json')
      .then(response => {
        setIp(response.data.ip);
      })
      .catch(error => {
        console.error('Error fetching IP address:', error);
      });
  }, []);

  return (
    <div>
      <h1>Your IP Address:</h1>
      {ip ? <p>{ip}</p> : <p>Loading...</p>}
    </div>
  );
};

export default GetIpAddress;

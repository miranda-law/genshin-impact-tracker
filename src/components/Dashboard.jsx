import React from 'react';

const Dashboard = () => {

  // Get the current date
  const today = new Date();

  // Define formatting options
  const options = {
    weekday: 'long'
  };

  // Format the date string
  const formattedDate = today.toLocaleDateString('en-US', options);

  return (
    <div>
      <h1>Dashboard</h1>
      <p className="date-display">Today is {formattedDate}</p>
    </div>
  );
};

export default Dashboard;
import React from 'react';
import './greeting.css'

const Greeting = () => {
  const currentHour = new Date().getHours();
  let greeting;

  if (currentHour >= 5 && currentHour < 12) {
    greeting = 'Good Morning';
  } else if (currentHour >= 12 && currentHour < 18) {
    greeting = 'Good Afternoon';
  } else if (currentHour >= 18 && currentHour < 22) {
    greeting = 'Good Evening';
  } else {
    greeting = 'Good Night';
  }

  return (
    <div className="greeting">
      <h2>Welcome & {greeting} to BMI Smart Guide!</h2>
    </div>
  );
};

export default Greeting;

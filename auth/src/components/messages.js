import React, { useState, useEffect } from 'react';
import Typewriter from '../components/Typewriter';

const Messages = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const messages = [
    "Coongratulations!!",
    "Yoou finally ran your first dockerized web app",
    "Abbout time don't you think?",
    "Yoou are not very brigth, I can see that don't worry ;(",
    "Neehal will help you",
    "Noow you know the power of Docker, go on login and see how all the microservices are working together",
    "Thhe password is 12345",
    "Thhe username is testuser",
    "Noow go on don't be shy, shuu shuuu shuuuu"
  ];

  const handleComplete = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % messages.length); // Move to the next message
  };

  return (
    <div style={{ fontFamily: 'Pixelify Sans, sans-serif' }}>
      {messages.length > 0 && (
        <Typewriter
          key={currentIndex} // Ensures the component re-renders with new messages
          text={messages[currentIndex]}
          speed={150}
          onComplete={handleComplete}
          pauseDuration={4000}
        />
      )}
    </div>
  );
};

export default React.memo(Messages); // Memoize the Messages component

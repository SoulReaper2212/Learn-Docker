import React, { useState, useEffect } from 'react';
import Typewriter from '../components/Typewriter';

const Messages = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const messages = [
    "Soo, as you can see ",
    "Yoou were able to run 3 instances, server, authentication and storefront",
    "Siimultaneously with the use of single command",
    "Doocker makes it all easier, no more errors of installing the right dependencies",
   
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

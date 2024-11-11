import React, { useState, useEffect } from 'react';

const Typewriter = React.memo(({ text, speed, onComplete, pauseDuration }) => {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    let index = 0;
    setDisplayedText('');

    const typingInterval = setInterval(() => {
      if (index < text.length-1) {
        setDisplayedText((prev) => prev + text[index]);
        index += 1;
      } else {
        clearInterval(typingInterval);
        if (onComplete) {
          setTimeout(() => {
            onComplete();
          }, pauseDuration);
        }
      }
    }, speed);

    return () => clearInterval(typingInterval); // Cleanup on unmount
  }, [text, speed, onComplete, pauseDuration]);

  return <span>{displayedText}</span>;
});

export default Typewriter;

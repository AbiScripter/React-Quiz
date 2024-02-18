import React, { useState, useEffect } from "react";

const Timer = ({ dispatch, numQuestions }) => {
  const timeForEachQuestion = 20;
  const [seconds, setSeconds] = useState(numQuestions * timeForEachQuestion);

  // Function to update the timer every second
  useEffect(() => {
    // Function to update the timer every second
    const timerInterval = setInterval(() => {
      setSeconds((prevSeconds) => {
        if (prevSeconds === 0) {
          clearInterval(timerInterval);
          dispatch({ type: "finishedQuiz" });
          return 0;
        } else {
          return prevSeconds - 1;
        }
      });
    }, 1000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(timerInterval);
  }, []);

  // Function to format the time as "minutes.seconds"
  const formatTime = () => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes < 10 ? 0 : ""}${minutes}.${
      remainingSeconds < 10 ? 0 : ""
    }${remainingSeconds} 
    `;
  };

  return (
    <div>
      <h1>Countdown Timer</h1>
      <p>{formatTime()}</p>
    </div>
  );
};

export default Timer;

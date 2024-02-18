import React from "react";
import { useState, useEffect } from "react";

const ProgressBar = ({ percent }) => {
  return (
    <div className="progress-bar">
      <div className="progress" style={{ width: `${percent}%` }}></div>
    </div>
  );
};

const Progress = ({ progress, numQuestions }) => {
  //   const [progress, setProgress] = useState(0);
  let percent = Math.floor((progress / (numQuestions * 10)) * 100);
  console.log(percent);

  // Simulate progress update
  //   useEffect(() => {
  //     const interval = setInterval(() => {
  //       if (progress < 100) {
  //         setProgress(progress + 10);
  //       }
  //     }, 1000);

  //     return () => clearInterval(interval);
  //   }, [progress]);

  return (
    <div>
      <ProgressBar percent={percent} />
    </div>
  );
};

export default Progress;

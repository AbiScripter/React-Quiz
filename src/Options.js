import React, { useState } from "react";

const Options = ({ question, dispatch, state }) => {
  //
  const handleOptionClick = (optionIndex) => {
    //set the selected option
    dispatch({ type: "optionSelected", payload: optionIndex });
    //if correct option is selected update the points
    if (optionIndex === question.correctOption) {
      dispatch({ type: "pointsUpdate", payload: question.points });
    }
  };

  const getOptionStyle = (index) => {
    //if any one of the option selected
    if (state.selectedOption !== null) {
      //and if its correct option
      if (index === question.correctOption) {
        return "right";
      } else {
        return "wrong";
      }
    }
    return "";
  };

  return (
    <div>
      {question.options.map((option, index) => (
        <button
          key={index}
          onClick={() => handleOptionClick(index)}
          // style={getOptionStyle(index)}
          className={getOptionStyle(index)}
          disabled={state.selectedOption === null ? false : true}
        >
          {option}
        </button>
      ))}
    </div>
  );
};

export default Options;

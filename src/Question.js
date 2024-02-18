import { useState } from "react";
import Options from "./Options";

export default function Question({ question, dispatch, state }) {
  function handleNext() {
    //if its a last question show end screen
    if (state.questions.length - 1 === state.currIndex) {
      dispatch({ type: "finishedQuiz" });
    } else {
      dispatch({ type: "nextQuestion" });
    }
    //after each question reset the selected option as null and increase progress bar
    dispatch({ type: "optionSelected", payload: null });
    dispatch({ type: "progress" });
  }

  return (
    <div>
      <h4>{question.question}</h4>
      <Options question={question} dispatch={dispatch} state={state} />
      {state.selectedOption !== null && (
        <button className="next" onClick={handleNext}>
          NEXT
        </button>
      )}
    </div>
  );
}

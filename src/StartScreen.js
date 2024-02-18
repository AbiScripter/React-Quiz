export default function StartScreen({ numQuestions, dispatch }) {
  return (
    <div>
      <p>Welcome to the quiz</p>
      <p>{numQuestions} questions to test your React mastery</p>
      <button onClick={() => dispatch({ type: "startQuiz" })}>
        Start Quiz
      </button>
    </div>
  );
}

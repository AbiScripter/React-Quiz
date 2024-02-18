import { useEffect, useReducer } from "react";
import Header from "./Header";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import Progress from "./ProgressBar";
import Timer from "./Timer";

const url = `http://localhost:8000/questions`;

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived": {
      return {
        ...state,
        questions: action.payload,
        status: "ready",
      };
    }

    case "startQuiz": {
      return {
        ...state,
        status: "active",
      };
    }

    case "optionSelected": {
      return { ...state, selectedOption: action.payload };
    }

    case "nextQuestion": {
      return { ...state, currIndex: state.currIndex + 1 };
    }

    case "pointsUpdate": {
      // console.log(state.points);
      // console.log(action.payload);
      return { ...state, points: state.points + action.payload };
    }

    case "progress": {
      return { ...state, progress: state.progress + 10 };
    }

    case "finishedQuiz": {
      return { ...state, status: "end" };
    }

    case "dataFailed":
      return { ...state, status: "error" };

    case "reset": {
      return { ...initialState, questions: state.questions, status: "ready" };
    }

    default:
      throw new Error("not found");
  }
}

const initialState = {
  questions: [],
  points: 0,
  //loading-->-->ready-->active-->finish--error
  status: "loading",
  currIndex: 0,
  selectedOption: null,
  progress: 0,
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { questions, points, status, currIndex, selectedOption, progress } =
    state; //destructuring

  const numQuestions = questions.length;
  // console.log(numQuestions);

  useEffect(() => {
    async function fetchData() {
      try {
        let response = await fetch(url);
        let data = await response.json();
        console.log(data);
        dispatch({ type: "dataReceived", payload: data });
      } catch (error) {
        dispatch({ type: "dataFailed" });
      }
    }
    fetchData();
  }, []);

  return (
    <div>
      <Header />
      <main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <Progress progress={progress} numQuestions={numQuestions} />
            <h3>Your current score is {points} / 280</h3>
            <Question
              question={questions[currIndex]}
              dispatch={dispatch}
              state={state}
            />
            <Timer dispatch={dispatch} numQuestions={numQuestions} />
          </>
        )}
        {status === "end" && <EndScreen points={points} dispatch={dispatch} />}
      </main>
    </div>
  );
}

function EndScreen({ points, dispatch }) {
  if (localStorage.getItem("high") === null) {
    localStorage.setItem("high", points);
  }

  let high = Number(localStorage.getItem("high"));

  if (points > high) {
    high = points;
    localStorage.setItem("high", high);
  }

  return (
    <div>
      <h2>Your current score is {points} / 280</h2>
      <h4>HIGH SCORE : {high}</h4>
      <button onClick={() => dispatch({ type: "reset" })}>Restart</button>
    </div>
  );
}

export default App;

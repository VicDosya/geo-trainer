import { React, useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./Trainer.module.css";

export const ShapeTrainer = () => {
  //useState variables
  const [question, setQuestion] = useState([]);
  const [statusMessage, setStatusMessage] = useState("");
  const [score, setScore] = useState(0);
  const [choiceButton, setChoiceButton] = useState(false);
  const [incorrectAnswers, setIncorrectAnswers] = useState([]);
  const [svgScale, setSvgScale] = useState(1);
  const [pathDim, setPathDim] = useState({
    x: 0,
    y: 0,
    width: 250,
    height: 250,
  });

  //useRef variables
  const pathDimRef = useRef();
  const svgDimRef = useRef();

  //Fire loadQuiz function when the page loads. The page rendered twice(I removed StrictMode from index.js).
  useEffect(() => {
    loadQuiz();
  }, []);

  //Get svg dimensions and apply them to the pathDim state variable.
  useEffect(() => {
    const pathBbox = pathDimRef.current?.getBBox();
    if (
      pathDim.x === pathBbox.x &&
      pathDim.y === pathBbox.y &&
      pathDim.width === pathBbox.width &&
      pathDim.height === pathBbox.height
    )
      return;
    setPathDim(pathBbox);
  });

  //Load quiz(question) function
  const loadQuiz = async () => {
    const res = await axios.get("/api/shapes/quiz");
    setQuestion(res.data);
    setTimeout(() => {
      setStatusMessage("");
    }, 2000);
    setChoiceButton(false);
  };

  //Handle User's guess choice
  const guessHandling = async (userGuess, index) => {
    setChoiceButton(true);
    const res = await axios.post("/api/shapes/guess", { userGuess });
    if (!res.data.correctStatus) {
      setStatusMessage(res.data.returnStatus);
      setChoiceButton(false);
      setIncorrectAnswers([
        ...incorrectAnswers,
        index
      ]);
    } else {
      setStatusMessage(res.data.returnStatus);
      setScore(score + 1);
      loadQuiz();
      setChoiceButton(true);
      setIncorrectAnswers([]);
    }
  };

  //Redirecting to home page on button click
  let navigate = useNavigate();
  const goBackRoute = () => navigate(-1);

  //JSX
  return (
    <div className={styles.menuContainer}>
      <div className={styles.topContainer}>
        <button onClick={goBackRoute} className={styles.backButton}>
          ⬅
        </button>
        <h1 className={styles.trainerTitle}>Shapes Trainer Page</h1>
      </div>
      <div className={styles.questionContainer}>
        {/* SVG Shape code */}
        <svg
          ref={svgDimRef}
          className={styles.mySvg}
          xmlns="http://www.w3.org/2000/svg"
          viewBox={`${pathDim.x} ${pathDim.y} ${pathDim.width} ${pathDim.height}`}
        >
          <g
            className={styles.myGroup}
            style={{ transform: `scale(${svgScale})` }}
          >
            <path
              ref={pathDimRef}
              className={styles.myPath}
              d={question.pathShape}
              fill="red"
            ></path>
          </g>
        </svg>
      </div>
      <div className={styles.statusMessageContainer}>
        <h1 className={styles.statusMessage}>{statusMessage}</h1>
      </div>
      <div className={styles.questionContainer}>
        <h1 className={styles.questionTitle}>
          {question.question} Score: {score}
        </h1>
      </div>
      <div className={styles.choicesContainer}>
        {question.options?.map((option, index) => (
          <button
            disabled={choiceButton || incorrectAnswers.includes(index)}
            key={index}
            className={`${styles.answer} ${incorrectAnswers.includes(index) ? styles.incorrectAnswer : ''}`}
            onClick={() => guessHandling(option, index)}
          >
            {option}
          </button>
        ))}
        {/* Optional Chaining (the question mark) used here, because JS thought the question.options array was undefined. */}
      </div>
    </div>
  );
};

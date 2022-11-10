import { React, useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./Trainer.module.css";

export const ShapeTrainer = () => {
  //useState variables
  const [question, setQuestion] = useState([]);
  const [statusMessage, setStatusMessage] = useState("");
  const [score, setScore] = useState(0);
  const [pathDim, setPathDim] = useState({
    x: 0,
    y: 0,
    width: 250,
    height: 250,
  });
  const [svgScale, setSvgScale] = useState(1);

  //useRef variables
  const pathDimRef = useRef();
  const svgDimRef = useRef();

  //Fire loadQuiz function when the page loads. The page rendered twice(I removed StrictMode from index.js).
  useEffect(() => {
    loadQuiz();
  }, []);

  //Resize svg 
  const bBox = pathDimRef.current?.getBBox();
  useEffect(() => {
    const pd = pathDimRef.current.getBBox();
    setPathDim(pd);
    const ssh = svgDimRef.current?.clientHeight;
    setSvgScale(1 / (pd.height / ssh));
  }, [pathDimRef.current?.getBBox().x, pathDimRef.current?.getBBox().y, pathDimRef.current?.getBBox().width, pathDimRef.current?.getBBox().height]);

  //Load quiz(question) function
  const loadQuiz = async () => {
    const res = await axios.get("/api/shapes/quiz");
    setQuestion(res.data);
    setTimeout(() => {
      setStatusMessage("");
    }, 2000);
  };

  //Handle User's guess choice
  const guessHandling = async (userGuess) => {
    const res = await axios.post("/api/shapes/guess", { userGuess });
    if (!res.data.correctStatus) {
      setStatusMessage(res.data.returnStatus);
    } else {
      setStatusMessage(res.data.returnStatus);
      setScore(score + 1);
      loadQuiz();
    }
  };

  //Redirecting to home page on button click
  let navigate = useNavigate();
  const goBackRoute = () => navigate(-1);

  //JSX
  return (
    <div>
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
          viewBox={`${pathDim.x} ${pathDim.y} ${pathDim.x + pathDim.width} ${pathDim.y + pathDim.height}`}
        >
          <g className={styles.myGroup} style={{ transform:`scale(${svgScale})`}}>
            <path
              ref={pathDimRef}
              className={styles.myPath}
              d={question.pathShape}
              fill="red"
              stroke="black"
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
            key={index}
            className={styles.answer}
            onClick={() => guessHandling(option)}
          >
            {option}
          </button>
        ))}
        {/* Optional Chaining (the question mark) used here, because JS thought the question.options array was undefined. */}
      </div>
    </div>
  );
};

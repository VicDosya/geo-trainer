import { React, useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./Trainer.module.css";

export const Trainer = () => {
  //useState variables
  const [question, setQuestion] = useState([]);
  const [statusMessage, setStatusMessage] = useState("");
  const [score, setScore] = useState(0);
  const [choiceButton, setChoiceButton] = useState(false);

  //Fire loadQuiz function when the page loads. The page rendered twice(I removed StrictMode from index.js).
  useEffect(() => {
    loadQuiz();
  }, []);

  //Load quiz(question) function
  const loadQuiz = async () => {
    const res = await axios.get("/api/flags/quiz");
    setQuestion(res.data);
    setTimeout(() => {
      setStatusMessage("");
    }, 2000);
    setChoiceButton(false);
  };

  //Handle User's guess choice
  const guessHandling = async (userGuess) => {
    setChoiceButton(true);
    const res = await axios.post("/api/flags/guess", { userGuess });
    if (!res.data.correctStatus) {
      setStatusMessage(res.data.returnStatus);
      setChoiceButton(false);
    } else {
      setStatusMessage(res.data.returnStatus);
      setScore(score + 1);
      loadQuiz();
      setChoiceButton(true);
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
        <h1 className={styles.trainerTitle}>Flag Trainer Page</h1>
      </div>
      <div className={styles.imgContainer}>
        <img
          className={styles.flagImg}
          src={question.flagImgUrl}
          alt="Question image"
        ></img>
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
            disabled={choiceButton}
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

import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./Trainer.module.css";
import {IoArrowBackCircle} from 'react-icons/io5';

export const CapitalTrainer = () => {
  //useState variables
  const [question, setQuestion] = useState([]);
  const [statusMessage, setStatusMessage] = useState("");
  const [score, setScore] = useState(0);
  const [choiceButton, setChoiceButton] = useState(false);
  const [incorrectAnswers, setIncorrectAnswers] = useState([]);

  //Fire loadQuiz function when the page loads. The page rendered twice(I removed StrictMode from index.js).
  useEffect(() => {
    loadQuiz();
  }, []);

  //Load quiz(question) function
  const loadQuiz = async () => {
    const res = await axios.get("/api/capitals/quiz");
    setQuestion(res.data);
    setTimeout(() => {
      setStatusMessage("");
    }, 2000);
    setChoiceButton(false);
  };

  //Handle User's guess choice
  const guessHandling = async (userGuess, index) => {
    setChoiceButton(true);
    const res = await axios.post("/api/capitals/guess", { userGuess });
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

  const statusMessageStyle = statusMessage === "Correct!" ? styles.CSM : styles.wrongStatusMessage;

  //JSX
  return (
    <div className={styles.menuCapitalContainer}>
      <div className={styles.topContainer}>
        <button onClick={goBackRoute} className={styles.backButton}>
        <IoArrowBackCircle />
        </button>
        <h1 className={styles.trainerTitle}>Capital Trainer</h1>
      </div>
      <div className={styles.questionContainer}>
        <h1 className={styles.capitalName}>{question.countryName}</h1>
      </div>
      <div className={styles.statusMessageContainer}>
        <h1 className={statusMessageStyle}>{statusMessage}</h1>
      </div>
      <div className={styles.questionContainer}>
        <h1 className={styles.questionTitle}>
          {question.question}
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
      <div className={styles.trainerFooter}>Score: {score}</div>
    </div>
  );
};

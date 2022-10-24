import { React, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './Trainer.module.css';

export const Trainer = () => {

    //useState variables
    const [question, setQuestion] = useState([]);

    //Fire loadQuiz function when the page loads. The page rendered twice(I removed StrictMode from index.js).
    useEffect(() => {
        loadQuiz();
    }, []);

    //Load quiz(question) function
    const loadQuiz = async () => {
        const res = await axios.get('/api/quiz');
        setQuestion(res.data);
    };

    //Redirecting to home page on button click
    let navigate = useNavigate();
    const goBackRoute = () => navigate(-1);

    //JSX
    return (
        <div>
            <div className={styles.topContainer}>
                <button onClick={goBackRoute} className={styles.backButton}>⬅</button>
                <h1 className={styles.trainerTitle}>Trainer Page</h1>
            </div>
            <img className={styles.imgContainer}
                src={question.flagImgUrl}
                alt="Question image">
            </img>
            <div className={styles.questionContainer}>
                <h1 className={styles.questionTitle}>{question.question}</h1>
            </div>
            <div className={styles.choicesContainer}>
                {question.options?.map((option, index) => <button key={index} className={styles.answer}>{option}</button>)}
                {/* Optional Chaining (the question mark) used here, because JS thought the question.options array was undefined. */}
            </div>
        </div>
    )
};

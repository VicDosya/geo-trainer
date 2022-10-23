import { React, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './Trainer.module.css';

export const Trainer = () => {

    //useState variables
    const [question, setQuestion] = useState('');
    const [questionImage, setQuestionImage] = useState('');
    const [questionOptions, setQuestionOptions] = useState([]);

    //Fire loadQuiz function when the page loads. The page rendered twice(I removed StrictMode from index.js).
    useEffect(() => {
        loadQuiz();
    }, []);

    //Load quiz(question) function
    const loadQuiz = async () => {
        const res = await axios.get('/api/quiz');
        setQuestion(res.data.question);
        setQuestionImage(res.data.flagImgUrl);
        setQuestionOptions(res.data.options);
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
                src={questionImage}
                alt="Question image">
            </img>
            <div className={styles.questionContainer}>
                <h1 className={styles.questionTitle}>{question}</h1>
            </div>
            <div className={styles.choicesContainer}>
                {questionOptions.map((option, index) => <button key={index} className={styles.answer}>{option}</button>)}
            </div>
        </div>
    )
};

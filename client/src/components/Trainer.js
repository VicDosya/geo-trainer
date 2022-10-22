import { React, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './Trainer.module.css';

export const Trainer = () => {

    //useState variables
    const [question, setQuestion] = useState('');
    const [questionImage, setQuestionImage] = useState('');
    const [questionOptions, setQuestionOptions] = useState([]);
    const [questionId, setQuestionId] = useState([]);

    //Fire loadQuiz function when the page loads. The page rendered twice(I removed StrictMode from index.js).
    useEffect(() => {
        loadQuiz();
    }, []);

    //Load quiz(question) function
    const loadQuiz = async () => {
        const res = await axios.get('/api/quiz');
        setQuestion(res.data.question);
        setQuestionImage(res.data.flagImgUrl);
        setQuestionOptions(currentOptions => [...currentOptions, res.data.options]);
        console.log(res.data);
        //Insert button depending on amount of options for the question


    };
    console.log(questionOptions[0]);

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
                <button className={styles.answer}>Answer 1</button>
                <button className={styles.answer}>Answer 2</button>
                <button className={styles.answer}>Answer 3</button>
                <button className={styles.answer}>Answer 4</button>
            </div>
        </div>
    )
};

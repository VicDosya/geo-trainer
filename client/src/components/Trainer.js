import React from 'react'
import { useNavigate } from 'react-router-dom';
import styles from './Trainer.module.css';
import picture from './placeholderimg.png';

export const Trainer = () => {

    //Redirecting to home page on button click
    let navigate = useNavigate();
    const goBackRoute = () => navigate(-1);

    return (
        <div>
            <div className={styles.topContainer}>
                <button onClick={goBackRoute} className={styles.backButton}>⬅</button>
                <h1 className={styles.trainerTitle}>Trainer Page</h1>
            </div>
            <img className={styles.imgContainer}
                src={picture}
                alt="An example picture">
            </img>

            <div className={styles.choicesContainer}>
                <button className={styles.answer}>Answer 1</button>
                <button className={styles.answer}>Answer 2</button>
                <button className={styles.answer}>Answer 3</button>
                <button className={styles.answer}>Answer 4</button>
            </div>
        </div>
    )
};

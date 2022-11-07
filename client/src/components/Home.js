import React from 'react'
import { useNavigate } from 'react-router-dom';
import styles from './Home.module.css';

export const Home = () => {

    //Redirecting to trainer page on button click
    let navigate = useNavigate();
    const goToTrainer = () => navigate('/trainer');
    const goToCapitalTrainer = () => navigate('/capitaltrainer');

    return (
        <div className={styles.homeContainer}>
            <h1 className={styles.homeTitle}>Geo-🌍-Trainer</h1>
            <p className={styles.homeDescription}>
                A web app that trains your geographical knowledge.
                It will teach you country flags,
                country capitals, country shapes and continents.
            </p>
            <h2 className={styles.trainersTitle}>Trainers:</h2>
            <div className={styles.buttonContainer}>
                <button onClick={goToTrainer} className={styles.countryFlags}>Country Flags</button>
                <button onClick={goToCapitalTrainer} className={styles.countryCapitals}>Country Capitals</button>
                <button onClick={goToTrainer} className={styles.countryShapes}>Country Shapes</button>
                <button onClick={goToTrainer} className={styles.continentShapes}>Continent Shapes</button>
            </div>
        </div>
    )
};

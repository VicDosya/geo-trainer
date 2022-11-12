import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Home.module.css";

export const Home = () => {
  //Redirecting to trainer page on button click
  let navigate = useNavigate();
  const goToTrainer = () => navigate("/trainer");
  const goToCapitalTrainer = () => navigate("/capitaltrainer");
  const goToShapeTrainer = () => navigate("/shapetrainer");

  return (
    <div className={styles.homeContainer}>
      <h1 className={styles.homeTitle}>Geo-🌍-Trainer</h1>
      <p className={styles.homeDescription}>
        A web app that trains your geographical knowledge. It will teach you
        country flags, capitals and shapes.
      </p>
      <h2 className={styles.trainersTitle}>Trainers:</h2>
      <div className={styles.buttonContainer}>
        <button onClick={goToTrainer} className={styles.countryFlags}>
          Country Flags
        </button>
        <button onClick={goToCapitalTrainer} className={styles.countryCapitals}>
          Country Capitals
        </button>
        <button onClick={goToShapeTrainer} className={styles.countryShapes}>
          Country Shapes
        </button>
      </div>
    </div>
  );
};

import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Home.module.css";
import { ImFlag } from "react-icons/im";
import {GiModernCity} from "react-icons/gi";
import { ImEarth } from "react-icons/im";
import {AiFillTwitterCircle} from "react-icons/ai"
import {BsFacebook} from "react-icons/bs"
import {BsGithub} from "react-icons/bs";

export const Home = () => {
  //Redirecting to trainer page on button click
  let navigate = useNavigate();
  const goToTrainer = () => navigate("/trainer");
  const goToCapitalTrainer = () => navigate("/capitaltrainer");
  const goToShapeTrainer = () => navigate("/shapetrainer");

  return (
    <div className={styles.homeContainer}>
      <h1 className={styles.homeTitle}>Geo🌍Trainer</h1>
      <p className={styles.homeDescription}>
        A web app that trains your geographical knowledge. It will teach you
        country flags, capitals and shapes.
      </p>
      <hr className={styles.lineBreak}></hr>
      <h2 className={styles.trainersTitle}>Start learning:</h2>
      <div className={styles.buttonContainer}>
        <button onClick={goToTrainer} className={styles.countryFlags}>
        <ImFlag className={styles.flagIcon}/><br />
          Country Flags
        </button>
        <button onClick={goToCapitalTrainer} className={styles.countryCapitals}>
          <GiModernCity className={styles.capitalIcon}/><br />
          Country Capitals
        </button>
        <button onClick={goToShapeTrainer} className={styles.countryShapes}>
          <ImEarth className={styles.countryIcon}/><br />
          Country Shapes
        </button>
      </div>
      <div className={styles.pageFooter}>
        <div className={styles.pageIcons}>
          <div className={styles.twitterIcon}><AiFillTwitterCircle /></div>
          <div className={styles.facebookIcon}><BsFacebook /></div>
          <div className={styles.githubIcon}><BsGithub /></div>
          </div>
        <div className={styles.pageYear}>ⓒ 2022</div>
      </div>
    </div>
  );
};

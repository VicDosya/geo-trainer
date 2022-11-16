import express from "express";
import countryData from "./countrydata/countries.json";
import { selectRandomOptions } from "./utils/Utils";
const app = express();

//Constant Variables
const MAX_RANDOM_FLAG_RETRY_COUNT = 5;

//Functions
const generateQuiz = () => {
  const correctFlagNumber = Math.floor(Math.random() * countryData.length);
  return {
    id: 1,
    question: "What flag is this?",
    flagImgUrl: countryData[correctFlagNumber].flag,

    options: [
      countryData[randomFlagNumber(correctFlagNumber)].name,
      countryData[randomFlagNumber(correctFlagNumber)].name,
      countryData[correctFlagNumber].name,
      countryData[randomFlagNumber(correctFlagNumber)].name,
    ].sort((a, b) => 0.5 - Math.random()), //Randomise the positioning of the choices

    answer: countryData[correctFlagNumber].name,
  };
};

//Randomizer index for RANDOM(incorrect) flag
let randomFlagNumber = (correctFlagNumber, retryCount = 0) => {
  let randomFlag = Math.floor(Math.random() * countryData.length);

  //Generate a randomFlag again if duplicates are detected, stop a recursive function with retryCount.
  if (
    randomFlag === correctFlagNumber &&
    retryCount < MAX_RANDOM_FLAG_RETRY_COUNT
  ) {
    return randomFlagNumber(correctFlagNumber, retryCount++);
  } else if (retryCount >= MAX_RANDOM_FLAG_RETRY_COUNT) {
    console.log(
      `Retry count has reached the limit of ${MAX_RANDOM_FLAG_RETRY_COUNT}`
    );
    return 0;
  } else {
    return randomFlag;
  }
};

//Routes:
//Sending flag information from countries-data-all package to the client
app.get("/quiz", (req, res) => {
  if (!req.session.quiz) {
    //When user refreshes, the quiz question remains as it was initially.
    req.session.quiz = generateQuiz();
  }

  //Send back flag information to the client.
  res.send(req.session.quiz);
});

//Client's guess handling.
app.post("/guess", (req, res) => {
  if (req.body.userGuess === req.session.quiz.answer) {
    req.session.quiz = generateQuiz();
    res.send({ returnStatus: "Correct!", correctStatus: true });
  } else {
    res.send({ returnStatus: "Wrong" });
  }
});

module.exports = app;

import express from "express";
import countryData from "./countrydata/countries.json";
const app = express();

//Constant Variables
const MAX_RANDOM_CAPITAL_RETRY_COUNT = 5;

//Functions

const generateQuiz = () => {
  const correctCapitalNumber = Math.floor(Math.random() * countryData.length);
  return {
    id: 1,
    question: "What is the capital of this country?",
    countryName: countryData[correctCapitalNumber].name,

    options: [
      countryData[randomCapitalNumber(correctCapitalNumber)].capital,
      countryData[randomCapitalNumber(correctCapitalNumber)].capital,
      countryData[correctCapitalNumber].capital,
      countryData[randomCapitalNumber(correctCapitalNumber)].capital,
    ].sort((a, b) => 0.5 - Math.random()), //Randomise the positioning of the choices

    answer: countryData[correctCapitalNumber].capital,
  };
};

//Randomizer index for RANDOM(incorrect) capital
let randomCapitalNumber = (correctCapitalNumber, retryCount = 0) => {
  let randomCapital = Math.floor(Math.random() * countryData.length);

  //Generate a randomCapital again if duplicates are detected, stop a recursive function with retryCount.
  if (
    randomCapital === correctCapitalNumber &&
    retryCount < MAX_RANDOM_CAPITAL_RETRY_COUNT
  ) {
    return randomCapitalNumber(correctCapitalNumber, retryCount++);
  } else if (retryCount >= MAX_RANDOM_CAPITAL_RETRY_COUNT) {
    console.log(
      `Retry count has reached the limit of ${MAX_RANDOM_CAPITAL_RETRY_COUNT}`
    );
    return 0;
  } else {
    return randomCapital;
  }
};

//Routes:
//Sending capital information from countries-data-all package to the client
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

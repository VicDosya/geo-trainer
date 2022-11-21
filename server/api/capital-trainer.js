import express from "express";
import countryData from "./countrydata/countries.json";
import { selectRandomOptions } from "./utils/Utils";
const app = express();

const NO_CAPITAL = "There is no capital.";

//Functions
const generateQuiz = () => {
  const correctCapitalNumber = Math.floor(Math.random() * countryData.length);
  return {
    id: 1,
    question: "What is the capital of this country?",
    countryName: countryData[correctCapitalNumber].name,
    options: selectRandomOptions(countryData, correctCapitalNumber, "capital", NO_CAPITAL),
    answer: countryData[correctCapitalNumber].capital || NO_CAPITAL,
  };
};

//Routes:
//Sending capital information from countries-data-all package to the client
app.get("/quiz", (req, res) => {
  if (!req.session.capitalQuiz) {
    //When user refreshes, the quiz question remains as it was initially.
    req.session.capitalQuiz = generateQuiz();
  }

  //Send back flag information to the client.
  res.send(req.session.capitalQuiz);
});

//Client's guess handling.
app.post("/guess", (req, res) => {
  if (req.body.userGuess === req.session.capitalQuiz.answer) {
    req.session.capitalQuiz = generateQuiz();
    res.send({ returnStatus: "Correct!", correctStatus: true });
  } else {
    res.send({ returnStatus: "Wrong" });
  }
});

module.exports = app;

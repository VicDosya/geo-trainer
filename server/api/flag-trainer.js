import express from "express";
import countryData from "./countrydata/countries.json";
import { selectRandomOptions } from "./utils/Utils";
const app = express();

//Functions
const generateQuiz = () => {
  const correctFlagNumber = Math.floor(Math.random() * countryData.length);
  return {
    id: 1,
    question: "What flag is this?",
    flagImgUrl: countryData[correctFlagNumber].flag,
    options: selectRandomOptions(countryData, correctFlagNumber, "name"),
    answer: countryData[correctFlagNumber].name,
  };
};

//Routes:
//Sending flag information from countries-data-all package to the client
app.get("/quiz", (req, res) => {
  if (!req.session.flagQuiz) {
    //When user refreshes, the quiz question remains as it was initially.
    req.session.flagQuiz = generateQuiz();
  }

  //Send back flag information to the client.
  res.send(req.session.flagQuiz);
});

//Client's guess handling.
app.post("/guess", (req, res) => {
  if (req.body.userGuess === req.session.flagQuiz.answer) {
    req.session.flagQuiz = generateQuiz();
    res.send({ returnStatus: "Correct!", correctStatus: true });
  } else {
    res.send({ returnStatus: "Wrong" });
  }
});

module.exports = app;

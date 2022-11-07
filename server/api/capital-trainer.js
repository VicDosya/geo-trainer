const express = require('express');
const countryData = require('./countrydata/countries.json');
const app = express();

//Constant Variables
const MAX_RANDOM_CAPITAL_RETRY_COUNT = 5;

//Functions
//Randomizer index function for the CORRECT capital!
let correctCapitalNumber;
const generateCorrectCapital = () => correctCapitalNumber = Math.floor(Math.random() * 245) + 1;
generateCorrectCapital();

//Randomizer index for RANDOM(incorrect) capital
let randomCapitalNumber = (retryCount = 0) => {
  let randomCapital = Math.floor(Math.random() * 242) + 1;

  //Generate a randomCapital again if duplicates are detected, stop a recursive function with retryCount.
  if (randomCapital === correctCapitalNumber && retryCount < MAX_RANDOM_CAPITAL_RETRY_COUNT) {
    return randomCapitalNumber(retryCount++);
  } else if (retryCount >= MAX_RANDOM_CAPITAL_RETRY_COUNT) {
    console.log(`Retry count has reached the limit of ${MAX_RANDOM_CAPITAL_RETRY_COUNT}`);
    return 0;
  } else {
    return randomCapital;
  }
};

//Routes:
//Sending capital information from countries-data-all package to the client
app.get('/capitalquiz', (req, res) => {

  //Send back capital information to the client.
  res.send({
    id: 1,
    question: "What is the capital of this country?",
    countryName: countryData[correctCapitalNumber].name,

    options: [
      countryData[randomCapitalNumber()].capital,
      countryData[randomCapitalNumber()].capital,
      countryData[correctCapitalNumber].capital,
      countryData[randomCapitalNumber()].capital
    ].sort((a, b) => 0.5 - Math.random()),   //Randomise the positioning of the choices

    answer: countryData[correctCapitalNumber].capital
  });
});

//Client's guess handling.
app.post('/guesscapital', (req, res) => {
  if (req.body.userGuess === countryData[correctCapitalNumber].capital) {
    res.send({ returnStatus: "Correct!", correctStatus: true });
    generateCorrectCapital();
  } else {
    res.send({ returnStatus: "Wrong" });
  }
});

module.exports = app;
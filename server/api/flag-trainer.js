import express from 'express';
import countryData from './countrydata/countries.json';
import {selectRandomOptions} from './utils/Utils';
const app = express();

//Constant Variables
const MAX_RANDOM_FLAG_RETRY_COUNT = 5;

//Functions
//Randomizer index function for the CORRECT flag!
let correctFlagNumber;
const generateCorrectFlag = () => correctFlagNumber = Math.floor(Math.random() * countryData.length);
generateCorrectFlag();

//Randomizer index for RANDOM(incorrect) flag
let randomFlagNumber = (retryCount = 0) => {
  let randomFlag = Math.floor(Math.random() * countryData.length);

  //Generate a randomFlag again if duplicates are detected, stop a recursive function with retryCount.
  if (randomFlag === correctFlagNumber && retryCount < MAX_RANDOM_FLAG_RETRY_COUNT) {
    return randomFlagNumber(retryCount++);
  } else if (retryCount >= MAX_RANDOM_FLAG_RETRY_COUNT) {
    console.log(`Retry count has reached the limit of ${MAX_RANDOM_FLAG_RETRY_COUNT}`);
    return 0;
  } else {
    return randomFlag;
  }
};

//Routes:
//Sending flag information from countries-data-all package to the client
app.get('/quiz', (req, res) => {

  //Send back flag information to the client.
  res.send({
    id: 1,
    question: "What flag is this?",
    flagImgUrl: countryData[correctFlagNumber].flag,

    options: [
      countryData[randomFlagNumber()].name,
      countryData[randomFlagNumber()].name,
      countryData[correctFlagNumber].name,
      countryData[randomFlagNumber()].name
    ].sort((a, b) => 0.5 - Math.random()),   //Randomise the positioning of the choices

    answer: countryData[correctFlagNumber].name
  });
});

//Client's guess handling.
app.post('/guess', (req, res) => {
  if (req.body.userGuess === countryData[correctFlagNumber].name) {
    res.send({ returnStatus: "Correct!", correctStatus: true });
    generateCorrectFlag();
  } else {
    res.send({ returnStatus: "Wrong" });
  }
});

module.exports = app;
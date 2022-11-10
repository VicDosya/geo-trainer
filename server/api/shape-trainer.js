import express from "express"; //USING ESM IN NODE WITH 'esm' PACKAGE. Launch server with nodemon -r esm express.js<---
import countryData from "./countrydata/countries.json";
import countryShapes from "world-map-country-shapes"; 
const app = express();

//Constant Variables
const MAX_RANDOM_SHAPE_RETRY_COUNT = 5;

//Functions
//Randomizer index function for the CORRECT shape!
let correctShapeNumber;
const generateCorrectShape = () =>
  (correctShapeNumber = Math.floor(Math.random() * 212) + 1);
generateCorrectShape();

//Randomizer index for RANDOM(incorrect) shape
let randomShapeNumber = (retryCount = 0) => {
  let randomShape = Math.floor(Math.random() * 212) + 1;

  //Generate a randomShape again if duplicates are detected, stop a recursive function with retryCount.
  if (
    randomShape === correctShapeNumber &&
    retryCount < MAX_RANDOM_SHAPE_RETRY_COUNT
  ) {
    return randomShapeNumber(retryCount++);
  } else if (retryCount >= MAX_RANDOM_SHAPE_RETRY_COUNT) {
    console.log(
      `Retry count has reached the limit of ${MAX_RANDOM_SHAPE_RETRY_COUNT}`
    );
    return 0;
  } else {
    return randomShape;
  }
};

//Routes:
//Sending shape information from package to the client
app.get("/quiz", (req, res) => {
  //Send back shape information to the client.
  res.send({
    id: 1,
    question: "What is the country of this shape?",
    pathShape: countryShapes.find((c) => c.id === "RU").shape,

    options: [
      countryData[randomShapeNumber()].capital,
      countryData[randomShapeNumber()].capital,
      countryData[correctShapeNumber].capital,
      countryData[randomShapeNumber()].capital,
    ].sort((a, b) => 0.5 - Math.random()), //Randomise the positioning of the choices

    answer: countryData[correctShapeNumber].capital,
  });
});

//Client's guess handling.
app.post("/guess", (req, res) => {
  if (req.body.userGuess === countryData[correctShapeNumber].capital) {
    res.send({ returnStatus: "Correct!", correctStatus: true });
    generateCorrectShape();
  } else {
    res.send({ returnStatus: "Wrong" });
  }
});

module.exports = app;

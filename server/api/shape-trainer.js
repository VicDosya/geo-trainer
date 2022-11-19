import express from "express"; //USING ESM IN NODE WITH 'esm' PACKAGE. Launch server with nodemon -r esm express.js<---
import countryData from "./countrydata/countries.json";
import countryShapes from "world-map-country-shapes";

const app = express();

//Constant Variables
const MAX_RANDOM_SHAPE_RETRY_COUNT = 5;

//Functions
//Randomizer index function for the CORRECT shape!
const generateQuiz = () => {
  const correctShapeNumber = Math.floor(Math.random() * countryShapes.length);
  let country = countryShapes[correctShapeNumber];
  if (!country) {
    throw new Error(
      `There is no country with such index ${correctShapeNumber}`
    );
  }
  const countryId = country.id;
  const selectedCountry = countryData.find((c) => c.alpha2Code === countryId); // Get country name if countrydata and shape id are the same.

  return {
    id: 1,
    question: "What is the country of this shape?",
    pathShape: countryShapes[correctShapeNumber].shape,
    options: [
      countryData[randomShapeNumber(correctShapeNumber)].name,
      countryData[randomShapeNumber(correctShapeNumber)].name,
      selectedCountry.name,
      countryData[randomShapeNumber(correctShapeNumber)].name,
    ].sort((a, b) => 0.5 - Math.random()), //Randomise the positioning of the choices

    answer: selectedCountry.name,
  };
};

//Randomizer index for RANDOM(incorrect) shape
let randomShapeNumber = (correctShapeNumber, retryCount = 0) => {
  let randomShape = Math.floor(Math.random() * countryShapes.length);

  //Generate a randomShape again if duplicates are detected, stop a recursive function with retryCount.
  if (
    randomShape === correctShapeNumber &&
    retryCount < MAX_RANDOM_SHAPE_RETRY_COUNT
  ) {
    return randomShapeNumber(correctShapeNumber, retryCount++);
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
  if (!req.session.shapeQuiz) {
    //When user refreshes, the quiz question remains as it was initially.
    req.session.shapeQuiz = generateQuiz();
  }

  //Send back flag information to the client.
  res.send(req.session.shapeQuiz);
});

//Client's guess handling.
app.post("/guess", (req, res) => {
  if (req.body.userGuess === req.session.shapeQuiz.answer) {
    req.session.shapeQuiz = generateQuiz();
    res.send({ returnStatus: "Correct!", correctStatus: true });
  } else {
    res.send({ returnStatus: "Wrong" });
  }
});

module.exports = app;

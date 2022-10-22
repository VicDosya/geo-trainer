const express = require('express');
const app = express();

//Routes:
app.get('/', (req, res) => {
    res.send({ routeName: "Hello World" });
});

app.get('/quiz', (req, res) => {
    res.send({
        id: 1,
        question: "What flag is this?",
        flagImgUrl: "https://upload.wikimedia.org/wikipedia/commons/d/d4/Flag_of_Israel.svg",
        options: [
          "United Kingdom",
          "United States",
          "Israel",
          "Zimbabwe"
        ],
        answer: "Israel"
      });
});

app.post('/guess', (req, res) => {
    res.send({ routeName: "Hello Guess" });
});

module.exports = app;
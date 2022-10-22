const express = require('express');
const app = express();

//Routes:
app.get('/', (req, res) => {
    res.send({ routeName: "Hello World" });
});

app.get('/quiz', (req, res) => {
    res.send({ routeName: "Hello Quiz" });
});

app.post('/guess', (req, res) => {
    res.send({ routeName: "Hello Guess" });
});

module.exports = app;
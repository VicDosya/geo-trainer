const express = require('express');
const PORT = process.env.PORT || 3000;
const app = express();

//Response
app.get('/', (req,res) => {
    res.send("Hello World");
});

//Server Start
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
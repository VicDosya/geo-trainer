const apiRoutes = require('./api/flag-trainer');
const express = require('express');
const PORT = process.env.PORT || 3001;
const bodyParser = require('body-parser');
const app = express();

//Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api', apiRoutes);

//Server Start
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
const apiFlagRoutes = require('./api/flag-trainer');
const apiCapitalRoutes = require('./api/capital-trainer')
const apiShapeRoutes = require('./api/shape-trainer');
const express = require('express');
const PORT = process.env.PORT || 3001;
const bodyParser = require('body-parser');
const app = express();

//Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api/flags', apiFlagRoutes);
app.use('/api/capitals', apiCapitalRoutes);
app.use('/api/shapes', apiShapeRoutes);

//Server Start
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
// Pull dependencies
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

// Configure Express app
const app = express();
const PORT = process.env.PORT || 8080;

//public directory to access CSS files
app.use(express.static(path.join(__dirname, './public')));

// Add middleware for parsing incoming request bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());

// Add the application routes
require(path.join(__dirname, './routes/apiRoute'))(app);
require(path.join(__dirname, './routes/htmlRoute'))(app);

// Start listening on PORT
app.listen(PORT, function() {
  console.log('Friend Finder app is listening on PORT: ' + PORT);
});
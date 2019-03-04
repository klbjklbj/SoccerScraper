require('dotenv').config();

const request = require("request");
const bodyParser = require('body-parser');

const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

// Our scraping tools
// Axios is a promised-based http library, similar to jQuery's Ajax method
// It works on the client and on the server
var axios = require("axios");
var cheerio = require("cheerio");

var PORT = process.env.PORT || 3000;

// Initialize Express
const app = express();

// Configure middleware

// Use morgan logger for logging requests
app.use(logger("dev"));

// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Make public a static folder
app.use(express.static("public"));

require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);


var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/Scraper";

mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

app.listen(PORT, function() {
    console.log("App running on port " + PORT);
  });
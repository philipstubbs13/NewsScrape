//Dependencies
var express = require("express");
var mongojs = require("mongojs");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var request = require("request");


// Require all models
var db = require("./models");

//Define port
var PORT = process.env.PORT || 3000;

//Initialize Express
var app = express();

// Use morgan logger for logging requests
app.use(logger("dev"));

//Set up a static folder (public) for our web app.
app.use(express.static("public"));

//setting up the database
mongoose.Promise = Promise;

 // Mongoose (orm) connects to our mongo db and allows us to have access to the MongoDB commands for easy CRUD 
// If deployed, use the deployed database. Otherwise use the local newsscraper database
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/newsscraper";

// Set mongoose to leverage built in JavaScript ES6 Promises
// Connect to the Mongo DB
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI, {
  useMongoClient: true
});

//Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

//Parse application/json
app.use(bodyParser.json());

//Set Handlebars.
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars")

// Import routes and give the server access to them.
require("./controllers/fetch.js")(app);
require("./controllers/headline.js")(app);
require("./controllers/note.js")(app);

//Set the app to listen on port 3000
app.listen(PORT, function() {
    console.log("App running on port 3000");
})

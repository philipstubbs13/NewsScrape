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

// // If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
// var MONGODB_URI = process.env.MONGODB_URI || "mongodb://ds127129.mlab.com:27129/heroku_1kjtsvrd";
// //mongodb://ds127129.mlab.com:27129/heroku_1kjtsvrd
// //mongodb://localhost/newsscraper


// // By default mongoose uses callbacks for async queries, we're setting it to use promises (.then syntax) instead
// // Connect to the Mongo DB
// mongoose.Promise = Promise;
// mongoose.connect(MONGODB_URI, {});

//setting up the database
// const config = require('./config/database');
mongoose.Promise = Promise;
// mongoose
//   .connect(config.database)
//   .then( result => {
//     console.log(`Connected to database '${result.connections[0].name}' on ${result.connections[0].host}:${result.connections[0].port}`)
//   })
//   .catch(err => console.log('There was an error with your connection:', err));

  //https://stackoverflow.com/questions/45667535/why-heroku-kills-my-process-with-status-143?rq=1
//   var reqTimer = setTimeout(function wakeUp() {
//     request("https://hoops-scraper.herokuapp.com", function() {
//        console.log("WAKE UP DYNO");
//     });
//     return reqTimer = setTimeout(wakeUp, 1200000);
//  }, 1200000);

 // Mongoose (orm) connects to our mongo db and allows us to have access to the MongoDB commands for easy CRUD 
let uri = 'mongodb://heroku_1kjtsvrd:gh7k0kdpcs5q60s34def8ho44o@ds127129.mlab.com:27129/heroku_1kjtsvrd';

mongoose.connect(uri);

let db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

// display a console message when mongoose has a conn to the db
db.once("open", function () {
  console.log("Mongoose connection successful.");
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

//Set the app to listen on port 3000
app.listen(PORT, function() {
    console.log("App running on port 3000");
})

//Dependencies
var express = require("express");
var mongojs = require("mongojs");
var request = require("request");
var cheerio = require("cheerio");

//Initialize Express
var app = express();

//Set up a static folder (public) for our web app.
app.use(express.static("public"));

//Database configuration
//Save the URL of our database as well as the name of our collection.
var databaseURL = "scraper";
var collections = ["scrapedData"];

//Use mongojs to hook the database to the db variable.
var db = mongojs(databaseURL, collections);


//This akes sure that any errors are logged if mongodb runs into an issue.
db.on("error", function(error) {
    console.log("Database Error", error);
});

//Routes
//1. At the root path, send a simple hello world message to the browser.
app.get("/", function(req, res) {
    res.send("Hello world");
});

//This route will retrieve all of the data.
//from the scrapedData collection as a json (this will be populated by the data you scrape using the next route.)
app.get("/all", function(req, res) {
    //Query: in our database, go to the articles collection, then "find" everything.
    db.scrapedData.find({}, function(error, found) {
        //Log any errors if the server encounters one.
        if (error) {
            console.log(error);
        }
        //Otherwise, send the result of this query to the browser.
        else {
            res.json(found);
        }
    });
});

//When you visit this route, the server will 
//scrape data from the site of your choice, and save it to MongoDB.
//TIP: Think back to how you pushed website data
//into an empty array in the last class. How do you
//push it intto a MongoDB collection instead?
app.get("/scrape", function(req, res) {

    request("http://www.nba.com/timberwolves/news/", function(error, response, html) {
        var $ = cheerio.load(html);

        $(".post__information").each(function(i, element){
            var title = $(this).find("a").text();
            var link = $(this).find("a").attr("href");
            var date = $(this).find(".post__date").text();
            var summary = $(this).find(".post__body").text();
            console.log(title);
            console.log(link);
            if (title && link) {
                db.scrapedData.save ({
                    title: title,
                    link: link,
                    date: date,
                    summary: summary
                },
                function(error, saved) {
                    if (error){
                        console.log(error);
                    }

                    else {
                        console.log(saved);
                    }
                });
            }
        });
    });

    res.send("Scrape complete");
});

//Set the app to listen on port 3000
app.listen(3000, function() {
    console.log("App running on port 3000");
})

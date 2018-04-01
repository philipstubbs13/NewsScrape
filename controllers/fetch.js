// Import the model (burger.js). 
var db = require("../models");

//Require express
var express = require("express");

//Scraping tools
var cheerio = require("cheerio");
var axios = require("axios");

module.exports = function(app) {
    //Routes
    // At the root path, display/render home.handlebars file.
    app.get("/", function(req, res) {
        //Query: in our database, go to the articles collection, then "find" everything.
        db.Headline.find({saved: false}, function(error, found) {
            //Log any errors if the server encounters one.
            if (error) {
                console.log(error);
            }
            //Otherwise, send the result of this query to the browser.
            else {
                res.render("home", {
                    articles: found,
                    });
            }
        });
    });

    //At the /saved path, display/render saved.handlebars file.
    app.get("/saved", function(req, res) {
        res.render("saved");
    });

    //This route will retrieve all of the data.
    //from the scrapedData collection as a json (this will be populated by the data you scrape using the next route.)
    app.get("/all", function(req, res) {
        //Query: in our database, go to the articles collection, then "find" everything.
        db.Headline.find({saved: false}, function(error, found) {
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

        // First, we grab the body of the html with request
        axios.get("http://www.espn.com/mens-college-basketball/").then(function(response) {
            // Then, we load that into cheerio and save it to $ for a shorthand selector
            var $ = cheerio.load(response.data)

            $(".contentItem__content").each(function(i, element){
                //Save an empty result object.
                var result = {};
                result.title = $(this).find(".contentItem__title").text();
                result.link = "http://www.espn.com" + $(this).find("a").attr("href");
                // var date = $(this).find(".post__date").text();
                result.summary = $(this).find(".contentItem__subhead").text();
                // var imgLink = $(element).find("a").find("img").attr("data-srcset").split(",")[0].split(" ")[0];
                result.img = $(this).find(".media-wrapper").find(".media-wrapper_image").find("img").attr("data-default-src");
    

                db.Headline.create(result)
                    .then(function(dbHeadline) {
                        //View the added result in the console.
                        console.log(dbHeadline);
                    })
                    .catch(function(err) {
                        //If an error occured, send it to the client.
                        return res.json(err);
                    });        
            });
            res.send("Scrape complete");
            res.json(result);
        });
    });
}

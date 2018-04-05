// Import the model (burger.js). 
var db = require("../models");

//Require express
var express = require("express");

//Require mongojs
var mongojs = require("mongojs");

//Scraping tools
var cheerio = require("cheerio");
var axios = require("axios");

module.exports = function(app) {
    //Routes
    //At the root path, display/render home.handlebars file.
    app.get("/", function(req, res) {
        //Query: in our database, go to the headlines collection, 
        //then "find" every article that is not saved (has a saved value of false).
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
        //Query: in our database, go to the articles collection, 
        //then "find" every article that is saved (has a saved value of true);
        db.Headline.find({saved: true}, function(error, found) {
            //Log any errors if the server encounters one.
            if (error) {
                console.log(error);
            }
            //Otherwise, send the result of this query to the browser.
            else {
                res.render("saved", {
                    articles: found,
                    });
            }
        });
    });

    //This route will retrieve all of the data.
    //from the headlines collection as json (this will be populated by the data you scrape using the next route.)
    app.get("/all", function(req, res) {
        //Query: in our database, go to the articles collection, then "find" everything.
        db.Headline.find({}, function(error, found) {
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
    //scrape data from the site, and save it to MongoDB.
    app.get("/scrape", function(req, res) {

        //First, we grab the body of the html with axios.
        axios.get("http://www.espn.com/mens-college-basketball/").then(function(response) {
            //Then, we load that into cheerio and save it to $ for a shorthand selector
            var $ = cheerio.load(response.data)

            //For each element that has a class of .contentitem__content on the site that we are trying to scrape, do the following...
            $(".contentItem__content").each(function(i, element){
                //Save an empty result object.
                var result = {};
                //Save the title of each article from the site to the result object as result.title.
                result.title = $(this).find(".contentItem__title").text();
                //Save the link for each article from the site to the result object as result.link.
                result.link = "http://www.espn.com" + $(this).find("a").attr("href");
                //Save the summary for each article from the site to the result object as result.summary.
                result.summary = $(this).find(".contentItem__subhead").text();
                //Save the image/photo associated with each article from the site to the result object as result.img.
                result.img = $(this).find(".media-wrapper").find(".media-wrapper_image").find("img").attr("data-default-src");
    
                //I was having issues with having articles that have "undefined" links.
                //So, I am adding a conditional here to check if the article link is undefined or not.
                //Only add articles to the database that have a valid link.
                if ($(this).find("a").attr("href") !== undefined) {
                    //Create a new article in the database using the result object built from scraping...
                    db.Headline.create(result)
                        .then(function(dbHeadline) {
                            //View the added result in the console.
                            console.log(dbHeadline);
                        })
                        .catch(function(err) {
                            //If an error occured, send it to the client.
                            return res.json(err);
                        });     
                }   
            });
            res.json(result);
        });
    });

    //Mark a article as saved.
    app.put("/marksaved/:id", function(req, res) {
        //Remember: when searching by an id, the id needs to be passed in
        updateSaved(true,req, res);
    });
  
    //Mark an article as not saved.
    app.put("/markunsaved/:id", function(req, res) {
        //Remember: when searching by an id, the id needs to be passed in
        updateSaved(false,req, res);
    });

    //Function that marks an article as saved (saved: true) or not saved (saved: false).
    function updateSaved(isSaved, req, res) {
        db.Headline.findOneAndUpdate({ _id: req.params.id }, { saved: isSaved },
            function(err, data) {
                if (err) {
                    console.log(err);
                }
                else {
                res.json(data);
                }
        });
    }

    //Delete an article
    app.delete("/articles/:id", function(req, res) {
        // Remember: when searching by an id, the id needs to be passed in
        db.Headline.deleteOne({ _id: req.params.id },
            function(err, data) {
                if (err) {
                    console.log(err);
                }
                else {
                res.json(data);
                }
        });
    });

}

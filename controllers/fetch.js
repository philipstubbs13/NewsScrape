// Import the model 
var db = require("../models");

//Require express
var express = require("express");

//Require mongojs
var mongojs = require("mongojs");

//Scraping tools
var cheerio = require("cheerio");
var axios = require("axios");

module.exports = function(app) {
  
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
                //Only add articles to the database that have a valid link and the link starts with /mens-college-basketball.
                if ($(this).find("a").attr("href") !== undefined && $(this).find("a").attr("href").startsWith("/mens-college-basketball")) {
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
}

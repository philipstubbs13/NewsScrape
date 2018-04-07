// Import the model 
var db = require("../models");

//Require express
var express = require("express");

//Require mongojs
var mongojs = require("mongojs");

module.exports = function(app) {

    //Route for grabbing a specific Article by id, populate it with a comment.
    app.get("/articles/:id", function(req, res) {
        // Using the id passed in the id parameter, prepare a query that finds the matching one in our db...
        db.Headline.findOne({ _id: req.params.id })
        // ..and populate all of the notes associated with it
        .populate("note")
        .then(function(dbHeadline) {
            // If we were able to successfully find a Headline with the given id, send it back to the client
            res.json(dbHeadline);
        })
        .catch(function(err) {
            // If an error occurred, send it to the client
            res.json(err);
        });
    });

    //Route for getting/finding all notes in the database associated with a particular headline/article.
    app.get("/notes/:id", function (req, res) {
        if(req.params.id) {
            db.Note.find({
                "headline": req.params.id
            })
            .exec(function (error, doc) {
                if (error) {
                    console.log(error)
                } else {
                    res.send(doc);
                }
            });
        }
    });

    //Create/post a new comment
    app.post("/notes", function (req, res) {
    if (req.body) {
        db.Note.create(req.body)
        .then(function(dbNote) {
            //If we were able to successfully create a note, send it back to the client.
            res.json(dbNote);
        })
        .catch(function(err) {
            // If an error occurred, send it to the client
            res.json(err);
        });
    }
    });

    //Delete a note
    app.delete("/notes/:id", function(req, res) {
        // Remember: when searching by an id, the id needs to be passed in
        db.Note.deleteOne({ _id: req.params.id },
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
    

  
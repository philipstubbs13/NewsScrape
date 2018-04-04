$(window).load(function() {

    //Create variables to keep track of the number of articles in our database every time we do a new scrape.
    //previous is the number of articles before doing a new scrape.
    //current is the number of articles after during a new scrape.
    let previous = 0;
    let current = null;

    //Click event for scraping new articles.
    $("#scrape-articles").on("click", (event) => {
        //Empty out the modal that shows the number of articles found after each scrape.
        $("#number-articles-found").empty();
        //Before we do a new scrape, run a GET request to get the total number of articles currently in our database.
        $.ajax({
            method: "GET",
            url: "/all"
        })
        //With that done
        .then((data) => {
            //Log the response
            console.log(data);
            //Set the current variable to data.length, which is the current number of articles in our database.
            current = data.length;
            console.log(current);
            console.log(previous);
            //Set the previous variable to match current. 
            previous = current;
            //Run a GET request to scrape new articles (if any) from the site we are scraping from.
            $.ajax({
                method:"GET",
                url: "/scrape"
            })
            //When the scraping is done...
            .then((data) => {
                //After scraping is done, do another get request to get the updated number of articles in our database.
                //If this number did not change, we did not scrape any new articles from the site.
                $.ajax({
                    method: "GET",
                    url: "/all"
                })
                .then((data) => {
                    //Set current to the new number of articles in the database.
                    current = data.length;
                    console.log(current);
                    console.log(previous);
                    //If the current number of articles in the database is greater than the previous number of articles, 
                    //then, we know that we did scrape at least one new article from the website.
                    if (previous !== current) {
                        //Open a modal that tells the user the number of new articles that were found/scraped.
                        $("#number-articles-found").text((current - previous) + " article(s) found.").addClass("text-white");
                        $('#articles-found-modal').modal('show');
                        //Set previous to the current number of articles.
                        previous = current;
                        console.log(previous);
                    }
    
                    //If there are no new articles to scrape, tell the user no new articles were found.
                    else {
                        console.log("No new articles found.")
                        $("#number-articles-found").text("No new articles found. Come back tomorrow for more!").addClass("text-white");
                        $('#articles-found-modal').modal('show');
                    }

                    //When the user closes the modal that displays the number of articles found, reload the page.
                    //Reload the page to see the updated list of articles.
                    $("#articles-found-modal-close").on("click", (event) => location.reload());
                })
            })
        });
    });

    //Click event for "Save article" button.    
    $(".save-article-btn").on("click", function(event) {
        //Grab the id associated with the article.
        var thisId = $(this).attr("data-id");
        //Show message to the user that the article was saved successfully
        $('#save-success-modal').modal('show');

        //Run a PUT request to update saved value from false to true in the database.
        $.ajax({
            method: "PUT",
            url: "/marksaved/" + thisId,
        })
        //With that done
        .then(function(data) {
            //Log the response
            console.log(data);
            
            //When user closes modal, reload the page.
            $("#article-saved-close-button").on("click", function(event) {
                //Reload the page to see the updated list of atricles.
                location.reload();
            });
        });
    });


    //Click event for "Remove from saved" button.
    $(".remove-saved-btn").on("click", function(event) {
        console.log("remove saved button clicked");
        //Grab the id associated with the article.
        var thisId = $(this).attr("data-id");
        //Show message to the user that asks if they want to actually remove the article from the saved articles list.
        $('#remove-save-success-modal').modal('show');

        //If the user confirms that they do want to remove the article, then go ahead and remove the article from the saved articles list.
        $("#remove-saved-article-button").on("click", function(event) {
            //Run a PUT request to update saved value from true to false in the database.
            $.ajax({
                method: "PUT",
                url: "/markunsaved/" + thisId
            })
            //With that done
            .then(function(data) {
                //Log the response
                console.log(data);
                //Reload the page to get the updated list of articles.
                location.reload();
            });
        });
    });

    //Click event to delete an article.
    $(".delete-article-btn").on("click", function(event) {
        console.log("delete button clicked");
        var id = $(this).data("id");
        //Show delete article confirmation modal.
        $('#confirm-delete-modal').modal('show');

        //If user confirms that they want to delete the article, then go ahead and delete the article from the database.
        $("#delete-confirm-button").on("click", function(event) {
            // Send the DELETE request using ajax.
            $.ajax("/articles/" + id, {
                type: "DELETE",
            }).then(
                function() {
                console.log("deleted article", id);
                // Reload the page to get the updated list of articles.
                location.reload();
                }
            );
        });
    });

    //Click event to open the article notes/comments modal.
    $(".add-notes-btn").on("click", function(event) {
        $("#user-comments").empty();
        $("#save-comment-button").remove();
        console.log("add notes button clicked");
        //Show modal where users can enter and submit comments.
        $('#comments-modal').modal('show');
        //Save the id from the leave a comment button.
        var thisId = $(this).data("id");

        //Now make an ajax call for the Article
        $.ajax({
            method: "GET",
            url: "/articles/" + thisId
        })
            //With that done, add the note information to the page
            .then(function(data) {
                console.log(data);
                //The title of the article
                $("#comments-title").text("Leave a comment");
                //A button to submit a new note, with the id of the article saved to it
                var submitCommentBtn = $("<button data-id='" + thisId + "'>");
                submitCommentBtn.addClass("btn btn-secondary save-comment-button").attr("id", "save-comment-button").data("dismiss", "modal").text("Save comment");
                $(".comments-footer").append(submitCommentBtn);

            //If there's a note in the article
            if (data.note) {
                console.log(data.note);
                // Place the body of the note in the body textarea
                var userNote = $("<div>");
                userNote.append(data.note.body).addClass("mt-4");
                var userCommentsHeading = $("<h5>");
                userCommentsHeading.text("Article comments");
                $("#user-comments").append(userCommentsHeading);
                $("#user-comments").append(userNote);
                // var removeComment = $("<button>");
                // removeComment.text("Remove").attr("id", data.note._id).addClass("btn btn-primary");
                // userNote.append("<br>");
                // userNote.append(removeComment);
            }
            });
    });

    //When you click the save comment button
    $(document).on("click", "#save-comment-button", function() {
        //Grab the id associated with the article from the submit button
        // var thisId = $(this).attr("data-id");
    
        // // Run a POST request to change the note, using what's entered in the inputs
        // $.ajax({
        // method: "POST",
        // url: "/articles/" + thisId,
        // data: {
        //     // Value taken from note textarea
        //     body: $("#commentbody").val()
        // }
        // })
        // // With that done
        // .then(function(data) {
        //     //Log the response
        //     console.log(data);
        //     //Empty the notes section
        //     $("#comments").empty();
        //     $('#comments-modal').modal('toggle');
        //     $("#user-comments").empty();
        //     $("#save-comment-button").remove();
            
        // });
    
        // Also, remove the values entered in the input and textarea for note entry
        // $("#commentbody").val("");
        // $("#save-comment-button").remove();

        var thisId = $(this).attr("data-id");
        if (!$("#commentbody").val()) {
            alert("please enter a note to save")
        }
        else {
        $.ajax({
                method: "POST",
                url: "/notes/save/" + thisId,
                data: {
                    text: $("#commentbody").val(), 
                    headline: thisId
                }
            }).done(function(data) {
                // Log the response
                console.log(data);
                // Empty the notes section
                $("#commentbody").val("");
                $("#comments").empty();
                $('#comments-modal').modal('toggle');
                $("#user-comments").empty();
                $("#save-comment-button").remove();
                $('#comments-modal').modal('toggle');
                window.location = "/saved"
            });
        }
    });
  
});


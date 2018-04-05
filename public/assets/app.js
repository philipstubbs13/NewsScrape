$(window).load(function() {

    //Create variables to keep track of the number of articles in our database every time we do a new scrape.
    //previous is the number of articles before doing a new scrape.
    //current is the number of articles after during a new scrape.
    var previous = 0;
    var current = null;

    //Click event for scraping new articles.
    $("#scrape-articles").on("click", function(event) {
        //Empty out the modal that shows the number of articles found after each scrape.
        $("#number-articles-found").empty();
        //Before we do a new scrape, run a GET request to get the total number of articles currently in our database.
        $.ajax({
            method: "GET",
            url: "/all",
        })
        //With that done
        .then(function(data) {
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
            //With that scraping done...
            .then(function(data) {
                //After scraping is done, do another get request to get the updated number of articles in our database.
                //If this number did not change, we did not scrape any new articles from the site.
                $.ajax({
                    method: "GET",
                    url: "/all"
                })
                .then(function(data){
                    //Set current to the new number of articles in the database.
                    current = data.length;
                    console.log(current);
                    console.log(previous);
                    //If the current number of articles in the database is greater than the previous number of articles, 
                    //then, we did scrape at least one new article from the website.
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
                    $("#articles-found-modal-close").on("click", function(event) {
                        //Reload the page to see the updated list of articles.
                        location.reload();
                    });
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
        //Empty out the user comments (if not done already);
        $("#user-comments").empty();
        $("#save-comment-button").remove();
        $(".post-comment-error").empty();
        //Show modal where users can enter and submit comments.
        $('#comments-modal').modal('show');
        //Save the id from the leave a comment button.
        var thisId = $(this).data("id");

        //Now make an ajax call to get the comments associated with the article.
        $.ajax({
            method: "GET",
            url: "/notes/" + thisId
        })
            //With that done, add the comment information to the page
            .then(function(data) {
                console.log(data);
                //The title of the article
                $("#comments-title").text("Leave a comment");
                //A button to submit a new comment, with the id of the article saved to it
                var submitCommentBtn = $(`<button data-id= ${thisId}>`);
                submitCommentBtn.addClass("btn btn-secondary save-comment-button").attr("id", "save-comment-button").data("dismiss", "modal").text("Post comment");
                $(".comments-footer").append(submitCommentBtn);

                //Add heading to article comments section in the modal.
                var userCommentsHeading = $("<h5>");
                userCommentsHeading.text("Article comments").addClass("text-center");
                //If the article has at least one comment, display the comment(s) to the user.
                $("#user-comments").append(userCommentsHeading);
                if (data.length) {
                    console.log(data);
                    //Place the notes in the article comments section of the modal.
                    for (var i = 0; i < data.length; i++) {
                        var userNoteDiv = $("<div>");
                        userNoteDiv.addClass("user-note-div");
                        var userNote = $("<p>");
                        userNote.text(data[i].body).addClass("mt-5");
                        userNoteDiv.append(userNote);
                        $("#user-comments").append(userNoteDiv);
                        //Create delete comment button for each comment.
                        var removeComment = $("<button>");
                        removeComment.text("Delete comment").attr("id", data[i]._id).addClass("btn btn-primary mb-4 delete-comment-btn");
                        userNoteDiv.append(removeComment);
                    }
                }

                //If there are no comments associated with this article, tell the user that there are no comments for this article yet.
                else {
                    var noArticleComments = $("<h5>");
                    noArticleComments.text("No comments have been posted for this article yet.").addClass("mt-4 text-center");
                    var noUserPostYet = $("<p>");
                    noUserPostYet.text("Be the first one to leave a comment.").addClass("text-center comment-section-text");
                    $("#user-comments").append(noArticleComments).append(noUserPostYet);
                } 
            });
    });

    //When you click the save comment button
    $(document).on("click", "#save-comment-button", function() {
        //Grab the id associated with the article from the submit button
        var thisId = $(this).attr("data-id");
        //If the body of the comment is empty, notify the user to enter a comment.
        if (!$("#commentbody").val()) {
            var postCommentError = $("<p>");
            postCommentError.text("No comment entered. Enter a comment to continue.").addClass("text-white post-comment-error");
            $(".form-group").append(postCommentError);
        }
        else {
            $.ajax({
                    method: "POST",
                    url: "/notes",
                    data: {
                        body: $("#commentbody").val(), 
                        headline: thisId
                    }
            }).done(function(data) {
                //Log the response
                console.log(data);
                //Empty the notes section and close the modal.
                //Also, remove the values entered in the input and textarea for note entry
                $("#commentbody").val("");
                $("#comments").empty();
                $(".post-comment-error").empty();
                $('#comments-modal').modal('toggle');
                $("#user-comments").empty();
                $("#save-comment-button").remove();
                $('#comments-modal').modal('hide');
                window.location = "/saved"
            });
        }
    });

    //Click event to delete a comment.
    $(document).on("click", ".delete-comment-btn", function(event){
        event.preventDefault();
        console.log("delete button clicked");
        var id = $(this).attr("id");
        console.log(id);
        //Show delete comment confirmation modal.
        $('#confirm-delete-comment-modal').modal('show');

        //If user confirms that they want to delete the comment, then go ahead and delete the comment from the database.
        $("#delete-comment-confirm-button").on("click", function(event) {
            // Send the DELETE request using ajax.
            $.ajax("/notes/" + id, {
                type: "DELETE",
            }).then(
                function() {
                console.log("deleted comment", id);
                // Reload the page to get the updated list of saved comments.
                location.reload();
                }
            );
        });
    });
});


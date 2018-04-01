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

    //Click event for "Save article" button.    console.log("save article button clicked");
    $(".save-article-btn").on("click", function(event) {
        //Grab the id associated with the article.
        var thisId = $(this).attr("data-id");

        //Run a PUT request to update saved value from false to true in the database.
        $.ajax({
            method: "PUT",
            url: "/marksaved/" + thisId,
        })
        //With that done
        .then(function(data) {
        //Log the response
        console.log(data);
        //Reload the page to see the updated list of atricles.
        location.reload();
        });
    });

    //Click event for "Remove from saved" button.
    $(".remove-saved-btn").on("click", function(event) {
        console.log("remove saved button clicked");
        //Grab the id associated with the article.
        var thisId = $(this).attr("data-id");

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

    //Click event to delete an article.
    $(".delete-article-btn").on("click", function(event) {
        console.log("delete button clicked");
        var id = $(this).data("id");

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
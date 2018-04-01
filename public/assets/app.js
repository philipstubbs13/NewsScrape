//Click event for scraping new articles.
$("#scrape-articles").on("click", function(event) {
    console.log("scrape new articles button clicked");
    console.log("save article button clicked");
    //Run a GET request to get new scraped articles.
    $.ajax({
        method: "GET",
        url: "/scrape",
    })
    //With that done
    .then(function(data) {
      //Log the response
      console.log(data);
      //If there are no new articles to scrape, tell the user no new articles were found.
      if (data.length = 0) {
          console.log("No new articles found.")
      }

      //Else, scrape articles and tell user the number of new articles that were found.
      else {
        console.log(data.length + " new article found.");
      }
      //Reload the page to see the updated list of articles.
      location.reload();
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
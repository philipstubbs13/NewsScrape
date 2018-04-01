
//Click event for "Save article" button.
$(".save-article-btn").on("click", function(event) {
    console.log("save article button clicked");
  // Grab the id associated with the article.
  var thisId = $(this).attr("data-id");

  // Run a PUT request to update saved value in db.
  $.ajax({
    method: "PUT",
    url: "/marksaved/" + thisId,
  })
    // With that done
    .then(function(data) {
      // Log the response
      console.log(data);
    });
});

//Click event for "Remove from saved" button.
$(".remove-saved-btn").on("click", function(event) {
    console.log("remove saved button clicked");
  // Grab the id associated with the article.
  var thisId = $(this).attr("data-id");

  // Run a PUT request to update saved value in db.
  $.ajax({
    method: "PUT",
    url: "/markunsaved/" + thisId
  })
    // With that done
    .then(function(data) {
      // Log the response
      console.log(data);
    });
});
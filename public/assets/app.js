$.getJSON("/all", function(data) {
    $(".articles").empty();

    //For each entry of that json...
    console.log(data);
    for (var i =2; i < data.length; i++) {
        //Dynamically create a separate card for each article that we are scraping/extracting from the news site.
        var articleCard = $("<div>");
        articleCard.addClass("card border border-success bg-success mt-5");
        //Append the article card to the article section of my site.
        $(".articles").append(articleCard);
        //Dynamically create a div inside each article card that will hold the article information, including, title, summary, link, and image.
        articleInfo = $("<div>");
        articleInfo.addClass("card-body");
        articleCard.append(articleInfo);
        //Dynamically create <h5> tag for article title.
        articleTitle = $("<h5>");
        articleTitle.addClass("card-title article-title");
        articleTitle.text(data[i].title);
        // articleDate = $("<p>");
        // articleDate.addClass("card-text article-date");
        // articleDate.text(data[i].date);
        //Dynamically create <p> tag for article summary
        articleSummary = $("<p>");
        articleSummary.addClass("card-text article-summary");
        articleSummary.text(data[i].summary);
        //Dynamically create <img> tage for article image.
        articleImage = $("<img>");
        articleImage.attr("src", data[i].img).addClass("img-fluid article-img");
        //Dynamically create <a> tag to link to each article from my application.
        articleLink = $("<a>");
        articleLink.addClass("article-link");
        articleLink.attr("href", "http://www.espn.com" + data[i].link).attr("target", "_blank");
        //Dynamically create <button> tag to create a a "Continue reading" button that will link to each article.
        articleLinkButton = $("<button>");
        articleLinkButton.addClass("btn btn-primary btn-dark mt-4").text("Continue reading");
        articleLink.append(articleLinkButton);
        //Dynamically create <button> tag to create a "Save article" button that will save the article to the database when the button is clicked.
        saveArticleBtn = $("<button>");
        saveArticleBtn.addClass("btn btn-dark ml-3 mt-4").text("Save article");
        //Append the article title, summary, link, image, and save articles button to the articleInfo div.
        articleInfo.append(articleTitle).append(articleSummary).append(articleImage).append("<br>").append(articleLink).append(saveArticleBtn);
    }
})

$("#savearticle").on("click", function() {
    
})
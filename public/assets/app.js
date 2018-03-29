$.getJSON("/all", function(data) {
    //For each entry of that json...
    console.log(data);
    for (var i =0; i < data.length; i++) {
        var articleCard = $("<div>");
        articleCard.addClass("card border border-success bg-success mt-5");
        $(".articles").append(articleCard);
        articleInfo = $("<div>");
        articleInfo.addClass("card-body");
        articleCard.append(articleInfo);
        articleTitle = $("<h5>");
        articleTitle.addClass("card-title article-title");
        articleTitle.text(data[i].title);
        articleDate = $("<p>");
        articleDate.addClass("card-text article-date");
        articleDate.text(data[i].date);
        articleSummary = $("<p>");
        articleSummary.addClass("card-text article-summary");
        articleSummary.text(data[i].summary);
        articleLink = $("<a>");
        articleLink.addClass("article-link");
        articleLink.attr("href", "http://www.timberwolves.com/news" + data[i].link).attr("target", "_blank");
        articleLinkButton = $("<button>");
        articleLinkButton.addClass("btn btn-primary btn-dark").text("Continue reading");
        articleLink.append(articleLinkButton);
        saveArticleBtn = $("<button>");
        saveArticleBtn.addClass("btn btn-dark ml-3").text("Save article");
        articleInfo.append(articleTitle).append(articleDate).append(articleSummary).append(articleLink).append(saveArticleBtn);
    }
})

$("#savearticle").on("click", function() {
    
})
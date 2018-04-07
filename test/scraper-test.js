
var Nightmare = require("nightmare");
new Nightmare({ show: true })
  //Go to home page
  .goto("https://hoops-scraper.herokuapp.com/")
  //Click scrape new articles
  .click("#scrape-articles")
  .wait(2000)
  //Close modal
  .click("#articles-found-modal-close")
  .wait(2000)
  //Save article
  .click(".save-article-btn")
  .wait(2000)
  .click("#article-saved-close-button")
  .wait(2000)
  //Delete article
  .click(".delete-article-btn")
  .wait(2000)
  .click("#delete-confirm-button")
  .wait(2000)
  //Saved articles
  .click("#saved-articles")
  .wait(2000)
  //Add comments
  .click(".add-notes-btn")
  .type("#commentbody", "This is a test comment.")
  .click("#save-comment-button")
  .wait(2000)
  .click(".add-notes-btn")

  //Take a screenshot and save it to the current directory.
  .screenshot("./test/scraper-test.png")
  // End test
  .end()
  // Execute commands
  .then(function() {
    console.log("Done!");
  })
  // Catch errors
  .catch(function(err) {
    console.log(err);
  });
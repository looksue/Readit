// Basic Node application for requesting data from the Good Reads website via axios
// Here we incorporate the "axios" npm package
var axios = require("axios");

// We then run the request with axios module on a URL with a JSON
axios
  .get(
    "https://www.goodreads.com/search.xml?key=0rmItFf4suBZXI4SCxAyMg&q=Ender%27s+Game"
  )
  .then(function(response) {
    // Then we print out the goodReads Rating
    // right now only pulling response from the entire search results of Enders Game
    console.log("The book's rating is: " + response.data.GoodreadsResponse);
  });

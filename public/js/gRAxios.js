// Basic Node application for requesting data from the Good Reads website via axios
// Here we incorporate the "axios" npm package
var axios = require("axios");

// Store all of the arguments in an array
var nodeArgs = process.argv;

// Create an empty variable for holding the book name
// var bookTitle = "";
// // Create an empty variable for holding the book author
// var bookAuthor = "";


//for title
// Loop through all the words in the node argument
// And do a little for-loop magic to handle the inclusion of "+"s

//for author
// Loop through all the words in the node argument
// And do a little for-loop magic to handle the inclusion of "+"s

// Get references to page elements
// var bookTitle = $("#book-title").val();
// var bookAuthor = $("#book-author").val();

var queryUrlTitle = "https://www.googleapis.com/books/v1/volumes?q=" + $bookTitle + ?;
var queryUrlAuthor = "https://www.googleapis.com/books/v1/volumes?q=" + $bookAuthor + ?;

console.log(queryUrlTitle);
console.log(queryUrlAuthor);
function 
// We then run the request with axios module on a URL with a JSON
axios
  .get(queryUrlTitle)
  .then(function(response) {
    // Then we print out the googleBooks Response
                          //these are just guesses on how to get the data
  console.log("Title: " + response.data.title);
  console.log("By: " + response.data.author);
  console.log("Genre: " + response.data.genre);
  console.log("The book's rating is: " + response.data.rating);
  console.log("Summary: " + response.data.summary);
  console.log("Img: " + response.data.image);
  })
  .catch(function(error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log("---------------Data---------------");
      console.log(error.response.data);
      console.log("---------------Status---------------");
      console.log(error.response.status);
      console.log("---------------Status---------------");
      console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an object that comes back with details pertaining to the error that occurred.
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log("Error", error.message);
    }
    console.log(error.config);
  });;

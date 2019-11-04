var db = require("../models");
var axios = require("axios");
module.exports = function(app) {
  // Get all books
  app.post("/api/google", function(req, res) {
    console.log(req.body);
    var queryUrlTitle = "https://www.googleapis.com/books/v1/volumes?q=";
    if (req.body.title.length) {
      queryUrlTitle += "+intitle:" + req.body.title;
    }
    if (req.body.author.length) {
      queryUrlTitle += "+inauthor:" + req.body.author;
    }
    console.log(queryUrlTitle);
    axios
      .get(queryUrlTitle)
      .then(function(response) {
        res.json(response.data);
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
      });
  });

  app.get("/api/books", function(req, res) {
    db.Book.findAll({}).then(function(dbBooks) {
      console.log(dbBooks);
      res.json(dbBooks);
    });
  });

  // Create a new book
  app.post("/api/books", function(req, res) {
    db.Book.create(req.body).then(function(dbBook) {
      res.json(dbBook);
    });
  });

  // Delete a book by id
  app.delete("/api/books/:id", function(req, res) {
    db.Book.destroy({ where: { id: req.params.id } }).then(function(dbBook) {
      res.json(dbBook);
    });
  });
};

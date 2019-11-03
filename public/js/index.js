// Get references to page elements
var $bookTitle = $("#book-title");
var $bookAuthor = $("#book-author");
//var $bookDescription = $("#book-description");
var $bookGenre = $("#book-genre");
//var $bookRating = $("#book-rating");
//var $bookCover = $("#book-cover");
var $submitBtn = $("#submit");
var $bookList = $("#book-list");

// The API object contains methods for each kind of request we'll make
var API = {
  saveBook: function(book) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/books",
      data: JSON.stringify(book)
    });
  },
  getBooks: function() {
    return $.ajax({
      url: "api/books",
      type: "GET"
    });
  },
  deleteBook: function(id) {
    return $.ajax({
      url: "api/books/" + id,
      type: "DELETE"
    });
  }
};

// refreshBooks gets new books from the db and repopulates the list
var refreshBooks = function() {
  API.getBooks().then(function(data) {
    var $books = data.map(function(book) {
      var $a = $("<a>")
        .text(book.title)
        .attr("href", "/book/" + book.id);

      var $li = $("<li>")
        .attr({
          class: "list-group-item",
          "data-id": book.id
        })
        .append($a);

      var $button = $("<button>")
        .addClass("btn btn-danger float-right delete")
        .text("delete");

      $li.append($button);

      return $li;
    });

    $bookList.empty();
    $bookList.append($books);
  });
};

// handleFormSubmit is called whenever we submit a new book
// Save the new book to the db and refresh the list
var handleFormSubmit = function(event) {
  event.preventDefault();

  var book = {
    title: $bookTitle.val().trim(),
    author: $bookAuthor.val().trim(),
    genre: $bookGenre.val().trim()
  };

  if (!(book.title || book.author)) {
    alert("You must enter a book title or author!");
    return;
  }

  API.saveBook(book).then(function() {
    refreshBooks();
  });
  $bookTitle.val("");
  $bookAuthor.val("");
  $bookGenre.val("");
};

// handleDeleteBtnClick is called when an book's delete button is clicked
// Remove the book from the db and refresh the list
var handleDeleteBtnClick = function() {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deleteBook(idToDelete).then(function() {
    refreshBooks();
  });
};

// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
$bookList.on("click", ".delete", handleDeleteBtnClick);

/* eslint-disable no-unused-vars */
// Get references to page elements

var $bookTitle = $("#book-title");

var $submitBtn = $("#submit");
var $bookList = $("#sumbmitted-list");
var globalResults = {};

// The API object contains methods for each kind of request being made

var API = {
  google: function(titleAuthor) {
    return $.ajax({
      type: "POST",
      url: "api/google/",
      data: titleAuthor
    });
  },
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
  console.log("loading books");
  API.getBooks().then(function(data) {
    console.log(data);
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
    title: $("#book-title")
      .val()
      .trim(),
    author: $("#book-author")
      .val()
      .trim()
  };

  console.log(book.title, book.author);
  if (book.title || book.author) {
    console.log("googling");

    API.google(book).then(function(res) {
      globalResults = res.items;

      $("#resContents").empty();
      res.items.forEach(function(book, index) {
        var $row = $("<div>").addClass("row pb-2");
        var $col1 = $("<div>").addClass("col-sm-4");

        console.log(book.volumeInfo);

        //console.log(book.volumeInfo.imageLinks.smallThumbnail)

        if (book.volumeInfo.imageLinks) {
          var $img = $("<img>").attr(
            "src",
            book.volumeInfo.imageLinks.smallThumbnail
          );
          $col1.append($img);
        }
        // <========== assign a place holder in else
        var $col2 = $("<div>").addClass("col-sm-8");
        var $title = $("<div>").html(
          "<strong>Title: " + book.volumeInfo.title + "</strong>"
        );
        var authors = "";
        if (book.volumeInfo.authors !== undefined) {
          for (let i = 0; i < book.volumeInfo.authors.length; i++) {
            authors += book.volumeInfo.authors[i];
            if (i !== book.volumeInfo.authors.length - 1) {
              authors += ", ";
            }
          }
        } else {
          authors = "Unknown Author";
        }
        var $author = $("<div>").text("Author: " + authors);
        var $description = $("<div>").html(
          "Description:<br>" + book.volumeInfo.description
        );
        var $add = $("<button>").addClass("btn btn-success add");
        $add.text("+");
        $add.val(index);
        $col2.append($title, $author, $description, $add);
        $row.append($col1, $col2);
        $("#resContents").append($row);
      });
      console.log(res);
      $("#results").modal(focus);
    });
    //alert("You must enter a book title or author!");
    //return;
  }

  // API.saveBook(book).then(function () {
  //   refreshBooks();
  // });
  // $bookTitle.val("");  Not sure if this is needed
  // $bookAuthor.val("");
  // $bookGenre.val("");
};
$("#results").on("click", ".add", function() {
  var theBook = globalResults[$(this).val()];
  console.log($(this).val());
  console.log(theBook);
  var saveBook = {};
  saveBook.title = theBook.volumeInfo.title;
  var authorz = "";
  if (theBook.volumeInfo.authors !== undefined) {
    for (let i = 0; i < theBook.volumeInfo.authors.length; i++) {
      authorz += theBook.volumeInfo.authors[i];
      if (i !== theBook.volumeInfo.authors.length - 1) {
        authorz += ", ";
      }
    }
  } else {
    authorz = "Unknown Author";
  }
  saveBook.genre = "N/A";
  saveBook.author = authorz;
  saveBook.summary = theBook.volumeInfo.description;
  if (!isNaN(theBook.volumeInfo.averageRating)) {
    saveBook.rating = theBook.volumeInfo.averageRating;
  } else {
    saveBook.rating = "N/A";
  }
  if (theBook.volumeInfo.imageLinks) {
    saveBook.cover = theBook.volumeInfo.imageLinks.smallThumbnail;
  } else {
    saveBook.cover = "https://via.placeholder.com/100x100";
  }
  API.saveBook(saveBook).then(function() {
    console.log("saved");
    refreshBooks();
  });
});
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
$("#results").on("hidden.bs.modal", function() {
  // do something…
  console.log("modal closed");
  refreshBooks();
});
// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
$bookList.on("click", ".delete", handleDeleteBtnClick);

const express = require("express");
const server = express();

server.use(express.urlencoded({ extended: true }));
server.set("view engine", "ejs");

let books = [
  {
    "id": "0501",
    "bookNo": "501",
    "bookName": "Thinking, Fast and Slow",
    "author": "Daniel Kahneman",
    "language": "English",
    "publishedDate": "2011-10-25",
    "duplicates": 8,
    "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyTR1465s-knzOUoOEBOPrH60pNIfQ5R7vDg&s"
  },
  {
    "bookNo": "0502",
    "bookName": "Ikigai: The Japanese Secret to a Long and Happy Life",
    "author": "Héctor García, Francesc Miralles",
    "language": "English",
    "publishedDate": "2017-08-29",
    "duplicates": 10,
    "imageUrl": "https://images-na.ssl-images-amazon.com/images/I/81l3rZK4lnL.jpg"
  },
  {
    "bookNo": "0503",
    "bookName": "Can’t Hurt Me",
    "author": "David Goggins",
    "language": "English",
    "publishedDate": "2018-12-04",
    "duplicates": 6,
    "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXda0Q8IvA2WhYo-JZOZg7qAuSd9eQ9xlISg&s"
  },
  {
    "bookNo": "0504",
    "bookName": "Sapiens: A Brief History of Humankind",
    "author": "Yuval Noah Harari",
    "language": "English",
    "publishedDate": "2015-02-10",
    "duplicates": 5,
    "imageUrl": "https://images-na.ssl-images-amazon.com/images/I/713jIoMO3UL.jpg"
  },
  {
    "bookNo": "0505",
    "bookName": "The Power of Now",
    "author": "Eckhart Tolle",
    "language": "English",
    "publishedDate": "2004-08-19",
    "duplicates": 7,
    "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTz-aJ-tNOhmwFYoLOkmSg__NG7LvictsQuiPYrCUUhWtPdiZ4PRk-3nQtcKgyYUvLlfkE&usqp=CAU"
  },
  {
    "bookNo": "0506",
    "bookName": "Start With Why",
    "author": "Simon Sinek",
    "language": "English",
    "publishedDate": "2011-12-27",
    "duplicates": 9,
    "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrYutqClzb6UzalXUiEFJzq-U3ZvwkoqX3cA&s"
  }

];

// Home page
server.get("/", (req, res) => {
  res.render("Index", { books });
});

// Add book form
server.get("/add", (req, res) => {
  res.render("Add");
});

// Add book handler
server.post("/add-book", (req, res) => {
  console.log(req.body);
  const { bookNo, bookName, author, language, publishedDate, duplicates, imageUrl } = req.body;

  const newBook = {
    bookNo: bookNo.trim(),
    bookName: bookName.trim(),
    author: author.trim(),
    language: language.trim(),
    publishedDate: publishedDate,
    duplicates: parseInt(duplicates) || 1,
    imageUrl: imageUrl.trim()
  };

  books.push(newBook);
  res.redirect("/");
});

// Delete book handler
server.get("/delete-book/:bookNo", (req, res) => {
  const bookNo = req.params.bookNo;
  books = books.filter(bk => bk.bookNo !== bookNo);
  res.redirect("/");
});

// Edit book form
server.get("/edit-book/:bookNo", (req, res) => {
  const bookNo = req.params.bookNo;
  const singleBook = books.find(bk => bk.bookNo === bookNo);
  if (!singleBook) return res.status(404).render("NotFound");
  res.render("Edit", { book: singleBook });
});

// Update book handler
server.post("/update-book/:bookNo", (req, res) => {
  const bookNo = req.params.bookNo;
  const { bookName, author, language, publishedDate, duplicates, imageUrl } = req.body;

  books = books.map(bk => {
    if (bk.bookNo === bookNo) {
      return {
        bookNo: bookNo,
        bookName: bookName.trim(),
        author: author.trim(),
        language: language.trim(),
        publishedDate: publishedDate,
        duplicates: parseInt(duplicates) || 1,
        imageUrl: imageUrl.trim()
      };
    }
    return bk;
  });

  res.redirect("/");
});

// 404 page
server.use((req, res) => {
  res.status(404).render("NotFound");
});

// Start the server
server.listen(8000, () => {
  console.log("Server started at http://localhost:8000");
});

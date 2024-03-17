const express = require("express");
const bookModel = require("../Model/bookModel");
const app = express();

// get all books
// app.get("/books", async (req, res) => {
//   const books = await bookModel.find({});
//   try {
//     res.send(books);
//   } catch (error) {
//     res.status(500).send(error);
//   }
// });


//get single book
app.get("/book/:id", async (req, res) => {
  const books = await bookModel.findById(req.params.id);
  try {
    res.send(books);
  } catch (error) {
    res.status(500).send(error);
  }
});


app.get("/books", async (req, res) => {
  try {
    let query = {};
    if (req.query.category) {
      query = { category: req.query.category };
    }
    const result = await bookModel.find(query);
    res.send(result);
    
  } catch (error) {
    console.error("Error fetching books:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


//upload book
app.post("/book-uplode", async (req, res) => {
  const book = new bookModel(req.body);
  try {
    await book.save();
    res.send(book);
  } catch (error) {
    res.status(500).send(error);
  }
});


//update book
app.patch("/book/:id", async (req, res) => {
  try {
    const updatedBook = await bookModel.findByIdAndUpdate(req.params.id, req.body);
    await updatedBook.save();
    res.json({
      status: "success",
      message: "Book updated successfully",
      book: updatedBook
    });
  } catch (e) {
    res.status(500).send(e);
  }
});

//delete book
app.delete("/book/:id", async (req, res) => {
  try {
    const book = await bookModel.findByIdAndDelete(req.params.id);
    if (!book) res.status(404).send("No item found");
    res.status(200).send();
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = app;

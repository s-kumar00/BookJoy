const { Int32 } = require("mongodb");
const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema({
  bookTitle: {
    type: String,
    required: true,
    
  },
  authorName:{
    type: String,
    required: true,
  },
  imageURL:{
    type: String,
    required: true,
  },
  category:{
    type: String,
    required: true,
  },
  bookDescription:{
    type:String,
    required:true,
  },
  bookPDFURL:{
    type:String,
    required:true,
  },
  price:{
    type:String ,
    required:true
  }
});


const Book = mongoose.model("Book", BookSchema);

module.exports = Book;
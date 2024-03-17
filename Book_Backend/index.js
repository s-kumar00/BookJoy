const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");
const authRoutes = require('./Router/authRoutes')
const bookRouter = require("./Router/bookRoutes");
app.use(express.json());
app.use(cors({
  origin:"*"
}));


app.use(bookRouter);
app.use("/api/auth", authRoutes)

const port = process.env.PORT || 8000;

mongoose.connect(
  `${process.env.DB_CONNECT}`,
  {
    dbName: "Book_Details",
  },
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
).then(() => {
    console.log("Connected to Database");
}).catch((err) => {
    console.log("Not Connected to Database!");
})

app.listen(port, () => {
  try {
    console.log(`Running on port ${port}`);
  } catch (error) {
    console.log(`Some Error while running on ${port}`);
  }
});

//Node modules
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

//Initialising express, body-parser and ejs
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

//Using public directory
app.use(express.static("public"));

//Initialising mongoose
mongoose.connect("mongodb://localhost:27017/wikiDB");

//Creating instance for app
app.listen(3000, () => {
  console.log("Server is up on port 3000");
});

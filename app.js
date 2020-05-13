//Node modules
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

//Initialising mongoose
mongoose.connect("mongodb://localhost:27017/wikiDB");

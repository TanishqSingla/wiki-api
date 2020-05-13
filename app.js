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
mongoose.connect("mongodb://localhost:27017/wikiDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//defining article schema and model
const articleSchema = {
  title: String,
  content: String,
};
const Article = mongoose.model("Article", articleSchema);

//article route
app
  .route("/articles")
  .get((req, res) => {
    Article.find((e, foundArticles) => {
      if (!e) {
        res.send(foundArticles);
      } else {
        res.send(e);
      }
    });
  })
  .post((req, res) => {
    const newArticle = new Article({
      title: req.body.title,
      content: req.body.content,
    });

    newArticle.save((e) => {
      if (!e) {
        res.send("Succesfully Added to Database");
      }
    });
  })
  .delete((req, res) => {
    Article.deleteMany((e) => {
      if (!e) {
        res.send("Succesfully delted all articles");
      } else {
        res.send(e);
      }
    });
  });

app
  .route("/articles/:articleTitle")
  .get((req, res) => {
    Article.findOne({ title: req.params.articleTitle }, (e, foundArticle) => {
      if (foundArticle) {
        res.send(foundArticle);
      } else {
        res.send("No article found");
      }
    });
  })
  .put((req, res) => {
    Article.update(
      { title: req.params.articleTitle },
      { title: req.body.title, content: req.body.content },
      { overwrite: true },
      (e) => {
        if (!e) {
          res.send("Succesfully Updated Article");
        } else {
          res.send(e);
        }
      }
    );
  })
  .patch((req, res) => {
    Article.update(
      { title: req.params.articleTitle },
      { $set: req.body },
      (e) => {
        if (!e) {
          res.send("Succesfully updated article");
        } else {
          res.send(e);
        }
      }
    );
  })
  .delete((req, res) => {
    Article.deleteOne({ title: req.params.articleTitle }, (e) => {
      if (!e) {
        res.send("Succesfully Deleted corresponding article");
      } else {
        res.send(e);
      }
    });
  });

//Creating instance for app
app.listen(3000, () => {
  console.log("Server is up on port 3000");
});

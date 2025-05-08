const BlogPosts = require("./blogPosts");
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();

const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

app.  get("/api/stats", function (req, res) {
  if (req.query.typestat == "count"){

  res.json({ postcount: BlogPosts.BlogPosts.length });
  }
});

app.post("/api/post", jsonParser, (req, res) => {
  const post = {
    slug: req.body.slug,
    title: req.body.title,
    description: req.body.description,
  };
  BlogPosts.BlogPosts.push(post);
  res.status(200).send({ message: "Posted successful" });
});

app.get("/api/posts", function (req, res) {
  res.send(JSON.stringify(BlogPosts.BlogPosts));
});
app.get("/api/post/:slug", function (req, res) {
  const slug = req.params.slug;
  const post = BlogPosts.BlogPosts.find((element) => element.slug === slug);
  if (post) res.send(JSON.stringify(post));
  else res.status(404).send("Not found");
});

app.post("/api/login", jsonParser, (req, res) => {
  const creds = {
    username: req.body.username,
    password: req.body.password,
  };
  if (creds.username === "admin" && creds.password === "123") {
    res.status(200).send({ message: "Login successful" });
  } else {
    res.status(400).send({ message: "Login failed" });
  }
});

app.listen(8080, () => console.log("API listening on :8080"));

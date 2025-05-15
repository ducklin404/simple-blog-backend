const BlogPosts = require("./blogPosts");
const bodyParser = require("body-parser");
const dbConnect = require("./db/dbConnect");
const jsonParser = bodyParser.json();
const PostRouter = require("./routes/PostRouter");
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

dbConnect();
app.use(express.json());
app.use("/api", PostRouter);


app.  get("/api/stats", function (req, res) {
  if (req.query.typestat == "count"){

  res.json({ postcount: BlogPosts.BlogPosts.length });
  }
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

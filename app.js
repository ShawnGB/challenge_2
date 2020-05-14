const express = require("express");
const app = express();

// Set port to 7777 while in dev enviroment
const PORT = process.env.PORT || 7777;

// log responses to consonle
const logger = (req, res, next) => {
  let oldSend = res.send;
  res.send = (data) => {
    console.log(data);
    res.send = oldSend;
    return res.send(data);
  };
  next();
};

// initialise logger
app.use(logger);

//routes
// path hello shoulde return "Hello?" || with name query "Hello, <name>!"
app.get("/hello", (req, res) => {
  if (req.query.name) {
    res.send(`Hello, ${req.query.name} !`);
  } else {
    res.send("Hello!");
  }
  res.end();
});

// all other path should return status 404
app.get("*", (req, res) => {
  res.sendStatus(404);
});

// Start server
app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));

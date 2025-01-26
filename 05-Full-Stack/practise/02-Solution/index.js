const express = require("express");

const app = express();

function logMiddleware(req, res, next) {
  console.log(req.method);
  console.log(`${req.protocol}://${req.get("host")}${req.url}`);
  console.log(new Date());

  next();
}

app.use(logMiddleware);

app.get("*", (req, res) => {
  res.send("Health check get");
});

app.post("*", (req, res) => {
  res.send("Health check post");
});

app.put("*", (req, res) => {
  res.send("Health check put");
});

app.delete("*", (req, res) => {
  res.send("Health check delete");
});

app.listen(5000, (req, res) => {
  console.log("Server running");
});

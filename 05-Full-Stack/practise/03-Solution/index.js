const express = require("express");

const app = express();

app.use(express.json());

let requestCount = 0;

function countRequestMiddleware(req, res, next) {
  requestCount++;
  next();
}

app.use(countRequestMiddleware);

app.get("/", (req, res) => {
  res.send("response");
});

app.get("/reqC", (req, res) => {
  res.send({
    totalReq: requestCount,
  });
});

app.listen(5000, (req, res) => {
  console.log("Server running");
});

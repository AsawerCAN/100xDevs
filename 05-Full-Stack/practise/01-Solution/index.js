const express = require("express");

const app = express();

app.use(express.json());

app.get("/sum/:num1/:num2", (req, res) => {
  const { num1, num2 } = req.params;
  res.send({
    result: parseInt(num1) + parseInt(num2),
  });
});

app.get("/subtract/:num1/:num2", (req, res) => {
  const { num1, num2 } = req.params;
  res.send({
    result: parseInt(num1) - parseInt(num2),
  });
});

app.get("/multiply/:num1/:num2", (req, res) => {
  const { num1, num2 } = req.params;
  res.send({
    result: parseInt(num1) * parseInt(num2),
  });
});

app.get("/divide/:num1/:num2", (req, res) => {
  const { num1, num2 } = req.params;
  res.send({
    result: parseInt(num1) / parseInt(num2),
  });
});

app.listen(5000, (req, res) => {
  console.log("Server running");
});

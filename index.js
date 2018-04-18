// LOAD ENVIRONMENT VARIABLES
require("dotenv").load();

const todoRoutes = require("./routes/todos");
const bodyParser = require("body-parser");
const path = require("path");
const express = require("express");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "/public")));
app.use(express.static(path.join(__dirname, "/views")));

// ROUTES
app.get("/", (req, res) => {
  res.sendFile("index.html");
});

app.use("/api/todos", todoRoutes);

app.listen(process.env.PORT, () => {
  console.log(
    `Daris is listening for Cloud List app.
    You can reach app from http://localhost:${process.env.PORT}`
  );
});

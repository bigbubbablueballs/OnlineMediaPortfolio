/**
 * Incomplete application, for teaching purposes
 */

const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const disk = require("fs");

var path = require("path");
var database = path.resolve("./students.json");

app.use(bodyParser.json());

app.get("/", function (req, res) {
  res.send("Hello World!");
});

app.get("/students", function (req, res) {
  const data = disk.readFileSync(database, "utf-8");
  const students = JSON.parse(data);
  res.json(students);
});

app.post("/students", function (req, res) {
  const data = disk.readFileSync(database, "utf-8");
  const students = JSON.parse(data);

  // request body containing the new student data
  const newStudent = req.body;

  //add new student
  students.push(newStudent);

  disk.writeFileSync(database, JSON.stringify(students, null, 2));
  res.json(students);
});

app.delete("/students/:id", function (req, res) {
  // base on the given id: [req.params.id] remove this element from the list of students
  res.send("TODO!");
});

app.put("/students/:id", function (req, res) {
  // base on the given id: [req.params.id] update this element from the list of students
  res.send("TODO!");
});

app.listen(3000, function () {
  console.log(`Example app listening on port 3000`);
});

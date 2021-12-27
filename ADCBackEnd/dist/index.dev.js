"use strict";

var express = require('express');

var bodyParser = require('body-parser');

var path = require('path');

var cors = require('cors');

var app = express();

var user = require('./routes/user');

var student = require('./routes/student');

var doctor = require('./routes/doctor');

var officer = require('./routes/officer');

var tassistant = require('./routes/tassistant');

var course = require('./routes/course');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(cors());
app.use('/user', user);
app.use('/student', student);
app.use('/officer', officer);
app.use('/doctor', doctor);
app.use('/tassistant', tassistant);
app.use('/course', course);
app.use(function (req, res, next) {
  var err = new Error('File Not Found');
  err.status = 404;
  next(err);
}); // error handler
// define as the last app.use callback

app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.send(err.message);
});
app.listen(9000, function () {
  return console.log("Server is up,Alaa on PORT 5000");
});
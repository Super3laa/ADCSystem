const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors=require('cors');
const app = express();
let user = require('./routes/user');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use('/user',user);

app.use(function (req, res, next) {
    var err = new Error('File Not Found');
    err.status = 404;
    next(err);
  });
  
  
  // error handler
  // define as the last app.use callback
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.send(err.message);
  });

app.listen(5000,()=>console.log("Server is up,Alaa on PORT 5000"))



'use strict';
require('dotenv').config()
const express = require('express'),
app = express(),
bodyParser = require('body-parser'),
mustacheExpress = require('mustache-express');

app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set("views", __dirname + "/views");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + "/views"));


app.listen(process.env.PORT || 3000, function () {
  console.log('YelpNode listening on port 3000!')
})

var router = express.Router();

app.use(require("./routes.js")(router));


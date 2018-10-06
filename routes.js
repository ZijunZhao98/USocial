"use strict";

// Routes, with inline controllers for each route.
var express = require('express');
var router = express.Router();
var User = require('./models/usermodel').User;
var Travel = require('./models/travelmodel').Travel;

router.get('/', function(req, res){
  res.render("index");
});

router.post('/login', function(req, res){

});

router.post('/register', function(req, res){

});

router.get('/list', function(req, res){

});

router.post('/list-creation', function(req, res){

});


module.exports = router;

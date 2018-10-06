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

  var demo=new User({ 
    
    Username:req.body.Username,
    Password:req.body.Password,
    First_name: req.body.First_name,
    Last_name: req.body.Last_name,
    Birthday: req.body.Birthday,
    University: req.body.University,
    Email: req.body.Email,
    Phone_number: req.body.Phone_number,
    Gender: req.body.Gender,
    Major: req.body.Major
    });
    
    
});

router.get('/list', function(req, res){

});

router.post('/list-creation', function(req, res){

});


module.exports = router;

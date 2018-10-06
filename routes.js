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
  console.log(req.body);
  req.checkBody('Username', 'please enter Username').notEmpty();
  req.checkBody('Password', 'please enter Password').notEmpty();
  req.checkBody('First_name', 'please enter your first name').notEmpty();
  req.checkBody('Last_name', 'please enter your last name').notEmpty();
  req.checkBody('Birthday', 'please enter your birthday').notEmpty();
  req.checkBody('University', 'please enter your university').notEmpty();
  req.checkBody('Email', 'please enter your email').notEmpty();
  req.checkBody('Phone_number', 'please enter your phone number').notEmpty();
  req.checkBody('Gender', 'please enter your gender').notEmpty();
  req.checkBody('Major', 'please enter your major').notEmpty();

  var error = req.validationErrors();

  if(error){
    res.send(error);
  }else{
    var user = new User({
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
    user.save(function(err){
      if(!err){
        console.log('success');
        res.redirect('/');
      }else{
        console.log('error: ' + err);
      }
    });
  }

});

router.get('/list', function(req, res){

});

router.post('/list-creation', function(req, res){

});


module.exports = router;

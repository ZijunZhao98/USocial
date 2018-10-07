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
  req.checkBody('Username_Login', 'please enter Username').notEmpty();
  req.checkBody('Password_Login', 'please enter Password').notEmpty();
  var error = req.validationErrors();
    if(error){
      res.send(error);
    }
    else{
      var u1=req.body.Username_Login;
      var p1=req.body.Password_Login;
      User.find({Username: u1, Password: p1},function(error,docs){
        if(error){
          console.log("error: "+error);
        }
        else if(docs.length === 1){
          console.log(req);
          console.log(res);
          res.cookie("userid", docs[0]._id).redirect("/");
          
        }
        else{
          console.log("username and password not matched");
        }
      });
    }
});

router.post('/register', function(req, res){
  req.checkBody('Username', 'please enter Username').notEmpty();
  req.checkBody('Password', 'please enter Password').notEmpty();
  req.checkBody('First_name', 'please enter your first name').notEmpty();
  req.checkBody('Last_name', 'please enter your last name').notEmpty();
  req.checkBody('Birthday', 'please enter your birthday').notEmpty();
  req.checkBody('Birthday', 'please enter your birthday').isDate();
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
  var send = [];
  var postObj = {};
  Travel.find(function(error,docs){
    if(!error){
      docs.forEach(function(post){
         console.log(post);
         send.push(post);
      });
      res.render('list', {array: send});
    }else{
      res.send(error);
    }
  });
});

router.post('/list-creation', function(req, res){
  req.checkBody('Destination', 'please enter Destination').notEmpty();
  req.checkBody('Title', 'please enter a title').notEmpty();
  req.checkBody('Num_of_ppl', 'please enter your Num_of_ppl').notEmpty();
  req.checkBody('From', 'please enter where you are from').notEmpty();
  req.checkBody('To', 'please enter where you go to').notEmpty();
  req.checkBody('Description', 'please enter description').notEmpty();
  // req.checkBody('Picture', 'please upload picture').notEmpty();
  var error = req.validationErrors();
  if(error){
    res.send(error);
  }else{
    var travel = new Travel({
      Creator:req.cookies.userid,
      Title: req.body.Title,
      Destination:req.body.Destination,
      Num_of_ppl: req.body.Num_of_ppl,
      From: req.body.From,
      To: req.body.To,
      Description: req.body.Description,
      Picture: req.body.picture
    });
    travel.save(function(err){
      if(!err){
        console.log('success');
        res.redirect('/list');
      }else{
        console.log('error: ' + err);
      }
    });
  }
});

module.exports = router;

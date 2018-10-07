"use strict";

// Routes, with inline controllers for each route.
var express = require('express');
var router = express.Router();
var User = require('./models/usermodel').User;
var Travel = require('./models/travelmodel').Travel;
var Local = require('./models/localmodel').Local;

router.get('/', function(req, res){
  var ifLoggedIn = {user: false};
  if(req.cookies.userid){
      ifLoggedIn = {user: true};
  }
  res.render("index", ifLoggedIn);
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
      Major: req.body.Major,
      Profile: req.body.img_src
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
        var tf = new Date(post.From);
        var tt = new Date(post.To);
        postObj = {
           Profile: post.Profile,
           Username: post.Username,
           School: post.School,
           Event: post.Event,
           Location: post.Destination,
           FromDay: (tf.getMonth() + 1) + "/" + (tf.getDate()+1),
           ToDay: (tt.getMonth() + 1) + "/" + (tt.getDate()+1),
           Description: post.Description
         }
         send.push(postObj);
      });
      if(req.cookies.userid){
        res.render('list', {array: send, user: true});
      }else{
        res.render('list', {array: send, user: false});
      }
    }else{
      res.send(error);
    }
  });
});

router.post('/list-creation', function(req, res){
  req.checkBody('Destination', 'please enter Destination').notEmpty();
  req.checkBody('Num_of_ppl', 'please enter your Num_of_ppl').notEmpty();
  req.checkBody('From', 'please enter time from').notEmpty();
  req.checkBody('To', 'please enter time to').notEmpty();
  req.checkBody('Description', 'please enter description').notEmpty();
  var error = req.validationErrors();
  if(error){
    res.send(error);
  }else{
    User.findOne({_id: req.cookies.userid}, function(err, creator){
      var travel = new Travel({
        Creator:req.cookies.userid,
        School: creator.University,
        Username: creator.Username,
        Profile: creator.Profile,
        Destination:req.body.Destination,
        Num_of_ppl: req.body.Num_of_ppl,
        From: req.body.From,
        To: req.body.To,
        Description: req.body.Description,
      });
      travel.save(function(err){
        if(!err){
          console.log('success');
          res.redirect('/list');
        }else{
          console.log('error: ' + err);
        }
      });
    });
  }
});

// router.get('/local', function(req, res){
//   Local.find().then(function(docs){
//     asyncMethod(docs).then(function(send){
//       if(req.cookies.userid){
//         res.render('local', {array: send, user: true});
//       }else{
//         res.render('local', {array: send, user: false});
//       }
//     }).catch(function(err){
//       console.log(err);
//     });
//   });
// });

router.get('/local', function(req, res){
  var send = [];
  var postObj = {};
  Local.find().then(function(docs){
      docs.forEach(function(post){
        var t = new Date(post.Time);
        postObj = {
           Profile: post.Profile,
           Username: post.Username,
           School: post.School,
           Event: post.Event,
           Location: post.Location,
           Time: (t.getMonth() + 1) + "/" + (t.getDate()+1),
           Picture: post.Picture
         }
         send.push(postObj);
      })

      if(req.cookies.userid){
        res.render('local', {array: send, user: true});
      }else{
        res.render('local', {array: send, user: false});
      }

  });
});

router.post('/local', function(req, res){
  req.checkBody('Location', 'please enter Location').notEmpty();
  req.checkBody('Event', 'please enter Event').notEmpty();
  req.checkBody('Day', 'please enter Date').notEmpty();
  //req.checkBody('Description', 'please enter description').notEmpty();
  //req.checkBody('local_img_src', 'please upload picture').notEmpty();
  var error = req.validationErrors();
  if(error){
    res.send(error);
  }else{
    User.findOne({_id: req.cookies.userid}, function(err, creator){
      var Day = new Date(req.body.Day);
      var local = new Local({
        Creator:req.cookies.userid,
        School: creator.University,
        Username: creator.Username,
        Profile: creator.Profile,
        Location: req.body.Location,
        Event: req.body.Event,
        Time: Day,
        Picture: req.body.img_src
      });
      local.save(function(err){
        if(!err){
          console.log('success');
          res.redirect('/local');
        }else{
          console.log('error: ' + err);
        }
      });
    });
  }
});

router.post('/logout', function(req, res){
  res.clearCookie('userid');
  res.redirect('/');
});


// function asyncMethod(docs){
//   let promise = new Promise(function(resolve, reject){
//     setTimeout(function(){
//       var send = [];
//         docs.forEach(function(post){
//             asyncMethod2(post).then(function(postObj){
//               console.log("first");
//                send.push(postObj);
//             });
//         })
//       resolve(send);
//     }, 350);
//   });
//   return promise;
// }

// function asyncMethod2(post){
//   let promise = new Promise(function(resolve, reject){
//       var postObj = {};
//       User.findOne({_id: post.Creator}).then(function(creator){
//         var t = new Date(post.Time);
//         postObj = {
//           Username: creator.Username,
//           Profile: creator.Profile,
//           School: creator.University,
//           Event: post.Event,
//           Location: post.Location,
//           Time: (t.getMonth() + 1) + "/" + (t.getDate()+1),
//           Picture: post.Picture
//         }
//         resolve(postObj);
//       });
//   });
//   return promise;
// }

module.exports = router;

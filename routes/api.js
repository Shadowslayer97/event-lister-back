var express = require('express');
var router = express.Router();
var passport = require('passport');

var User = require('../models/user.js');
var Event = require('../models/event.js');

//User model apis

router.post('/register', function(req, res) {
  User.register(new User({ username: req.body.username }),
    req.body.password, function(err, account) {
    if (err) {
      return res.status(500).json({
        err: err
      });
    }
    passport.authenticate('local')(req, res, function () {
      return res.status(200).json({
        status: 'Registration successful!'
      });
    });
  });
});

router.post('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({
        err: info
      });
    }
    req.logIn(user, function(err) {
      if (err) {
        return res.status(500).json({
          err: 'Could not log in user'
        });
      }
      res.status(200).json({
        status: 'Login successful!'
      });
    });
  })(req, res, next);
});

router.get('/logout', function(req, res) {
  req.logout();
  res.status(200).json({
    status: 'Bye!'
  });
});

//Event apis
router.get('/event/all', function(req, res) {
  Event.find({}, function(err, events) {

    if(err) {
      res.status(400).json({});
    }

    res.status(200).json({
      events: events,
      status: 'success'
    });
  });

})

router.post('/event', function(req, res) {
  User.findOne({username:req.query.username}, function(err,user) {
    console.log(user.username);
    if(err) {
      res.status(400).json({});
    }
    var postBody = {
      name: req.body.name,
      location: req.body.location,
      user: user.username
    }
    Event.create(postBody, function(err){
      if(err) {
        res.status(400).json({});
      }
      res.status(200).json({
        status: 'success'
        });
      });
    });
  })


module.exports = router;

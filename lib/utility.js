var request = require('request');
var db = require('../app/config.js');

exports.getUrlTitle = function(url, cb) {
  request(url, function(err, res, html) {
    if (err) {
      console.log('Error reading url heading: ', err);
      return cb(err);
    } else {
      var tag = /<title>(.*)<\/title>/;
      var match = html.match(tag);
      var title = match ? match[1] : url;
      return cb(err, title);
    }
  });
};

var rValidUrl = /^(?!mailto:)(?:(?:https?|ftp):\/\/)?(?:\S+(?::\S*)?@)?(?:(?:(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[0-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))|localhost)(?::\d{2,5})?(?:\/[^\s]*)?$/i;

exports.isValidUrl = function(url) {
  return url.match(rValidUrl);
};

/************************************************************/
// Add additional utility functions below
/************************************************************/



exports.isLoggedIn = function(req, res, next) {
  if (req.session.user) {
    return next();
  } else {
    res.redirect('/login');
  }

};

exports.authenticate = function(username, password, callback) {
  db.knex.select('username').from('users').then(function(data) {    
    console.log('in authenticate: ', data);
    var found = false;
    for (var i = 0; i < data.length; i++) {
      if (data[i].username === username) {
        found = true;
        return callback(true);
      } 
    }
    if (!found) {
      callback(false);
    }
  });
};

exports.setLoginState = function(req, res) {
  var username = req.body.username;
  var password = req.body.password;
  console.log('setlogin state', username, password);

  exports.authenticate(username, password, function (found) {
    if (found) {
      console.log('loggin in, user found: ', username);
      req.session.user = username;
      // req.session.regenerate(function() {
      // });
      res.redirect('/');
    } else {
      console.log('loggin in, user not found: ', username);
      res.redirect('/login');
    }    
  });
};
























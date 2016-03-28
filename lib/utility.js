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

// check if user is logged in
// if not, send to login page

exports.isLoggedIn = function(req, res, next) {
  console.log('check if logged in');

  res.redirect('/login');
};



exports.logUserIn = function(username, password, callback) {

  console.log('passed in ', username, password);
  db.knex.select('username').from('users').then(function(data) {    

    if (data[0].username === username) {
      console.log('matches!', data[0].username, username);
      callback(true);
    } else {
      console.log('no match', data[0].username, username);
      callback(false);
    }
  
  });
};

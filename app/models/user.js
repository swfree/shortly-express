var db = require('../config');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');
var Link = require('./link');

var User = db.Model.extend({
  tableName: 'users',
  hasTimestamps: true,

  link: function() {
    return this.hasMany(Link);
  },



  // TODO: hash password on initialize
  // initialize: function(userData) {
  //   this.on('creating', function(model, attrs, options) {
  //     model.set('username', attrs.username);
  //     model.set('password', attrs.password);
  //   });
  // }

// defaults needs username, password

// build out similar to link.js!

});

module.exports = User;



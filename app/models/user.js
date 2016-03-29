var db = require('../config');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');
var Link = require('./link');
// var hash = bcrypt.hashSync('bacon', 8);

var User = db.Model.extend({
  tableName: 'users',
  hasTimestamps: true,

  link: function() {
    return this.hasMany(Link);
  },

  // TODO: fix bcrypt stuff
  // initialize: function() {
  //   this.on('creating', function(model, attrs, options) {
  //     console.log(attrs);
  //     bcrypt.hash(attrs.password, 10, function(err, hash) {
  //       model.set('password', hash);
  //     });
  //   });
  // }
});

module.exports = User;



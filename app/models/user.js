var db = require('../config');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');
var Link = require('./link');
// bcryptAsync = Promise.promisifyAll(bcrypt);
// var hash = bcrypt.hashSync('bacon', 8);

var User = db.Model.extend({
  tableName: 'users',
  hasTimestamps: true,

  link: function() {
    return this.hasMany(Link);
  },

  // TODO: fix bcrypt stuff
  initialize: function() {
    this.on('creating', function(model, attrs, options) {
      bcrypt.hash(model.get('password'), null, null, function(err, hash) {
        if (err) { console.log(err); }
        model.set('password', hash);
        model.save();
      });
    });
  }

        // UPDATEONLY: model.save({password: hash}, {patch: true});
      // bcryptAsync.hashAsync(model.get('password'), null, null)
      // .then(function(hash) {
      //   model.set('password', hash);
      // }).catch(function(err) {
      //   if (err) { throw err; }
      // });
  // hashPassword: function(model, attrs, options) {
  //   console.log('line 1 in hashPW: ', attrs);
  //   bcrypt.hashAsync(model.get('password'), null, null)
  //   .then(function(hash) {
  //     console.log('stored password hash: ', hash);
  //     model.set('password', hash);
  //     console.log('new stored password: ', model.get('password'));
  //   }).catch(function(err) {
  //     if (err) { throw err; }
  //   });

  //   // return to: 
  //   // console.log('hash password called: ', model, attrs);
  //   // return new Promise(function(resolve, reject) {
  //   //   console.log('inside new promise, model attributes: ', model.attributes);
  //   //   bcrypt.hash(model.attributes.password, 10, function(err, hash) {
  //   //     console.log('hash: ', hash);
  //   //     if (err) { console.log(err); }
  //   //     model.set('password', hash);
  //   //     console.log('hashPassword created: ', hash);
  //   //     resolve(hash); // data is created only after this occurs
  //   //   });
  //   // });

});

module.exports = User;



// event model
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var User = require('./user.js');



var Event = new Schema({
  name: String,
  location: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
});

module.exports = mongoose.model('events', Event);

"use strict";

// Project model
var mongoose = require('mongoose');

var User = mongoose.model('User', {
});

module.exports = {
  User: User
}

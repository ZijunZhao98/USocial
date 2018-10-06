"use strict";

// Project model
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var User = mongoose.model('User', new Schema({
  Username: {
    type: String,
    required: true
  },
  First_name: {
    type: String,
    required: true
  },
  Last_name: {
    type: String,
    required: true
  },
  Birthday: {
    type: Date,
    required: true
  },
  University: {
    type: String,
    required: true
  },
  Email: {
    type: String,
    required: true
  },
  Phone_number: {
    type: String,
    required: true
  },
  Gender: {
    type: String,
    required: true
  },
  Major: {
    type: String,
    required: true
  }
}));

module.exports = {
  User: User
}

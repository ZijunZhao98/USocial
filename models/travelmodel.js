"use strict";

// Project model
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Travel = mongoose.model('Travel', new Schema({

  Creator: {
    type: mongoose.Schema.Types.ObjectId,
    // type: User.UserId,
    required: true
  },
  Username:{
    type: String,
    required: true
  },
  School:{
    type: String,
    required: true
  },
  Profile:{
    type: String,
    requred: true
  },
  Destination: {
    type: String,
    required: true
  },
  Num_of_ppl: {
    type: Number,
    required: true
  },
  From: {
    type: Date,
    required: true
  },
  To: {
    type: Date,
    required: true
  },
  Description: {
    type: String,
    required: true
  },
  Interested: {
    type: [mongoose.Schema.Types.ObjectId,]
  }
}));

module.exports = {
  Travel: Travel
}

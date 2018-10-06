"use strict";

// Project model
var mongoose = require('mongoose');
var user=require('usermodel')
var Travel = mongoose.model('Travel', new Schema({
  Creator: {
    type: Schema.Types.user.ObjectId,
    required: true
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
    type: [Schema.Types.user.ObjectId],
    required: true
  }
}));

module.exports = {
  Travel: Travel
}

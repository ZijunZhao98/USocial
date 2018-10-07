"use strict";

// Project model
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Local = mongoose.model('Local', new Schema({
  Creator: {
    type: mongoose.Schema.Types.ObjectId,
    // type: User.UserId,
    required: true
  },
  Location: {
    type: String,
    required: true
  },
  Event: {
    type: String,
    required: true
  },
  Time: {
    type: Date,
    required: true
  },
  // Description: {
  //   type: String,
  //   required: true
  // },
  Interested: {
    type: [mongoose.Schema.Types.ObjectId,]
  },
  Picture:{
    type:String,
    required: true
  }
}));

module.exports = {
  Local: Local
}

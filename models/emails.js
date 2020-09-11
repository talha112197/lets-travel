let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let uniqId = require('uniqId')

let emailsSchema = new Schema({
      id: String,
      name: String,
      email: String,
      phoneNumber: String,
      message: String,
      date: Date
})

let Email = mongoose.model('Email' , emailsSchema, 'emails');

module.exports = {Email};
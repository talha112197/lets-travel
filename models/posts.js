let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let postSchema = new Schema({
      id: String,
      title: String,
      country: String, 
      date: Date,
      description: String,
      text: String, 
      imageURL: String
});

let Post = mongoose.model('Post', postSchema);

module.exports = { Post }
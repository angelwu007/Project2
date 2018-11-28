const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ImageSchema = new Schema({
  owner: {type:Schema.Types.ObjectId, ref: 'User'},
  filepath: String,
  share: Boolean,
  title: String,
  description: String,
  comments: [String],
  likes: Number,
  usersliked:[{type: Schema.Types.ObjectId, ref: 'User'}]
  
})

const Image = mongoose.model('images',ImageSchema);

module.exports = Image;
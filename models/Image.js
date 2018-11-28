const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ImageSchema = new Schema({
  title: String,
  path: String,
  originalName: String,
  user: {type:String, required: true},
  description: String,
  comments: [String],
  likes: Number,
  usersliked:[{type: Schema.Types.ObjectId, ref: 'User'}]


}, {
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});

const Image = mongoose.model('images',ImageSchema);

module.exports = Image;
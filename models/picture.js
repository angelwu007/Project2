const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const pictureSchema = new Schema({
  name: String,
  path: String,
  originalName: String,
  owner: {type:Schema.Types.ObjectId, ref: 'User'},
  description: String,
  comments: [String],
  likes: Number,
  usersliked:[{type: Schema.Types.ObjectId, ref: 'User'}]


}, {
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});

const Picture = mongoose.model("Picture", pictureSchema);

module.exports = Picture;


const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const AlbumSchema = new Schema({
  user: {type:String, required: true},
  title: String,
  description: String,
  path: [],
  comments:[{type: Schema.Types.ObjectId, ref: 'Comment'}],
  restriction: String

}, {
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
})

const Album = mongoose.model('albums',AlbumSchema);





module.exports = Album;


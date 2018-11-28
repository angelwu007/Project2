const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const AlbumSchema = new Schema({
  author: {type: Schema.Types.ObjectId, ref:'User'},
  title: String,
  description: String,
  images: [{type: Schema.Types.ObjectId, ref: 'Image'}],
  comments:[{type: Schema.Types.ObjectId, ref: 'Comment'}],
  restriction: Boolean

})

const Album = mongoose.model('albums',AlbumSchema);

module.exports = Album;


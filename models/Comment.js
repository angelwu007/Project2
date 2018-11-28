const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const CommentSchema = new Schema({
    author:{type: Schema.Types.ObjectId, ref: 'User'},
    forimage: {type: Schema.Types.ObjectId, ref: 'Image'}
})

const Comment = mongoose.model('comments', CommentSchema);

module.exports = Comment;



const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const CommentSchema = new Schema({
    author:{type: Schema.Types.ObjectId, ref: 'User'},
    comment: String,
    forImage: {type: Schema.Types.ObjectId, ref: 'Picture'}
})

const Comment = mongoose.model('comments', CommentSchema);

module.exports = Comment;



const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  
  name:{type: String, required:true},
  email:{type: String, required:true},
  password:{type:String, required: true},
  avatar:{String , default:''},
  bio:{type: String},
  images:[{type: Schema.Types.ObjectId, ref :'Image'}],
  albums: [{type: Schema.Types.ObjectId, ref :'Album'}],
  comments: [{type: Schema.Types.ObjectId, ref :'Comment'}]
},
{
  timestamps: true
})

const User = mongoose.model('users',UserSchema); // creating our user model, calling it users and connecting to the UserSchema

module.exports = User; // make this User model accessible to other part of our node app.



const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

//bringing in user model
const User = require('../models/User');


//defining a local strategy and exporting it 
module.exports = function(passport){
  passport.use(new LocalStrategy({usernameField:'email'},(email,password,done)=> {
    User.findOne({
      email: email
    }).then(user =>{
      if(!user){
        return done(null,false,{message:'No User found'});
      }
        // Match password
        bcrypt.compare(password,user.password, (err, isMatch) => {
          if(err) throw err;
          if(isMatch){
            return done(null,user);
          }else{
            return done(null,false,{message: 'Password Incorrect'})
          }
        })
    })
  }));

  // copied from the passport documentation session site
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

}
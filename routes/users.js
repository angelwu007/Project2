const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport')

//importing the user model
const User = require('../models/User.js');
const Image = require('../models/Image');

// user login route
router.get('/login',(req,res,next)=>{
  res.render('users/login');
})

// login form post

router.post('/login',(req,res,next)=>{
  passport.authenticate('local',{
    successRedirect:'/',
    failureRedirect: '/users/login',
    failureFlash: true
  })(req,res,next);
});


// Profile page

router.get('/profile/:id',(req,res,next) =>{
    res.render('users/profile');
})




// user register route
router.get('/register',(req,res,next)=>{
  res.render('users/register');
})


// register form post
router.post('/register',(req,res,next)=>{
  // res.send(req.body); 
  // some backend form validations
  let errors = [];
  if(req.body.password !== req.body.cpassword){
    errors.push({text:'Passwords do not match'});
  }
  if(req.body.password.length < 8){
    errors.push({text:'Password must be at least 8 characters long'})
  }
  if (errors.length > 0){ // re-rendering form with inputs to the user
    res.render('users/register',{
      errors: errors,
      name:req.body.name,
      email: req.body.email,
      password: req.body.password,
      cpassword: req.body.cpassword
    })
  }else{
    User.findOne({email: req.body.email})
    .then(user =>{
      if(user){
        req.flash('error_msg', 'Email already registered');
        res.redirect('/users/login')

      }else{
        const newUser = new User ({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
          bio: req.body.bio,
          avatar: req.body.avatar,
          image:[],
          album: [],
          comments: []
        })
        // User.create(req.body);
        bcrypt.genSalt(10,(err,salt)=>{
        bcrypt.hash(newUser.password, salt,(err, hash)=>{
          if(err) throw err;
          newUser.password = hash;
          newUser.save()
          .then(user =>{
            req.flash('success_msg', 'You are now registered and can log in');
            res.redirect('/users/login')
          })
          .catch(err =>{
            next(err);
            return;
          });
        })
        })
        
      }
    })
    
  }
})

// Logout User

router.get('/logout',(req,res,next)=>{
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/')
})




module.exports = router;
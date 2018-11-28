const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

//===============================
const multer  = require('multer');
const Album = require('../models/Album');
const uploadCloud = require('../config/cloudinary.js');


// add album form 
router.get('/add',(req,res,next)=>{
  res.render('albums/add')
});



// process the album form route (adding a new object to MongoDB)
router.post('/add', uploadCloud.single('photo'), (req, res) => {

  const album = new Album({
    title: req.body.title,
    path: req.file.url,
    // originalName: req.file.originalname,
    description: req.body.description,
    user: req.user.id  // access control to what content user can view/edit/delete
  });

  album.save((err) => {
      res.redirect('/album');
  });
});


// album index page 
router.get('/',(req,res,next) =>{
  Album.find({user: req.user.id}) // access control to what content user can view/edit/delete
  .sort({date: 'desc'})
  .then(album => {
    res.render('albums/index', {album});
  })
  .catch((err) =>{
    console.log(err); 
  })
})



//delete album route
router.post("/delete/:id", (req, res, next) => {
  Album.findByIdAndRemove(req.params.id)
  .then(()=>{
    res.redirect("/album")
  })
  .catch((err)=>{
    next(err)
  })
});

// edit album form 
router.get('/edit/:id',(req,res,next)=>{
  Album.findOne({
    _id: req.params.id
  })
  .then(album =>{
    res.render('albums/edit', {album:album
    });
  })
});

// process edit album form (updating the mongoDB)
router.post('/edit/:id', uploadCloud.single('path') ,(req, res, next) => {

  const changes = req.body;

  if(req.file){
    changes.path = req.file.url;
  }

  Album.findByIdAndUpdate(req.params.id, changes)
  .then(()=>{
    res.redirect("/album")
  })
  .catch((err)=>{
    next(err)
  })
});




module.exports = router;


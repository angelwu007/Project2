const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

//===============================
const multer  = require('multer');
const Image = require('../models/Image');
const uploadCloud = require('../config/cloudinary.js');


// add image form 
router.get('/add',(req,res,next)=>{
  res.render('images/add')
});



// process the image form route (adding a new object to MongoDB)
router.post('/add', uploadCloud.single('photo'), (req, res) => {

  const img = new Image({
    title: req.body.title,
    path: req.file.url,
    originalName: req.file.originalname,
    description: req.body.description,
    user: req.user.id  // access control to what content user can view/edit/delete
  });

  img.save((err) => {
      res.redirect('/image');
  });
});

// display all the images route
router.get('/',(req,res,next) =>{
  Image.find({user: req.user.id}) // access control to what content user can view/edit/delete
  .sort({date: 'desc'})
  .then(imgs => {
    res.render('images/show', {imgs});
  })
  .catch((err) =>{
    console.log(err); 
  })
})

// edit image form 
router.get('/edit/:id',(req,res,next)=>{
  Image.findOne({
    _id: req.params.id
  })
  .then(img =>{
    res.render('images/edit', {img:img
    });
  })
});

// process edit image form (updating the mongoDB)
router.post('/edit/:id', uploadCloud.single('path') ,(req, res, next) => {

  console.log('=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=',req.body)

  const changes = req.body;

  if(req.file){
    changes.path = req.file.url;
  }

  Image.findByIdAndUpdate(req.params.id, changes)
  .then(()=>{
    res.redirect("/image")
  })
  .catch((err)=>{
    next(err)
  })
});


// Removing an image

router.post("/delete/:id", (req, res, next) => {
  Image.findByIdAndRemove(req.params.id)
  .then(()=>{
    res.redirect("/image")
  })
  .catch((err)=>{
    next(err)
  })
});


router.get('/:id',(req,res,next)=>{
  Image.findById(req.params.id)
  .then((imgDetail)=>{
    res.render('images/detail',{imgDetail})
  })
  .catch((err)=>{
    next(err);
  })
})







module.exports = router;
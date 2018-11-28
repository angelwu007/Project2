const express = require('express');
const router  = express.Router();

//===============================
const multer  = require('multer');
const Picture = require('../models/picture');
const uploadCloud = require('../config/cloudinary.js');



// /* GET home page */
// router.get('/', (req, res, next) => {
//   res.render('index');
// });


router.get('/', function(req, res, next) {
  Picture.find((err, pictures) => {
    res.render('index', {pictures})
  })
});


// const upload = multer({ dest: './public/uploads/' });

router.post('/upload', uploadCloud.single('photo'), (req, res) => {

  const pic = new Picture({
    name: req.body.name,
    path: req.file.url,
    originalName: req.file.originalname
  });

  pic.save((err) => {
      res.redirect('/');
  });
});

// router.post('/upload', uploadCloud.single('photo'), (req, res, next) => {
//   const { title, description } = req.body;
//   const imgPath = req.file.url;
//   const imgName = req.file.originalname;
//   const newMovie = new Movie({title, description, imgPath, imgName})
//   newMovie.save()
//   .then(movie => {
//     res.redirect('/');
//   })
//   .catch(error => {
//     console.log(error);
//   })
// });



module.exports = router;

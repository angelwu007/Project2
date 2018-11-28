const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();


router.get('/add',(req,res,next)=>{
  res.render('images/add')
});



// router.post('/add', uploadCloud.single('photo'), (req, res) => {

//   const img = new Image({
//     name: req.body.name,
//     path: req.file.url,
//     originalName: req.file.originalname
//   });

//   img.save((err) => {
//       res.redirect('/');
//   });
// });



module.exports = router;
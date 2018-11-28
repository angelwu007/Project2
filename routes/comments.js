const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();


const comment = require('../models/Comment');


// add comment form 
router.get('/add',(req,res,next)=>{
  res.render('images/add')

});


module.exports = router;
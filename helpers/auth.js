//This will require users to log in before allowed to access some routes

module.exports = {
  ensureAuthenticated: function(req,res,next){
    if(req.isAuthenticated()){
      return next();
    }
    req.flash('error_msg','Not Authorized');
    res.redirect('/users/login');
  }
}
require('dotenv').config();

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
const favicon = require('serve-favicon');
const hbs = require('hbs');
const mongoose = require('mongoose');
const logger = require('morgan');
const path = require('path');

// additional modules i installed
const flash = require('connect-flash');
const session = require('express-session');
const bcrypt = require('bcryptjs');
const passport = require('passport')





// mongoose connection
mongoose
  .connect(process.env.MONGODB_URI, { useNewUrlParser: true })
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

//JSON connection
const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);


const app = express();

// Middleware Setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Express View engine setup

app.use(require('node-sass-middleware')({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  sourceMap: true
}));


//hbs middleware
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials') // tell hbs to look for partials



app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));


// express session middleware
app.use(session({
  secret: "secret",
  resave: true,
  saveUninitialized: true
}));

//Passport middleware should come after express session middleware for avoiding problems
app.use(passport.initialize());
app.use(passport.session());

// activating flash messaging
app.use(flash());

//Glabal variables
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null; // when a user login , we have access to a req.user object. Use this to hide/show login/logout.
  next();

})

//Passport Config 
require('./config/passport')(passport);

// default value for title local
app.locals.title = 'Express - Photo Gallery';


// Index route
const index = require('./routes/index');
app.use('/', index);

// add user route...
const user = require('./routes/users');
app.use('/users', user)

// add images route...
const image = require('./routes/images');
app.use('/image', image)


// add comment route...
const album = require('./routes/albums')
app.use('/album', album)



module.exports = app;

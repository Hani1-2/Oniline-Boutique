var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const hbs = require('hbs');

var indexRouter = require('./routes/index');
var homeRouter = require('./routes/home');
var loginRouter = require('./routes/login');
var womenRouter = require('./routes/women');
var menRouter = require('./routes/men');
var aboutRouter = require('./routes/about');
var contactRouter = require('./routes/contact');
//var loginRouter = require('./routes/login');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
// this provide you the exact directory you are working in
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials/')

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/home', homeRouter);
app.use('/login', loginRouter);
app.use('/women', womenRouter);
app.use('/men', menRouter);
app.use('/about', aboutRouter);
app.use('/contact', contactRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var logger = require('morgan');
const sequelize = require('./util/database');

const feedRoutes = require('./routes/feed');
const authRoutes = require('./routes/auth');
const chatRoutes = require('./routes/chat');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use('/user', authRoutes);

app.use('/feed', feedRoutes);

app.use('/chat', chatRoutes);

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

  const status = err.statusCode || 500;
  const message = err.message;

  res.status(status).json({message : message});
});


sequelize.sync()
.then((result) => {
    const server = app.listen(3001);
    const io = require('./util/socket').init(server);
    io.on('connection', socket => {
      console.log('Client Connected');
    });
})
.catch((err) => {
  console.log("Something Went Wrong");
});

module.exports = app;

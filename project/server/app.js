var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var db = require('mongoose')

// coding.net 的数据库配置
var dbConfig = process.evn.VCAP_SERVICES
// 链接数据库
if (dbConfig) {
  db.connect(dbConfig.credentials.uri)
} else {
  db.connect('mongodb://127.0.0.1:27017/CatShop')
}

var app = express();

// 使用jade
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 首页
app.get('/', function (req, res) {
  res.send('这个页面没啥哦!');
});

// 时间戳API
app.get('/time', function(req, res) {
  res.send((Date.parse(new Date()) / 1000).toString())
})

// 404 错误处理
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// development 运行错误处理
if (app.get('env') === 'development') {
  app.locals.pretty = true;
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production 运行错误处理
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var db = require('mongoose')

var Report = require('./model/report')

// coding.net 的数据库配置
var dbConfig = JSON.parse(process.env.VCAP_SERVICES).mongodb[0].credentials;

console.log(process.env.VCAP_SERVICES)

// 链接数据库
if (dbConfig) {
  //db.connect(dbConfig.uri)
} else {
  //db.connect('mongodb://127.0.0.1:27017/CatShop')
}

var app = express();

// 使用jade
app.set('views', path.join(__dirname, 'views/page'));
app.set('view engine', 'jade');

app.use(favicon(__dirname + '/public/manager/image/favicon.png'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 首页
app.get('/', function (req, res) {
  res.redirect('/game');
});

// 时间戳API
app.get('/time', function(req, res) {
  res.send((Date.parse(new Date()) / 1000).toString())
})

// 获取玩家的数据报告
app.get('/user/:id/report', function(req, res) {
  var userId = req.params.id
  var count = req.query.limit || 100

  Report.fetchByUserId(function(err, reports){
    if (err) {
      res.send('fail')
    } else {
      res.send(JSON.stringify(reports, function(key, value) {
        if (key != '_id' && key != '__v') {
          return value
        } else {
          return undefined
        }
      }))
    }
  }, userId, count)
})

// 提交玩家数据报告
app.post('/user/:id/report', function(req, res) {
  var _userId = req.params.id
  var _jsonString = req.body.jsonString

  var report = new Report({userId: _userId, jsonString: _jsonString})
  report.save(function(err) {
    if (err) {
      res.send('fail')
    } else {
      res.send('success')
    }
  })
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
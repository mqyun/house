var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: '首页'
  });
});

// 登录
router.get('/login', function(req, res, next) {
  res.render('login', {
    title: '登录'
  });
});

// 注册
router.get('/reg', function(req, res, next) {
  res.render('reg', {
    title: '注册'
  });
});

// list
router.get('/list', function(req, res, next) {
  res.render('list', {
    title: 'list'
  });
});

// detail
router.get('/detail', function(req, res, next) {
  res.render('detail', {
    title: 'detail'
  });
});

module.exports = router;

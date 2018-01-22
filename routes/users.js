var express = require('express');
var router = express.Router();

var crypto = require('crypto');

var usermodel = require('../models/usermodel');

// 用户注册
router.post('/reg', function(req, res, next) {
  var hash = crypto.createHash('md5');
  var account = req.body.account;
  var reqpassword = req.body.password;
  hash.update(reqpassword);
  var password = hash.digest('hex');
  var name = req.body.name;
  var phone = req.body.phone;
  usermodel.selectUser(account, function(err, rows) {
    if (err) {
      res.json({
        'error': err
      });
      return next(err);
    }
    if (rows.length > 0) {
      res.json({
        'error': '用户名存在'
      });
      return next(err);
    }
    usermodel.userReg(account, password, name, phone, function(err) {
      if (err) {
        res.json({
          'error': err
        });
        return next(err);
      }
      res.json({
        'success': '注册成功'
      });
    });
  });
});

// 用户登录
router.post('/login', function(req, res, next) {
  var hash = crypto.createHash('md5');
  var account = req.body.account;
  var reqpassword = req.body.password;
  hash.update(reqpassword);
  var password = hash.digest('hex');
  usermodel.selectUser(account, function(err, rows) {
    if (err) {
      res.json({
        'error': err
      });
      return next(err);
    }
    if (rows.length == 0) {
      res.json({
        'error': '用户不存在'
      });
      return next(err);
    }
    if (rows[0].password != password) {
      res.json({
        'error': '密码错误'
      });
      return next(err);
    }
    req.session.name = rows[0].name;
    req.session.uid = rows[0].id;
    res.json({
      'success': '登录成功'
    });
  });
});

// 我的房源
router.get('/myhouse', function(req, res, next) {
  res.render('user/myhouse', {
    title: '我的房源'
  });
});

// 获取添加房源表单
router.post('/addHouseView', function(req, res, next) {
  res.render('user/addhouse', {}, function(err, html) {
    res.json({
      'success': true,
      'view': html
    })
  });
});

// 获取自己房源列表
router.post('/getHouseList', function(req, res, next) {
  res.render('user/list', {}, function(err, html) {
    res.json({
      'success': true,
      'view': html
    })
  });
});

module.exports = router;

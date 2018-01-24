var express = require('express');
var router = express.Router();

var adminmodel = require('../models/adminmodel');

// 管理员登录页面
router.get('/', function(req, res, next) {
  res.render('admin/login', {
    title: '管理员登录'
  });
});

// 管理员登录
router.post('/login', function(req, res, next) {
  var account = req.body.account;
  var password = req.body.password;
  adminmodel.selectAdmin(account, function(err, rows) {
    if (err) {
      res.json({
        'error': err
      });
      return next(err);
    }
    if (rows.length == 0) {
      res.json({
        'error': '管理员账号错误'
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
    req.session.usertype = 'admin';
    res.json({
      'success': '登录成功'
    });
  });
});

// 管理房源
router.get('/managehouse', function(req, res, next) {
  res.render('admin/managehouse', {
    title: '管理房源'
  })
});

// 获取房源
router.post('/getDaiShenHeHouse', function(req, res, next) {
  var shenhe = req.body.shenhe;
  adminmodel.getHouse(shenhe, function(err, houseList) {
    if (err) {
      res.json({
        'error': err
      });
      return next(err);
    }
    res.render('admin/list', {
      houseList: houseList
    }, function(err, html) {
      res.json({
        'success': true,
        'view': html
      })
    });
  });
});

// 审核房源
router.post('/shenheHouse', function(req, res, next) {
  var houseid = req.body.houseid;
  var shenhe = req.body.shenhe;
  var rescon;
  if (shenhe == 1) {
    rescon = '审核通过';
  } else {
    rescon = '已通知商家重新提交房源信息';
  }
  adminmodel.shenheHouse(shenhe, houseid, function(err) {
    if (err) {
      res.json({
        'error': err
      });
      return next(err);
    }
    res.json({
      'success': '审核完成，' + rescon
    });
  })
});

module.exports = router;

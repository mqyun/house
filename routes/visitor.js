var express = require('express');
var router = express.Router();

var crypto = require('crypto');

var visitormodel = require('../models/visitormodel');

// 游客注册
router.post('/reg', function(req, res, next) {
  var hash = crypto.createHash('md5');
  var account = req.body.account;
  var reqpassword = req.body.password;
  hash.update(reqpassword);
  var password = hash.digest('hex');
  var name = req.body.name;
  var phone = req.body.phone;
  visitormodel.selectVisitor(account, function(err, rows) {
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
    visitormodel.visitorReg(account, password, name, phone, function(err) {
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

// 游客登录
router.post('/login', function(req, res, next) {
  var hash = crypto.createHash('md5');
  var account = req.body.account;
  var reqpassword = req.body.password;
  hash.update(reqpassword);
  var password = hash.digest('hex');
  visitormodel.selectVisitor(account, function(err, rows) {
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
    req.session.usertype = 'youke';
    res.json({
      'success': '登录成功'
    });
  });
});

// 游客租赁或购买房源
router.post('/buyHouse', function(req, res, next) {
  var youkeid = req.session.uid;
  var houseid = req.body.houseid;
  visitormodel.buyHouse(youkeid, houseid, function(err) {
    if (err) {
      res.json({
        'error': err
      });
      return next(err);
    }
    res.json({
      'success': '成功！'
    });
  });
});

// 管理房源
router.get('/myhouse', function(req, res, next) {
  res.render('visitor/managehouse', {
    title: '我的房源'
  })
});

// 获取房源
router.post('/getHouse', function(req, res, next) {
  var type = req.body.type;
  var youkeid = req.session.uid;
  visitormodel.getHouse(type, youkeid, function(err, houseList) {
    if (err) {
      res.json({
        'error': err
      });
      return next(err);
    }
    res.render('visitor/list', {
      houseList: houseList
    }, function(err, html) {
      res.json({
        'success': true,
        'view': html
      })
    });
  });
});

module.exports = router;

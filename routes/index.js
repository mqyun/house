var express = require('express');
var router = express.Router();

var indexmodel = require('../models/indexmodel');

// 首页
router.get('/', function(req, res, next) {
  indexmodel.homeGetNewHouse('0', function(err, zuHouseList) {
    if (err) {
      return next(err);
    }
    indexmodel.homeGetNewHouse('1', function(err, shouHouseList) {
      if (err) {
        return next(err);
      }
      res.render('index', {
        title: '首页',
        zuHouseList: zuHouseList,
        shouHouseList: shouHouseList
      });
    });
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

// 房屋详情
router.get('/housedetail/:id', function(req, res, next) {
  var houseid = req.params.id;
  indexmodel.selectHouseInfo(houseid, function(err, houseInfo) {
    if (err) {
      return next(err);
    }
    indexmodel.selectHouseImg(houseid, function(err, houseImgList) {
      if (err) {
        return next(err);
      }
      res.render('detail', {
        title: '房屋详情',
        houseInfo: houseInfo[0],
        houseImgList: houseImgList
      });
    });
  });
});

// 退出登录
router.get('/logout', function(req, res) {
  req.session.name = '';
  req.session.uid = '';
  req.session.usertype = '';
  res.redirect('/');
});

module.exports = router;

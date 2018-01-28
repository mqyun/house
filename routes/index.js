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

router.get('/condition', function(req, res, next) {
  res.render('conditiontop', {
    title: 'list',
    zuORshou: 0
  });
});

router.get('/shoucondition', function(req, res, next) {
  res.render('conditiontop', {
    title: 'list',
    zuORshou: 1
  });
});

// 获取房源列表
router.post('/houselist', function(req, res, next) {
  var type = req.body.type;
  var diduan = req.body.diduan;
  var huxing = req.body.huxing;
  var minprice = req.body.minprice;
  var maxprice = req.body.maxprice;
  var zuzhutype = req.body.zuzhutype || '';
  var chaoxiang = req.body.chaoxiang;
  var minmianji = req.body.minmianji;
  var maxmianji = req.body.maxmianji;
  console.log({
    'type': type,
    'diduan': diduan,
    'huxing': huxing,
    'minprice': minprice,
    'maxprice': maxprice,
    'zuzhutype': zuzhutype,
    'chaoxiang': chaoxiang,
    'minmianji': minmianji,
    'maxmianji': maxmianji,
  })
  indexmodel.selHouse(type, diduan, huxing, minprice, maxprice, zuzhutype, chaoxiang, minmianji, maxmianji, function(err, houseList) {
    res.render('list', {
      houseList: houseList
    }, function(err, html) {
      res.json({
        'success': true,
        'view': html
      });
    });
  });
});

// 房屋详情
router.get('/housedetail/:id', function(req, res, next) {
  var houseid = req.params.id;
  indexmodel.selectHouseInfo(houseid, function(err, houseInfo) {
    if (err) {
      return next(err);
    }
    indexmodel.selectZuLinInfo(houseid, function(err, zulinInfo) {
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
          zulinInfo: zulinInfo[0],
          houseImgList: houseImgList
        });
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

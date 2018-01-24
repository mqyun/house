var express = require('express');
var router = express.Router();

var multiparty = require('multiparty');
var fs = require('fs');

var crypto = require('crypto');

var usermodel = require('../models/usermodel');
var indexmodel = require('../models/indexmodel');

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
    req.session.usertype = 'user';
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

// 获取自己未出租或出售房源列表
router.post('/getHouseList', function(req, res, next) {
  var userid = req.session.uid;
  var type = req.body.type;
  usermodel.selMyHouse(userid, type, function(err, houseList) {
    if (err) {
      res.json({
        'error': err
      });
    }
    res.render('user/list', {
      houseList: houseList
    }, function(err, html) {
      res.json({
        'success': true,
        'view': html
      })
    });
  });
});

// 获取自己已出租或出售房源列表
router.post('/getAlreadyHouseList', function(req, res, next) {
  var userid = req.session.uid;
  var type = req.body.type;
  usermodel.selAlreadyMyHouse(userid, type, function(err, houseList) {
    if (err) {
      res.json({
        'error': err
      });
    }
    res.render('user/list', {
      houseList: houseList
    }, function(err, html) {
      res.json({
        'success': true,
        'view': html
      })
    });
  });
});

// 添加房源基本信息
router.post('/addHouse', function(req, res, next) {
  var type = req.body.type;
  var jieshao = req.body.jieshao;
  var diduan = req.body.diduan;
  var huxing = req.body.huxing;
  var price = req.body.price;
  var zuzhutype = req.body.zuzhutype || null;
  var chaoxiang = req.body.chaoxiang;
  var mianji = req.body.mianji;
  var userid = req.session.uid;
  usermodel.addHouse(type, jieshao, diduan, huxing, price, zuzhutype, chaoxiang, mianji, userid, function(err) {
    if (err) {
      res.json({
        'error': err
      });
      return next(err);
    }
    res.json({
      'success': '已提交房源基本信息'
    });
  });
});

// 上传房源图片
router.post('/uploadImg', function(req, res, next) {
  var userid = req.session.uid;
  usermodel.getHouseId(userid, function(err, rows) {
    if (err) {
      return next(err);
    }
    var houseid = rows[0].id;
    var form = new multiparty.Form({
      uploadDir: './public/uploads'
    });
    form.parse(req, function(err, fields, files) {
      if (!fs.existsSync('./public/uploads/' + userid)) {
        fs.mkdirSync('./public/uploads/' + userid);
      }
      var filesTmp = JSON.stringify(files, null, 2);
      if (err) {
        console.log('parse error: ' + err);
      } else {
        console.log('parse files: ' + filesTmp[0]);
        for (var i = 0; i < files.image.length; i++) {
          var filename = files.image[i].originalFilename;
          var uploadedPath = files.image[i].path;
          var dstPath = './public/uploads/' + userid + '/' + houseid + '-' + i + '-' + filename;
          var sqlPath = '/uploads/' + userid + '/' + houseid + '-' + i + '-' + filename;
          fs.rename(uploadedPath, dstPath, function(err) {
            if (err) {
              console.log('rename error: ' + err);
            } else {
              console.log('rename ok');
            }
          });
          usermodel.uploadImage(houseid, sqlPath, function(err) {
            if (err) {
              return next(err);
            }
            usermodel.updateHouseHasImg(houseid, function(err) {
              if (err) {
                return next(err);
              }
            });
          });
        }
      }
      res.redirect('/user/myhouse');
    });
  });
});

// 获取修改房源信息弹出层
router.post('/getEditHouseModal', function(req, res, next) {
  var houseid = req.body.houseid;
  indexmodel.selectHouseInfo(houseid, function(err, houseInfo) {
    if (err) {
      return next(err);
    }
    res.render('user/edithouse', {
      houseInfo: houseInfo[0]
    }, function(err, html) {
      res.json({
        'success': true,
        'view': html
      })
    });
  });
});

// 修改房源信息
router.post('/updateHouse', function(req, res, next) {
  var type = req.body.type;
  var jieshao = req.body.jieshao;
  var diduan = req.body.diduan;
  var huxing = req.body.huxing;
  var price = req.body.price;
  var zuzhutype = req.body.zuzhutype || null;
  var chaoxiang = req.body.chaoxiang;
  var mianji = req.body.mianji;
  var houseid = req.body.houseid;
  usermodel.updateHouse(type, jieshao, diduan, huxing, price, zuzhutype, chaoxiang, mianji, houseid, function(err) {
    if (err) {
      res.json({
        'error': err
      });
      return next(err);
    }
    res.json({
      'success': '修改房源基本信息成功'
    });
  });
});

// 删除房源
router.post('/deleteHouse', function(req, res, next) {
  var houseid = req.body.houseid;
  usermodel.deleteHouseInfo(houseid, function(err) {
    if (err) {
      res.json({
        'error': err
      });
      return next(err);
    }
    usermodel.getDeleteUrl(houseid, function(err, rows) {
      if (err) {
        res.json({
          'error': err
        });
        return next(err);
      }
      for (let i = 0; i < rows.length; i++) {
        var curPath = './public' + rows[i].url;
        fs.unlinkSync(curPath);
      }
      usermodel.deleteHouseImg(houseid, function(err) {
        if (err) {
          res.json({
            'error': err
          });
          return next(err);
        }
        res.json({
          'success': '删除房源成功'
        })
      });
    });
  });
});

module.exports = router;

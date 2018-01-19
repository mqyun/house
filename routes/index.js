var express = require('express');
var router = express.Router();

var multiparty = require('multiparty');
var fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'Express'
  });
});

router.post('/upload', function(req, res, next) {
  var uid = 2;
  //生成multiparty对象，并配置上传目标路径
  var form = new multiparty.Form({
    uploadDir: './public/uploads'
  });
  //上传完成后处理
  form.parse(req, function(err, fields, files) {
    if (!fs.existsSync('./public/uploads/' + uid)) {
      fs.mkdirSync('./public/uploads/' + uid);
    }
    var filesTmp = JSON.stringify(files, null, 2);
    if (err) {
      console.log('parse error: ' + err);
    } else {
      console.log('parse files: ' + filesTmp[0]);
      for (var i = 0; i < files.image.length; i++) {
        var filename = files.image[i].originalFilename;
        var uploadedPath = files.image[i].path;
        var dstPath = './public/uploads/' + uid + '/' + i + '-' + filename;
        fs.rename(uploadedPath, dstPath, function(err) {
          if (err) {
            console.log('rename error: ' + err);
          } else {
            console.log('rename ok');
          }
        });
      }
    }
  });
});

router.post('/test', function(req, res, next) {
  var test = req.body.test;
  res.json({
    'test': test
  });
})

module.exports = router;

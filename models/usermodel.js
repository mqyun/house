var db = require('./dboperation');

module.exports = {
  // 验证用户
  selectUser: function(account, callback) {
    var sql = "select * from user where account = ?;";
		db.exec(sql, account, function(err, rows) {
			if (err) {
				callback(err);
			}
			callback(err, rows);
		});
  },
  // 用户注册
  userReg: function(account, password, name, phone, callback) {
    var sql = "insert into user(account, password, name, phone) values(?,?,?,?);";
    db.exec(sql, [account, password, name, phone], function(err) {
      if (err) {
        callback(err);
      }
      callback(err);
    });
  },
  // 放租或出售房源
  // type 0为出租，1为出售
  addHouse: function(type, diduan, huxing, price, zuzhutype, chaoxiang, mianji, userid, callback) {
    var sql;
    if (type == 0) {
      sql = "insert into house(type, diduan, huxing, price, zuzhutype, chaoxiang, mianji, userid, shenhe) values(?,?,?,?,?,?,?,?,0);";
    } else {
      sql = "insert into house(type, diduan, huxing, price, chaoxiang, mianji, userid, shenhe) values(?,?,?,?,?,?,?,0);";
    }
    db.exec(sql, [type, diduan, huxing, price, zuzhutype, chaoxiang, chaoxiang, mianji, userid], function(err) {
      if (err) {
        callback(err);
      }
      callback(err);
    });
  },
  // 上传房源图片
  uploadImage: function(houseid, url, callback) {
    var sql = "insert into houseimg(houseid, url) values(?,?);";
    db.exec(sql, [houseid, url], function(err) {
      if (err) {
        callback(err);
      }
      callback(err);
    });
  },
  // 查看自己正在房租的房源及其审核状态
  selMyHouse: function(userid, callback) {
    var sql = "select * from house where userid = ? and youkeid = '';";
    db.exec(sql, userid, function(err, rows) {
      if (err) {
        callback(err);
      }
      callback(err, rows);
    });
  },
  // 查看自己已租和已售的房源
  selAlreadyMyHouse: function(userid, callback) {
    var sql = "select * from house where userid = ? and youkeid != '';";
    db.exec(sql, userid, function(err, rows) {
      if (err) {
        callback(err);
      }
      callback(err, rows);
    });
  },
  // 修改放租和出售的未审核状态的房源
  updateHouse: function(diduan, huxing, price, zuzhutype, chaoxiang, mianji, id, callback) {
    var sql = "update house set diduan=?, huxing=?, price=?, zuzhutype=?, chaoxiang=?, mianji=? where id = ?;";
    db.exec(sql, [diduan, huxing, price, zuzhutype, chaoxiang, mianji, id], function(err) {
      if (err) {
        callback(err);
      }
      callback(err);
    });
  },
  // 删除放租和出售的房源
  deleteHouse: function(id, callback) {
    var sql = "delete from house where id = ?;";
    db.exec(sql, id, function(err) {
      if (err) {
        callback(err);
      }
      callback(err);
    });
  },
}

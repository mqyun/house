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
  addHouse: function(type, jieshao, diduan, huxing, price, zuzhutype, chaoxiang, mianji, userid, callback) {
    var sql = "insert into house(type, jieshao, diduan, huxing, price, zuzhutype, chaoxiang, mianji, userid, shenhe, hasimg) values(?,?,?,?,?,?,?,?,?,0,0);";
    db.exec(sql, [type, jieshao, diduan, huxing, price, zuzhutype, chaoxiang, mianji, userid], function(err) {
      if (err) {
        callback(err);
      }
      callback(err);
    });
  },
  // 获取刚添加房源的id
  getHouseId: function(userid, callback) {
    var sql = "select id from house where userid = ? order by id desc limit 0, 1;";
    db.exec(sql, userid, function(err, rows) {
      if (err) {
        callback(err);
      }
      callback(err, rows);
    });
  },
  // 写入图片路径
  uploadImage: function(houseid, url, callback) {
    var sql = "insert into houseimg(houseid, url) values(?,?);";
    db.exec(sql, [houseid, url], function(err) {
      if (err) {
        callback(err);
      }
      callback(err);
    });
  },
  // 更改hasImg字段
  updateHouseHasImg: function(houseid, callback) {
    var sql = "update house set hasimg = 1 where id = ?;";
    db.exec(sql, houseid, function(err) {
      if (err) {
        callback(err);
      }
      callback(err);
    });
  },
  // 查看自己正在放租和出售的房源及其审核状态
  selMyHouse: function(userid, type, callback) {
    var sql = "select house.*, houseimg.url from house right join houseimg on house.id = houseimg.houseid where house.userid = ? and house.type = ? and house.youkeid is null GROUP BY houseimg.houseid;";
    db.exec(sql, [userid, type], function(err, rows) {
      if (err) {
        callback(err);
      }
      callback(err, rows);
    });
  },
  // 查看自己已租和已售的房源
  selAlreadyMyHouse: function(userid, type, callback) {
    var sql = "select house.*, houseimg.url from house right join houseimg on house.id = houseimg.houseid where house.userid = ? and house.type = ? and house.youkeid is not null GROUP BY houseimg.houseid;";
    db.exec(sql, [userid, type], function(err, rows) {
      if (err) {
        callback(err);
      }
      callback(err, rows);
    });
  },
  // 修改房源信息
  updateHouse: function(type, jieshao, diduan, huxing, price, zuzhutype, chaoxiang, mianji, houseid, callback) {
    var sql = "update house set type = ?, jieshao = ?, diduan = ?, huxing = ?, price = ?, zuzhutype = ?, chaoxiang = ?, mianji = ?, shenhe = 0 where id = ?;";
    db.exec(sql, [type, jieshao, diduan, huxing, price, zuzhutype, chaoxiang, mianji, houseid], function(err) {
      if (err) {
        callback(err);
      }
      callback(err);
    });
  },
  // 删除房源基本信息
  deleteHouseInfo: function(id, callback) {
    var sql = "delete from house where id = ?;";
    db.exec(sql, id, function(err) {
      if (err) {
        callback(err);
      }
      callback(err);
    });
  },
  // 获取要删除房源的图片路径
  getDeleteUrl: function(houseid, callback) {
    var sql = "select * from houseimg where houseid = ?;";
    db.exec(sql, houseid, function(err, rows) {
      if (err) {
        callback(err);
      }
      callback(err, rows);
    });
  },
  // 删除房源图片信息
  deleteHouseImg: function(houseid, callback) {
    var sql = "delete from houseimg where houseid = ?;";
    db.exec(sql, houseid, function(err) {
      if (err) {
        callback(err);
      }
      callback(err);
    });
  }
}

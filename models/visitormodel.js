var db = require('./dboperation');

module.exports = {
  // 验证游客
  selectVisitor: function(account, callback) {
    var sql = "select * from visitor where account = ?;";
		db.exec(sql, account, function(err, rows) {
			if (err) {
				callback(err);
			}
			callback(err, rows);
		});
  },
  // 游客注册
  visitorReg: function(account, password, name, phone, callback) {
    var sql = "insert into visitor(account, password, name, phone) values(?,?,?,?);";
    db.exec(sql, [account, password, name, phone], function(err) {
      if (err) {
        callback(err);
      }
      callback(err);
    });
  },
  // 查看筛选出租或出售房源
  // type 0为出租，1为出售
  selHouse: function(type, diduan, huxing, price, zuzhutype, chaoxiang, minmianji, maxmianji, callback) {
    var sql = "SELECT * FROM house WHERE type = " + type + " and shenhe = 1 and userid = '' and\
                diduan LIKE '%" + diduan + "%' and\
                huxing LIKE '%" + huxing + "%' and\
                huxing LIKE '%" + price + "%' and\
                huxing LIKE '%" + zuzhutype + "%' and\
                huxing LIKE '%" + chaoxiang + "%' and\
                mianji BETWEEN " + minmianji + " and " + maxmianji + ";";
    db.exec(sql, '', function(err, rows) {
      if (err) {
        callback(err);
      }
      callback(err, rows);
    });
  },
  // 首页显示最新出租和出售的房源
  homeGetNewHouse: function(type, callback) {
    var sql;
    // 出租
    if (type == 0) {
      sql = "select * from house where type = 0 order by id desc limit 0, 10;";
    } else {
      // 出售
      sql = "select * from house where type = 1 order by id desc limit 0, 5;";
    }
    db.exec(sql, '', function(err, rows) {
      if (err) {
        callback(err);
      }
      callback(err, rows);
    });
  }
}

var db = require('./dboperation');

module.exports = {
  // 验证管理员
  selectAdmin: function(account, callback) {
    var sql = "select * from admin where account = ?;";
		db.exec(sql, account, function(err, rows) {
			if (err) {
				callback(err);
			}
			callback(err, rows);
		});
  },
  // 获取房源
  getHouse: function(shenhe, callback) {
    var sql;
    if (shenhe == 0) {
      sql = "select house.*, houseimg.url from house right join houseimg on house.id = houseimg.houseid where shenhe = 0 group by house.id;";
    } else {
      sql = "select house.*, houseimg.url from house right join houseimg on house.id = houseimg.houseid where shenhe != 0 group by house.id;";
    }
    db.exec(sql, '', function(err, rows) {
      if (err) {
				callback(err);
			}
			callback(err, rows);
    });
  },
  // 审核房源
  shenheHouse: function(shenhe, id, callback) {
    var sql = "update house set shenhe = ? where id = ?;";
		db.exec(sql, [shenhe, id], function(err) {
			if (err) {
				callback(err);
			}
			callback(err);
		});
  },
}

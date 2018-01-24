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
  // 游客租赁或购买房源
  buyHouse: function(youkeid, id, callback) {
    var sql = "update house set youkeid = ? where id = ?;";
    db.exec(sql, [youkeid, id], function(err) {
      if (err) {
        callback(err);
      }
      callback(err);
    });
  },
  getHouse: function(type, youkeid, callback) {
    var sql = "select house.*, houseimg.url from house right join houseimg on house.id = houseimg.houseid where type = ? and youkeid = ? group by house.id;";
    db.exec(sql, [type, youkeid], function(err, rows) {
      if (err) {
        callback(err);
      }
      callback(err, rows);
    });
  }
}

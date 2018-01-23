var db = require('./dboperation');

module.exports = {
  // 获取单个房屋详情
  selectHouseInfo: function(id, callback) {
    var sql = "select house.*, user.name, user.phone from house left join user on house.userid = user.id where house.id = ?;";
		db.exec(sql, id, function(err, rows) {
			if (err) {
				callback(err);
			}
			callback(err, rows);
		});
  },
  // 获取房屋图片
  selectHouseImg: function(id, callback) {
    var sql = "select * from houseimg where houseid = ?;";
    db.exec(sql, id, function(err, rows) {
			if (err) {
				callback(err);
			}
			callback(err, rows);
		});
  },
  // 首页显示最新出租和出售的房源
  homeGetNewHouse: function(type, callback) {
    var sql = "select house.*, houseimg.url from house right join houseimg on house.id = houseimg.houseid where house.type = ? and house.youkeid is null GROUP BY houseimg.houseid order by id desc limit 0, 5;";
    db.exec(sql, type, function(err, rows) {
      if (err) {
        callback(err);
      }
      callback(err, rows);
    });
  },
  // 获取更多出租和出售的房源
  getMoreHouse: function(type, callback) {
    var sql = "select house.*, houseimg.url from house right join houseimg on house.id = houseimg.houseid where house.type = ? and house.youkeid is null GROUP BY houseimg.houseid order by id desc limit 0, 5;";
    db.exec(sql, type, function(err, rows) {
      if (err) {
        callback(err);
      }
      callback(err, rows);
    });
  },
}

var db = require('./dboperation');

module.exports = {
  // 获取单个房屋详情
  selectHouseInfo: function(id, callback) {
    var sql = "select house.*, user.name as username, user.phone as userphone, visitor.name as youkename, visitor.phone as youkephone from (house left join user on house.userid = user.id) left join visitor on house.youkeid = visitor.id where house.id = ?;";
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
    var sql = "select house.*, houseimg.url from house right join houseimg on house.id = houseimg.houseid where house.type = ? and house.youkeid is null and shenhe = 1 GROUP BY houseimg.houseid order by id desc limit 0, 5;";
    db.exec(sql, type, function(err, rows) {
      if (err) {
        callback(err);
      }
      callback(err, rows);
    });
  },
  // 查看筛选出租或出售房源
  // type 0为出租，1为出售
  selHouse: function(type, diduan, huxing, minprice, maxprice, zuzhutype, chaoxiang, minmianji, maxmianji, callback) {
    var sql = "SELECT house.*, houseimg.url FROM house RIGHT JOIN houseimg ON house.id = houseimg.houseid\
                WHERE type = " + type + " and shenhe = 1 and youkeid is null and\
                diduan LIKE '%" + diduan + "%' and\
                huxing LIKE '%" + huxing + "%' and\
                price BETWEEN " + minprice + " and " + maxprice + " and\
                zuzhutype LIKE '%" + zuzhutype + "%' and\
                chaoxiang LIKE '%" + chaoxiang + "%' and\
                mianji BETWEEN " + minmianji + " and " + maxmianji + " GROUP BY house.id;";
    if (type == 1) {
      sql = "SELECT house.*, houseimg.url FROM house RIGHT JOIN houseimg ON house.id = houseimg.houseid\
                  WHERE type = " + type + " and shenhe = 1 and youkeid is null and\
                  diduan LIKE '%" + diduan + "%' and\
                  huxing LIKE '%" + huxing + "%' and\
                  price BETWEEN " + minprice + " and " + maxprice + " and\
                  zuzhutype is null and\
                  chaoxiang LIKE '%" + chaoxiang + "%' and\
                  mianji BETWEEN " + minmianji + " and " + maxmianji + " GROUP BY house.id;";
    }
    db.exec(sql, '', function(err, rows) {
      if (err) {
        callback(err);
      }
      callback(err, rows);
    });
  },
}

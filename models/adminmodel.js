var db = require('./dboperation');

module.exports = {
  // 审核房源
  selectVisitor: function(id, callback) {
    var sql = "update house set shenhe = 1 where id = ?;";
		db.exec(sql, id, function(err) {
			if (err) {
				callback(err);
			}
			callback(err);
		});
  },
}

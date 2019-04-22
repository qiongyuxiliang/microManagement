/*获取数据接口*/
var express = require('express'),
    router = express.Router(),
    bodyParser = require('body-parser'),
    querySql = require('../mysqlConn.js'),
    sqlSentence = require('../sql/sql.js');

router.get('/', function (req, res, next) {
   var id = req.query.id,
       nickname = req.query.name,
       logInfo = `用户:${nickname} id:${id} 观看了宣传视频`;
   logger('oth').info(logInfo);
   res.json({
       data:'success'
   })
});

module.exports = router;
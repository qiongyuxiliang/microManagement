/**
 * 用户信息
 */
var mongoose = require('../tokenDb.js'),
    Schema = mongoose.Schema;

var weixinParameter = new Schema({
    token: {type: String},
    ticket: {type: String},
    weixinFlag: {type: String},
    updateDate: {type: Date},

}, {collection: "weixinParameter"});
/*指定数据文档*/

module.exports = mongoose.model('weixinParameter', weixinParameter);

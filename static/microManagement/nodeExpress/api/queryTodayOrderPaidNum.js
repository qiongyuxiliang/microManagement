
const express = require('express'),
    router = express.Router(),
    querySql = require('../mx99Conn.js'),
    sqlSentence = require('../sql/mx99Sql'),
    moment = require('moment');
    axios = require('axios'),
    /*从mongoDB里查询数据*/
    weixinParameter = require('../mongooseModel/weixinParameter.js');
router.get('/', function (req, res, next) {
    let yesterday = moment().subtract(1,'days').format('YYYY-MM-DD');
    const queryTodayOrderPaidNum = sqlSentence.queryTodayOrderPaidNum;
    const readyToPayAndPaidSum = sqlSentence.readyToPayAndPaidSum;
    const yesterdayPaidSum = sqlSentence.yesterdayPaidSum;
    const yesterdayRefundSum = sqlSentence.yesterdayRefundSum;
    const newUsersGenerantedGevenueYesterday = sqlSentence.newUsersGenerantedGevenueYesterday;
    const recentSevenDaysOrderPaidSum=sqlSentence.recentSevenDaysOrderPaidSum;
    const todayAddUserSum = sqlSentence.todayAddUserSum;
    const todayOrderSum =sqlSentence.todayOrderSum;
    const yesterdayOrderSum=sqlSentence.yesterdayOrderSum;
    const addUserNum = sqlSentence.addUserNum;
    const recentAverageCost = sqlSentence.recentAverageCost;
    const deleteUser = sqlSentence.deleteUser;
    let p1 =new Promise((resolve, reject) => {
        querySql(queryTodayOrderPaidNum(), function (err, row, fields) {
            if (err) {
                reject(err);
                res.json({
                    errorInfo: '0x00002',
                    err:err,
                })
            } else {
                resolve(row[0]);
            }
        })
    })

    let p2 = new Promise((resolve, reject) => {
        querySql(readyToPayAndPaidSum(),function (err,row,fields) {
            if (err) {
                reject(err);
                res.json({
                    errorInfo: '0x00002',
                    err:err,
                })
            } else {
                resolve(row[0]);
            }
        })
    })
    let p3 =new Promise((resolve, reject)=>{
        querySql(yesterdayPaidSum(),function (err,row,fields) {
            if (err) {
                reject(err);
                res.json({
                    errorInfo: '0x00002',
                    err:err,
                })
            } else {
                resolve(row[0]);
            }
        })
    })
    let p4 =new Promise((resolve, reject)=>{
        querySql(yesterdayRefundSum(),function (err,row,fields) {
            if (err) {
                reject(err);
                res.json({
                    errorInfo: '0x00002',
                    err:err,
                })
            } else {
                resolve(row[0]);
            }
        })
    })
    let p5 =new Promise((resolve, reject)=>{
        querySql(newUsersGenerantedGevenueYesterday(),function (err,row,fields) {
            if (err) {
                reject(err);
                res.json({
                    errorInfo: '0x00002',
                    err:err,
                })
            } else {
                resolve(row[0]);
            }
        })
    })
    let p6 =new Promise((resolve, reject)=>{
        querySql(recentSevenDaysOrderPaidSum(),function (err,row,fields) {
            if (err) {
                reject(err);
                res.json({
                    errorInfo: '0x00002',
                    err:err,
                })
            } else {
                resolve(row[0]);
            }
        })
    })
    let p7 =new Promise((resolve, reject)=>{
        querySql(todayAddUserSum(),function (err,row,fields) {
            if (err) {
                reject(err);
                res.json({
                    errorInfo: '0x00002',
                    err:err,
                })
            } else {
                resolve(row[0]);
            }
        })
    })
    let p8 =new Promise((resolve, reject)=>{
        querySql(todayOrderSum(),function (err,row,fields) {
            if (err) {
                reject(err);
                res.json({
                    errorInfo: '0x00002',
                    err:err,
                })
            } else {
                resolve(row[0]);
            }
        })
    })
    let p9 =new Promise((resolve, reject)=>{
        querySql(yesterdayOrderSum(),function (err,row,fields) {
            if (err) {
                reject(err);
                res.json({
                    errorInfo: '0x00002',
                    err:err,
                })
            } else {
                resolve(row[0]);
            }
        })
    })
    let p10 =new Promise((resolve, reject)=>{
        weixinParameter.find({},function (err,docs) {
            let ACCESS_TOKEN = docs[0].token;
            axios.post(`https://api.weixin.qq.com/datacube/getusersummary?access_token=${ACCESS_TOKEN}`,{
                "begin_date": yesterday,
                "end_date": yesterday
            }).then(function(res){
                let dt = res.data.list;
                let newsUser =0;
                let cancelUser =0
                dt.map(function(item){
                    newsUser+=item.new_user;
                    cancelUser+=item.cancel_user;
                })
                resolve({sum:newsUser});
            })
        })
    })
    let p11 =new Promise((resolve, reject)=>{
        querySql(recentAverageCost(),function (err,row,fields) {
            if (err) {
                reject(err);
                res.json({
                    errorInfo: '0x00002',
                    err:err,
                })
            } else {
                resolve(row[0]);
            }
        })
    })
    let p12 =new Promise((resolve, reject)=>{
        weixinParameter.find({},function (err,docs) {
            let ACCESS_TOKEN = docs[0].token;
            axios.post(`https://api.weixin.qq.com/datacube/getusersummary?access_token=${ACCESS_TOKEN}`,{
                "begin_date": yesterday,
                "end_date": yesterday
            }).then(function(res){
                let dt = res.data.list;
                let newsUser =0;
                let cancelUser =0
                dt.map(function(item){
                    newsUser+=item.new_user;
                    cancelUser+=item.cancel_user;
                })
                resolve({sum:cancelUser});
            })
            // resolve(docs[0].token)
        })

    })
    Promise.all([p1, p2,p3,p4,p5,p6,p7,p8,p9,p10,p11,p12]).then((result) => {
        res.json({
            data:result,
            errorInfo: '0x00001',
        })
    }).catch((error) => {
        res.json({
            errorInfo: '500',
            err:err,
        })
    })
 /*嵌套待支付和已支付的金额*/


});
module.exports = router;
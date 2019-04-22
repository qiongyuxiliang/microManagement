const express = require('express'),
    moment = require('moment'),
    /*moment 插件用于格式化日期*/
    router = express.Router(),
    querySql = require('../mx99Conn.js'),
    sqlSentence = require('../sql/mx99Sql');
router.get('/', function (req, res, next) {

    const newUsersAddSum = sqlSentence.newUsersAddSum;
    const usersLeave = sqlSentence.usersLeave;
    let dayFour = req.query.dayFour || 0;
    if (dayFour == 0) {
        dayFour = 3;
    } else if (dayFour == 1) {
        dayFour = 5;
    } else if (dayFour == 2) {
        dayFour = 7;
    } else if (dayFour == 3) {
        dayFour = 90;
    }
    let endDate = moment().subtract(1, 'days').format('YYYY-MM-DD');
    let beginDate = moment().subtract(dayFour, 'days').format('YYYY-MM-DD');

    weixinParameter.find({},function (err,docs) {
        let ACCESS_TOKEN = docs[0].token;
        axios.post(`https://api.weixin.qq.com/datacube/getusersummary?access_token=${ACCESS_TOKEN}`,{
            "begin_date": beginDate,
            "end_date": endDate
        }).then(function(resp){
            let dt = resp.data.list,arr=[];
            for(let i= dayFour;i>0;i--){
                let gainUsers =0;
                let lostUsers =0

                let date = moment().subtract(i, 'days').format('YYYY-MM-DD');
                dt.filter(function (item) {
                    return item.ref_date==date;
                }).map(function (item) {
                    gainUsers+=item.new_user;
                    lostUsers+=item.cancel_user;
                })
                let obj = {gainUsers:gainUsers,lostUsers:lostUsers,date:date,}
                arr.push(obj)
            }

            res.json({
                data:arr,
            })
        })

    })
    // let arr = [];
    // function getPromiseArr(date, callback) {
    //     querySql(newUsersAddSum(date), function (err, row, fields) {
    //         if (err) {
    //             res.json({
    //                 errorInfo: '0x00002',
    //                 err: err,
    //             })
    //         } else {
    //             callback(row[0])
    //         }
    //     })
    // };
    // for (let i = 1; i <= dayFour; i++) {
    //     let date = moment().subtract(i, 'days').format('YYYY-MM-DD')
    //     getPromiseArr(date, function (data) {
    //         let p = new Promise((resolve, reject) => {
    //             querySql(usersLeave(date), function (err, row, fields) {
    //                 if (err) {
    //                     reject(err);
    //                     res.json({
    //                         errorInfo: '0x00002',
    //                         err: err,
    //                     })
    //                 } else {
    //                     /*因为其为异步执行，无法保证执行返回数据的顺序，且需要保证执行效率，不改动为同步，利用sequence对其进行添加序号*/
    //                     resolve({lostUsers: row[0].sum, gainUsers: data.sum, sequence: i,date:date});
    //                 }
    //             })
    //         })
    //
    //         async function arrPush() {
    //             await p;
    //             arr.push(p);
    //             if (arr.length == dayFour) {
    //                 Promise.all(arr).then((result) => {
    //                     res.json({
    //                         data: result,
    //                         errorInfo: '0x00001',
    //                     })
    //                 }).catch((error) => {
    //                     res.json({
    //                         errorInfo: '500',
    //                         err: err,
    //                     })
    //                 })
    //             }
    //         }
    //         arrPush();
    //     })
    //
    // }
});
module.exports = router;
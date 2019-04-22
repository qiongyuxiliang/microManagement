var product ='/business/product/';
var withdraw ='/business/withdraw/';
var withdraw80= 'http://47.100.102.37/business/withdraw/';
var income ='/business/income/';
var income80 ='http://47.100.102.37/business/income/';
var microReview ='http://47.100.102.37/business/microReview/';
var account = '/business/account/';
var account80 = 'http://47.100.102.37/business/account/';
var transaction = '/business/transaction/';
var transaction80 = 'http://47.100.102.37/business/transaction/';
var secKill = '/business/seckillProduct/'
var collage = '/business/collage/'
var bargain = '/business/bargain/'
var user = '/user/';
var user80 = 'http://47.100.102.37/user/';
var customer = '/user/customer/';

var file = '/system/file/';
var file2 = '/system-service/file/';

var banner = '/system/banner/';

define(['appManagement'], function (app) {
    app
        .factory('UserLoginOut',['$resource',function ($resource){
            return $resource(user80 + 'user/loginOut');
        }])

        /*管理员登录*/
        .factory('ManagerLogin',['$resource',function ($resource){
            return $resource(user80 + 'managerLogin');
        }])

        /*上传图片*/
        .factory('ImageUploadToOSS',['$resource',function ($resource){
            return $resource(file + 'imageUploadToOSS');
        }])
        .factory('imageBase64UploadToOSS',['$resource',function ($resource){
            return $resource(file2 + 'imageBase64UploadToOSS');
        }])

        /*代理详情*/
        .factory('QueryUserBusinessById',['$resource',function ($resource){
            return $resource('/queryAllUsersById');
        }])
        /*发展的*用户/*/
        .factory('QueryNextUserById',['$resource',function ($resource){
            return $resource(customer + 'queryNextUserById');
        }])
        .factory('QueryParentUserById',['$resource',function ($resource){
            return $resource(customer + 'queryParentUserById');
        }])
        /*人员管理*/
        .factory('QueryUserInfoDTOByParameters',['$resource',function ($resource){
            return $resource('/QueryUserInfoDTOByParameters');
        }])

        /*首页*/
        /*按钮的切换与搜索*/
        .factory('QueryProductsByParameters',['$resource',function ($resource){
            return $resource('/queryAllProducts');
        }])
        /*更改状态 上架*/
        .factory('PutAwayProductById',['$resource',function ($resource){
            return $resource('/putAwayProductById');
        }])
        /*更改状态 下架*/
        .factory('DelProductById',['$resource',function ($resource){
            return $resource( '/delProductById');
        }])
        /*编辑*/
        .factory('FindProductById',['$resource',function ($resource){
            return $resource('/findProductById');
        }])
        /*保存*/
        .factory('UpdateProductByParameters',['$resource',function ($resource){
            return $resource('/updateProductById');
        }])
        /*上传商品*/
        .factory('AddOfflineProduct',['$resource',function ($resource){
            return $resource('/addNewProduct');
        }])
        /*运营管理*/
        .factory('QueryTrainingProductsByParameters',['$resource',function ($resource){
            return $resource(product + 'queryTrainingProductsByParameters');
        }])
        .factory('GetTrainingProductDetail',['$resource',function ($resource){
            return $resource(product + 'getTrainingProductDetail');
        }])
        .factory('UpdateTrainingProduct',['$resource',function ($resource){
            return $resource(product + 'updateTrainingProduct');
        }])
        .factory('AddTrainingProduct',['$resource',function ($resource){
            return $resource(product + 'addTrainingProduct');
        }])
        .factory('FindProductDetail',['$resource',function ($resource){
            return $resource(product + 'findProductDetail');
        }])
        /*-------------------*/
        .factory('getOneProductClassList',['$resource',function ($resource){
            return $resource(product + 'getOneProductClassList');
        }])

        .factory('FindOneProductClassList',['$resource',function ($resource){
            return $resource(product + 'findOneProductClassList');
        }])

        .factory('getTwoProductClassList',['$resource',function ($resource){
            return $resource(product + 'getTwoProductClassList');
        }])
        .factory('addOneProductClass',['$resource',function ($resource){
            return $resource(product + 'addOneProductClass');
        }])
        .factory('addTwoProductClass',['$resource',function ($resource){
            return $resource(product + 'addTwoProductClass');
        }])
        .factory('upOrDownProductClass',['$resource',function ($resource){
            return $resource(product + 'upOrDownProductClass');
        }])
        .factory('delProductClassById',['$resource',function ($resource){
            return $resource(product + 'delProductClassById');
        }])
        .factory('updateProductClass',['$resource',function ($resource){
            return $resource(product + 'updateProductClass');
        }])
        .factory('getProductClassListById',['$resource',function ($resource){
            return $resource(product + 'getProductClassListById');
        }])


        /*输入定单号*/
        .factory('InsertOrderCopRelation',['$resource',function ($resource){
            return $resource(transaction80 + 'insertOrderCopRelation');
        }])
        /*订单页  查询与 全部 确认收货。。*/
        .factory('QueryBusinessOrderByParameters',['$resource',function ($resource){
            return $resource(transaction + 'orderManagement');
        }])
        /*展示所有*/
        .factory('QueryAllBusinessOrders',['$resource',function ($resource){
            return $resource(transaction + 'queryAllBusinessOrders');
        }])
        /*详情*/
        .factory('QueryOrderDetailsById',['$resource',function ($resource){
            return $resource(transaction + 'queryOrderBuinessByOrderId');
        }])
        /*编辑地址*/
        .factory('UpdateOrderAddress',['$resource',function ($resource){
            return $resource(transaction + 'updateOrderAddress');
        }])
        /*导出列表*/
        .factory('ExportExcelToOSS',['$resource',function ($resource){
            return $resource(transaction80 + 'exportExcelToOSS');
        }])

         /*财务管理——提现*/
        /*改变状态*/
        .factory('UpdateWithdrawById',['$resource',function ($resource){
            return $resource(withdraw80 + 'updateWithdrawById');
        }])
        /*按条件查询*/
        .factory('QueryWithdrawsByParameters',['$resource',function ($resource){
            return $resource(withdraw80 + 'queryWithdrawsByParameters');
        }])

        /*财务管理——余额*/
        /*搜索*/
        .factory('QueryUserBalanceByParameters',['$resource',function ($resource){
            return $resource(account80 + 'queryUserBalanceByParameters');
        }])
        /*账单*/
        /*获得所有数据与按条件查询*/
        .factory('QueryPayRecordsByParameters',['$resource',function ($resource){
            return $resource(account80 + 'queryPayRecordsByParameters');
        }])

        /*获取充值储蓄账户列表**/
        .factory('FindRechargeAccountList',['$resource',function ($resource){
            return $resource(account80 + 'findRechargeAccountList');
        }])

         /*获取充值储蓄记录列表**/
        .factory('FindRechargeAccountRecordList',['$resource',function ($resource){
            return $resource(account + 'findRechargeAccountRecordList');
        }])

        /**更改充值储蓄账户状态**/
        .factory('ChangeRechargeAccountStatus',['$resource',function ($resource){
            return $resource(account80 + 'changeRechargeAccountStatus');
        }])

        /*按条件查询*/
        .factory('QueryUserIncomeByParameters',['$resource',function ($resource){
            return $resource(income + 'queryUserIncomeByParameters');
        }])

        .factory('GetIncomeRecordByPageParam',['$resource',function ($resource){
            return $resource('/instantrebate');
        }])

        .factory('CheckIncomeRecordManagement',['$resource',function ($resource){
            return $resource('/auditCommission');
        }])
        .factory('SelectSelfMonthTransactionRecordByUserId',['$resource',function ($resource){
            return $resource(income + 'selectSelfMonthTransactionRecordByUserId');
        }])
        .factory('ExportExcelMonthTransactionRecordByUserId',['$resource',function ($resource){
            return $resource(income + 'exportExcelMonthTransactionRecordByUserId');
        }])
        .factory('SelectNextMonthTransactionRecordByUserId',['$resource',function ($resource){
            return $resource(income + 'selectNextMonthTransactionRecordByUserId');
        }])
        .factory('QueryIncomeInfoByIncomeId',['$resource',function ($resource){
            return $resource( '/getChatNextUser');
        }])


    
        /*详情 月度结算*/
        .factory('QueryMonthTransactionRecordByIncomeRecord',['$resource',function ($resource){
            return $resource(income + 'queryMonthTransactionRecordByIncomeRecord');
        }])
        .factory('QueryMonthPayRecordByUserId',['$resource',function ($resource){
            return $resource(income + 'queryMonthPayRecordByUserId');
        }])
        /*详情 即时奖励*/
        .factory('QueryInstanceInfoByTransactionId',['$resource',function ($resource){
            return $resource(income + 'queryInstanceInfoByTransactionId');
        }])
        /*分享奖励查看*/
        .factory('GetIncomeShareActivityInfoByIncomeId',['$resource',function ($resource){
            return $resource(income + 'getIncomeShareActivityInfoByIncomeId');
        }])
        /*审核*/
        .factory('UpdateIncomeRecordStatusById',['$resource',function ($resource){
            return $resource(income + 'updateIncomeRecordStatusById');
        }])
        .factory('GetMicroReviewInfo',['$resource',function ($resource){
            return $resource(microReview + 'getMicroReviewInfo');
        }])

        .factory('MicroReviewOper',['$resource',function ($resource){
            return $resource(microReview + 'microReviewOper');
        }])

        .factory('FindNextUserInfoControl',['$resource',function ($resource){
            return $resource(income + 'findNextUserInfoControl');
        }])

        .factory('ExportNextUserInfoControl',['$resource',function ($resource){
            return $resource(income + 'exportNextUserInfoControl');
        }])

        //手动生成月度
        .factory('MonthlyIncomeSignalMT',['$resource',function ($resource){
            return $resource(income + 'MonthlyIncomeSignalMT');
        }])


         //监听
        .factory('GetKey',['$resource',function ($resource){
            return $resource(income + 'getKey');
        }])

        //获取banner图列表
        .factory('GetHomeBannerList',['$resource',function ($resource){
            return $resource('/getBannerList');
        }])

         //获取banner上移下移delHomeBannerById
        .factory('UpdateHomeBannerRank',['$resource',function ($resource){
            return $resource('/moveBannerPic');
        }])

         //获取删除banner图
        .factory('DelHomeBannerById',['$resource',function ($resource){
            return $resource('/deleteBannerPic');
        }])

         //获取banner详细信息
        .factory('FindHomeBannerInfoById',['$resource',function ($resource){
            return $resource(banner + 'findHomeBannerInfoById');
        }])

        //新增banner
        .factory('AddHomeBanner',['$resource',function ($resource){
            return $resource('/addBannerPic');
        }])

         //更新banner
        .factory('UpdateHomeBanner',['$resource',function ($resource){
            return $resource('/editBannerPic');
        }])

        //更新获取用户信息
        .factory('GetUserInfo',['$resource',function ($resource){
            return $resource(income80 + 'getUserInfo');
        }])

         //获取活动列表
        .factory('FindSeckillActivityList',['$resource',function ($resource){
            return $resource(secKill + 'findSeckillActivityList');
        }])

         //获取活动列表
        .factory('ChangeSecKillActivityStatus',['$resource',function ($resource){
            return $resource(secKill + 'changeSecKillActivityStatus');
        }])

        //更新活动列表
        .factory('UpdateSecKillActivity',['$resource',function ($resource){
            return $resource(secKill + 'updateSecKillActivity');
        }])

        //新增活动列表
        .factory('AddSecKillActivity',['$resource',function ($resource){
            return $resource(secKill + 'addSecKillActivity');
        }])

        //获取秒杀活动详情
        .factory('GetSecKillActivityDetail',['$resource',function ($resource){
            return $resource(secKill + 'getSecKillActivityDetail');
        }])

        //获取活动列表
        .factory('FindCollageActivityList',['$resource',function ($resource){
            return $resource(collage + 'product/getCollageProductList');
        }])
        //新增活动列表
        .factory('AddCollageActivity',['$resource',function ($resource){
            return $resource(collage + 'product/addCollageActivity');
        }])
        //获取活动列表
        .factory('ChangeCollageActivityStatus',['$resource',function ($resource){
            return $resource(collage + 'product/changeCollageActivityStatus');
        }])
        //获取秒杀活动详情
        .factory('GetCollageActivityDetail',['$resource',function ($resource){
            return $resource(collage + 'product/getCollageActivityDetail');
        }])
        //更新活动列表
        .factory('UpdateCollageActivity',['$resource',function ($resource){
            return $resource(collage + 'product/updateCollageActivity');
        }])
        //砍价
        //获取活动列表
        .factory('GetBargainProductList',['$resource',function ($resource){
            return $resource(bargain + 'product/getBargainProductList');
        }])
        //新增活动列表
        .factory('AddBargainActivity',['$resource',function ($resource){
            return $resource(bargain + 'product/addBargainActivity');
        }])
        //获取活动列表
        .factory('ChangeBargainActivityStatus',['$resource',function ($resource){
            return $resource(bargain + 'product/changeBargainActivityStatus');
        }])
        //获取秒杀活动详情
        .factory('GetBargainActivityDetail',['$resource',function ($resource){
            return $resource(bargain + 'product/getBargainActivityDetail');
        }])
        //更新活动列表
        .factory('UpdateBargainActivity',['$resource',function ($resource){
            return $resource(bargain + 'product/updateBargainActivity');
        }])

});

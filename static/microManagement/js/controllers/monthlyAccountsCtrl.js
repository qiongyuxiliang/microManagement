angular.module('controllers', []).controller('monthlyAccountsCtrl',
    ['$http', '$scope', '$interval', '$rootScope', '$stateParams', '$state', 'Global', '$timeout', 'QueryUserIncomeByParameters'
        , 'ManagementUtil', 'GetIncomeRecordByPageParam', "CheckIncomeRecordManagement", 'QueryIncomeInfoByIncomeId'
        , 'GetMicroReviewInfo', 'GetKey', 'GetUserInfo', 'MicroReviewOper',
        function ($http, $scope, $interval, $rootScope, $stateParams, $state, Global, $timeout, QueryUserIncomeByParameters
            , ManagementUtil, GetIncomeRecordByPageParam, CheckIncomeRecordManagement, QueryIncomeInfoByIncomeId
            , GetMicroReviewInfo, GetKey, GetUserInfo, MicroReviewOper) {
            var startTime = document.querySelector(".MStart");
            var endTime = document.querySelector(".MEnd");
            var pattern = /^1[34578]\d{9}$/;
            var pattern1 = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
            $scope.MAccount = "";
            $scope.status = "i";
            $scope.agencyIndex = -1;
            $scope.checkStatus = "";
            $scope.key = "";
            $scope.value = "false";
            $scope.mum = true;
            $scope.circle = true;
            var pageTrue = true;
            $scope.auditFlag = false;
            $scope.userMoblie = "";
            $scope.useBusinessType = "";
            $scope.shareActivityFlag = false

            //上传表单各个字段
            $scope.uploadShow = false;

            $scope.microReview = {
                id: '',//must
                operatorUserId: '',
                financeUserId: '',
                operatorStatus: '',
                financeStatus: ''
            }
            /*审核状态*/
            $scope.isChecked = false;

            var a = [];

            /*获取用户信息*/
            $scope.getUser = function () {
                GetUserInfo.get({}, function (data) {
                    ManagementUtil.checkResponseData(data, "");
                    $scope.userInfo = data.responseData;
                })
            }

            $scope.getUser();
            /*点击查看按钮*/
            $scope.details = function (sysUserId, index, id) {
                $scope.getUser();
                $scope.agencyIndex = index;
                if ($scope.status == "i" || $scope.status == "j" || $scope.status == 'k') {
                    for (var i = 0; i < $scope.MonthlyBalanceLis.length; i++) {
                        $scope.MonthlyBalanceLis[i].statesLook = "1"
                    }
                }
                $scope.MonthlyBalanceLis[index].statesLook = "2"
            };
            $scope.orderIdFun = function (MonthlyBalanceLis) {
                for (var i = 0; i < MonthlyBalanceLis.length; i++) {
                    if (MonthlyBalanceLis[i].orderStatus == "0") {
                        MonthlyBalanceLis[i].orderStatus = "未付款"
                    } else if (MonthlyBalanceLis[i].orderStatus == "1") {
                        MonthlyBalanceLis[i].orderStatus = "待发货"
                    } else if (MonthlyBalanceLis[i].orderStatus == "2") {
                        MonthlyBalanceLis[i].orderStatus = "已完成"
                    } else if (MonthlyBalanceLis[i].orderStatus == "3") {
                        MonthlyBalanceLis[i].orderStatus = "物品在购物车中"
                    } else if (MonthlyBalanceLis[i].orderStatus == "4") {
                        MonthlyBalanceLis[i].orderStatus = "待收货"
                    } else if (MonthlyBalanceLis[i].orderStatus == "del") {
                        MonthlyBalanceLis[i].orderStatus = "订单已删除"
                    }

                }


            };
            $scope.userType = function (MonthlyBalanceLis, type) {
                for (var i = 0; i < MonthlyBalanceLis.length; i++) {
                    if (MonthlyBalanceLis[i][type] != null) {
                        MonthlyBalanceLis[i][type] = MonthlyBalanceLis[i][type].substring(9, 10) + "级";
                    }
                }

            }


            /*月结  即时提现*/

            $scope.loadPageList = function () {
                $timeout(function () {
                    if (window.location.hash.indexOf("true") != -1 && pageTrue == true) {
                        $scope.MAccount = $stateParams.MAccount;
                        startTime.value = $stateParams.startTime;
                        endTime.value = $stateParams.endTime;
                        $scope.pageNo = $stateParams.pageNo;
                        $scope.status = $stateParams.status;
                        $scope.checkStatus = $stateParams.checkStatus;
                        pageTrue = false;
                    }

                    $scope.checkStatus = $("#checkStatus").val();
                    $scope.useBusinessType = $("#useBusinessType").val();

                    $scope.pageParamVoDTO = {
                        isExportExcel: "N",
                        startTime: startTime.value,
                        endTime: endTime.value,
                        pageNo: $scope.pageNo,
                        pageSize: $scope.pageSize,
                        requestData: {
                            incomeType: $scope.status,
                            mobile: $scope.MAccount,
                            checkStatus: $scope.checkStatus,
                            useBusinessType: $scope.useBusinessType
                        }
                    }

                    GetIncomeRecordByPageParam.save($scope.pageParamVoDTO, function (data) {
                        $scope.getUser();
                        if (data.errorInfo == Global.SUCCESS) {
                            // console.log(data.data)
                            if (data.totalCount == 0) {
                                alert("未查出相应结果");
                            }
                            if (data.data.length <= 0) {
                                $scope.MonthlyBalanceLis = [];
                            } else {
                                var MonthlyBalanceLis = data.data;
                                for (var i = 0; i < MonthlyBalanceLis.length; i++) {
                                    var nextUserRole = MonthlyBalanceLis[i].next_user_role_info.split('->');
                                    if (nextUserRole[0] == 'ds') {
                                        nextUserRole[0] = '董事'
                                    } else if (nextUserRole[0] == 'zc') {
                                        nextUserRole[0] = '总裁'
                                    } else if (nextUserRole[0] == 'dz') {
                                        nextUserRole[0] = '店主'
                                    }
                                    if (nextUserRole[1] == 'ds') {
                                        nextUserRole[1] = '董事'
                                    } else if (nextUserRole[1] == 'zc') {
                                        nextUserRole[1] = '总裁'
                                    } else if (nextUserRole[0] == 'dz') {
                                        nextUserRole[1] = '店主'
                                    }

                                    if (nextUserRole.length == 1) {
                                        MonthlyBalanceLis[i].nextUserPrepurchaseRole = nextUserRole[0];
                                        MonthlyBalanceLis[i].nextUserPostpurchaseRole = nextUserRole[0];
                                    } else if (nextUserRole.length == 2) {
                                        MonthlyBalanceLis[i].nextUserPrepurchaseRole = nextUserRole[0];
                                        MonthlyBalanceLis[i].nextUserPostpurchaseRole = nextUserRole[1];
                                    }
                                    if (MonthlyBalanceLis[i].current_user_role == 'ds') {
                                        MonthlyBalanceLis[i].current_user_role = '董事'
                                    } else if (MonthlyBalanceLis[i].current_user_role == 'zc') {
                                        MonthlyBalanceLis[i].current_user_role = '总裁'
                                    } else if (MonthlyBalanceLis[i].current_user_role == 'dz') {
                                        MonthlyBalanceLis[i].current_user_role = '店主'
                                    }
                                    MonthlyBalanceLis[i].next_user_name = decodeURIComponent(MonthlyBalanceLis[i].next_user_name);
                                    MonthlyBalanceLis[i].current_user_name = decodeURIComponent(MonthlyBalanceLis[i].current_user_name);
                                    console.log($scope.status)
                                    if (MonthlyBalanceLis[i].micro_rule_small_type == "j") {
                                        MonthlyBalanceLis[i].incomeType = "团队奖励"
                                    } else if (MonthlyBalanceLis[i].micro_rule_small_type == "i") {
                                        MonthlyBalanceLis[i].incomeType = "订单返利"
                                    } else if (MonthlyBalanceLis[i].micro_rule_small_type == "k") {
                                        MonthlyBalanceLis[i].incomeType = "推荐奖励"
                                    }
                                    if (MonthlyBalanceLis[i].orderStatus == "0") {
                                        MonthlyBalanceLis[i].orderStatus = "未完成"
                                    } else if (MonthlyBalanceLis[i].orderStatus == "1") {
                                        MonthlyBalanceLis[i].orderStatus = "已完成"
                                    }
                                    if (MonthlyBalanceLis[i].operator_status == 2 && MonthlyBalanceLis[i].finance_status == 2) {
                                        MonthlyBalanceLis[i].secondCheckStatus = "未审核"
                                    } else if (MonthlyBalanceLis[i].operator_status == "0" && MonthlyBalanceLis[i].finance_status != "0") {
                                        MonthlyBalanceLis[i].secondCheckStatus = "运营人员审核通过"
                                    } else if (MonthlyBalanceLis[i].finance_status == "0" && MonthlyBalanceLis[i].operator_status != "0") {
                                        MonthlyBalanceLis[i].secondCheckStatus = "财务人员审核通过"
                                    } else if (MonthlyBalanceLis[i].finance_status == "0" && MonthlyBalanceLis[i].operator_status == "0") {
                                        MonthlyBalanceLis[i].secondCheckStatus = "双方审核通过"
                                    } else if (MonthlyBalanceLis[i].operator_status == "1" || MonthlyBalanceLis[i].finance_status == "1") {
                                        MonthlyBalanceLis[i].secondCheckStatus = "审核拒绝"
                                    }
                                    if (MonthlyBalanceLis[i].amount_type == "0") {
                                        MonthlyBalanceLis[i].amount_type = "可提现"
                                    } else if (MonthlyBalanceLis[i].amount_type == "1") {
                                        MonthlyBalanceLis[i].amount_type = "不可提现"
                                    } else if (MonthlyBalanceLis[i].amount_type == "2") {
                                        MonthlyBalanceLis[i].amount_type = "用户退货"
                                    }
                                    if (MonthlyBalanceLis[i].checkUserType != null) {
                                        if (MonthlyBalanceLis[i].checkUserType.indexOf("finance") != -1) {
                                            MonthlyBalanceLis[i].checkUserType = "财务"
                                        } else if (MonthlyBalanceLis[i].checkUserType.indexOf("operation") != -1) {
                                            MonthlyBalanceLis[i].checkUserType = "运营"
                                        }
                                    }

                                    if (MonthlyBalanceLis[i].userType != null) {
                                        MonthlyBalanceLis[i].userType = MonthlyBalanceLis[i].userType.substring(9, 10) + "级";
                                    }
                                    if (MonthlyBalanceLis[i].nextUserType != null) {
                                        MonthlyBalanceLis[i].nextUserType = MonthlyBalanceLis[i].nextUserType.substring(9, 10) + "级";
                                    }


                                    $scope.orderIdFun(MonthlyBalanceLis);
                                    $scope.MonthlyBalanceLis = MonthlyBalanceLis;
                                }
                            }
                            if ($scope.MonthlyBalanceLis.length >= 1) {
                                for (var i = 0; i < $scope.MonthlyBalanceLis.length; i++) {
                                    a[i] = 1;
                                    $scope.MonthlyBalanceLis[i].statesLook = "1"
                                }
                            }

                            $scope.counnt = '';
                            $scope.response = {};
                            $scope.response.count = data.totalCount;
                            $scope.pageSize = 5;
                            $scope.param.pageFrom = ($scope.pageNo - 1) * $scope.pageSize + 1;
                            $scope.param.pageTo = ($scope.pageNo - 1) * $scope.pageSize + $scope.pageSize;
                            $scope.mum = false;


                        }
                    })
                }, 10);
            };

            /*按钮的切换*/
            $scope.bgChangeAndSearch = function (type) {
                startTime.value = "";
                endTime.value = '';
                $scope.MAccount = "";
                $scope.active = 'active';
                $scope.status = type;
                if ($scope.MonthlyBalanceLis.length >= 1) {
                    for (var i = 0; i < $scope.MonthlyBalanceLis.length; i++) {
                        $scope.MonthlyBalanceLis[i].statesLook = "1"
                    }
                }


                $scope.choosePage(1)


            };

            /*手动生成月度*/
            $scope.monthlyIncomeSignal = function () {

            }

            $scope.setTimeJianting = function () {
                // GetKey.get({
                //     key: $scope.key
                // }, function (data) {
                //     ManagementUtil.checkResponseData(data, "");
                //     value = data.responseData;
                //     if (value == "true") {
                //         $scope.key = "";
                //         alert("生成月度完成！");
                //         $scope.searchMonthlyBalance();
                //
                //     }
                // })
            }

            $scope.timeInfo = setInterval(function () {
                $scope.setTimeJianting();
            }, 6000)

            $scope.getRandomString = function () {
                len = 5 || 32;
                var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'; // 默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1
                var maxPos = $chars.length;
                var pwd = '';
                for (i = 0; i < len; i++) {
                    pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
                }
                return pwd;
            }


            /*搜索*/
            $scope.searchMonthlyBalance = function () {

                /* if($scope.MAccount != ""){
                     if(pattern.test($scope.MAccount) == false && pattern1.test($scope.MAccount)== false){
                         $scope.MAccount='请填写正确的手机号或身份证号';
                         return;
                             }
                 }*/


                $scope.choosePage(1)
            };

            /*导出列表*/
            $scope.export = function () {
                $scope.checkStatus = $("#checkStatus").val();
                if (confirm("确认要导出？")) {
                    $scope.extMicroReview = {
                        startTime: startTime.value,
                        endTime: endTime.value,
                        mobile: $scope.MAccount,
                        searchStatus: $scope.checkStatus,
                        microRuleSmallType: $scope.status
                    }
                    GetMicroReviewInfo.save($scope.extMicroReview, function (data) {
                        if (data.result == Global.SUCCESS) {
                            var $eleForm = $("<form method='get'></form>");
                            $eleForm.attr("action", data.responseData);
                            $(document.body).append($eleForm);
                            $eleForm.submit();
                        } else {
                            alert(data.errorInfo);
                        }
                    })

                }
            }
            $scope.bgAll = function () {
                $scope.auditFlag = false;
                if ($scope.MonthlyBalanceLis.length >= 1) {
                    for (var i = 0; i < $scope.MonthlyBalanceLis.length; i++) {
                        $scope.MonthlyBalanceLis[i].statesLook = "1";
                        $scope.MonthlyBalanceLis[i].shareActivityFlag = false;
                    }
                }

                $scope.agencyIndex = -1;
            };
            /*筛选已完成的订单*/
            $scope.completedOrders = function () {
                if (confirm("是否筛选已完成的订单？")) {
                }
            };
            /*审核*/
            //incomeRecordId,status,sysUserId,sysUserType
            // $scope.microReview = {
            //     id:'',//must
            //     operatorUserId:'',
            //     financeUserId:'',
            //     operatorStatus:'',
            //     financeStatus:''
            // }
            $scope.examine = function (id) {
                $scope.microReview.id = id;
                $scope.microReview.operatorUserId = $scope.userInfo.userType.indexOf('manager') == -1 ? null : $scope.userInfo.id;
                $scope.microReview.financeUserId = $scope.userInfo.userType.indexOf('finance') == -1 ? null : $scope.userInfo.id;

                $scope.auditFlag = !$scope.auditFlag;
                $scope.auditChange = function (status) {
                    $scope.microReview.operatorStatus = $scope.microReview.operatorUserId == null ? null : status;
                    $scope.microReview.financeStatus = $scope.microReview.financeUserId == null ? null : status;
                    $scope.auditFlag = false;
                    // console.log('111')
                    MicroReviewOper.save(
                        $scope.microReview
                        , function (data) {
                            $scope.getUser();
                            if (data.result == Global.SUCCESS) {
                                alert(data.responseData)

                                $scope.loadPageList();
                            }
                        }
                    )
                }
            }
            /*审核状态的改变*/

            // if($scope.userInfo.userType.indexOf('manager')!=-1){
            //     $scope.userInfo.userType
            // }
            /*状态按钮的切换*/
            $scope.stateBox = function (type) {
                startTime.value = "";
                endTime.value = '';
                $scope.MAccount = "";
                $scope.actives = 'actives';
                $scope.checkStatus = type;
                $scope.choosePage(1)
            };
            /*打开模态窗口*/
            $scope.openModel = function () {
                $scope.uploadShow = true;
                $scope.mum = true;
                $scope.circle = false;
            }
            /*取消上传*/
            $scope.bindingConcel = function () {
                $scope.uploadShow = false;
                $scope.mum = false;
            }
            $scope.file = "";

            /*导入工作*/
            $scope.upload = function () {
                var form = new FormData();
                ;
                var file = document.getElementById("fileUpload").files[0];
                form.append('file', file);
                $http({
                    method: 'POST',
                    url: 'http://localhost/business/microReview/importMicroReviewInfo',
                    data: form,
                    headers: {'Content-Type': undefined},
                    transformRequest: angular.identity
                }).success(function (data) {
                    $scope.mum = false;
                    $scope.uploadShow = false;
                    alert("上传成功！后台正在执行，请稍后刷新页面查看。");
                    // $scope.uploadShow = false;
                }).error(function (data) {
                    alert("上传失败！请联系管理员。");
                    $scope.uploadShow = false;
                    $scope.mum = false;
                })
            }

            $scope.onFileSelect = function (files) {
                $scope.myFile = files;
                console.info('files', files);
            };

        }]);


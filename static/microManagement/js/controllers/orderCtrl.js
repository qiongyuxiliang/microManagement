angular.module('controllers', []).controller('orderCtrl',
    ['$scope', '$interval', '$rootScope', '$stateParams', '$state', 'Global', '$timeout', 'QueryAllBusinessOrders', 'QueryBusinessOrderByParameters', 'ExportExcelToOSS', 'ManagementUtil', '$filter', 'InsertOrderCopRelation', 'GetUserInfo',
        function ($scope, $interval, $rootScope, $stateParams, $state, Global, $timeout, QueryAllBusinessOrders, QueryBusinessOrderByParameters, ExportExcelToOSS, ManagementUtil, $filter, InsertOrderCopRelation, GetUserInfo) {
            var stp = document.querySelector(".order .orderPayStartTime");
            var etp = document.querySelector(".order .orderPayEndTime");
            var stc = document.querySelector(".order .orderComplishedStartTime");
            var etc = document.querySelector(".order .orderComplishedEndTime");
            $scope.orderReference = "";
            $scope.orderUserAccount = "";
            $scope.id = '';
            var type = "0";
            /*$scope.lisFlag = false;*/
            $scope.mum = true;
            $scope.status = "";
            $scope.orderType = "";
            var pageTrue = true;
            /*获取用户信息*/
            $scope.getUser = function () {
                GetUserInfo.get({}, function (data) {
                    ManagementUtil.checkResponseData(data, "");
                    $scope.userInfo = data.responseData;
                })
            }

            $scope.getUser();

            /*展示所有*/
            /*订单状态，
            0表示未支付；
            1表示已支付，未收货；待发货
            2表示已经支付，已收货;
             del表示订单已经删除；
             3表示货品放入了购物车中;
             4表示已经发货，但是用户没收到货 待收货*/
            $scope.statusGet = function () {

                $scope.stp = stp.value;
                $scope.etp = etp.value;
                $scope.stc = stc.value;
                $scope.etc = etc.value;
                $scope.type = "1"

            }

            $scope.loadPageList = function () {
                // ManagementUtil.checkResponseData(data,"");
                /* if($scope.status==""&&$scope.orderReference == ""&&$scope.orderUserAccount == ""&& $scope.orderComplete==""&&$scope.orderPay==""){
                      var pageParamVoDTO = {
                          pageNo:$scope.pageNo,
                          pageSize:$scope.pageSize
                      };
                     QueryAllBusinessOrders.save(pageParamVoDTO,function(data){

                         if(data.result == Global.SUCCESS){
                             theSame(data)
                             $scope.mum = false;
                         }else{
                             $scope.orderLis =[];
                         }
                     });
                 }else{*/
                $timeout(function () {
                    if (window.location.hash.indexOf("true") != -1 && pageTrue == true) {
                        $scope.pageNo = $stateParams.pageNo;
                        $scope.status = $stateParams.status;
                        stp.value = $stateParams.stp || '';
                        etp.value = $stateParams.etp || '';
                        stc.value = $stateParams.stc || '';
                        etc.value = $stateParams.etc || '';
                        $scope.orderReference = $stateParams.orderReference;
                        $scope.orderUserAccount = $stateParams.orderUserAccount;
                        pageTrue = false;
                    }
                    $scope.statusGet();
                    $scope.PageParamVoDTO = {
                        pageNo: $scope.pageNo,
                        pageSize: $scope.pageSize,
                        stp: $scope.stp,
                        etp: $scope.etp,
                        stc: $scope.stc,
                        etc: $scope.etc,
                        timeType: $scope.type,
                        orderId: $scope.orderReference,
                        sysUserId: $scope.orderUserAccount,
                        status: $scope.status,
                        type: $scope.orderType,
                        isExportExcel: "N"
                    };
                    QueryBusinessOrderByParameters.save($scope.PageParamVoDTO, function (data) {
                        $scope.getUser();
                        if (data.data.errorInfo == Global.SUCCESS) {
                            if (data.data.totalCount == 0) {
                                alert("未查出相应结果");
                            }
                            theSame(data);
                            $scope.mum = false;
                        } else {
                            $scope.orderLis = [];
                        }
                    })
                }, 10);
            };


            var theSame = function (data) {
                $scope.getUser();
                var orderLis = data.data.data;
                console.log(orderLis)
                if (data.data == undefined) {
                    $scope.orderLis = [];
                    return
                }
                for (var i = 0; i < orderLis.length; i++) {
                    if (orderLis[i].status == "0") {
                        orderLis[i].status = "未付款"
                    } else if (orderLis[i].status == "1") {
                        orderLis[i].status = "待发货"
                    } else if (orderLis[i].status == "2") {
                        orderLis[i].status = "已完成"
                    } else if (orderLis[i].status == "3") {
                        orderLis[i].status = "物品在购物车中"
                    } else if (orderLis[i].status == "4") {
                        orderLis[i].status = "待收货"
                    } else if (orderLis[i].status == "del") {
                        orderLis[i].status = "订单已删除"
                    } else if (orderLis[i].status == "6") {
                        orderLis[i].status = "超时取消"
                    } else if (orderLis[i].status == "7") {
                        orderLis[i].status = "待成团"
                    }
                }
                $scope.orderLis = orderLis;
                $scope.orderLis = data.data.data;
                $scope.counnt = '';
                $scope.response = {};
                $scope.response.count = data.totalCount;
                $scope.pageSize = 5;
                $scope.param.pageFrom = ($scope.pageNo - 1) * $scope.pageSize + 1;
                $scope.param.pageTo = ($scope.pageNo - 1) * $scope.pageSize + $scope.pageSize;
            };
            /*未发货 确认收货....的搜索*/
            $scope.bgChangeAndSearch = function (type) {
                stp.value = "";
                etp.value = '';
                stc.value = '';
                etc.value = '';
                $scope.orderReference = '';
                $scope.active = 'active';
                $scope.status = type;
                $scope.loadPageList();
            };
            /*订单类型*/
            $scope.searchType = function (orderType) {
                stp.value = "";
                etp.value = '';
                stc.value = '';
                etc.value = '';
                $scope.orderReference = '';
                $scope.active = 'active';
                $scope.orderType = orderType;
                $scope.loadPageList();

            };
            /*搜索*/
            $scope.searchOrder = function () {
                $scope.choosePage(1)
            };
            /*导出列表*/
            $scope.educeLis = function () {
                if (confirm("确认要导出？")) {
                    if ($scope.status == "1") {
                        pageParamVoDTO = {};
                        ExportExcelToOSS.save(pageParamVoDTO, function (data) {
                            ManagementUtil.checkResponseData(data, "");
                            if (data.errorInfo == Global.SUCCESS) {
                                /*simulateBtn.href=data.result;
                                 simulateBtn.download = "导出列表"*/
                                var $eleForm = $("<form method='get'></form>");
                                $eleForm.attr("action", data.result);
                                $(document.body).append($eleForm);
                                $eleForm.submit();
                                $scope.loadPageList();
                            }
                        })
                    } else {
                        $scope.statusGet();
                        var PageParamVoDTO = {
                            pageNo: $scope.pageNo,
                            pageSize: $scope.pageSize,
                            startTime: $scope.startTime,
                            endTime: $scope.endTime,
                            timeType: $scope.type,
                            param: $scope.orderReference + $scope.orderUserAccount,
                            requestData: {
                                status: $scope.status,
                                type: $scope.orderType
                            },
                            isExportExcel: "Y"
                        };
                        QueryBusinessOrderByParameters.save(PageParamVoDTO, function (data) {
                            ManagementUtil.checkResponseData(data, "");
                            if (data.errorInfo == Global.SUCCESS) {
                                var $eleForm = $("<form method='get'></form>");
                                $eleForm.attr("action", data.result);
                                $(document.body).append($eleForm);
                                $eleForm.submit();
                                $scope.loadPageList();
                            }
                        })
                    }

                }
            };

            /*输入运单号*/
            $scope.waybillNumFlag = false;
            $scope.orderCopRelationDTO = {
                orderId: "",
                waybillNumber: "",
                transactionId: ""
            };
            $scope.waybillNum = function (businessOrderId, transactionId, num) {
                $scope.waybillNumFlag = !$scope.waybillNumFlag;
                $scope.orderCopRelationDTO.orderId = businessOrderId;
                $scope.orderCopRelationDTO.transactionId = transactionId;
                $scope.orderCopRelationDTO.waybillNumber = num;
            };
            $scope.waybillNumSave = function () {
                if ($scope.orderCopRelationDTO.waybillNumber == "") {
                    alert("运单号不能为空");
                    return
                }
                ;
                $scope.waybillNumFlag = false;
                InsertOrderCopRelation.save($scope.orderCopRelationDTO, function (data) {
                    $scope.getUser();
                    if (data.result == Global.SUCCESS) {
                        $scope.orderCopRelationDTO.waybillNumber = "";
                        $scope.loadPageList();
                        alert(data.errorInfo)
                    } else {
                        alert(data.errorInfo)
                    }
                })

            };
            $scope.bgAll = function () {
                $scope.waybillNumFlag = false;
            }
            /*打开模态窗口*/
            $scope.uploadShow=false;

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


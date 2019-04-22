/**
 * Created by Administrator on 2018/1/11.
 */
angular.module('controllers',[]).controller('abschlussCtrl',
    ['$scope','$interval','$rootScope','$stateParams','$state','Global','$timeout','QueryMonthTransactionRecordByIncomeRecord','UpdateIncomeRecordStatusById','$filter','ManagementUtil','QueryMonthPayRecordByUserId',"SelectSelfMonthTransactionRecordByUserId","ExportExcelMonthTransactionRecordByUserId","SelectNextMonthTransactionRecordByUserId",
        function (
    $scope,$interval,$rootScope,$stateParams,$state,Global,$timeout,QueryMonthTransactionRecordByIncomeRecord,UpdateIncomeRecordStatusById,$filter,ManagementUtil,QueryMonthPayRecordByUserId,SelectSelfMonthTransactionRecordByUserId,ExportExcelMonthTransactionRecordByUserId,SelectNextMonthTransactionRecordByUserId) {
            $scope.mum = true;


                 $scope.loadPageList = function () {
                     /*$scope.mum = true;*/
                     var page = {
                         pageNo:$scope.pageNo,
                         pageSize:$scope.pageSize,
                         isExportExcel:"N",
                         requestData:{
                             sysUserId:$stateParams.id
                         },
                       /*  endTime:$filter("date")($stateParams.time,'yyyy-MM-dd')*/
                     };
                     SelectNextMonthTransactionRecordByUserId.save(page,
                         function(data){
                             ManagementUtil.checkResponseData(data,"");
                             if(data.errorInfo == Global.SUCCESS){
                                 $scope.mum = false;
                                 $scope.monthlyPar = data.responseData.nextList;
                                 if($scope.monthlyPar.length>0){
                                     for(var i=0;i< $scope.monthlyPar.length;i++){
                                         $scope.monthlyPar[i].nextUserType = $scope.monthlyPar[i].nextUserType.substring(9,10)+"级";
                                         $scope.monthlyPar[i].nextUserTypeNow = $scope.monthlyPar[i].nextUserTypeNow.substring(9,10)+"级";
                                     }
                                 }

                                  $scope.response = {};
                                  $scope.response.count = data.responseData.nextCount;
                                  $scope.param.pageFrom = ($scope.pageNo-1)*$scope.pageSize+1;
                                  $scope.param.pageTo = ($scope.pageNo-1)*$scope.pageSize+$scope.pageSize;
                             }
                         });
                 };
                 /*导出列表*/
                 $scope.educeLis=function () {
                     if (confirm("是否导出列表？")) {
                         var applyStartTime = document.querySelector(".MStart");
                         var applyEndTime = document.querySelector(".MEnd");
                         var page = {
                             pageNo: $scope.pageNum,
                             pageSize: $scope.pageSize,
                             startTime: (applyStartTime.value + " 00:00:00").length>10?(applyStartTime.value + " 00:00:00"):applyStartTime.value,
                             endTime: (applyEndTime.value + " 23:59:59").length>10?(applyEndTime.value + " 23:59:59"):applyEndTime.value,
                             isExportExcel:"Y",
                             requestData: {
                                 sysUserId: $stateParams.id
                             },
                         };
                         ExportExcelMonthTransactionRecordByUserId.save(page,
                             function(data){
                                 ManagementUtil.checkResponseData(data,"");
                                 if (data.errorInfo == Global.SUCCESS) {
                                     var $eleForm = $("<form method='get'></form>");
                                     $eleForm.attr("action", data.result);
                                     $(document.body).append($eleForm);
                                     $eleForm.submit();
                                     // $scope.loadPageList();

                                 }
                             });
                     }
                 }
            $scope.detailPageList= function () {


                /*$scope.mum = true;*/
                var page = {
                    pageNo:$scope.pageNum,
                    pageSize:$scope.pageSize,
                    requestData:{
                        sysUserId:$stateParams.id
                    },
                   /* endTime:$filter("date")($stateParams.time,'yyyy-MM-dd'),*/
                    isExportExcel:"N",
                };
                SelectSelfMonthTransactionRecordByUserId.save(page,function(data){
                    ManagementUtil.checkResponseData(data,"");
                    if(data.result == Global.SUCCESS){

                        $scope.abschluss = data.responseData.selfList;
                         if($scope.abschluss.length>0){
                             for(var i=0;i< $scope.abschluss.length;i++){
                                 $scope.abschluss[i].userType = $scope.abschluss[i].userType.substring(9,10)+"级";
                                 $scope.abschluss[i].userTypeNow = $scope.abschluss[i].userTypeNow.substring(9,10)+"级";
                             }
                             for(var i=0;i<$scope.abschluss.length;i++){
                                 if($scope.abschluss[i].status == "0"){
                                     $scope.abschluss[i].status = "未支付"
                                 }else if($scope.abschluss[i].status == "1"){
                                     $scope.abschluss[i].status = "已支付"
                                 }else if($scope.abschluss[i].status == "2"){
                                     $scope.abschluss[i].status = "支付失败"
                                 }
                             }
                         }

                        $scope.count = data.responseData.totalCount;
                        if(data.responseData.totalCount == 0){
                            data.responseData.totalCount=1;
                        }
                        if($scope.pageNum>=Math.ceil($scope.count/$scope.pageSize)){
                            $scope.hint="none"
                        }
                        $scope.mum = false;
                    }else{
                        $scope.count = 1;
                    }
                });
            };

            $scope.searchMonthlyBalance = function () {
                /*$scope.mum = true;*/
                var applyStartTime = document.querySelector(".MStart");
                var applyEndTime = document.querySelector(".MEnd");
                $scope.abschluss = "";
                $scope.monthlyPar = "";
                var page = {
                    pageNo: $scope.pageNum,
                    pageSize: $scope.pageSize,
                    startTime: (applyStartTime.value + " 00:00:00").length>10?(applyStartTime.value + " 00:00:00"):applyStartTime.value,
                    endTime: (applyEndTime.value + " 23:59:59").length>10?(applyEndTime.value + " 23:59:59"):applyEndTime.value,
                    requestData: {
                        sysUserId: $stateParams.id
                    },
                    /* endTime:$filter("date")($stateParams.time,'yyyy-MM-dd'),*/
                    isExportExcel: "N",
                };
                SelectSelfMonthTransactionRecordByUserId.save(page, function (data) {
                    ManagementUtil.checkResponseData(data, "");
                    if (data.result == Global.SUCCESS) {
                        $scope.abschluss = data.responseData.selfList;
                        for (var i = 0; i < $scope.abschluss.length; i++) {
                            $scope.abschluss[i].userType = $scope.abschluss[i].userType.substring(9, 10) + "级";
                            $scope.abschluss[i].userTypeNow = $scope.abschluss[i].userTypeNow.substring(9, 10) + "级";
                        }
                        for (var i = 0; i < $scope.abschluss.length; i++) {
                            if ($scope.abschluss[i].status == "0") {
                                $scope.abschluss[i].status = "未支付"
                            } else if ($scope.abschluss[i].status == "1") {
                                $scope.abschluss[i].status = "已支付"
                            } else if ($scope.abschluss[i].status == "2") {
                                $scope.abschluss[i].status = "支付失败"
                            }
                        }
                        $scope.count = data.responseData.totalCount;
                        if (data.responseData.totalCount == 0) {
                            data.responseData.totalCount = 1;
                        }
                        if ($scope.pageNum >= Math.ceil(scope.count / scope.pageSize)) {
                            $scope.hint = "none"
                        }
                        $scope.mum = false;
                    } else {
                        $scope.count = 1;
                    }
                });

                SelectNextMonthTransactionRecordByUserId.save(page,
                    function (data) {
                        ManagementUtil.checkResponseData(data, "");
                        if (data.errorInfo == Global.SUCCESS) {
                            $scope.mum = false;
                            $scope.monthlyPar = data.responseData.nextList;
                            for (var i = 0; i < $scope.monthlyPar.length; i++) {
                                $scope.monthlyPar[i].nextUserType = $scope.monthlyPar[i].nextUserType.substring(9, 10) + "级";
                                $scope.monthlyPar[i].nextUserTypeNow = $scope.monthlyPar[i].nextUserTypeNow.substring(9, 10) + "级";
                            }
                            $scope.response = {};
                            $scope.response.count = data.responseData.nextCount;
                            $scope.param.pageFrom = ($scope.pageNo - 1) * $scope.pageSize + 1;
                            $scope.param.pageTo = ($scope.pageNo - 1) * $scope.pageSize + $scope.pageSize;
                        }
                    });
            };

          /*  $scope.submit = function(){
                var  pageParamVoDTO = {
                    requestData:{
                        id:$stateParams.id,
                        status:"1"
                    }
                };
                UpdateIncomeRecordStatusById.save(pageParamVoDTO,function(data){
                    ManagementUtil.checkResponseData(data,"");
                    if(data.result == Global.SUCCESS){
                       $state.go("monthlyAccounts")
                    }
                })
            };*/

            $scope.back = function(){
                $state.go("monthlyAccounts",{true:'true',MAccount:$stateParams.MAccount,startTime:$stateParams.startTime,endTime:$stateParams.endTime,pageNo:$stateParams.pageNo,status:$stateParams.status,checkStatus:$stateParams.checkStatus});
            }

        }]);
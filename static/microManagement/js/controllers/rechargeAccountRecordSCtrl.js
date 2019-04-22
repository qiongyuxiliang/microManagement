/**
 * Created by Administrator on 2018/1/11.
 */
angular.module('controllers',[]).controller('rechargeAccountRecordSCtrl',
    ['$scope','$interval','$rootScope','$stateParams','$state','Global','$timeout','FindRechargeAccountRecordList','$filter','ManagementUtil',
        function (
    $scope,$interval,$rootScope,$stateParams,$state,Global,$timeout,FindRechargeAccountRecordList,$filter,ManagementUtil) {
            $scope.mum = true;
            $scope.count=0;
            $scope.param = {
                rechargeAccountRecordS : []
            };

            $scope.loadPageList= function () {
                var page = {
                    pageNo:$scope.pageNo,
                    pageSize:$scope.pageSize,
                    requestData:{
                        sysUserId:$stateParams.id
                    },
                    isExportExcel:"N",
                };
                FindRechargeAccountRecordList.save(page,function(data){

                    ManagementUtil.checkResponseData(data,"");

                    if(data.result == Global.SUCCESS){


                        $scope.param.rechargeAccountRecordS = data.responseData.responseData;
                       
                        $scope.response = {
                                               };
                       $scope.response.count = data.responseData.totalCount;
                       $scope.pageSize = 5;
                       $scope.param.pageFrom = ($scope.pageNo-1)*$scope.pageSize+1;
                       $scope.param.pageTo = ($scope.pageNo-1)*$scope.pageSize+$scope.pageSize;
                       $scope.mum = false;
                    }else{
                        $scope.count = 1;
                    }
                });
            };

            $scope.back = function(){
                $state.go("rechargeAccount");
            }

}]);
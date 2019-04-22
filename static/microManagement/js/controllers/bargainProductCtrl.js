angular.module('controllers',[]).controller('bargainProductCtrl',
    ['$scope','$interval','$rootScope','$stateParams','$state','Global','$timeout','GetBargainProductList','ManagementUtil','ChangeBargainActivityStatus',
        function ($scope,$interval,$rootScope,$stateParams,$state,Global,$timeout,GetBargainProductList,ManagementUtil,ChangeBargainActivityStatus) {
            $scope.mum = true;
            $scope.bargainActivityDataList = [];
            $scope.details = function(id){
                $state.go("bargainProductDetail",{id:id,editable:false});
            }
            $scope.updateSecKill = function(id){
                $state.go("bargainProductDetail",{id:id,editable:true});
            }

            /*展示*/
            $scope.loadPageList = function(){
                $scope.PageParamVoDTO ={
                    pageNo:$scope.pageNo,
                    pageSize:$scope.pageSize,
                    pageStartNo:$scope.pageStartNo,
                    requestData:{
                        activityNo: $("#activityNo").val(),
                        startTime:$("#startTime").val(),
                        endTime:$("#endTime").val(),
                        activityStatus: $("#activityStatus").val()
                    },
                    isExportExcel:"N"
                };
                GetBargainProductList.save(
                    $scope.PageParamVoDTO
                ,function(data){
                    ManagementUtil.checkResponseData(data,"");
                    if(data.result == Global.SUCCESS){
                        if( data.responseData.totalCount ==0){
                            alert("未查出相应结果");
                        }
                        $scope.bargainActivityDataList = data.responseData.responseData;
                        $scope.response = {
                        };
                        $scope.response.count = data.responseData.totalCount;
                        $scope.pageSize = 5;
                        $scope.param.pageFrom = ($scope.pageNo-1)*$scope.pageSize+1;
                        $scope.param.pageTo = ($scope.pageNo-1)*$scope.pageSize+$scope.pageSize;
                    }
                })
                $scope.mum = false
            }

            $scope.changeStatus = function(id,status){
                if(status==1){
                    var result = confirm("确定要删除活动吗")
                    if(result){
                        ChangeBargainActivityStatus.get({
                           id:id,
                           status:status
                       },function(data){
                           ManagementUtil.checkResponseData(data,"");
                           if(data.result == Global.SUCCESS){
                                    alert("撤销活动成功！");
                                    $state.reload('app.toMenu');
                           }else{
                                alert("撤销活动失败！");
                                $state.reload('app.toMenu');
                           }
                       })
                    }
                }else{
                    var result = confirm("确定要启用活动吗")
                    if(result){
                        ChangeBargainActivityStatus.get({
                           id:id,
                           status:status
                       },function(data){
                           ManagementUtil.checkResponseData(data,"");
                           if(data.result == Global.SUCCESS){
                                    alert("启用活动成功！");
                                    $state.reload('app.toMenu');
                           }else{
                                alert("启用活动失败！");
                                $state.reload('app.toMenu');
                           }
                       })
                    }
                }
            }

            /*搜索*/
            $scope.searchBalance = function(){
                $scope.choosePage(1)
            }
            $scope.addBargainActivity = function(){
                 $state.go("addBargainProduct");
            }
        }]);
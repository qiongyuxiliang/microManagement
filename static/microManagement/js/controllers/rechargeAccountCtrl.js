angular.module('controllers',[]).controller('rechargeAccountCtrl',
    ['$scope','$interval','$rootScope','$stateParams','$state','Global','$timeout','FindRechargeAccountList','ManagementUtil','ChangeRechargeAccountStatus','GetUserInfo',
        function ($scope,$interval,$rootScope,$stateParams,$state,Global,$timeout,FindRechargeAccountList,ManagementUtil,ChangeRechargeAccountStatus,GetUserInfo) {
            $scope.BalanceAounnt = "";
            $scope.mum = true;
            var pattern = /^1[34578]\d{9}$/;
            var pattern1 = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
            $scope.rechargeAccountDTO = {
                activityNo:'',
                startTime:'',
                endTime:'',
                activityStatus:''
            };
            $scope.rechargeAccountDataList = [];

            $scope.getUser = function () {
                GetUserInfo.get({}, function (data) {
                    ManagementUtil.checkResponseData(data,"");
                    $scope.userInfo = data.responseData;
                })
            }

            $scope.getUser();
            /*展示*/
            $scope.loadPageList = function(){
                $scope.PageParamVoDTO ={
                    pageNo:$scope.pageNo,
                    pageSize:$scope.pageSize,
                    pageStartNo:$scope.pageStartNo,
                    requestData:{
                        mobile: $("#mobile").val(),
                        createDateStart:$("#createDateStart").val(),
                        createDateEnd:$("#createDateEnd").val(),
                        status: $("#status").val()
                    },
                    isExportExcel:"N"
                };
                FindRechargeAccountList.save(
                    $scope.PageParamVoDTO
                ,function(data){
                    ManagementUtil.checkResponseData(data,"");
                    if(data.result == Global.SUCCESS){
                        if( data.responseData.totalCount ==0){
                            alert("未查出相应结果");
                        }

                        $scope.rechargeAccountDataList = data.responseData.responseData;
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

            $scope.changeStatus = function(id,sysUserId,status){
                if(status==1){
                    var result = confirm("确定要解冻账户吗？")
                    if(result){
                        ChangeRechargeAccountStatus.get({
                           id:id,
                           sysUserId:sysUserId,
                           status:status
                       },function(data){
                           ManagementUtil.checkResponseData(data,"");
                           if(data.result == Global.SUCCESS){
                                  alert(data.responseData);
                                   $state.reload('app.toMenu');
                              }else{
                                   alert("解冻异常！");
                                    $state.reload('app.toMenu');
                              }
                       })
                    }
                }else{
                    var result = confirm("确定要冻结账户吗？")
                    if(result){
                        ChangeRechargeAccountStatus.get({
                           id:id,
                           sysUserId:sysUserId,
                           status:status
                       },function(data){
                           ManagementUtil.checkResponseData(data,"");
                           if(data.result == Global.SUCCESS){
                               alert(data.responseData);
                                $state.reload('app.toMenu');
                           }else{
                                alert("冻结异常！");
                                 $state.reload('app.toMenu');
                           }
                       })
                    }
                }
                $scope.loadPageList();

            }

            /*搜索*/
            $scope.searchBalance = function(){
                $scope.loadPageList();
                $scope.choosePage(1)
            }

            $scope.addSecKillActivity = function(){
                 $state.go("addSeckillProduct");
            }

            $scope.details = function(sysUserId){
                $state.go("rechargeAccountRecordS",{id:sysUserId});
            }

        }]);
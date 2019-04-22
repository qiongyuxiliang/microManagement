angular.module('controllers', []).controller('agencyParticularsCtrl',
    ['$scope', '$interval', '$rootScope', '$stateParams', '$state', 'Global', '$timeout', 'QueryUserBusinessById', 'QueryNextUserById', 'ManagementUtil', 'QueryParentUserById','GetUserInfo',
        function ($scope, $interval, $rootScope, $stateParams, $state, Global, $timeout, QueryUserBusinessById, QueryNextUserById, ManagementUtil, QueryParentUserById,GetUserInfo) {

            $scope.mum = true;
            /*获取用户信息*/
            $scope.getUser = function () {
                GetUserInfo.get({}, function (data) {
                    ManagementUtil.checkResponseData(data,"");
                    $scope.userInfo = data.responseData;
                })
            }
            $scope.getUser();
            QueryUserBusinessById.get({
                sysUserId: $stateParams.id
            }, function (data) {
                $scope.getUser();
                $scope.changeData = function (dataArr) {
                    for (var i = 0; i < dataArr.length; i++) {
                        if (dataArr[i].level == 'pt->dz') {
                            dataArr[i].level = '店主'
                        } else if (dataArr[i].level == 'pt->ds') {
                            dataArr[i].level = '董事'
                        } else if (dataArr[i].level == 'pt->zc') {
                            dataArr[i].level = '总裁'
                        } else if (dataArr[i].level == 'dz->ds') {
                            dataArr[i].level = '董事'
                        } else if (dataArr[i].level == 'dz->zc') {
                            dataArr[i].level = '总裁'
                        } else if (dataArr[i].level == 'ds->zc') {
                            dataArr[i].level = '总裁'
                        } else {
                            dataArr[i].level = '普通用户';
                        }
                        dataArr[i].name = decodeURIComponent(dataArr[i].name)
                    }
                }
                if (data.result == Global.SUCCESS) {
                    $scope.mum = false;
                    $scope.selfMessage = data.personal;
                    $scope.parentsMessage = data.parent;
                    $scope.childrenMessage = data.child;
                    $scope.changeData($scope.selfMessage);
                    $scope.changeData($scope.parentsMessage);
                    $scope.changeData($scope.childrenMessage);
                    $scope.ptLen = 0;
                    $scope.dzLen = 0;
                    $scope.dsLen = 0;
                    $scope.zcLen = 0;
                    $scope.totalLen = 0;
                    for (var i = 0; i < $scope.childrenMessage.length; i++) {
                        $scope.totalLen++;
                        if ($scope.childrenMessage[i].level == '普通用户') {
                            $scope.ptLen++;

                        } else if ($scope.childrenMessage[i].level == '店主') {
                            $scope.dzLen++;
                        } else if ($scope.childrenMessage[i].level == '董事') {
                            $scope.dsLen;
                        } else if ($scope.childrenMessage[i].level == '总裁') {
                            $scope.zcLen;
                        }

                    }


                }
            });
            // if($stateParams.parentUserId == ''){
            //     $scope.superiorAgency = "";
            // }else{
            //     QueryParentUserById.get({
            //         parentUserId:$stateParams.parentUserId
            //     },function(data){
            //         ManagementUtil.checkResponseData(data,"");
            //         if(data.result == Global.SUCCESS){
            //             $scope.superiorAgency = data.responseData;
            //             if($scope.superiorAgency.length>0){
            //                 $scope.focusOn($scope.superiorAgency)
            //             }
            //         }
            //     });
            // }

            //   QueryNextUserById.get({
            //       sysUserId:$stateParams.id
            //   },function(data){
            //       ManagementUtil.checkResponseData(data,"");
            //       if(data.result == Global.SUCCESS){
            //           $scope.mum = false;
            //           if(data.responseData.responseData==undefined){
            //               $scope.juniorMessage = []
            //           }else{
            //               $scope.juniorMessage = data.responseData.responseData;
            //               $scope.focusOn($scope.juniorMessage)
            //           }
            //       }
            // });
            /*是否关注 */
            $scope.focusOn = function (data) {
                for (var i = 0; i < data.length; i++) {
                    data[i].userType = data[i].userType.substring(9, 10);
                    if (data[i].weixinAttentionStatus == "1") {
                        data[i].weixinAttentionStatus = "是"
                    } else if (data[i].weixinAttentionStatus == "0") {
                        data[i].weixinAttentionStatus = "否"
                    }
                }
            }


            /*日期插件*/
            $scope.dataS = function (id) {
                !function (id) {
                    laydate.skin('danlan');//切换皮肤，可查看skins下面皮肤库
                    laydate({elem: id});//绑定元素
                }();
                //日期范围限制
                var start = {
                    elem: '#start',
                    format: 'YYYY-MM-DD',
                    min: laydate.now(), //设定最小日期为当前日期
                    max: '2099-06-16', //最大日期
                    istime: true,
                    istoday: false,
                    choose: function (datas) {
                        end.min = datas; //开始日选好后，重置结束日的最小日期
                        end.start = datas //将结束日的初始值设定为开始日
                    }
                };

                var end = {
                    elem: '#end',
                    format: 'YYYY-MM-DD',
                    min: laydate.now(),
                    max: '2099-06-16',
                    istime: true,
                    istoday: false,
                    choose: function (datas) {
                        start.max = datas; //结束日选好后，充值开始日的最大日期
                    }
                };
                laydate(start);
                laydate(end);
            };
            $scope.agencyIndex = 0;
            /*全部 A级 B级 按钮*/
            $scope.bgChangeAndSearch = function (index) {
                $scope.agencyIndex = index;
                $scope.active = 'active';
            };
            /*返回*/

            $scope.back = function () {

                $state.go("agency", {
                    true: 'true',
                    pageNo: $stateParams.pageNo,
                    mobile: $stateParams.mobile,
                    userType: $stateParams.userType,
                    st: $stateParams.st,
                    et: $stateParams.et
                })
            };
            $scope.trueBtn = function () {
                $state.go("agency", {
                    true: 'true',
                    pageNo: $stateParams.pageNo,
                    mobile: $stateParams.mobile,
                    userType: $stateParams.userType,
                    st: $stateParams.st,
                    et: $stateParams.et
                })
                // $state.go("agency",{true:'true',pageNo:$stateParams.pageNo,mobile:$stateParams.mobile,userType:$stateParams.userType,startTime:$stateParams.startTime,endTime:$stateParams.endTime})
            };
            $scope.backToTop = function () {
                document.body.scrollTop = document.documentElement.scrollTop = 0;

            }
            /*搜索*/
            $scope.searchSubordinate = function () {

            }
        }]);
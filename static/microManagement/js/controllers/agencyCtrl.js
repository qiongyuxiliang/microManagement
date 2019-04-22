angular.module('controllers', []).controller('agencyCtrl',
    ['$scope', '$interval', '$rootScope', '$stateParams', '$state', 'Global', '$timeout', 'ManagementUtil', 'QueryUserInfoDTOByParameters','GetUserInfo',
        function ($scope, $interval, $rootScope, $stateParams, $state, Global, $timeout, ManagementUtil, QueryUserInfoDTOByParameters,GetUserInfo) {

            var st = document.querySelector(".startTime");
            var et = document.querySelector(".endTime");
            $scope.phoNum = "";
            $scope.status = "";
            $scope.agencyIndex = 0;
            /*用于按钮的切换*/
            $scope.mum = true;
            var pageTrue = true;
            /*获取用户信息*/
            $scope.getUser = function () {
                GetUserInfo.get({}, function (data) {
                    ManagementUtil.checkResponseData(data,"");
                    $scope.userInfo = data.responseData;
                })
            }
            $scope.getUser();
            /*此页面一个接口*/
            $scope.loadPageList = function () {
                if ($scope.phoNum != "") {
                    st = "";
                    et = "";
                }
                $timeout(function () {
                    if (window.location.hash.indexOf("true") != -1 && pageTrue == true) {
                        $scope.pageNo = $stateParams.pageNo;
                        $scope.status = $stateParams.userType;
                        $scope.phoNum = $stateParams.mobile;
                        st.value = $stateParams.st;
                        et.value = $stateParams.et;
                        pageTrue = false;

                    }
                    $scope.status = $scope.phoNum == '' && !st.value && !et.value ? $scope.status : '';

                    $scope.pageParamVoDTO = {
                        pageNo: $scope.pageNo,
                        pageSize: $scope.pageSize,
                        mobile: $scope.phoNum,
                        userType: $scope.status,
                        st: st.value,
                        et: et.value,
                        isExportExcel: "N"
                    };
                    QueryUserInfoDTOByParameters.save($scope.pageParamVoDTO, function (data) {
                        $scope.getUser();
                        if (data.data.errorInfo == Global.SUCCESS) {
                            if (data.data.totalCount == 0) {
                                alert("未查出相应结果");
                            }
                            var datas = data.data.data;
                            if (data.data.data == undefined) {
                                $scope.agency = [];
                                return
                            }
                            for (var i = 0; i < datas.length; i++) {
                                if (datas[i].micro_business_role == 'dz') {
                                    // console.log(datas[i].micro_business_role)
                                    datas[i].micro_business_role = '店主';
                                } else if (datas[i].micro_business_role == 'ds') {
                                    datas[i].micro_business_role = '董事';
                                } else if (datas[i].micro_business_role == 'zc') {
                                    datas[i].micro_business_role = '总裁';
                                } else if (datas[i].micro_business_role == 'pt') {
                                    datas[i].micro_business_role = '普通';
                                }
                            }
                            $scope.agency = datas;
                            $scope.response = {};
                            $scope.response.count = data.totalCount;
                            $scope.param.pageFrom = ($scope.pageNo - 1) * $scope.pageSize + 1;
                            $scope.param.pageTo = ($scope.pageNo - 1) * $scope.pageSize + $scope.pageSize;
                            $scope.mum = false;
                        }
                    })
                }, 10);

            };
            /*全部  A级 B级 按钮*/
            $scope.bgChangeAndSearch = function (type) {
                $scope.phoNum = "";
                st.value = '';
                et.value = '';
                $scope.status = type;
                $scope.active = 'active';
                // $scope.loadPageList();
                $scope.choosePage(1)
            };
            /*搜索*/
            $scope.searchAB = function () {
                $scope.choosePage(1)
            };
//导表
            $scope.educeLis = function () {
                if (confirm("确认要导出？")) {
                    var pageParamVoDTO = {
                        pageNo: $scope.pageNo,
                        pageSize: $scope.pageSize,
                        requestData: {
                            mobile: $scope.phoNum,
                            userType: $scope.status
                        },
                        st: st.value,
                        et: et.value,
                        isExportExcel: "Y"
                    };
                    QueryUserInfoDTOByParameters.save(pageParamVoDTO, function (data) {
                        $scope.getUser();
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

        }]).filter('timeDistance', function () {
    return function (num) {
        function NewDate(str) {
            if (str == null)
                return false;
            str = str.split('-');
            var date = new Date();
            date.setUTCFullYear(str[0], str[1] - 1, str[2]);
            date.setUTCHours(0, 0, 0, 0);
            return date;
        }

        /* 算法：成为A的时间加上一年
         获取当前时间
         计算当前的时间与生命周期的时间*/
        //成为A的时间
        /* var dateBegin = new Date(num.replace(/-/g, "/"));*/
        var a = num;
        //一年后到期的时间
        var a1 = new Date(a);
        var year1 = a1.setYear(a1.getFullYear() + 1) / 1;
        var c = new Date(year1);

        //当前时间
        var oDate = new Date();
        //时效
        var runTime = parseInt((c.getTime() - oDate.getTime()) / 1000);
        var year2 = Math.floor(runTime / 86400 / 365);
        runTime = runTime % (86400 * 365);
        var month = Math.floor(runTime / 86400 / 30.41);
        runTime = runTime % (86400 * 30.41);
        var day = Math.floor(runTime / 86400);
        runTime = runTime % 86400;
        var hour = Math.floor(runTime / 3600);
        runTime = runTime % 3600;
        var minute = Math.floor(runTime / 60);
        runTime = runTime % 60;
        var second = runTime;
        if (day >= 30) {
            month = month + 1;
            day = 0;
        }
        return month + '个月' + day + '天'
    }
});
angular.module('controllers', []).controller('orderParticularsCtrl',
    ['$scope', '$interval', '$rootScope', '$stateParams', '$state', 'Global', '$timeout', 'QueryOrderDetailsById', 'UpdateOrderAddress', 'ManagementUtil', 'GetUserInfo',
        function ($scope, $interval, $rootScope, $stateParams, $state, Global, $timeout, QueryOrderDetailsById, UpdateOrderAddress, ManagementUtil, GetUserInfo) {
            $scope.mum = true;
            var changeReadOnly = document.querySelectorAll(".uploading_product_name input[readonly='readonly']");
            //修改收货地址
            /* $scope.amend = function(){
                 for(var i=0;i<changeReadOnly.length;i++){
                       changeReadOnly[i].removeAttribute("readonly")
                 }
                 document.form1.userName.focus()
                /!* document.form1.userName.select()*!/
             };*/
            /*获取用户信息*/
            $scope.getUser = function () {
                GetUserInfo.get({}, function (data) {
                    ManagementUtil.checkResponseData(data, "");
                    $scope.userInfo = data.responseData;
                })
            }

            $scope.getUser();
            $scope.back = function () {

                $state.go("order", {
                    true: 'true',
                    status: $stateParams.status,
                    pageNo: $stateParams.pageNo,
                    stp: $stateParams.stp,
                    etp: $stateParams.etp,
                    stc: $stateParams.stc,
                    etc: $stateParams.etc,
                    orderReference: $stateParams.orderReference,
                    orderUserAccount: $stateParams.orderUserAccount
                })
            };
            $scope.statusFlag = true;
            /*获得详情信息*/
            QueryOrderDetailsById.get({
                orderId: $stateParams.id
            }, function (data) {

                // ManagementUtil.checkdata(data,"");
                if (data.errorInfo == Global.SUCCESS) {
                    $scope.getUser();
                    if (data.data.status) {
                        if (data.data.status == "1") {
                            $scope.status = "付款时间";
                            $scope.statusFlag = false;
                        } else if (data.data.status == "2") {
                            $scope.status = "完成时间:";
                            $scope.statusFlag = true;
                        } else if (data.data.status == "4") {
                            $scope.status = "发货时间:";
                            $scope.statusFlag = true;
                        } else {
                            $scope.statusFlag = false;
                        }
                    }
                    if (data.data.type == "training") {
                        data.data.type = "视频"
                    } else if (data.data.type == "seckill") {
                        data.data.type = "秒杀产品"
                    } else if (data.data.type == "collage") {
                        data.data.type = "拼团产品"
                    } else if (data.data.type == "bargain") {
                        data.data.type = "砍价产品"
                    } else {
                        data.data.type = "普通产品"
                    }
                    if (data.data.userAddress) {
                        var address = data.data.userAddress;
                        /* $scope.userAddress = data.data.userAddress.split(" ");*/
                    }
                    $scope.orderParticulars = data.data;
                    $scope.mum = false;

                }
                $scope.submit = function () {
                    $scope.getUser();
                    if ($scope.orderParticulars.userOrderAddressId) {
                        var pattern = /^1[34578]\d{9}$/;
                        if (pattern.test($scope.orderParticulars.userPhoneAddress) == false) {
                            $scope.orderParticulars.userPhoneAddress = '请填写正确的手机号';
                            return;
                        }
                        if ($scope.orderParticulars.userNameAddress == '' || $scope.orderParticulars.userPhoneAddress == '' || $scope.userAddress[0] == '' || $scope.userAddress[2] == '') {
                            alert("请检查信息");
                            return;
                        }

                        var userOrderAddressDTO = {
                            userName: $scope.orderParticulars.userNameAddress,
                            userPhone: $scope.orderParticulars.userPhoneAddress,
                            province: $scope.userAddress[0],
                            city: $scope.userAddress[1],
                            detailAddress: $scope.userAddress[2],
                            id: $scope.orderParticulars.userOrderAddressId
                        };
                        UpdateOrderAddress.save(userOrderAddressDTO, function (data) {
                            $scope.getUser();
                            if (data.result == Global.SUCCESS) {
                                $state.go("order", {
                                    true: 'true',
                                    status: $stateParams.status,
                                    pageNo: $stateParams.pageNo,
                                    startTime: $stateParams.startTime,
                                    endTime: $stateParams.endTime,
                                    orderReference: $stateParams.orderReference,
                                    orderUserAccount: $stateParams.orderUserAccount
                                })
                            }

                        })
                    }

                }
            })


        }]);
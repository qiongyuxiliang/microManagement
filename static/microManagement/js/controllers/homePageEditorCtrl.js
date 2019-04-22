angular.module('controllers', []).controller('homePageEditorCtrl',
    ['$scope', '$interval', '$rootScope', '$stateParams', '$state', 'Global', '$timeout', 'DelHomeBannerById', 'GetHomeBannerList', 'UpdateHomeBannerRank', 'GetUserInfo','ManagementUtil',
        function ($scope, $interval, $rootScope, $stateParams, $state, Global, $timeout, DelHomeBannerById, GetHomeBannerList, UpdateHomeBannerRank, GetUserInfo,ManagementUtil) {

            $scope.show = false;
            $scope.bannerList = [];

            //新增
            $scope.createImage = function () {
                $state.go("homeImageUpload", {bannerId: 0});
            };
            /*获取用户信息*/
            /*获取用户信息*/
            $scope.getUser = function () {
                GetUserInfo.get({}, function (data) {
                    ManagementUtil.checkResponseData(data,"");
                    $scope.userInfo = data.responseData;
                })
            }
            $scope.getUser();

            $scope.loadPageList = function () {

                GetHomeBannerList.get(function (data) {
                    if (data.result == Global.SUCCESS) {
                        $scope.bannerList = data.data;
                    } else {
                        alert("无查询数据！");
                    }

                })
            };
            $scope.detailPageList = function () {

                GetHomeBannerList.get(function (data) {
                    if (data.result == Global.SUCCESS) {
                        $scope.bannerList = data.responseData;
                    } else {
                        alert("无查询数据！");
                    }

                })
            };

            //更新banner
            $scope.updateImageInfo = function (bannerId) {
                $scope.getUser();
                $state.go("homeImageUpload", {bannerId: bannerId})
            }


            //删除banner图
            $scope.remove = function (bannerId,bannerRank) {
                $scope.getUser();
                DelHomeBannerById.get({bannerId: bannerId,bannerRank}, function (data) {
                    if (data.result == Global.SUCCESS) {
                        alert("删除成功");
                        $state.reload('app.toMenu');
                    } else {
                        alert("删除失败");
                        $scope.detailPageList();
                    }

                })
            };

            //上移下移
            $scope.upAndDownBanner = function (bannerId, status,bannerRank) {
                $scope.getUser();
                if(bannerRank>= $scope.bannerList.length&&status=='down'){
                    alert('已经是最后一张,无法下移')
                    return;
                }else if(bannerRank<=1&&status=='up'){
                    alert('已经是第一张图片，无法上移')
                    return;
                }
                UpdateHomeBannerRank.get({bannerId: bannerId, status: status,bannerRank: bannerRank}, function (data) {
                    if (data.result == Global.SUCCESS) {
                        $state.reload('app.toMenu');
                        alert("移动成功");

                    } else {
                        $state.reload('app.toMenu');
                        alert("移动失败");

                    }

                })
            }


        }]);

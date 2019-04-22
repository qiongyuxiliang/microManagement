angular.module('controllers',[]).controller('productClassAddCtrl',
    ['$scope','$interval','$rootScope','$stateParams','$state','Global','$timeout','$http','ManagementUtil','FindProductDetail','addOneProductClass',
        function ($scope,$interval,$rootScope,$stateParams,$state,Global,$timeout,$http,ManagementUtil,FindProductDetail,addOneProductClass) {
             $scope.mess = false;


            $scope.backList = function(){

                $state.go("productClassNew");
            }

            $scope.addOneProductClass = function () {

                var className = $("#productClassName").val();
                var type =$("#type").val();

                addOneProductClass.get({
                    className: className,
                    type:type
                }, function (data) {
                    if (data.result == Global.FAILURE) {
                        alert(data.errorInfo);
                    } else {
                        alert("成功");
                        $scope.showAddOneName = false;
                        $state.go("productClassNew");
                    }
                })
            }

        }]);
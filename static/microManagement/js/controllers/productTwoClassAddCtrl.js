angular.module('controllers',[]).controller('productTwoClassAddCtrl',
    ['$scope','$interval','$rootScope','$stateParams','$state','Global','$timeout','$http','ManagementUtil','FindProductDetail','addOneProductClass','imageBase64UploadToOSS','addTwoProductClass',
        function ($scope,$interval,$rootScope,$stateParams,$state,Global,$timeout,$http,ManagementUtil,FindProductDetail,addOneProductClass,imageBase64UploadToOSS,addTwoProductClass) {
             $scope.mess = false;

             $scope.url = "";
             $scope.twoClassName = "";
             $scope.id =  $stateParams.productClassId;


            $scope.backList = function(){
                $state.go("productTwoClassNew",{productClassId:$scope.id});
            }

            /*添加二级分类*/
            $scope.addTwoProductClass = function () {
                $scope.twoClassName = $("#productClassName").val();
                $scope.id =  $stateParams.productClassId;
                addTwoProductClass.get({
                    className: $scope.twoClassName,
                    parentId: $scope.id,
                    url: $scope.url
                }, function (data) {
                    if (data.result == Global.FAILURE) {
                        alert(data.errorInfo);
                    } else {
                        alert("成功");
                        $scope.backList();
                    }
                })
            }

            $scope.reader = new FileReader();   //创建一个FileReader接口
            $scope.thumb = "";      //用于存放图片的base64
            $scope.img_upload = function (files) {
                var file = files[0];
                if (window.FileReader) {
                    var fr = new FileReader();
                    fr.onloadend = function (e) {
                        $scope.thumb = e.target.result
                        imageBase64UploadToOSS.save($scope.thumb, function (data) {
                            if (data.result == "0x00001") {

                            }
                            $scope.url = data.responseData//图片地址
                        })
                    };
                    fr.readAsDataURL(file);
                } else {
                    alert("浏览器不支持")
                }

            };


        }]);
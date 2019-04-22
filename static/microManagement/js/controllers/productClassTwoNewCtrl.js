angular.module('controllers', []).controller('productClassTwoNewCtrl',
    ['$scope', '$interval', '$rootScope', '$stateParams', '$state', 'Global', '$timeout', 'QueryUserIncomeByParameters'
        , 'ManagementUtil', 'getTwoProductClassList','upOrDownProductClass','upOrDownProductClass','delProductClassById','updateProductClass',
        function ($scope, $interval, $rootScope, $stateParams, $state, Global, $timeout, QueryUserIncomeByParameters
            , ManagementUtil, getTwoProductClassList,upOrDownProductClass,upOrDownProductClass,delProductClassById,updateProductClass) {


             $scope.productClassId = $stateParams.productClassId;
             $scope.twoList = [];

            /*修改类别名称信息*/
            $scope.classTypeInfo =
                {
                    desc:"修改二级类别的名称",
                    className:"",
                    id:"",
                    updateClassType:false
                }

            /*点击修改类目信息*/
            $scope.updateProductClassInfower = function (id, productClassName) {
                $scope.classTypeInfo.className = productClassName
                $scope.classTypeInfo.id = id
                $scope.classTypeInfo.updateClassType = true
            }

            $scope.updateClassTypeInfo = function () {
                alert("成功")
                updateProductClass.get({className:$scope.classTypeInfo.className,id:$scope.classTypeInfo.id},function (data) {
                    $scope.loadPageList()
                })
            }


              $scope.loadPageList = function () {

                  getTwoProductClassList.get({productClassId: $scope.productClassId}, function (data) {
                      if(null == data .responseData){
                          alert("无下级");
                      }
                      $scope.twoList = data.responseData;
                  })
              };

            $scope.back = function(){
                $state.go("productClassNew");
            }
        

            $scope.addTwoProductClass = function(){
                $state.go("productTwoClassAdd",{productClassId:$scope.productClassId});
            }

            /*上移*/
            $scope.upClass = function (id,oneAndTwo) {
                upOrDownProductClass.get({
                    id: id,
                    upAndDown: "up"
                }, function (data) {
                    if (data.result == Global.FAILURE) {
                        alert(data.errorInfo);
                    } else {
                        alert("上移成功");
                        if('one'== oneAndTwo){
                            $scope.loadPageList();
                        }else {
                            $scope.loadPageList();
                        }
                    }
                })
            }

            /*下移*/
            $scope.downClass = function (id,oneAndTwo) {
                upOrDownProductClass.get({
                    id: id,
                    upAndDown: "down"
                }, function (data) {
                    if (data.result == Global.FAILURE) {
                        alert(data.errorInfo);
                    } else {
                        alert("下移成功");
                        if('one'== oneAndTwo){
                            $scope.loadPageList();
                        }else {
                            $scope.loadPageList();
                        }
                    }
                })
            }

            /*编辑二级类目*/
            $scope.updateTwoProductClass = function (twoClassId, twoClassName,updateUrl) {
                updateProductClass.get({
                    id: twoClassId,
                    className: twoClassName,
                    url:updateUrl
                }, function (data) {
                    if (data.result == Global.FAILURE) {
                        alert(data.errorInfo);
                    } else {
                        alert("成功");
                        $scope.loadPageList();
                    }
                })
            }

            /*删除*/
            $scope.delClass = function (id,oneAndTwo) {
                delProductClassById.get({
                    id: id
                }, function (data) {
                    if (data.result == Global.FAILURE) {
                        alert(data.errorInfo);
                    } else {
                        alert("成功");
                        if('one'== oneAndTwo){
                            $scope.loadPageList();
                        }else {
                            $scope.loadPageList();
                        }
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



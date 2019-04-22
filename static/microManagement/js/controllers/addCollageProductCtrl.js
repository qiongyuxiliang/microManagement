angular.module('controllers',[]).controller('addCollageProductCtrl',
    ['$scope','$interval','$rootScope','$stateParams','$state','Global','$timeout','$http','ManagementUtil','FindProductDetail','AddCollageActivity',
        function ($scope,$interval,$rootScope,$stateParams,$state,Global,$timeout,$http,ManagementUtil,FindProductDetail,AddCollageActivity) {
             $scope.mess = false;
             $scope.SeckillActivityDTO={
                 activityName:"",
                 productId:"",
                 startTime:"",
                 endTime:"",
                 favorablePrice:"",
                 activityNum:"",
                 collageNum:3,
                 isEnable:"",
                 productType:"",
                 productDTOList:[]
            };

            $scope.backList = function(){
                $state.go("collageProduct");
            }

            $scope.getProductDetail = function(){
                var productId = $("#productId").val();
                FindProductDetail.get({
                    productId:productId
                },function(data){
                    if(data.result==Global.SUCCESS){
                        $scope.SeckillActivityDTO.productDTOList = data.responseData;
                    }else{
                        alert("商品不存在或商品已下架，请添加商品。");
                    }

                })
            };

            $scope.delProduct = function(){
                $scope.SeckillActivityDTO.productDTOList =[];
            }

            $scope.submit = function(){
                $scope.SeckillActivityDTO.activityName = $("#activityName").val();
                $scope.SeckillActivityDTO.productId = $("#productId").val();
                $scope.SeckillActivityDTO.startTime = $("#startTime").val();
                $scope.SeckillActivityDTO.endTime = $("#endTime").val();
                $scope.SeckillActivityDTO.favorablePrice = $("#favorablePrice").val();
                $scope.SeckillActivityDTO.activityNum = $("#activityNum").val();
                $scope.SeckillActivityDTO.collageNum = $("#collageNum").val();
                $scope.SeckillActivityDTO.isEnable = $("#isEnable").val();
                $scope.SeckillActivityDTO.productType = $("#productType").val();
                if( $scope.SeckillActivityDTO.collageNum<2){
                    alert("参团人数不能低于2人")
                    return
                }
                if($scope.SeckillActivityDTO.favorablePrice==""||$scope.SeckillActivityDTO.activityNum==""||$scope.SeckillActivityDTO.isEnable==""||$scope.SeckillActivityDTO.endTime == ""||$scope.SeckillActivityDTO.startTime == ""||$scope.SeckillActivityDTO.productId == ""||$scope.SeckillActivityDTO.productNum == ""|| $scope.SeckillActivityDTO.activityName == ""){
                     $scope.mess = true;
                     return;
                }
                if($scope.SeckillActivityDTO.favorablePrice!= undefined  && $scope.SeckillActivityDTO.activityNum!=undefined){
                    AddCollageActivity.save($scope.SeckillActivityDTO,function(data){
                                if(data.result==Global.SUCCESS){
                                    if(data.result == "0x00001"){
                                        alert("新增成功!");
                                        $state.go("collageProduct");
                                    }else{
                                        alert("新增失败，请稍后重试！")
                                    }
                                }else{
                                    alert(data.errorInfo);
                                }
                    })
                }
            };
        }]);
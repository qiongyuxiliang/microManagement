angular.module('controllers',[]).controller('collageProductDetailCtrl',
    ['$scope','$interval','$rootScope','$stateParams','$state','Global','$timeout','$http','ManagementUtil','FindProductDetail','GetCollageActivityDetail','UpdateCollageActivity',
        function ($scope,$interval,$rootScope,$stateParams,$state,Global,$timeout,$http,ManagementUtil,FindProductDetail,GetCollageActivityDetail,UpdateCollageActivity) {
             $scope.mess = false;
             $scope.editable = $stateParams.editable == "true"?true:false;
             $scope.SeckillActivityDTO={
                 activityName:"",
                 productId:"",
                 startTime:"",
                 startTimeString:"",
                 endTime:"",
                 endTimeString:"",
                 favorablePrice:'',
                 activityNum:'',
                 productNum:"",
                 isEnable:"",
                 sessionList:[],
                 productDTOList:[]
            };
            $scope.GetCollageActivityDetail = function(){
                var id = $stateParams.id;
                GetCollageActivityDetail.get({id:id},
                    function(data){
                        if(data.result == Global.SUCCESS){
                            $scope.SeckillActivityDTO = data.responseData;
                            $("#productId").val($scope.SeckillActivityDTO.productId);
                            $scope.getProductDetail();
                            $("#activityName").val($scope.SeckillActivityDTO.activityName);
                            // $("#startTime").val($scope.SeckillActivityDTO.startTimeString);
                            // $("#endTime").val($scope.SeckillActivityDTO.endTimeString);
                            $("#isEnable").val($scope.SeckillActivityDTO.isEnable);
                            $("#collageNum").val($scope.SeckillActivityDTO.collageNum);
                            $("#favorablePrice").val($scope.SeckillActivityDTO.favorablePrice);
                            $("#activityNum").val($scope.SeckillActivityDTO.activityNum);
                        }
                    })
            };
            $scope.GetCollageActivityDetail();


            $scope.backList = function(){
                $state.go("collageProduct");
            };
            $scope.delProduct = function(){
                $scope.SeckillActivityDTO.productDTOList =[];
                $("#favorablePrice").val("");
                $("#activityNum").val("");
                $scope.SeckillActivityDTO.activityNum="";
                $scope.SeckillActivityDTO.favorablePrice="";
            }

            $scope.getProductDetail = function(){
                var productId = $("#productId").val();
                FindProductDetail.get({
                    productId:productId
                },function(data){
                    $scope.SeckillActivityDTO.productDTOList = data.responseData;

                })
                $("#favorablePrice").val($scope.SeckillActivityDTO.favorablePrice);
                $("#activityNum").val($scope.SeckillActivityDTO.activityNum);
            };

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
                if($scope.SeckillActivityDTO.favorablePrice==""||$scope.SeckillActivityDTO.activityNum==""||$scope.SeckillActivityDTO.isEnable==""||$scope.SeckillActivityDTO.endTime == ""||$scope.SeckillActivityDTO.startTime == ""||$scope.SeckillActivityDTO.productId == ""||$scope.SeckillActivityDTO.productNum == ""|| $scope.SeckillActivityDTO.activityName == ""){
                    $scope.mess = true;
                    return;
                }
                if($scope.SeckillActivityDTO.favorablePrice!= undefined  && $scope.SeckillActivityDTO.activityNum!=undefined){
                    UpdateCollageActivity.save($scope.SeckillActivityDTO,function(data){
                        if(data.result==Global.SUCCESS){
                            if(data.result == "0x00001"){
                                alert("修改成功!");
                                $state.go("collageProduct");
                            }else{
                                alert("修改失败，请稍后重试！")
                            }
                        }else{
                            alert(data.errorInfo);
                        }
                    })
                }
            };
        }]);
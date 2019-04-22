angular.module('controllers',[]).controller('bargainProductDetailCtrl',
    ['$scope','$interval','$rootScope','$stateParams','$state','Global','$timeout','$http','ManagementUtil','FindProductDetail','GetBargainActivityDetail','UpdateBargainActivity',
        function ($scope,$interval,$rootScope,$stateParams,$state,Global,$timeout,$http,ManagementUtil,FindProductDetail,GetBargainActivityDetail,UpdateBargainActivity) {
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
                 favorableSopeMin:'',
                 favorableSopeMax:'',
                 activityNum:'',
                 productNum:"",
                 isEnable:"",
                 sessionList:[],
                 productDTOList:[]
            };
            $scope.GetBargainActivityDetail = function(){
                var id = $stateParams.id;
                GetBargainActivityDetail.get({id:id},
                    function(data){
                        if(data.result == Global.SUCCESS){
                            $scope.SeckillActivityDTO = data.responseData;
                            $("#productId").val($scope.SeckillActivityDTO.productId);
                            $scope.getProductDetail();
                            $("#activityName").val($scope.SeckillActivityDTO.activityName);
                            // $("#startTime").val($scope.SeckillActivityDTO.startTimeString);
                            // $("#endTime").val($scope.SeckillActivityDTO.endTimeString);
                            $("#isEnable").val($scope.SeckillActivityDTO.isEnable);
                            $("#bargainNum").val($scope.SeckillActivityDTO.bargainNum);
                            $("#favorablePrice").val($scope.SeckillActivityDTO.favorablePrice);
                            $("#activityNum").val($scope.SeckillActivityDTO.activityNum);
                        }
                    })
            };
            $scope.GetBargainActivityDetail();


            $scope.backList = function(){
                $state.go("bargainProduct");
            };
            $scope.delProduct = function(){
                $scope.SeckillActivityDTO.productDTOList =[];
                $("#favorablePrice").val("");
                $("#activityNum").val("");
                $scope.SeckillActivityDTO.activityNum="";
                // $scope.SeckillActivityDTO.favorablePrice="";
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
                // $scope.SeckillActivityDTO.favorablePrice = $("#favorablePrice").val();
                $scope.SeckillActivityDTO.favorablePrice = $("#favorablePrice").val();
                $scope.SeckillActivityDTO.activityNum = $("#activityNum").val();
                $scope.SeckillActivityDTO.collageNum = $("#collageNum").val();
                $scope.SeckillActivityDTO.isEnable = $("#isEnable").val();
                $scope.SeckillActivityDTO.productType = $("#productType").val();
                if($scope.SeckillActivityDTO.favorableSopeMax==""||$scope.SeckillActivityDTO.favorableSopeMin==""||$scope.SeckillActivityDTO.isEnable==""||$scope.SeckillActivityDTO.endTime == ""||$scope.SeckillActivityDTO.startTime == ""||$scope.SeckillActivityDTO.productId == ""||$scope.SeckillActivityDTO.productNum == ""|| $scope.SeckillActivityDTO.activityName == ""){
                    $scope.mess = true;
                    return;
                }
                if($scope.SeckillActivityDTO.favorableSopeMax!= undefined  && $scope.SeckillActivityDTO.favorableSopeMin!= undefined  && $scope.SeckillActivityDTO.activityNum!=undefined){
                    UpdateBargainActivity.save($scope.SeckillActivityDTO,function(data){
                        if(data.result==Global.SUCCESS){
                            if(data.result == "0x00001"){
                                alert("修改成功!");
                                $state.go("bargainProduct");
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
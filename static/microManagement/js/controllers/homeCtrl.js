angular.module('controllers',[]).controller('homeCtrl',
    ['$scope','$interval','$rootScope','$stateParams','$state','Global','$timeout','ManagementUtil','QueryProductsByParameters','PutAwayProductById','DelProductById','GetUserInfo',
        function ($scope,$interval,$rootScope,$stateParams,$state,Global,$timeout,ManagementUtil,QueryProductsByParameters,PutAwayProductById,DelProductById, GetUserInfo) {

            $scope.productsName = "";
            $scope.productsId = "";
            $scope.homeIndex=-1;
            $scope.status = "";
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
            $scope.loadPageList = function(){

                $timeout(function(){
                    if(window.location.hash.indexOf("true") != -1 && pageTrue == true ){
                        $scope.pageNo = $stateParams.page;
                        $scope.status = $stateParams.status;
                        $scope.productsName= $stateParams.productsName;
                        $scope.productsId = $stateParams.productsId;
                        pageTrue = false;
                    }
                    $scope.PageParamVoDTO ={
                        pageNo:$scope.pageNo,
                        pageSize:$scope.pageSize,
                        requestData:{
                            status: $scope.status,
                            brand:"",
                            secondType:"",
                            productName: $scope.productsName,
                            productId:$scope.productsId,
                            type:"offline"
                        },
                        isExportExcel:"N"
                    };
                    QueryProductsByParameters.save($scope.PageParamVoDTO,function(data){
                        // ManagementUtil.checkResponseData(data,"");
                        $scope.getUser();
                        if(data.data.errorInfo == Global.SUCCESS){
                            if( data.data.totalCount ==0){
                                alert("未查出相应结果");

                            }
                            if(data.data.totalCount){
                                // console.log('llll')
                                var homeLis = data.data.data;
                            }else{
                                var homeLis = [];
                            }
                            if(homeLis!= undefined){
                                for(var i=0;i<homeLis.length;i++){
                                    if(homeLis[i].status == '1'){
                                        homeLis[i].status ="上架"
                                    }else if(homeLis[i].status == '0'){
                                        homeLis[i].status ="下架"
                                    }
                                }
                                $scope.allProducts = homeLis;
                                $scope.counnt='';
                                $scope.response = {};
                                $scope.response.count = data.data.totalCount;
                                $scope.pageSize = 5;
                                $scope.param.pageFrom = ($scope.pageNo-1)*$scope.pageSize+1;
                                $scope.param.pageTo = ($scope.pageNo-1)*$scope.pageSize+$scope.pageSize;
                                $scope.mum = false;
                            }
                        }
                    })
                },10);
                };

            /*全部 上架 下架 */
            $scope.upAndDownWay = function(type){
                $scope.active = "active active_w";
                $scope.pageNo=1;
                $scope.status = type;
                $scope.loadPageList();
                $scope.productsName = "";
                $scope.productsId = "";

            };

            /*搜索*/
            $scope.show = function(){
                $scope.choosePage(1);
            };

            /*状态的改变*/
            $scope.upAndDown = function(id,type,status){
                if(type == status)return;
                if(type=="下架"){
                    if (confirm("确认商品下架？")) {
                        DelProductById.get({
                            id:id
                        },function(data){
                            $scope.getUser();
                            // ManagementUtil.checkResponseData(data,"");
                            if(data.result == Global.SUCCESS){
                                $scope.loadPageList()
                            }
                        })
                    }
                }else{
                    if (confirm("确认商品上架？")) {
                        PutAwayProductById.get({
                            id:id
                        },function(data){
                            $scope.getUser();
                            // ManagementUtil.checkResponseData(data,"");
                            if(data.result == Global.SUCCESS){
                                $scope.loadPageList()
                            }
                        })
                    }

                }
            }


            $scope.educeLis = function(){
                $state.go('uploading')
                // if (confirm("确认要导出？")) {
                //     var PageParamVoDTO ={
                //         pageNo:$scope.pageNo,
                //         pageSize:$scope.pageSize,
                //         requestData:{
                //             status: $scope.status,
                //             brand:"",
                //             secondType:"",
                //             productName: $scope.productsName,
                //             productId:$scope.productsId,
                //             type:"offline"
                //         },
                //         isExportExcel:"Y"
                //     };
                //     QueryProductsByParameters.save(PageParamVoDTO,function(data){
                //             ManagementUtil.checkResponseData(data,"");
                //             if(data.errorInfo == Global.SUCCESS){
                //                 var $eleForm = $("<form method='get'></form>");
                //                 $eleForm.attr("action",data.result);
                //                 $(document.body).append($eleForm);
                //                 $eleForm.submit();
                //                 $scope.loadPageList();
                //             }
                //         })
                //     }
            }
}]);
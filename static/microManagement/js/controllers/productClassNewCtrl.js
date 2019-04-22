angular.module('controllers', []).controller('productClassNewCtrl',
    ['$scope', '$interval', '$rootScope', '$stateParams', '$state', 'Global', '$timeout', 'QueryUserIncomeByParameters'
        , 'ManagementUtil', 'GetIncomeRecordByPageParam', "CheckIncomeRecordManagement", 'QueryIncomeInfoByIncomeId'
        , 'ExportExcelIncomeRecord', 'MonthlyIncomeSignalMT', 'GetKey', 'GetUserInfo', 'GetIncomeShareActivityInfoByIncomeId'
        , 'FindOneProductClassList', 'getTwoProductClassList', 'addOneProductClass', 'addTwoProductClass', 'imageBase64UploadToOSS', 'upOrDownProductClass', 'delProductClassById', 'updateProductClass',
        function ($scope, $interval, $rootScope, $stateParams, $state, Global, $timeout, QueryUserIncomeByParameters
            , ManagementUtil, GetIncomeRecordByPageParam, CheckIncomeRecordManagement, QueryIncomeInfoByIncomeId
            , ExportExcelIncomeRecord, MonthlyIncomeSignalMT, GetKey, GetUserInfo, GetIncomeShareActivityInfoByIncomeId,
                  FindOneProductClassList, getTwoProductClassList, addOneProductClass, addTwoProductClass, imageBase64UploadToOSS, upOrDownProductClass, delProductClassById, updateProductClass) {
            var startTime = document.querySelector(".MStart");
            var endTime = document.querySelector(".MEnd");
            var pattern = /^1[34578]\d{9}$/;
            var pattern1 = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
            $scope.MAccount = "";
            $scope.agencyIndex = -1;
            $scope.checkStatus = "";
            $scope.key = "";
            $scope.value = "false";
            $scope.mum = true;
            /*var pageTrue = true;*/
            $scope.auditFlag = false;
            $scope.shareActivityFlag = false;

            $scope.productClassDataList =[];


            $scope.showAddTwoName = false;
            $scope.showAddOneName = false;

            /*修改类别名称信息*/
            $scope.classTypeInfo =
            {
                desc:"修改一级类别的名称",
                className:"",
                id:"",
                updateClassType:false
            }
            
            /*点击修改类目信息*/
            $scope.updateProductClassInfo = function (id, productClassName) {
                $scope.classTypeInfo.className = productClassName
                $scope.classTypeInfo.id = id
                $scope.classTypeInfo.updateClassType = true
            }

            $scope.updateClassTypeInfo = function () {
                updateProductClass.get({className:$scope.classTypeInfo.className,id:$scope.classTypeInfo.id},function (data) {
                    alert("成功")
                    $scope.loadPageList()
                })
            }


            /*点击添加二级类目按钮,所需传父级id和父级name*/
            $scope.parentId = "";
            $scope.parentName = "";
            /*点击修改一级类目按钮*/
            $scope.oneClassId = "";
            $scope.oneClassName = "";
            /**/
            $scope.productClassId = "";

             $scope.loadPageList = function(){

                $scope.PageParamVoDTO = {
                        pageNo:$scope.pageNo,
                        pageSize:$scope.pageSize,
                        isExportExcel:"Y",
                        requestData: {
                           productClassName : $("#productClassName").val(),
                           type : $("#type").val()
                        },
                    };

                FindOneProductClassList.save(
                    $scope.PageParamVoDTO
                ,function(data){
                    ManagementUtil.checkResponseData(data,"");
                    if(data.result == Global.SUCCESS){
                        if( data.responseData.totalCount ==0){
                            alert("未查出相应结果");
                        }

                        $scope.productClassDataList = data.responseData.responseData;
                        $scope.response = {
                        };
                        $scope.response.count = data.responseData.totalCount;
                        $scope.pageSize = 5;
                        $scope.param.pageFrom = ($scope.pageNo-1)*$scope.pageSize+1;
                        $scope.param.pageTo = ($scope.pageNo-1)*$scope.pageSize+$scope.pageSize;
                    }
                })
                $scope.mum = false
             }

              $scope.searchProductClass = function(){
                   $scope.choosePage(1)
                  $scope.classTypeInfo.updateClassType = false
              };



            /*点击空白,隐藏*/
            $scope.bgAll = function () {
                $scope.showFlag = false;
            }



            $scope.showTwoProductClass = function(productClassId,productClassName){

                $state.go("productTwoClassNew",{productClassId:productClassId,productClassName:productClassName});
            }

            /*添加一级分类*/
            $scope.addOneProductClass = function () {

               $state.go("productClassAdd");
            }

            /*添加二级分类*/
            $scope.addTwoProductClass = function (id, twoClassName, url) {
                addTwoProductClass.get({
                    parentId: id,
                    className: twoClassName,
                    url: url
                }, function (data) {
                    if (data.result == Global.FAILURE) {
                        alert(data.errorInfo);
                    } else {
                        alert("成功");
                        $scope.showAddTwoName = false;
                        $scope.loadPageList();
                    }
                })
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
                            // $scope.getOneProductClassList();
                            $scope.loadPageList();
                        }else {
                            // $scope.getTwoProductClassList($scope.productClassId);
                            $scope.loadPageList();
                        }
                    }
                })
            }
            /*编辑一级类目*/
            $scope.updateClass = function (oneClassName) {
                updateProductClass.get({
                    id: $scope.oneClassId,
                    className: oneClassName,
                    url:"one"
                }, function (data) {
                    if (data.result == Global.FAILURE) {
                        alert(data.errorInfo);
                    } else {
                        alert("成功");
                        // $scope.getOneProductClassList();
                        $scope.loadPageList();
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
                        $scope.showUpdateTwoName = false;
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
                            // $scope.getOneProductClassList();
                            $scope.loadPageList();
                        }else {
                            // $scope.getTwoProductClassList($scope.productClassId);
                            $scope.loadPageList();
                        }
                    }
                })
            }

            /*点击查看按钮*/
            $scope.showFlag = ""
            $scope.details = function (productClassId) {
                $scope.showFlag = productClassId;
                $scope.productClassId = productClassId;
                $scope.mum = true;
                $scope.showUpdateOneName = false;
                $scope.showAddOneName = false;
                $scope.showAddTwoName = false;
                $scope.showUpdateTwoName = false;
                getTwoProductClassList.get({productClassId: productClassId}, function (data) {
                    $scope.mum = false;
                    if(null == data .responseData){
                        alert("无下级");
                    }
                    $scope.twoList = data.responseData;
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



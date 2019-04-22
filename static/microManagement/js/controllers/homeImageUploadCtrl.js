/**
 * Created by Administrator on 2018/1/11.
 */
angular.module('controllers', []).controller('homeImageUploadCtrl',
    ['$scope', '$interval', '$rootScope', '$stateParams', '$state', 'Global', '$timeout', '$http', 'ExportNextUserInfoControl', 'UpdateIncomeRecordStatusById', '$filter', 'ManagementUtil', 'FindHomeBannerInfoById', 'UpdateHomeBanner', 'AddHomeBanner',
        function ($scope, $interval, $rootScope, $stateParams, $state, Global, $timeout, $http, ExportNextUserInfoControl, UpdateIncomeRecordStatusById, $filter, ManagementUtil, FindHomeBannerInfoById, UpdateHomeBanner, AddHomeBanner) {

            $scope.showImage = true;

            $scope.imageType = "banner";

            $scope.back = function () {
                $state.go("homePageEditor");
            };
            $scope.bannerDTO = {
                bannerType: "",
                uri: "",
                bannerRank: "",
                uri: "",
                forward: "",
                bannerId: ""
            };

            var tempPic = $stateParams.uri;
            $scope.loadPageList = function () {
                $("#imageType").val($stateParams.bannerType);
                // $("#sequence").val($stateParams.bannerRank);
                $("#imageUrl").val($stateParams.forward);
                // $scope.tag=$stateParams.bannerType;
                $scope.imageSrc = $stateParams.uri;
                if (!$stateParams.bannerType) {
                    $scope.showImage = false;
                }
            };
            $scope.uploadImageInfo = function (arr) {
                client = new OSS({
                    region: 'oss-cn-beijing',
                    accessKeyId: 'LTAIb4h9l1BwE8Q0',
                    accessKeySecret: 'WbkK02CBKig0XAqI9DyjwGLATNdykk',
                    bucket: 'mximage',
                });
                /*上传文件*/
                if (!arr.length) {
                    return new Promise(function (resolve, reject) {
                        resolve('无图片可上传')
                    })
                }
                var f = arr[0];
                var na = f.name;
                //获取源文件名
                var date = new Date();
                var time = '' + date.getFullYear();
                var storeAs = 'microBuiness/images/' + time + '/' + date.getTime() + '.' + na;
                return client.put(storeAs, f).then(function (result) {
                    return result.url;
                }).then(function (data) {
                    $scope.bannerDTO.uri = data;
                })
            }

            function remove(name, picArr, id, div) {
                var img = document.querySelectorAll(name);
                var patter = document.querySelector(id);
                var div = document.querySelectorAll(div);
                $timeout(function () {
                    console.log(img)
                }, 0)
                for (var i = 0; i < img.length; i++) {
                    img[i].onclick = function () {
                        change(this);
                    }
                }

                function change(obj) {
                    for (var i = 0; i < img.length; i++) {
                        if (img[i] == obj) {
                            if (id != "#publicityPic") {
                                $scope.bannerDTO.productDetail[picArr].splice(i, 1);
                            } else {
                                $scope.bannerDTO.firstUrl = ''
                            }
                            patter.removeChild(div[i]);
                            if ($scope.bannerDTO.firstUrl == "") {
                                $scope.hintPic1 = "";
                            }
                            remove("#publicityPic .falsePic", "firstUrl", "#publicityPic", "#publicityPic div");
                        }
                    }
                }
            }

            //上传图片
            $scope.hintPic1 = "";
            $scope.hintPic2 = "";
            var arr = [];
            var copyArr = new Array();
            $scope.uploadingPic = function (id, big) {
                var input = document.getElementById(id);
                var big1 = document.getElementById(big);
                var result, div;
                if (typeof FileReader === 'undefined') {
                    result.innerHTML = "抱歉，你的浏览器不支持 FileReader";
                    input.setAttribute('disabled', 'disabled');
                } else {
                    input.addEventListener('change', readFile, false);
                }

                function readFile() {

                    var as = big1.querySelectorAll('.as');
                    if (id == "particulars_view") {
                        $scope.hintPic2 = "";
                    } else if (id == "publicity") {
                        $scope.hintPic1 = "";

                        for (var i = 0; i < as.length; i++) {
                            big1.removeChild(as[i])
                        }
                    }
                    for (var i = 0; i < this.files.length; i++) {
                        if (!input['value'].match(/.jpg|.gif|.png|.bmp/i)) {
                            return alert("上传的图片格式不正确，请重新选择")
                        }
                        var reader = new FileReader();


                        arr[0] = this.files[i];
                        copyArr[0] = $stateParams.uri;
                        reader.readAsDataURL(this.files[i]);
                        reader.onload = function (e) {
                            result = '<img src="' + this.result + '" alt=""/>';
                            div = document.createElement('div');
                            div.className = "as";
                            var img1 = document.createElement('img');
                            img1.src = "images/cha.png";
                            img1.className = "falsePic";
                            div.innerHTML = result;
                            div.appendChild(img1);
                            big1.appendChild(div);
                            remove("#publicityPic .falsePic", "firstUrl", "#publicityPic", "#publicityPic div");
                        }
                    }
                }
            };

            $scope.uploadingPic("publicity", "publicityPic", "firstUrl");
            $scope.submit = function () {
                $scope.bannerDTO.bannerType = $("#imageType").val();
                $scope.bannerDTO.forward = $("#imageUrl").val();
                // $scope.bannerDTO.uri = $scope.bannerDTO.uri.toString();
                $scope.bannerDTO.bannerRank = $("#sequence").val();
                if ($scope.bannerDTO.bannerRank == "") {
                    alert("存在必填项，没有填写，请填写后在提交");
                    return;
                } else if (!$scope.bannerDTO.bannerType) {
                    alert("存在必填项，没有填写，请填写后在提交");
                    return;
                } else {
                    $scope.uploadImageInfo(arr).then(function (data) {
                        if (copyArr) {
                            /*删除图片逻辑*/
                            client = new OSS({
                                region: 'oss-cn-beijing',
                                accessKeyId: 'LTAIb4h9l1BwE8Q0',
                                accessKeySecret: 'WbkK02CBKig0XAqI9DyjwGLATNdykk',
                                bucket: 'mximage',
                            });
                            client.delete(decodeURIComponent(arr[0]).split('http://mximage.oss-cn-beijing.aliyuncs.com/')[1]).then(function (data) {
                                console.log(data)
                            })
                        }
                        if (!$scope.showImage) {
                            /*新建首页图片*/
                            AddHomeBanner.save({
                                bannerType: $scope.bannerDTO.bannerType,
                                bannerRank: $scope.bannerDTO.bannerRank,
                                uri: $scope.bannerDTO.uri,
                                forward: $scope.bannerDTO.forward
                            }, function (data) {
                                if (data.result == Global.SUCCESS) {
                                    $state.go('homePageEditor');
                                }
                            })
                        } else if ($scope.showImage) {

                            UpdateHomeBanner.save({
                                bannerType: $("#imageType").val(),
                                forward: $("#imageUrl").val(),
                                uri: $scope.bannerDTO.uri,
                                bannerId: $stateParams.bannerId,
                            }, function (data) {
                                if (data.result == Global.SUCCESS) {
                                    $state.go('homePageEditor');
                                }
                            })
                        }
                    })
                }
            }

            //图片上传失败
            function delError(id) {
                if (id == "publicity") {
                    remove("#publicityPic .falsePic", "firstUrl", "#publicityPic", "#publicityPic div");
                }

            }

        }]);
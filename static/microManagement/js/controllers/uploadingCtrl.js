angular.module('controllers', []).controller('uploadingCtrl',
    ['$scope', '$interval', '$rootScope', '$stateParams', '$state', 'Global', '$timeout', 'ImageUploadToOSS', "$http", 'AddOfflineProduct', '$filter', 'ManagementUtil','GetUserInfo',
        'getProductClassListById', 'getOneProductClassList', 'getTwoProductClassList',
        function ($scope, $interval, $rootScope, $stateParams, $state, Global, $timeout, ImageUploadToOSS, $http, AddOfflineProduct, $filter, ManagementUtil
            , getProductClassListById, getOneProductClassList, getTwoProductClassList,GetUserInfo) {
            var status = document.querySelector("#status");
            var postage = document.querySelector("#postage");
            var service = document.querySelectorAll(".service input[type='checkbox']");
            var serviceText = document.querySelectorAll(".service p label");
            var address1 = document.querySelector("#address");
            var description = document.querySelector(".description");
            $scope.mess = false;

            /*获取用户信息*/
            $scope.getUser = function () {
                GetUserInfo.get({}, function (data) {
                    ManagementUtil.checkResponseData(data,"");
                    $scope.userInfo = data.responseData;
                })
            }

            $scope.getUser();
            $scope.ProductDTO = {
                productId: '',
                productName: "",
                brand: "唯美度",
                type: "",
                secondType: "面膜",
                description: "",
                price: "",
                status: "",
                firstUrl: "",
                productPrefecture: "",
                productAmount: "",
                astrict: "",
                createDate: $filter("date")(Date.parse(new Date()), "yyyy-MM-dd HH:mm:ss"),
                productClassId: "",
                productDetail: {
                    listPic: [],
                    detailPic: [],
                    tag: [],
                    spec: [],
                    services: [],
                    senderAddress: "深圳地区发货",
                    productMarketPrice: "",
                    productSalesVolume: ""
                }
            };

            //获取一级类目列表
            // getOneProductClassList.save({}, function (data) {
            //     if (data.result == Global.SUCCESS) {
            //         $scope.mum = false;
            //         $scope.oneClassList = data.responseData
            //     }
            //
            // })
            /*根据id获取类目*/
            /* getProductClassListById.get({
                 id:$scope.ProductDTO.productClassId
             },function(data){
                 if (data.result == Global.SUCCESS) {
                     $scope.mum = false;
                     $scope.productlCass = data.responseData
                 }
             })*/

            /*查询二级类目数据*/
            $scope.checkTwo = function (item, level) {
                if (level == "one") {
                    getTwoProductClassList.get({productClassId: JSON.parse(item).productClassId}, function (data) {
                        $scope.mum = false;
                        $scope.twoClassLiat = data.responseData;
                        if (data.responseData == null) {
                            item = ""
                        }
                    })
                } else {
                    $scope.ProductDTO.productClassId = JSON.parse(item).id
                    $scope.ProductDTO.secondType = JSON.parse(item).productClassName
                }

            }
            /*查询二级类目数据*/
            $scope.queryAddressByCode = function (item) {
                alert("111");
            }

            $scope.upload = function () {
                $scope.getUser();
                if ($scope.hintPic1 == "" || $scope.hintPic2 == "" || $scope.hintPic3 == "") {
                    $scope.mess = false;
                    return;
                }
                var indexStatus = status.selectedIndex;
                $scope.ProductDTO.status = status.options[indexStatus].value;
                if (postage.checked == true) {
                    $scope.ProductDTO.productDetail.tag[0] = "包邮"
                } else {
                    $scope.ProductDTO.productDetail.tag[0] = "不包邮"
                }
                ;
                /*服务*/
                $scope.ProductDTO.productDetail.services = [];
                for (var j = 0; j < service.length; j++) {

                    if (service[j].checked == true) {
                        $scope.ProductDTO.productDetail.services[j] = serviceText[j].innerHTML
                    }
                }
                if ($scope.ProductDTO.productId == "" || $scope.ProductDTO.productName == "" ||
                    $scope.ProductDTO.brand == "" || $scope.ProductDTO.secondType == "" ||
                    $scope.ProductDTO.price == "" || $scope.ProductDTO.price == null ||
                    $scope.ProductDTO.status == "" || $scope.ProductDTO.productDetail.spec.length <= 0 ||
                    $scope.ProductDTO.productAmount == "" || $scope.ProductDTO.productDetail.productMarketPrice == "") {
                    $scope.mess = false;
                } else {
                    AddOfflineProduct.save($scope.ProductDTO, function (data) {
                        ManagementUtil.checkResponseData(data, "");
                        if (data.result == Global.SUCCESS) {
                            $state.go("home");
                        }
                    })
                }
            };

            /*删除图片*/
            function remove(name, picArr, id, div) {
                var img = document.querySelectorAll(name);
                var patter = document.querySelector(id);
                var div = document.querySelectorAll(div);
                for (let i = 0; i < img.length; i++) {
                    img[i].onclick = function () {
                        if (id == "#publicityPic") {

                            arr1.splice(i, 1)
                            change(this);
                        }
                        if (id == '#list_viewPic') {
                            arr2.splice(i, 1)
                            change(this);
                        }
                        if (id == '#particulars_viewPic') {
                            arr3.splice(i, 1)
                            change(this);
                        }
                    }
                }

                function change(obj) {
                    for (let i = 0; i < img.length; i++) {
                        if (img[i] == obj) {
                            if (id != "#publicityPic") {
                                $scope.ProductDTO.productDetail[picArr].splice(i, 1);
                            } else {
                                $scope.ProductDTO.firstUrl = ''
                                // arr1.length=0;
                            }

                            patter.removeChild(div[i]);
                            if ($scope.ProductDTO.firstUrl == "") {
                                $scope.hintPic3 = "";
                            }
                            if ($scope.ProductDTO.productDetail.listPic.length <= 0) {
                                $scope.hintPic1 = "";
                            }
                            if ($scope.ProductDTO.productDetail.detailPic.length <= 0) {
                                $scope.hintPic2 = "";
                            }
                            remove("#publicityPic .falsePic", "firstUrl", "#publicityPic", "#publicityPic div");
                            remove("#particulars_viewPic .falsePic", "detailPic", "#particulars_viewPic", "#particulars_viewPic div");
                            remove("#list_viewPic .falsePic", "listPic", "#list_viewPic", "#list_viewPic div");
                        }
                    }

                }
            }
            /*添加型号*/
            $scope.type = function () {
                $scope.flag = true;
            };
            $scope.typeTrue = function () {
                var col = document.querySelector(".col").value;
                $scope.flag = false;
                if (col == '') return;
                $scope.ProductDTO.productDetail.spec.push(col);
                document.querySelector(".col").value = ""
            };
            /*删除型号*/
            $scope.index = -1;
            $scope.delType = function (name, index) {
                $scope.index = index;
                $scope.colName = name;
                $scope.flagDel = true
            };
            $scope.typeDelTrue = function () {
                if ($scope.index > -1) {
                    $scope.ProductDTO.productDetail.spec.splice($scope.index, 1)
                }
                $scope.flagDel = false;
            };
            $scope.bgAll = function () {
                $scope.flag = false;
                $scope.flagDel = false
            };
            $scope.hintPic1 = "";
            $scope.hintPic2 = "";
            $scope.hintPic3 = "";
            var arr1 = [];
            var arr2 = [];
            var arr3 = [];
            //处理图片
            $scope.uploadingPic = function (id, big, type) {
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
                    if (id == "list_view") {
                        // $scope.hintPic1 = "";
                    } else if (id == "particulars_view") {
                        // $scope.hintPic2 = "";
                    } else if (id == "publicity") {
                        // $scope.hintPic3 = "";
                        for (var i = 0; i < as.length; i++) {
                            big1.removeChild(as[i])
                        }
                    }
                    len = this.files.length;
                    for (var i = 0; i < this.files.length; i++) {
                        if (!input['value'].match(/.jpg|.gif|.png|.bmp/i)) {
                            return alert("上传的图片格式不正确，请重新选择")
                        }
                        var reader = new FileReader();
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
                        }
                    }
                    var url = "/system/file/imageUploadToOSS";
                    if (id == "list_view") {
                        var ptoductType = "offlineProduct/";
                        for (var i = 0; i < this.files.length; i++) {
                            arr2.push(this.files[i])
                        }
                        $scope.hintPic1 = "images/true.png";
                        // $scope.ProductDTO.productDetail.listPic = $scope.ProductDTO.productDetail.listPic;
                        $timeout(function () {
                            remove("#list_viewPic .falsePic", "listPic", "#list_viewPic", "#list_viewPic div")
                        }, 200)

                    } else if (id == "particulars_view") {
                        var ptoductType = "offlineProduct/";
                        for (var i = 0; i < this.files.length; i++) {
                            arr3.push(this.files[i])
                        }
                        $scope.hintPic2 = "images/true.png";
                        $scope.ProductDTO.productDetail.detailPic = $scope.ProductDTO.productDetail.detailPic;
                        $timeout(function () {
                            remove("#particulars_viewPic .falsePic", "detailPic", "#particulars_viewPic", "#particulars_viewPic div");
                        }, 200)

                    } else if (id == "publicity") {
                        var ptoductType = "offlineProduct/";
                        arr1.length = 0;
                        arr1.push(this.files[0])
                        $scope.hintPic3 = "images/true.png";
                        $timeout(function () {
                            remove("#publicityPic .falsePic", "firstUrl", "#publicityPic", "#publicityPic div");
                        }, 200)

                    }
                    else {
                        alert("上传图片失败");
                        delError(id)
                    }
                }
            };
            $scope.uploadingPic("publicity", "publicityPic", "firstUrl");
            $scope.uploadingPic("list_view", "list_viewPic", "listPic");
            $scope.uploadingPic("particulars_view", "particulars_viewPic", "detailPic");
            $scope.sub = function () {
                client = new OSS({
                    region: 'oss-cn-beijing',
                    accessKeyId: 'LTAIb4h9l1BwE8Q0',
                    accessKeySecret: 'WbkK02CBKig0XAqI9DyjwGLATNdykk',
                    bucket: 'mximage',
                });
                up(arr1);
                up(arr2);
                up(arr3);
                /*上传图片*/
                function up(array) {
                    var len = array.length;
                    if(!len){
                        return;
                    }
                    for (let i = 0; i < len; i++) {
                        var f = array[i];
                        // console.log(f)
                        var na = f.name;
                        //获取源文件名
                        var date = new Date();
                        var time = '' + date.getFullYear();
                        storeAs = 'microBuiness/images/' + time + '/' + date.getTime() + '.' + na;
                        client.put(storeAs, f).then(function (result) {
                            if(array==arr2){
                                $scope.ProductDTO.productDetail.listPic=[];
                            }
                            if(array==arr3){
                                $scope.ProductDTO.productDetail.detailPic=[];
                            }
                            if (array == arr1 && result.res.statusCode == 200) {
                                $scope.ProductDTO.firstUrl = result.url;

                            } else if (array == arr1 && result.res.statusCode != 200) {
                                remove("#publicityPic .falsePic", "firstUrl", "#publicityPic", "#publicityPic div");

                            } else if (array == arr2 && result.res.statusCode == 200) {
                                $scope.ProductDTO.productDetail.listPic[i] = result.url;
                                console.log(result, $scope.ProductDTO.productDetail.listPic.length)
                            } else if (array == arr2 && result.res.statusCode != 200) {
                                remove("#list_viewPic .falsePic", "listPic", "#list_viewPic", "#list_viewPic div")

                            } else if (array == arr3 && result.res.statusCode == 200) {
                                $scope.ProductDTO.productDetail.detailPic[i] = result.url;
                                console.log(result, $scope.ProductDTO.productDetail.detailPic.length)
                                // console.log($scope.ProductDTO.firstUrl+'llss')
                            } else if (array == arr3 && result.res.statusCode != 200) {
                                remove("#particulars_viewPic .falsePic", "detailPic", "#particulars_viewPic", "#particulars_viewPic div");
                            }
                        }).catch(function (err) {
                            console.log(err);
                        });
                    }
                }
            }
            /*上传到数据库*/
            $scope.submit = function () {
                if ($scope.hintPic1 == "" || $scope.hintPic2 == "" || $scope.hintPic3 == "") {
                    $scope.mess = true;
                    return;
                }
                var indexStatus = status.selectedIndex;
                $scope.ProductDTO.status = status.options[indexStatus].value;
                if ($scope.ProductDTO.productId == "" || $scope.ProductDTO.productName == "" ||
                    $scope.ProductDTO.brand == "" || $scope.ProductDTO.secondType == "" ||
                    $scope.ProductDTO.price == "" || $scope.ProductDTO.price == null ||
                    $scope.ProductDTO.status == "" || $scope.ProductDTO.productAmount == "" ||
                    $scope.ProductDTO.productDetail.productMarketPrice == "") {
                    $scope.mess = true;
                }else{

                    $scope.sub();
                    $scope.timer = $interval(function () {
                        $scope.mum=true;
                        if ( $scope.ProductDTO.productDetail.listPic.length == arr2.length && $scope.ProductDTO.productDetail.detailPic.length == arr3.length&&$scope.ProductDTO.firstUrl != '' ) {
                            $scope.upload();
                            console.log('interal')
                        }
                    }, 50)
                }
            }
            $scope.upload = function () {
                $interval.cancel($scope.timer);
                var indexStatus = status.selectedIndex;
                $scope.ProductDTO.status = status.options[indexStatus].value;
                if (postage.checked == true) {
                    $scope.ProductDTO.productDetail.tag[0] = "包邮"
                } else {
                    $scope.ProductDTO.productDetail.tag[0] = "不包邮"
                };
                /*服务*/
                // $scope.ProductDTO.productDetail.services=[];
                // for(var j=0;j<service.length;j++){
                //
                //     if(service[j].checked == true){
                //         $scope.ProductDTO.productDetail.services[j]=serviceText[j].innerHTML
                //     }
                // }
                $scope.ProductDTO.type = 'offline'
                    AddOfflineProduct.save($scope.ProductDTO, function (data) {
                        $scope.getUser();
                        if (data.errorInfo == Global.FAILURE) {
                            alert(data.err)
                            client = new OSS({
                                region: 'oss-cn-beijing',
                                accessKeyId: 'LTAIb4h9l1BwE8Q0',
                                accessKeySecret: 'WbkK02CBKig0XAqI9DyjwGLATNdykk',
                                bucket: 'mximage',
                            });
                            var s = new Array();
                            s.length = 1;
                            s[0] = $scope.ProductDTO.firstUrl;
                            var arr = s.concat($scope.ProductDTO.productDetail.listPic, $scope.ProductDTO.productDetail.detailPic)
                            // console.log(arr)
                            for (let i = 0; i < arr.length; i++) {
                                client.delete(decodeURIComponent(arr[i]).split(' http://mximage.oss-cn-beijing.aliyuncs.com/')[1]).then(function (data) {
                                    console.log(data)
                                })
                            }
                        }
                        ManagementUtil.checkResponseData(data, "");
                        if (data.errorInfo == Global.SUCCESS) {
                            $scope.mum=false;
                            alert('添加商品成功，跳转到商品页')
                            $state.go("home");
                        }
                    })

            };
        }]);
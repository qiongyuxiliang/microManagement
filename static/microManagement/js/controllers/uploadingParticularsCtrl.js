angular.module('controllers', []).controller('uploadingParticularsCtrl',
    ['$scope', '$interval', '$rootScope', '$stateParams', '$state', 'Global', '$timeout'
        , 'FindProductById', 'ImageUploadToOSS', '$http', 'UpdateProductByParameters'
        , 'ManagementUtil', 'getProductClassListById', 'getOneProductClassList', 'getTwoProductClassList',
        function ($scope, $interval, $rootScope, $stateParams, $state, Global, $timeout
            , FindProductById, ImageUploadToOSS, $http, UpdateProductByParameters
            , ManagementUtil, getProductClassListById, getOneProductClassList, getTwoProductClassList) {
            $scope.flag = false;
            $scope.flagDel = false;
            var postage = document.querySelector("#postage");
            var serve = document.querySelectorAll(".serve input[type='checkbox']");
            var serveText = document.querySelectorAll(".serve p label");
            var serveTextArr = [];
            $scope.mum = true;
            for (var i = 0; i < serveText.length; i++) {
                serveTextArr.push(serveText[i].innerHTML)
            }
            $scope.param = {
                // twoCheck:"",
                productName: "",
                brand: "",
                productId: "",
                lPrice: "",
                price: "",
                stock: "",
                desription: "",

            }
            $scope.checkTwoFlag = false;
            $scope.checkTwoFlagFn = function () {
                $scope.checkTwoFlag = true;
            }
            //获取一级类目列表
            // getOneProductClassList.save({}, function (data) {
            //     if (data.result == Global.SUCCESS) {
            //         $scope.mum = false;
            //         $scope.oneClassList = data.responseData
            //     }
            // })
            $scope.param.secondType = "";
            /*查询二级类目数据*/
            $scope.checkTwo = function (bar, level) {
                if (level == "one") {
                    $scope.checkTwoFlag = true
                    getTwoProductClassList.get({productClassId: bar}, function (data) {
                        $scope.mum = false;
                        $scope.twoClassLiat = data.responseData;
                        if (data.responseData == null) {
                            bar = ""
                        }
                    })
                } else {
                    $scope.productClassId = JSON.parse(bar).id;
                    $scope.uploadingPar.secondType = JSON.parse(bar).productClassName
                }

            }

            /*展示*/
//             $scope.deepClone = function (data) {
//                 if (!data | !(data instanceof Object) | (typeof data == "function")) {
//                     return data || undefined;
//                 }
//                 var constructor = data.constructor;
//                 var result = new constructor();
//                 for (var key in data) {
//                     if (data.hasOwnProperty(key)) {
//                         result[key] = $scope.deepClone(data[key]);
//                     }
//                 }
//                 return result;
//             }
            FindProductById.get({
                productId: $stateParams.productId
            }, function (data) {
                ManagementUtil.checkResponseData(data, "");
                if (data.result == Global.SUCCESS) {
                    // console.log(data.data)
                    $scope.uploadingPar = data.data;
                    // $scope.global = $scope.deepClone(data.data);
                    $scope.param.productName = $scope.uploadingPar.name;
                    $scope.param.brand = $scope.uploadingPar.brand;
                    $scope.param.productId = $scope.uploadingPar.product_id;
                    $scope.param.price = $scope.uploadingPar.price;
                    $scope.param.productAmount = $scope.uploadingPar.product_amount;
                    $scope.param.description = $scope.uploadingPar.description;
                    $scope.param.twoCheck = $scope.param.secondType + "," + $scope.param.twoId

                    if (data.data.productDetail) {
                        pic(data, "#particulars_viewPic", "detailPic");
                        pic(data, "#list_viewPic", "listPic");
                        pic(data, "#publicityPic", "first_url");
                        remove("#list_viewPic ", "listPic");
                        remove("#particulars_viewPic ", "detailPic");
                        remove("#publicityPic ", "firstUrl");
                        $scope.init(".states option", "status", 0, "");
                        if ($scope.uploadingPar.productDetail.services != undefined) {
                            for (var j = 0; j < $scope.uploadingPar.productDetail.services.length; j++) {
                                var num = serveTextArr.indexOf($scope.uploadingPar.productDetail.services[j]);
                                if (num >= 0)
                                    serve[num].setAttribute("checked", "checked")
                            }
                        }
                        if ($scope.uploadingPar.productDetail.tag[0] == "包邮") {
                            postage.setAttribute("checked", "checked")
                        }
                        if ($scope.uploadingPar.productDetail.listPic.length >= 1) {
                            $scope.hintPic1 = "images/true.png"
                        }
                        if ($scope.uploadingPar.productDetail.detailPic.length >= 1) {
                            $scope.hintPic2 = "images/true.png"
                        }
                        if ($scope.uploadingPar.first_url.length != "") {
                            $scope.hintPic3 = "images/true.png"
                        }
                    }
                    $scope.mum = false;
                }
            });
            /*添加图片*/
            /*定义三个数组用于存储将要上传的图片*/
            var arr1 = [];
            var arr2 = [];
            var arr3 = [];
            var arr11=[];
            var arr21=[];
            var arr31=[];/*保留不变的url*/
            var arr1del=[];
            var arr2del=[];
            var arr3del=[];
            function pic(dat, name, picName) {
                var listPic = []
                var big = document.querySelector(name);
                if (dat.data.productDetail) {
                    if (picName == "first_url") {
                        listPic[0] = dat.data[picName];
                        arr11 = dat.data[picName]

                    } else {
                        listPic = dat.data.productDetail[picName];
                        if (picName == "listPic") {
                            arr21 = dat.data.productDetail[picName]
                        } else if (picName == "detailPic") {
                            arr31 = dat.data.productDetail[picName]
                        }
                    }
                    for (var i = 0; i < listPic.length; i++) {
                        var div = document.createElement('div');
                        div.className = "as";
                        var img = document.createElement('img');
                        var img1 = document.createElement('img');
                        img1.src = "images/cha.png";
                        img1.className = "falsePic";
                        img.src = listPic[i];
                        div.appendChild(img1);
                        div.appendChild(img);
                        big.appendChild(div);
                    }
                }
            }

            /*删除图片*/
            function remove(id, name, index) {
                var patter = document.querySelector(id);
                var img = patter.querySelectorAll(".falsePic");
                var div = patter.getElementsByTagName("div");
                for (var i = 0; i < img.length; i++) {
                    img[i].onclick = function () {
                        change(this)
                    }
                }

                function change(obj) {
                    for (var i = 0; i < img.length; i++) {
                        if (img[i] == obj) {
                            id = id.replace(/\s+/g, "");
                            if (id != "#publicityPic") {
                                // $scope.uploadingPar.productDetail[name].splice(i, 1);
                                if (id != "#list_viewPic") {
                                    arr3del.push(arr31.splice(i, 1)[0]);
                                } else {
                                    arr2del.push(arr21.splice(i, 1)[0]);
                                }
                            } else {
                                // $scope.uploadingPar.first_url = '';
                                arr1del=[arr11]
                                console.log(arr1del)

                            }
                            patter.removeChild(div[i]);
                            remove("#publicityPic", "firstUrl");
                            remove("#particulars_viewPic", "detailPic");
                            remove("#list_viewPic ", "listPic");
                            if ($scope.uploadingPar.first_url == "") {
                                $scope.hintPic3 = "";

                            }
                            if ($scope.uploadingPar.productDetail.listPic.length < 1) {
                                $scope.hintPic1 = "";

                            }
                            if ($scope.uploadingPar.productDetail.detailPic.length < 1) {
                                $scope.hintPic2 = "";

                            }
                        }
                    }
                }
            }


            /*下拉菜单的默认值*/
            $scope.init = function (options, property, type, address) {
                var addresss = document.querySelectorAll(options);
                if (type == 0) {
                    var address = $scope.uploadingPar[property]
                } else {
                    var address = $scope.uploadingPar[property][address]
                }
                for (var i = 0; i < addresss.length; i++) {
                    if (addresss[i].value == address) {
                        addresss[i].setAttribute("selected", "selected");
                    }
                }
            };
            /*添加型号*/

            $scope.type = function () {
                $scope.flag = !$scope.flag;
            };
            $scope.typeTrue = function () {
                var col = document.querySelector(".col").value;
                $scope.flag = false;
                if (col == '') return;
                $scope.uploadingPar.productDetail.spec.push(col);
                document.querySelector(".col").value = ""
            };
            /*删除型号*/
            $scope.index = -1;
            $scope.delType = function (name, index) {
                $scope.index = index;
                $scope.colName = name;
                $scope.flagDel = !$scope.flagDel;
            };
            $scope.typeDelTrue = function (index) {
                if (index == 0) {
                    if ($scope.index > -1) {
                        $scope.uploadingPar.productDetail.spec.splice($scope.index, 1)
                    }
                    $scope.flagDel = false;
                } else {
                    if ($scope.index > -1) {
                        $scope.uploadingPar.productDetail.spec.splice($scope.index, 1, $scope.colName)
                    }
                    $scope.flagDel = false;

                }

            };
            $scope.bgAll = function () {
                $scope.flag = false;
                $scope.flagDel = false
            };
            /*服务*/

            /*上传图片*/
            $scope.hintPic1 = "";
            $scope.hintPic2 = "";
            $scope.hintPic3 = "";
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

                    if(id=="list_view"){
                        $scope.hintPic1="";
                    }else if(id=="particulars_view"){
                        $scope.hintPic2="";
                    }else if(id=="publicity"){
                        $scope.hintPic3="";
                        for(var i=0;i<as.length;i++){
                            big1.removeChild(as[i])
                        }
                    }
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
                    // var ptoductType = "offlineProduct/";
                    // var MultipartFile = new FormData();
                    // MultipartFile.append("folder",ptoductType);
                    for (var i = 0; i < this.files.length; i++) {
                        var reader = new FileReader();
                        reader.readAsDataURL(this.files[i]);
                        // MultipartFile.append("listFile",this.files[i]);
                        if (id == "list_view") {
                            arr2.push(this.files[i])
                        } else if (id == "particulars_view") {
                            arr3.push(this.files[i])
                        } else if (id == "publicity") {
                            arr1 = [this.files[i]];
                        }
                    }
                }
            };
            $scope.uploadingPic("list_view", "list_viewPic");
            $scope.uploadingPic("particulars_view", "particulars_viewPic");
            $scope.uploadingPic("publicity", "publicityPic");

            $scope.mess = false;
            var k=0;
            var u=0;/*计数器*/
            $scope.sub = function () {

                client = new OSS({

                    region: 'oss-ap-northeast-1',
                    accessKeyId: 'LTAIVnNG2cTRCJyz',
                    accessKeySecret: 'droqBD9xxlro8gYlkVlW8lamThIsrA',
                    bucket: 'zhangzhenchuan',
                });

                up(arr1);
                up(arr2);
                up(arr3);
                console.log(arr1del,arr2del,arr3del)
                // console.log(arr11,arr21,arr31)
                function up(array) {
                    // console.log(array)
                    var len = array.length;
                    if(!len){
                        return;
                    }
                   for(var i =0;i<len;i++){
                       if(!array[i]){
                           return;
                       }
                   }
                    for (let i = 0; i < len; i++) {
                        var f = array[i];
                        var na = f.name;
                        //获取源文件名
                        var date = new Date();
                        var time = '' + date.getFullYear();
                        var store = 'Uploads/file/' + time + '/' + date.getTime() + '.' + na;

                        client.put(store, f).then(function (result) {
                            if (array == arr1 && result.res.statusCode == 200) {
                                $scope.uploadingPar.first_url = result.url;

                                if (!arr1del.length) {
                                    return
                                }
                                for (let j = 0; j < arr1del.length; j++) {

                                    client.delete(arr1del[j].split('http://zhangzhenchuan.oss-ap-northeast-1.aliyuncs.com/')[1]).then(function (data) {
                                        console.log(data)
                                    })
                                }
                            } else if (array == arr1 && result.res.statusCode != 200) {
                                remove("#publicityPic", "firstUrl");
                            } else if (array == arr2 && result.res.statusCode == 200) {
                                $scope.uploadingPar.productDetail.listPic=$scope.uploadingPar.productDetail.listPic.concat(result.url) ;
                                k++;
                                if (!arr2del.length) {
                                    return
                                }
                                for (let j = 0; j < arr2del.length; j++) {

                                    client.delete(arr2del[j].split('http://zhangzhenchuan.oss-ap-northeast-1.aliyuncs.com/')[1]).then(function (data) {
                                        console.log(data)
                                    })
                                }


                            } else if (array == arr2 && result.res.statusCode != 200) {
                                remove("#list_viewPic ", "listPic");
                            } else if (array == arr3 && result.res.statusCode == 200) {
                                $scope.uploadingPar.productDetail.detailPic=$scope.uploadingPar.productDetail.detailPic.concat(result.url);
                                u++;
                                if (!arr3del.length) {
                                    return
                                }
                                for (let j = 0; j < arr3del.length; j++) {


                                    client.delete(arr3del[j].split('http://zhangzhenchuan.oss-ap-northeast-1.aliyuncs.com/')[1]).then(function (data) {
                                        console.log(data)
                                    })
                                }
                                // console.log(arr3del)

                            } else if (array == arr3 && result.res.statusCode != 200) {
                                remove("#particulars_viewPic", "detailPic");
                            }
                        }).catch(function (err) {
                            console.log(err);
                        });
                    }
                    /*删除图片*/


                }
            }

            $scope.submit = function () {

                if (!arr1 || !arr2 || !arr3) {

                    $scope.mess = true;
                    return;
                }

                if (!$scope.mess) {

                    if(arr1.length){

                        $scope.uploadingPar.first_url = '';
                    }
                    $scope.sub();
                    $scope.timer = $interval(function () {
                        console.log(k,u)
                        // console.log($scope.uploadingPar.first_url,k,arr2.length,u,arr3.length)
                        if ($scope.uploadingPar.first_url != '' && k == arr2.length && u == arr3.length) {
                            $scope.upload();
                        }
                    }, 50)
                }


            }
            $scope.upload = function () {
                $interval.cancel($scope.timer);
                var status = document.querySelector(".states").value;
                var price = document.querySelector(".price").value;
                var description = document.querySelector("#introduction").value;
                var typelis = document.querySelectorAll(".typelis span");
                /*var productAdd = document.querySelector("#address1").value;*/
                var listPic = document.querySelectorAll("#list_viewPic .as img");
                var detailPic = document.querySelectorAll("#particulars_viewPic .as img");
                /*型号*/
                var typelisText = [];
                /*服务*/
                var services = [];
                /*列表图*/
                var listPicArr = [];
                /*详情图*/
                var detailPicArr = [];
                /*包邮*/
                var tagArr = [];
                /*列表图*/
                for (var i = 0; i < listPic.length; i++) {
                    listPicArr.push(listPic[i].src)
                }
                for (var i = 0; i < detailPic.length; i++) {
                    detailPicArr.push(detailPic[i].src)
                }
                /*类型*/
                for (var i = 0; i < typelis.length; i++) {
                    typelisText.push(typelis[i].innerHTML)
                }
                /*服务*/
                for (var j = 0; j < serve.length; j++) {
                    if (serve[j].checked == true) {
                        services.push(serveText[j].innerHTML)
                    }
                }
                /*包邮*/
                if (postage.checked == true) {
                    tagArr.push("包邮")
                } else {
                    var tag = "不包邮";
                    tagArr.push(tag)
                }

                $scope.param.productName = $scope.uploadingPar.productName;
                $scope.param.brand = $scope.uploadingPar.brand;
                $scope.param.secondType = $scope.uploadingPar.secondType;
                if ($scope.param.productName == "" || $scope.param.brand == "" || $scope.param.secondType == "" || status == "" || price == "" || typelisText.length <= 0 || listPicArr.length <= 0 || detailPicArr.length <= 0 || $scope.uploadingPar.firstUrl == "" || typelisText.length <= 0 || description == "") {
                    // console.log($scope.param)
                    $scope.mess = true;
                    return
                }
                for (var i = 0; i < typelis.length; i++) {
                    if (typelis[i].innerHTML == "") {
                        $scope.mess = true;
                        return
                    }
                }
                /*传给服务器的值*/
                console.log($scope.uploadingPar.productDetail.detailPic)
                // console.log($scope.uploadingPar.product_amount)
                var ProductDTO = {
                    // productClassId:$scope.productClassId,
                    id: $stateParams.id,
                    productName: $scope.uploadingPar.name,
                    productId: $stateParams.productId,
                    brand: $scope.uploadingPar.brand,
                    secondType: $scope.uploadingPar.second_type,
                    description: description,
                    firstUrl: $scope.uploadingPar.first_url,
                    price: price,
                    type: $scope.uploadingPar.type,
                    status: status,
                    astrict: $scope.uploadingPar.astrict,
                    productPrefecture: $scope.uploadingPar.product_prefecture,
                    productAmount: $scope.uploadingPar.product_amount,
                    productDetail: {
                        createDate: $stateParams.createDate,
                        tag: tagArr,
                        services: services,
                        spec: typelisText,
                        detailPic: $scope.uploadingPar.productDetail.detailPic,
                        listPic: $scope.uploadingPar.productDetail.listPic,
                        senderAddress: $scope.uploadingPar.productDetail.senderAddress,
                        productId: $stateParams.productId,
                        productMarketPrice: $scope.uploadingPar.productDetail.productMarketPrice,
                        productSalesVolume: $scope.uploadingPar.productDetail.productSalesVolume
                    }
                };
                UpdateProductByParameters.save(ProductDTO, function (data) {
                    ManagementUtil.checkResponseData(data, "");
                    if (data.result == Global.SUCCESS) {
                        $scope.mess = false;
                        // console.log($stateParams)
                        $state.go("home", {
                            true: true,
                            status: $stateParams.status,
                            productsName: $stateParams.productsName,
                            productsId: $stateParams.productId,
                            page: $stateParams.page
                        })
                    } else {
                        alert("保存未成功")
                    }
                })
            }
        }])
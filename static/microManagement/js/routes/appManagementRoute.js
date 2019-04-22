/**
 * 路由
 */
define(['appManagement'], function(app){
    return app
        .config(['$stateProvider','$urlRouterProvider',
            function($stateProvider,$urlRouterProvider) {
                var loadFunction = function($templateCache, $ocLazyLoad, $q, $http,name,files,htmlURL){
                    lazyDeferred = $q.defer();
                    return $ocLazyLoad.load ({
                        name: name,
                        files: files
                    }).then(function() {
                        return $http.get(htmlURL)
                            .success(function(data, status, headers, config) {
                                return lazyDeferred.resolve(data);
                            }).
                            error(function(data, status, headers, config) {
                                return lazyDeferred.resolve(data);
                            });
                    });
                };
                $stateProvider
                    .state('agency', {
                        url: '/agency/:true/:pageNo/:mobile/:userType/:st/:et',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'agencyCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.agencyCtrl',
                                    ['js/controllers/agencyCtrl.js?ver=' + managementVersion],
                                    'js/views/agency.html?ver=' + managementVersion);
                            }
                        }
                    })
                    .state('agencyParticulars', {
                        url: '/agencyParticulars/:id/:parentUserId/:pageNo/:mobile/:userType/:startTime/:endTime',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'agencyParticularsCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.agencyParticularsCtrl',
                                    ['js/controllers/agencyParticularsCtrl.js?ver=' + managementVersion],
                                    'js/views/agencyParticulars.html?ver=' + managementVersion);
                            }
                        }
                    })
                    .state('balance', {
                        url: '/balance',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'balanceCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.balanceCtrl',
                                    ['js/controllers/balanceCtrl.js?ver=' + managementVersion],
                                    'js/views/balance.html?ver=' + managementVersion);
                            }
                        }
                    })
                    .state('finance', {
                        url: '/finance',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'financeCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.financeCtrl',
                                    ['js/controllers/financeCtrl.js?ver=' + managementVersion],
                                    'js/views/finance.html?ver=' + managementVersion);
                            }
                        }
                    })
                    .state('home', {
                        url: '/home/:true／:status/:productsName/:productsId/:page',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'homeCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.homeCtrl',
                                    ['js/controllers/homeCtrl.js?ver=' + managementVersion],
                                    'js/views/home.html?ver=' + managementVersion);
                            }
                        }
                    })
                    .state('menuCompile', {
                        url: '/menuCompile',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'menuCompileCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.menuCompileCtrl',
                                    ['js/controllers/menuCompileCtrl.js?ver=' + managementVersion],
                                    'js/views/menuCompile.html?ver=' + managementVersion);
                            }
                        }
                    })
                    .state('menu', {
                        url: '/menu',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'menuCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.menuCtrl',
                                    ['js/controllers/menuCtrl.js?ver=' + managementVersion],
                                    'js/views/menu.html?ver=' + managementVersion);
                            }
                        }
                    })
                    .state('menuNewIncreased', {
                        url: '/menuNewIncreased',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'menuNewIncreasedCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.menuNewIncreasedCtrl',
                                    ['js/controllers/menuNewIncreasedCtrl.js?ver=' + managementVersion],
                                    'js/views/menuNewIncreased.html?ver=' + managementVersion);
                            }
                        }
                    })
                    .state('monthlyAccounts', {
                        url: '/monthlyAccounts/:true/:MAccount/:startTime/:endTime/:pageNo/:status/:checkStatus',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'monthlyAccountsCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.monthlyAccountsCtrl',
                                    ['js/controllers/monthlyAccountsCtrl.js?ver=' + managementVersion],
                                    'js/views/monthlyAccounts.html?ver=' + managementVersion);
                            }
                        }
                    })
                    .state('abschluss', {
                        url: '/abschluss/:id/:time/:transactionId/:MAccount/:startTime/:endTime/:pageNo/:status/:checkStatus',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'abschlussCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.abschlussCtrl',
                                    ['js/controllers/abschlussCtrl.js?ver=' + managementVersion],
                                    'js/views/abschluss.html?ver=' + managementVersion);
                            }
                        }
                    })
                    .state('forthwithAward', {
                        url: '/forthwithAward/:transactionId/:MAccount/:startTime/:endTime/:pageNo/:status',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'forthwithAwardCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.forthwithAwardCtrl',
                                    ['js/controllers/forthwithAwardCtrl.js?ver=' + managementVersion],
                                    'js/views/forthwithAward.html?ver=' + managementVersion);
                            }
                        }
                    })
                    .state('operationClassParticulars', {
                        url: '/operationClassParticulars/:id',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'operationClassParticularsCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.operationClassParticularsCtrl',
                                    ['js/controllers/operationClassParticularsCtrl.js?ver=' + managementVersion],
                                    'js/views/operationClassParticulars.html?ver=' + managementVersion);
                            }
                        }
                    })
                    .state('operation', {
                        url: '/operation',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'operationCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.operationCtrl',
                                    ['js/controllers/operationCtrl.js?ver=' + managementVersion],
                                    'js/views/operation.html?ver=' + managementVersion);
                            }
                        }
                    })
                    .state('operationUploading', {
                        url: '/operationUploading',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'operationUploadingCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.operationUploadingCtrl',
                                    ['js/controllers/operationUploadingCtrl.js?ver=' + managementVersion],
                                    'js/views/operationUploading.html?ver=' + managementVersion);
                            }
                        }
                    })

                    .state('order', {
                        url: '/order/:id/:true/:status/:pageNo/:stp/:etp/:stc/:etc/:orderReference/:orderUserAccount',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'orderCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.orderCtrl',
                                    ['js/controllers/orderCtrl.js?ver=' + managementVersion],
                                    'js/views/order.html?ver=' + managementVersion);
                            }
                        }
                    })
                    .state('orderParticulars', {
                        url: '/orderParticulars/:id/:status/:pageNo/:startTime/:endTime/:orderReference/:orderUserAccount',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'orderParticularsCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.orderParticularsCtrl',
                                    ['js/controllers/orderParticularsCtrl.js?ver=' + managementVersion],
                                    'js/views/orderParticulars.html?ver=' + managementVersion);
                            }
                        }
                    })
                    .state('peopleAccounts', {
                        url: '/peopleAccounts',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'peopleAccountsCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.peopleAccountsCtrl',
                                    ['js/controllers/peopleAccountsCtrl.js?ver=' + managementVersion],
                                    'js/views/peopleAccounts.html?ver=' + managementVersion);
                            }
                        }
                    })
                    .state('peopleCenter', {
                        url: '/peopleCenter',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'peopleCenterCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.peopleCenterCtrl',
                                    ['js/controllers/peopleCenterCtrl.js?ver=' + managementVersion],
                                    'js/views/peopleCenter.html?ver=' + managementVersion);
                            }
                        }
                    })
                    .state('peopleCompileAccount', {
                        url: '/peopleCompileAccount',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'peopleCompileAccountCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.peopleCompileAccountCtrl',
                                    ['js/controllers/peopleCompileAccountCtrl.js?ver=' + managementVersion],
                                    'js/views/peopleCompileAccount.html?ver=' + managementVersion);
                            }
                        }
                    })
                    .state('peopleNewAccount', {
                        url: '/peopleNewAccount/:test',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'peopleNewAccountCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.peopleNewAccountCtrl',
                                    ['js/controllers/peopleNewAccountCtrl.js?ver=' + managementVersion],
                                    'js/views/peopleNewAccount.html?ver=' + managementVersion);
                            }
                        }
                    })
                    .state('register', {
                        url: '/register',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'registerCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.registerCtrl',
                                    ['js/controllers/registerCtrl.js?ver=' + managementVersion],
                                    'js/views/register.html?ver=' + managementVersion);
                            }
                        }
                    })
                    .state('uploading', {
                        url: '/uploading/:id',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'uploadingCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.uploadingCtrl',
                                    ['js/controllers/uploadingCtrl.js?ver=' + managementVersion],
                                    'js/views/uploading.html?ver=' + managementVersion);
                            }
                        }
                    })
                    .state('productClass', {
                        url: '/productClass',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'productClassCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.productClassCtrl',
                                    ['js/controllers/productClassCtrl.js?ver=' + managementVersion],
                                    'js/views/productClass.html?ver=' + managementVersion);
                            }
                        }
                    })

                    .state('productClassNew', {
                        url: '/productClassNew',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'productClassNewCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.productClassNewCtrl',
                                    ['js/controllers/productClassNewCtrl.js?ver=' + managementVersion],
                                    'js/views/productClassNew.html?ver=' + managementVersion);
                            }
                        }
                    })

                    .state('productClassAdd', {
                        url: '/productClassAdd',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'productClassAddCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.productClassAddCtrl',
                                    ['js/controllers/productClassAddCtrl.js?ver=' + managementVersion],
                                    'js/views/productClassAdd.html?ver=' + managementVersion);
                            }
                        }
                    })

                    .state('productTwoClassNew', {
                        url: '/productTwoClassNew/:productClassId/:productClassName',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'productClassTwoNewCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.productClassTwoNewCtrl',
                                    ['js/controllers/productClassTwoNewCtrl.js?ver=' + managementVersion],
                                    'js/views/productTwoClassNew.html?ver=' + managementVersion);
                            }
                        }
                    })

                     .state('productTwoClassAdd', {
                        url: '/productTwoClassAdd/:productClassId/:productClassName',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'productTwoClassAddCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.productTwoClassAddCtrl',
                                    ['js/controllers/productTwoClassAddCtrl.js?ver=' + managementVersion],
                                    'js/views/productTwoClassAdd.html?ver=' + managementVersion);
                            }
                        }
                    })

                    .state('uploadingParticulars', {
                        url: '/uploadingParticulars/:productId/:createDate/:status/:productsName/:page',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'uploadingParticularsCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.uploadingParticularsCtrl',
                                    ['js/controllers/uploadingParticularsCtrl.js?ver=' + managementVersion],
                                    'js/views/uploadingParticulars.html?ver=' + managementVersion);
                            }
                        }
                    })
                    .state('withdraw', {
                        url: '/withdraw',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'withdrawCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.withdrawCtrl',
                                    ['js/controllers/withdrawCtrl.js?ver=' + managementVersion],
                                    'js/views/withdraw.html?ver=' + managementVersion);
                            }
                        }
                    })
                     .state('recommend', {
                            url: '/recommend/:id/:time/:transactionId/:MAccount/:startTime/:endTime/:pageNo/:status/:checkStatus',
                            templateProvider: function() { return lazyDeferred.promise; },
                            controller: 'recommendCtrl',
                            resolve: {
                                load: function($templateCache, $ocLazyLoad, $q, $http) {
                                    loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.recommendCtrl',
                                        ['js/controllers/recommendCtrl.js?ver=' + managementVersion],
                                        'js/views/recommend.html?ver=' + managementVersion);
                                }
                            }
                        })
                    .state('homePageEditor', {
                          url: '/homePageEditor',
                          templateProvider: function() { return lazyDeferred.promise; },
                          controller: 'homePageEditorCtrl',
                          resolve: {
                              load: function($templateCache, $ocLazyLoad, $q, $http) {
                                  loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.homePageEditorCtrl',
                                      ['js/controllers/homePageEditorCtrl.js?ver=' + managementVersion],
                                      'js/views/homePageEditor.html?ver=' + managementVersion);
                              }
                          }
                      })

                    .state('rechargeAccount', {
                          url: '/rechargeAccount',
                          templateProvider: function() { return lazyDeferred.promise; },
                          controller: 'rechargeAccountCtrl',
                          resolve: {
                              load: function($templateCache, $ocLazyLoad, $q, $http) {
                                  loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.rechargeAccountCtrl',
                                      ['js/controllers/rechargeAccountCtrl.js?ver=' + managementVersion],
                                      'js/views/rechargeAccount.html?ver=' + managementVersion);
                              }
                          }
                     })


                    .state('rechargeAccountRecordS', {
                           url: '/rechargeAccountRecordS/:id',
                           templateProvider: function() { return lazyDeferred.promise; },
                           controller: 'rechargeAccountRecordSCtrl',
                           resolve: {
                               load: function($templateCache, $ocLazyLoad, $q, $http) {
                                   loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.rechargeAccountRecordSCtrl',
                                       ['js/controllers/rechargeAccountRecordSCtrl.js?ver=' + managementVersion],
                                       'js/views/rechargeAccountRecordS.html?ver=' + managementVersion);
                               }
                           }
                    })


                    .state('secKillProduct', {
                          url: '/secKillProduct',
                          templateProvider: function() { return lazyDeferred.promise; },
                          controller: 'secKillProductCtrl',
                          resolve: {
                              load: function($templateCache, $ocLazyLoad, $q, $http) {
                                  loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.secKillProductCtrl',
                                      ['js/controllers/secKillProductCtrl.js?ver=' + managementVersion],
                                      'js/views/secKillProduct.html?ver=' + managementVersion);
                              }
                          }
                      })

                    .state('updateSeckillProduct', {
                        url: '/updateSeckillProduct/:id',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'updateSeckillProductCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.updateSeckillProductCtrl',
                                    ['js/controllers/updateSeckillProductCtrl.js?ver=' + managementVersion],
                                    'js/views/updateSeckillProduct.html?ver=' + managementVersion);
                            }
                        }
                    })

                      .state('addSeckillProduct', {
                            url: '/addSeckillProduct',
                            templateProvider: function() { return lazyDeferred.promise; },
                            controller: 'addSeckillProductCtrl',
                            resolve: {
                                load: function($templateCache, $ocLazyLoad, $q, $http) {
                                    loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.addSeckillProductCtrl',
                                        ['js/controllers/addSeckillProductCtrl.js?ver=' + managementVersion],
                                        'js/views/addSeckillProduct.html?ver=' + managementVersion);
                                }
                            }
                        })

                        .state('seckillProductDetail', {
                             url: '/seckillProductDetail/:id',
                             templateProvider: function() { return lazyDeferred.promise; },
                             controller: 'seckillProductDetailCtrl',
                             resolve: {
                                  load: function($templateCache, $ocLazyLoad, $q, $http) {
                                      loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.seckillProductDetailCtrl',
                                          ['js/controllers/seckillProductDetailCtrl.js?ver=' + managementVersion],
                                          'js/views/seckillProductDetail.html?ver=' + managementVersion);
                                  }
                             }
                          })

                    .state('homeImageUpload', {
                        url: '/homePageEditor/:bannerType/:forward/:uri/:bannerId',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'homeImageUploadCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.homeImageUploadCtrl',
                                    ['js/controllers/homeImageUploadCtrl.js?ver=' + managementVersion],
                                    'js/views/homeImageUpload.html?ver=' + managementVersion);
                            }
                        }
                    })

                    .state('collageProduct', {
                        url: '/collageProduct',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'collageProductCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.collageProductCtrl',
                                    ['js/controllers/collageProductCtrl.js?ver=' + managementVersion],
                                    'js/views/collageProduct.html?ver=' + managementVersion);
                            }
                        }
                    })
                    .state('addCollageProduct', {
                        url: '/addCollageProduct',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'addCollageProductCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.addCollageProductCtrl',
                                    ['js/controllers/addCollageProductCtrl.js?ver=' + managementVersion],
                                    'js/views/addCollageProduct.html?ver=' + managementVersion);
                            }
                        }
                    })
                    .state('collageProductDetail', {
                        url: '/collageProductDetail/:id/:editable',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'collageProductDetailCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.collageProductDetailCtrl',
                                    ['js/controllers/collageProductDetailCtrl.js?ver=' + managementVersion],
                                    'js/views/collageProductDetail.html?ver=' + managementVersion);
                            }
                        }
                    })

                    .state('bargainProduct', {
                        url: '/bargainProduct',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'bargainProductCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.bargainProductCtrl',
                                    ['js/controllers/bargainProductCtrl.js?ver=' + managementVersion],
                                    'js/views/bargainProduct.html?ver=' + managementVersion);
                            }
                        }
                    })
                    .state('addBargainProduct', {
                        url: '/addBargainProduct',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'addBargainProductCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.addBargainProductCtrl',
                                    ['js/controllers/addBargainProductCtrl.js?ver=' + managementVersion],
                                    'js/views/addBargainProduct.html?ver=' + managementVersion);
                            }
                        }
                    })
                    .state('bargainProductDetail', {
                        url: '/bargainProductDetail/:id/:editable',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'bargainProductDetailCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.bargainProductDetailCtrl',
                                    ['js/controllers/bargainProductDetailCtrl.js?ver=' + managementVersion],
                                    'js/views/bargainProductDetail.html?ver=' + managementVersion);
                            }
                        }
                    })

                $urlRouterProvider.otherwise('home/%EF%BC%8F///')
            }])
})
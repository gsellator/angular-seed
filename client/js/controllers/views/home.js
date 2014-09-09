'use strict';

define(['angular', 'controllers'], function (ng, controllers) {
    controllers.controller('homeCtrl', function ($scope, HomeService) {
        HomeService.logPageLoad();
    })
})
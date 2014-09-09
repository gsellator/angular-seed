'use strict';

define(['angular', 'services'], function (ng, services) { 
    services.factory("HomeService", function($window){
        return {
            logPageLoad: function (scope) {
                console.log('home');
            }
        };
    })
})
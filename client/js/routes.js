define(['app'], function (app) {
    return app.config(['$routeProvider', '$httpProvider', function($routeProvider, $httpProvider) {
        
        $routeProvider
        .when('/home', {
            templateUrl: '/views/home.html', 
            controller: 'homeCtrl'
        })
        .otherwise({
            redirectTo: '/home'
        });
    }]) ;
});
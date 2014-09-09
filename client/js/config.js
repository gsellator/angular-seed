'use strict';

require.config({
    paths: {
        'angular': 'bower_components/angular/angular',
        'angularAnimate': 'bower_components/angular-animate/angular-animate',
        'angularRoute': 'bower_components/angular-route/angular-route',
        'angularResource': 'bower_components/angular-resource/angular-resource',
        'angularTouch': 'bower_components/angular-touch/angular-touch',
        'd3': 'bower_components/d3/d3',
        'bindonce': 'bower_components/angular-bindonce/bindonce'
    },
    shim: {
        'angular': {exports: 'angular'},
        'app': ['angular']
    }
});

require(['angular', 'app', 'routes'], function (ng) {
    ng.bootstrap(document, ['app']);
});
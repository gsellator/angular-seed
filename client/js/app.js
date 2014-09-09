'use strict';

define([
    'angular',
    'angularResource',
    'angularRoute',
    'angularTouch',
    'controllers/views/home',
    'directives/home',
    'filters/home',
    'services/home',
    'd3',
    'bindonce'
], function(ng) {
    return ng.module('app', [
        'app.controllers',
        'app.directives',
        'app.filters',
        'app.services',
        'ngResource', 
        'ngRoute',  
        'pasvaz.bindonce'
    ])
});

define('controllers', ['angular'], function (ng) {
    return ng.module('app.controllers', []);
})

define('directives', ['angular'], function (ng) {
    return ng.module('app.directives', [])
})

define('filters', ['angular'], function (ng) {
    return ng.module('app.filters', [])
})

define('services', ['angular'], function (ng) {
    return ng.module('app.services', [])
    .value('version', '0.1')
})
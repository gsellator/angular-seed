'use strict';

define(['angular', 'directives'], function (ng, directives) {
    directives.directive('diffusion', function factory() {
        return {
            restrict: 'A',
            scope: true,
            link: function(scope, element, attrs, controller) {
                console.log('test');
            }
        }
    })    
})
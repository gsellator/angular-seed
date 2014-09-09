'use strict';

define(['angular', 'filters'], function (ng, filters) { 
    filters.filter('padStr', function() {
        return function (input, scope) {  
            return (input < 10) ? "0" + input : "" + input;
        }
    })

    .filter('range', function() {
        return function(input, total) {
            total = parseInt(total);
            for (var i=0; i<total; i++)
                input.push(i);
            return input;
        };
    })

    .filter('capitalize', function() {
        return function(input, scope) {
            if (input!=null){
                input = input.toLowerCase();
                return input.substring(0,1).toUpperCase()+input.substring(1);
            }
        }
    })

    .filter('rank', function(padStrFilter) {
        return function(input, scope) {
            return '#' + padStrFilter(input);
        }
    })
})
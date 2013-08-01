'use strict';

angular.module('<%= appName %>')
.filter('sampleFilter', function () {
    return function (input) {
        return 'sampleFilter filter: ' + input;
    };
});

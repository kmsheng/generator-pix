'use strict';

angular.module('<%= appName %>')
.directive('sampleDirective', function () {
    return {
        restrict: 'A',
        link: function postLink(scope, element, attrs) {
            element.text('this is the test directive');
        }
    };
});


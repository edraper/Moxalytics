(function () {
    'use strict';

    angular.module('moxalytics', [
        // Angular modules 
        'ngAnimate',
        'ngRoute'

        // Custom modules 

        // 3rd Party Modules
        
    ])
    .controller('DatabaseController', ['$scope', function($scope) {
        // Get list of databases here
        $scope.databases = {};

        $scope.getDatabases = function () {
            // A json file containing  the names of all of the databases would be pulled in here and 
            // displayed on the page. Switch to $.getJSON or $http.
            $.get("/Content/bootstrap.css", function (data) {
                // Testing getting data in angular controllers. Might want to switch to $http instead of $.get.
                alert(data);

                // Set $scope.databases = data;.
            });
        };
    }]);
})();
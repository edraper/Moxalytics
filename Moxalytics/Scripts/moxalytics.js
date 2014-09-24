(function () {
    'use strict';

    angular.module('moxalytics', [
        // Angular modules 
        'ngAnimate',
        'ngRoute'

        // Custom modules 

        // 3rd Party Modules
        
    ])
    .controller('DatabaseController', ['$scope', '$http', function($scope, $http) {
        /* Possible databases object layout. Can and should change:
            See /Content/testdata/testdata.json
        */
        $scope.databases = {};

        // Load json data using $http. This is automatically called when the page is loaded.
        // The url below needs to change when it goes and gets the actual data from the databases.
        $http.get('/Content/testdata/testdata.json').success(function (data) {
            $scope.databases = data.databases;
        }).
        error(function (data) {
            console.log("Unable to load databases.");
        });

        // Loads the list of databases and tables. Call if the database views need to be loaded manually.
        $scope.getDatabases = function () {
            $http.get('/Content/testdata/testdata.json').success(function (data) {
                $scope.databases = data.databases;
                $scope.$apply(); // Updates the data on the first click. Otherwise, the view on the page is not updated until clicked again.
            }).
            error(function (data) {
                console.log("Unable to load databases.");
            });
        };

        $scope.expandDatabase = function () {
            // Expands the database to show the tables.
            // Might not need this...
        }
    }]);
})();
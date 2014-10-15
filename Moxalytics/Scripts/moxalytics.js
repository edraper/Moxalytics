(function () {
    'use strict';

    angular.module('moxalytics', [
        // Angular modules 
        'ngAnimate',
        'ngRoute'

        // Custom modules 

        // 3rd Party Modules
        
    ])
    .factory('dataFactory', function ($http) {
        // Any database object should be of the form: 
        // {
        //  "name": "db1",
        //  "table": "table1",
        //  "column": "col1" // Need to determine this. This could potentially vary if columns were needed for example.
        // }
        var service = {};
        var joins = [];
        var select = [];
        var where = [];
        var from = {};
        var orderby = [];

        service.addJoin = function(type, leftDatabase, rightDatabase) {
            joins.add({
                "type": type,
                "leftDatabase": leftDatabase,
                "rightDatabase": rightDatabase
            });
        };

        service.addSelect = function(database, asName, max, min, distinct, top, average, count, first, last, sum) {
            // Check for empty values
            // For unused fields, an empty string, "", is passed.
            asName = typeof asName !== 'undefined' ? asName : "";
            max = typeof max !== 'undefined' ? max : "";
            min = typeof min !== 'undefined' ? min : "";
            distinct = typeof distinct !== 'undefined' ? distinct : "";
            top = typeof top !== 'undefined' ? top : "";
            average = typeof average !== 'undefined' ? average : "";
            count = typeof count !== 'undefined' ? count : "";
            first = typeof first !== 'undefined' ? first : "";
            last = typeof last !== 'undefined' ? last : "";
            sum = typeof sum !== 'undefined' ? sum : "";

            select.add({
                "database": database,
                "as": asName,
                "max": max,
                "min": min,
                "distinct": distinct,
                "top": top,
                "average": average,
                "count": count,
                "first": first,
                "last": last,
                "sum": sum
            });
        };

        service.addWhere = function(database, blogic, between, operand, like) {
            // between should be a list of two values that contains the starting value and the ending value
            where.add({
                "database": database,
                "blogic": blogic,
                "between": between,
                "operand": operand,
                "like": like
            });
        };

        service.addFrom = function(database, isJoin) {
            from = database;
            from.isJoin = isJoin;
        };

        service.addOrderBy = function(database) {
            orderby.add({
                "name": database.name,
                "table": database.table,
                "column": database.column
            });
        };

        service.submitReportParameters = function() {
            // Generate the js object to send from the stored data.
            var params = {};
            params.JOINS = joins;
            params.SELECT = select;
            params.WHERE = where;
            params.FROM = from;
            params.ORDERBY = orderby;

            // Insert code from other project (branch) (Todd).
            // Send the code to the server
        }

        return service;
    })

    .controller('DatabaseController', ['$scope', '$http', function($scope, $http) {
        // Need layout for structure here.
        $scope.databases = []; // Might need to move this to its own factory. Don't know whether to use [] or {}.
        // Might want to include the tables in the databases object.
        $scope.databases.tables = [];
        $scope.server = "esp--xray"; // This will need to be changed based on the server the user selects. The -- is used in place of a \. Helps in api calls.

        // Load json data using $http. This is automatically called when the page is loaded.
        $http.get('api/Database/'+$scope.server).success(function (data) {
            console.log(data);
            console.log("testing server connection");
            //$scope.databases = data.databases;
            //$scope.$apply(); //Might need this here...
        }).
        error(function (data) {
            console.log("Unable to load databases.");
        });

        // Loads the list of databases and tables. Call if the database views need to be loaded manually.
        $scope.getDatabases = function () {
            $http.get('api/Database/' + $scope.server).success(function (data) {
                console.log(data);
                console.log("testing server connection");
                //$scope.$apply(); // Might need to remove. Needs testing.
                //$scope.databases = data.databases;
            }).
            error(function (data) {
                console.log("Unable to load databases.");
            });
        };
        
        // getTables may need to be removed. Depends on what calls are necessary. Might want to get everything in one call...
        $scope.getTables = function (dbName) {
            // dbName should be preformatted to the correct url. Example esp\xray
            $http.get(dbName).success(function (data) {
                $scope.tables = data.tables;
            }).
            error(function (data) {
                console.log("Unable to load tables for " + dbName);
            });
        };

        $scope.getColumns = function(dbName, table) {

        };

        $scope.expandDatabase = function() {
            // Expands the database to show the tables. Might not need this...

            // esp\xray - pass into function as a string
            // execute() executes the query
            // http://www.aspsnippets.com/Articles/Call-ASPNet-Page-Method-using-jQuery-AJAX-Example.aspx
            // https://stackoverflow.com/questions/17129132/ng-repeat-dosnt-update-itself-after-inserting-new-item-using-dialog
        };
    }]);
})();
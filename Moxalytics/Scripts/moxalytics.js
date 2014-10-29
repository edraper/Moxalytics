(function () {
  'use strict';

  angular.module('moxalytics', [
        // Angular modules
        'ngAnimate', // Remove if unused
        'ngRoute' // Remove if unused

        // Custom modules

        // 3rd Party Modules

  ])
    // Might also want a report controller
    .factory('reportFactory', function($http) {
        // Holds the report data returned from the server
        // Needs implementation details
        var service = {};

        return service;

      })
    .factory('dataFactory', function ($http) {
      // Any database object should be of the form:
      // {
      //  "name": "db1",
      //  "table": "table1",
      //  "column": "col1" // Need to determine this. This could potentially vary if columns were needed for example.
      // }
      var service = {};
      var joins = [];
      var innerjoinTables = [];
      var outerjoinTables = [];
      var select = [];
      var fields = [];
      var where = [];
      var from = {};
      var orderby = [];

      // All parameters should be strings
      service.generateDatabaseObject = function (name, table, column, asValue) {
          asValue = typeof asValue !== 'undefined' ? asValue: "";
          return {
              "databaseName": name,
              "tableName": table,
              "columns": column,
              "AS": asValue
          };
      };

      service.addJoin = function (type, leftDatabase, rightDatabase) {
        if (type === "INNER")
          innerjoinTables.add({
            "leftTable": leftDatabase,
            "rightTable": rightDatabase
          });
        else if (type === "OUTER")
          outerjoinTables.add({
            "leftTable": leftDatabase,
            "rightTable": rightDatabase
          });
        else
          alert("Invalid join type."); // Might want to change this to just show in a message box instead.
      };

      // Needs updating for new JSON format. Can you do "distinct" where it is both true and false?
      // The call will also need to change.
      service.addSelect = function (database, asName, max, min, distinct, top, average, count, first, last, sum) {
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

      service.addWhere = function (columnDefault, columnCompare, blogic, betweenStart, betweenEnd, operand, like, val) {
        // columnDefault and columnCompare should be database objects
        where.add({
          "columnDefault": columnDefault,
          "columnCompare": columnCompare,
          "blogic": blogic,
          "between": {
              "start": betweenStart.toString(),
              "end": betweenEnd.toString()
          },
          "operand": operand,
          "like": like,
          "value": val
        });
      };

      service.addFrom = function (database) {
        from = database;
        //from.isJoin = isJoin;
      };

      service.addOrderBy = function (column, orderType) {
        // column is a database object
        orderby.add({
          "column": column,
          "orderType": orderType
        });
      };

      service.submitReportParameters = function() {
          // Generate the js object to send from the stored data.
          joins.add({
              "type": "INNER",
              "joinTables": innerjoinTables
            },
            {
              "type": "OUTER",
              "joinTables": outerjoinTables
          });
      
          var params = {};
          params.JOINS = joins;
          params.SELECT = select;
          params.WHERE = where;
          params.FROM = from;
          params.ORDERBY = orderby;
      
          // Insert code from other project (branch) (Todd).
          // Send the code to the server
          // Data needs to be POSTed to api/Database
      };

    return service;
  })

  .controller('DatabaseController', ['$scope', '$http',
    function ($scope, $http, dataFactory) {
      // Need layout for structure here.
      $scope.databases = []; // Might need to move this to its own factory. Don't know whether to use [] or {}.
      // Might want to include the tables in the databases object.
      $scope.databases.tables = [];
      $scope.server = "esp--xray"; // This will need to be changed based on the server the user selects. The -- is used in place of a \. Helps in api calls.

      // Load json data using $http. This is automatically called when the page is loaded.
      $http.get('api/Database/' + $scope.server).success(function (data) {
        console.log(data);
        console.log("testing server connection");
        //$scope.databases = data.databases;
        //$scope.$apply(); //Might need this here...
      }).
      error(function (data) {
        console.log("Unable to load databases.\n" + data.toString());
      });

      // Loads the list of databases and tables. Call if the database views need to be loaded manually.
      $scope.getDatabases = function () {
        $http.get('api/Database/' + $scope.server).success(function (data) {
          console.log(data);
          console.log("testing server connection");
          //$scope.$apply(); // Might need to remove. Needs testing.
          //$scope.databases = data.databases;//
        }).
        error(function (data) {
          console.log("Unable to load databases.\n" + data.toString());
        });
      };

      // getTables may need to be removed. Depends on what calls are necessary. Might want to get everything in one call...
      $scope.getTables = function (dbName) {
        // dbName should be preformatted to the correct url. Example esp\xray
        $http.get(dbName).success(function (data) {
          $scope.tables = data.tables;
        }).
        error(function (data) {
          console.log("Unable to load tables for " + dbName + "\n" + data.toString());
        });
      };

      $scope.getColumns = function (dbName, table) {

      };

      $scope.expandDatabase = function () {
        // Expands the database to show the tables. Might not need this...

        // esp\xray - pass into function as a string
        // execute() executes the query
        // http://www.aspsnippets.com/Articles/Call-ASPNet-Page-Method-using-jQuery-AJAX-Example.aspx
        // https://stackoverflow.com/questions/17129132/ng-repeat-dosnt-update-itself-after-inserting-new-item-using-dialog
      };
    }]);
})();
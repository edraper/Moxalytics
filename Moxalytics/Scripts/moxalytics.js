var test;
var moxalytics = angular.module('moxalytics', [
        // Angular modules
        'ngAnimate', // Remove if unused
        'ngRoute', // Remove if unused
        'ngResource'

        // Custom modules

        // 3rd Party Modules

  ]);

    // Might also want a report controller
  moxalytics.factory('reportFactory', function($http) {
      // Holds the report data returned from the server
      // Needs implementation details
      var service = {};
      var report = {
        reportInformation: "Database 2: Employees, Sales | Database 3: Products, Testing",
        date: "Date Generated",
        columns: [
          { header: "Id", rows: ["123", "234"] },
          { header: "ItemName", rows: ["Lens", "Frame"] },
          { header: "Description", rows: ["A lens to see", "A frame for a lens"] },
          { header: "Stock", rows: ["150", "15"] },
          { header: "ItemId", rows: ["5679435", "1534723"] },
          { header: "Lifetime", rows: ["400000", "300000"] },
          { header: "Notes", rows: ["Needs reordering", "In stock"] }
        ],
      };

    // Or like this
    // Currently using this one.
      var reportAlt = {
        reportInformation: "Database 2: Employees, Sales | Database 3: Products, Testing",
        date: "Date Generated",
        columns: ["Id", "ItemName", "Description", "Stock", "ItemId", "Lifetime", "Notes"],
        rows: [
          {
            "Id": "123", 
            "ItemName": "Lens",
            "Description": "A lens to see.",
            "Stock": "150",
            "ItemId": "5679435",
            "Lifetime": "400000",
            "Notes": "Needs reordering"
          },
          {
            "Id": "234",
            "ItemName": "Frame",
            "Description": "A frame for a lens.",
            "Stock": "15",
            "ItemId": "1534723",
            "Lifetime": "300000",
            "Notes": "In Stock"
          }
        ]
      };

    service.getReport = function() {
      return reportAlt;
    };

    //service = report;
    return service;
  });

  //moxalytics.directive('reportDirective', function() {
  //  return {
  //    restrict: 'A'
  //    ///...
  //  };
  //});

  moxalytics.controller('ReportController', ['$scope', '$http', 'reportFactory',
    function ($scope, $http, reportFactory) {
      $scope.report = reportFactory.getReport();
    }]);

  moxalytics.factory('dataFactory', function ($http) {
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
  });

  moxalytics.controller('DatabaseController', ['$scope', '$http', 'dataFactory', 
    function ($scope, $http, dataFactory) {
      // Need layout for structure here.
      $scope.databases = []; // Might need to move this to its own factory. Don't know whether to use [] or {}.
      // Might want to include the tables in the databases object.
      $scope.databases.tables = [];
      $scope.server = "esp--xray"; // This will need to be changed based on the server the user selects. The -- is used in place of a /. Helps in api calls.

      // Load json data using $http. This is automatically called when the page is loaded.
      $http.get('api/Database/' + $scope.server).success(function (data) {
        console.log(data);
        console.log("testing server connection");
        //$scope.databases = data.databases;
        //$scope.$apply(); //Might need this here...
      }).
      error(function (data) {
        //console.log("Unable to load databases.\n" + data.toString());
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
          //console.log("Unable to load databases.\n" + data.toString());
        });
        //$scope.getTables()
      };
      
      // Gets the tables for a specified database
      $scope.getTables = function (database) {
        $http.get('api/Database/' + $scope.server + "/" + database).success(function (data) {
          console.log(data);
          console.log("testing getting tables for a specific database");
          //$scope.databases = data.databases;//
          // $scope.databases.databasename.tables = data.tables? //
        }).
        error(function (data) {
          console.log("Unable to load tables for " + database + ".\n" + data.toString());
        });
      };

      // Gets the columns for a specified database and table.
      $scope.getColumns = function (database, table) {
        $http.get('api/Database/' + $scope.server + "/" + database + "/" + table).success(function (data) {
          console.log(data);
          console.log("testing getting columns for a specific table");
          //$scope.databases = data.databases;//
          // $scope.databases.databasename.tables.tablename.columns = data.columns? //
          // This statement might not even be syntactically correct. It just depends on how we receive the data.
        }).
        error(function (data) {
          console.log("Unable to load columns for " + table + ".\n" + data.toString());
        });
      };

      // Use this function for testing things.
      // Change to whatever you need.
      $scope.testFunction = function () {
        // Pass multiple parameters to the server.
        $http.get('api/Database/' + $scope.server + "/" + "table1").success(function (data) {
          console.log(data);
        });
      };

      $scope.expandDatabase = function () {
        // Expands the database to show the tables. Might not need this...

        // esp\xray - pass into function as a string
        // execute() executes the query
        // http://www.aspsnippets.com/Articles/Call-ASPNet-Page-Method-using-jQuery-AJAX-Example.aspx
        // https://stackoverflow.com/questions/17129132/ng-repeat-dosnt-update-itself-after-inserting-new-item-using-dialog
      };
    }]);

  // Example data layout for the information about the databases...
  service = {
      databases: [
          {
              name: "steve",
              tables: [
                  {
                      name: "table_steve",
                      columns: [
                          "column1",
                          "column2"
                      ]
                  },
                  {
                      name: "table2_steve",
                      columns: [
                          "column3",
                          "column4"
                      ]
                  }
              ]
          },
          {
              name: "bob",
              tables: [
                  {
                      name: "table_bob",
                      columns: [
                          "column5",
                          "column6"
                      ]
                  },
                  {
                      name: "table2_bob",
                      columns: [
                          "column7",
                          "column8"
                      ]
                  }
              ]
          }
      ]
  };
// Work on the SELECT query stuff.

var test;
var moxalytics = angular.module('moxalytics', [
        // Angular modules
        'ngAnimate', // Remove if unused
        'ngRoute', // Remove if unused
        'ngResource'

        // Custom modules

        // 3rd Party Modules

  ]);

  moxalytics.factory('reportFactory', function($http) {
      // Holds the report data returned from the server
      var service = {};
      //var report = {
      //  reportInformation: "Database 2: Employees, Sales | Database 3: Products, Testing",
      //  date: "Date Generated",
      //  columns: [
      //    { header: "Id", rows: ["123", "234"] },
      //    { header: "ItemName", rows: ["Lens", "Frame"] },
      //    { header: "Description", rows: ["A lens to see", "A frame for a lens"] },
      //    { header: "Stock", rows: ["150", "15"] },
      //    { header: "ItemId", rows: ["5679435", "1534723"] },
      //    { header: "Lifetime", rows: ["400000", "300000"] },
      //    { header: "Notes", rows: ["Needs reordering", "In stock"] }
      //  ],
      //};

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
      //console.log(JSON.stringify(reportAlt));

      service.getReport = function () {
          var report = JSON.parse(JSON.parse(localStorage["report"]));

          //console.log(JSON.parse(JSON.parse(report)));
      return report;
    };

    return service;
  });

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
      var from = [];
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
              innerjoinTables.push({
                  "leftTable": leftDatabase,
                  "rightTable": rightDatabase
              });
          else if (type === "OUTER")
              outerjoinTables.push({
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

          select.push({
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
        //console.log(select);
      };

      service.addWhere = function (columnDefault, columnCompare, blogic, betweenStart, betweenEnd, operand, like, val) {
          // columnDefault and columnCompare should be database objects
          where.push({
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
          from = [database];
          //from.isJoin = isJoin;
      };

      service.addOrderBy = function (column, orderType) {
          // column is a database object
          orderby.push({
              "column": column,
              "orderType": orderType
          });
      };

      service.submitReportParameters = function() {
          // Generate the js object to send from the stored data.

          joins.push({
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

          console.log(params);
        //localStorage["params"] = params;
        $('#message-container').html();
          // Send the code to the server
          // Data is POSTed to api/Database
          $http.post(
              'api/Database',
              JSON.stringify(params),
              {
                  header: {
                      'Content-Type': 'application/json'
                  }
              })
              .success(function (data) {
                  console.log(data);
                  // Store the returned report data
                  var storageData = JSON.stringify(data);
                  localStorage["report"] = storageData; // Converted back to a js object on the report viewer.
                  console.log(localStorage["report"]);
                  window.location.href = '/home/Report';
            })
              .error(function (data) {
                  console.log(data);
              });
      };

      return service;
  });

  moxalytics.controller('DatabaseController', ['$scope', '$http', 'dataFactory', 
    function ($scope, $http, dataFactory) {
      // Need layout for structure here.
      $scope.databases = []; 
      
      $scope.databases.tables = [];
      $scope.operations = {
        'INNERJOIN': {
          name: 'Inner Joins',
          opFields: {}
        },
        'OUTERJOIN': {
          name: 'Outer Joins',
          opFields: {}
        },
        'SELECT': {
          name: 'Select',
          opFields: {}
        }
      }
      $scope.count = 0;
      $scope.countNeeded = 1;
      $scope.db1 = null;
      $scope.currentOperation = "INNERJOIN";
      $scope.server = "esp--xray"; // This will need to be changed based on the server the user selects. The -- is used in place of a \. Helps in api calls.

      // Load json data using $http. This is automatically called when the page is loaded.
      $http.get('api/Database/' + $scope.server).success(function (data) {
        console.log(data);
        console.log("testing server connection");
        for (var i = 0; i < data.length; i++) {
          $scope.databases.push({ name: data[i], tables: [] });
        }
        $scope.$apply(); //Might need this here...
      }).
      error(function (data) {
        console.log("Unable to load databases.\n" + data.toString());
      });

      $scope.submitReport = function() {
          dataFactory.submitReportParameters();
      }

        // Loads the list of databases and tables. Call if the database views need to be loaded manually.
      $scope.getDatabases = function () {
        $http.get('api/Database/' + $scope.server).success(function (data) {
          console.log(data);
          console.log("testing server connection");
          for (var i = 0; i < data.length; i++) {
            $scope.databases.push({ name: data[i], tables: [] });
          }
          $scope.$apply(); //Might need this here...
        }).
        error(function (data) {
          console.log("Unable to load databases.\n" + data.toString());
        });
      };
      
      // Gets the tables for a specified database
      $scope.getTables = function (database) {
        $http.get('api/Database/' + $scope.server + "/" + database).success(function (data) {
            var pos = 0;
          for (var j = 0; j < $scope.databases.length; j++) {
            if (database === $scope.databases[j].name) {
              pos = j;
              break;
            }
          }
          for (var i = 0; i < data.length; i++) {
            $scope.databases[pos].tables.push({ name: data[i], fields: [] });
          }
            $scope.$apply();
          }).
        error(function (data) {
          console.log("Unable to load tables for " + database + ".\n" + data.toString());
        });
      };

      // Gets the columns for a specified database and table.
      $scope.getFields = function (database, table) {
        $http.get('api/Database/' + $scope.server + "/" + database + "/" + table).success(function (data) {
          console.log(data);
          console.log("testing getting columns for a specific table");
          var dpos = 0;
            var tpos = 0;
          for (var j = 0; j < $scope.databases.length; j++) {
            if (database === $scope.databases[j].name) {
              dpos = j;
              break;
            }
          }
          for (var k = 0; k < $scope.databases[j].tables.length; k++) {
            if (table === $scope.databases[j].tables[k].name) {
              tpos = k;
              break;
            }
          }
          for (var i = 0; i < data.length; i++) {
            $scope.databases[dpos].tables[tpos].fields.push({ name: data[i] });
          }
          $scope.$apply();
        }).
        error(function (data) {
          console.log("Unable to load columns for " + table + ".\n" + data.toString());
        });
      };

      $scope.getTestDatabases = function() {
        $scope.databases = [{ name: "Database 1", tables: [{ name: "Employees", fields: [{ name: "Id", value: "1" }, { name: "Notes", value: "2" }] }, { name: "Sales", fields: [{ name: "ItemName", value: "3" }, { name: "Description", value: "4" }] }] }, { name: "Database 3", tables: [{ name: "Products", fields: [{ name: "Description", value: "5" }, { name: "Stock", value: "6" }] }, { name: "Testing", fields: [{ name: "Id", value: "7" }, { name: "Name", value: "8" }] }] }];
      }

      // Sets the operation to be added to the database.
      $scope.setOperation = function(operation) {
        $scope.operations[$scope.currentOperation].opFields = {};
        $scope.currentOperation = operation;
        $scope.count = 0;
        $scope.countNeeded = 1;
        $scope.db1 = null;
        if ($scope.currentOperation === "INNERJOIN" || $scope.currentOperation === "OUTERJOIN")
            $scope.countNeeded = 2;
      }

      // Add fields to the report builder.
      $scope.addField = function (database, table, field) {
          // This switch statement could be a lot cleaner and a lot less verbose.
          if ($scope.count === 0)
              $scope.operations[$scope.currentOperation].opFields = {};
        switch ($scope.currentOperation) {
          case "INNERJOIN":
            if ($scope.count === 1 /*$scope.countNeeded*/) {
              dataFactory.addJoin("INNER", $scope.db1, dataFactory.generateDatabaseObject(database, table, field));
              $scope.count = 0;
              $scope.db1 = null;
              $("#status-message").text("Inner join added");
              $("#message-container").attr('class', 'alert alert-success');
            }
            else {
              $scope.db1 = dataFactory.generateDatabaseObject(database, table, field);
              $scope.count++;
              $("#status-message").text("Select 1 more field to complete the inner join");
              $("#message-container").attr('class', 'alert alert-info');
            }
            break;
          case "OUTERJOIN":
            if ($scope.count === 1 /*$scope.countNeeded*/) {
              dataFactory.addJoin("OUTER", $scope.db1, dataFactory.generateDatabaseObject(database, table, field));
              $scope.count = 0;
              $scope.db1 = null;
              $("#status-message").text("Outer join added");
              $("#message-container").attr('class', 'alert alert-success');
            }
            else {
              $scope.db1 = dataFactory.generateDatabaseObject(database, table, field);
              $scope.count++;
              $("#status-message").text("Select 1 more field to complete the outer join");
              $("#message-container").attr('class', 'alert alert-info');
            }
            break;
          case "SELECT":
            if ($scope.count === 0) {
              dataFactory.addSelect(dataFactory.generateDatabaseObject(database, table, field));
              $scope.count = 0;
              $scope.db1 = null;
              $("#status-message").text("Select added");
              $("#message-container").attr('class', 'alert alert-success');
            }
            break;
          case "ORDERBY":
            dataFactory.addOrderBy(dataFactory.generateDatabaseObject(database, table, field));
            $scope.count = 0;
            $scope.db1 = null;
            $("#status-message").text("OrderBy Added");
            $("#message-container").attr('class', 'alert alert-success');
            break;
          default:
            break;
        }
        //console.log($scope.operations[$scope.currentOperation].opfields);
        if (typeof $scope.operations[$scope.currentOperation].opFields == "undefined") {
            $scope.operations[$scope.currentOperation].opFields = {};
            //$scope.operations[$scope.currentOperation].opFields.push({});
        }
        if (typeof $scope.operations[$scope.currentOperation].opFields[database] == "undefined") {
          $scope.operations[$scope.currentOperation].opFields[database] = {};
          $scope.operations[$scope.currentOperation].opFields[database].name = database;
          $scope.operations[$scope.currentOperation].opFields[database].tables = {};
        }

        if (typeof $scope.operations[$scope.currentOperation].opFields[database].tables[table] == "undefined") {
          $scope.operations[$scope.currentOperation].opFields[database].tables[table] = {};
          $scope.operations[$scope.currentOperation].opFields[database].tables[table].name = table;
          $scope.operations[$scope.currentOperation].opFields[database].tables[table].fields = [];
        }

        if ($.inArray(field, $scope.operations[$scope.currentOperation].opFields[database].tables[table].fields) == -1)
          $scope.operations[$scope.currentOperation].opFields[database].tables[table].fields.push(field);
        //console.log($scope.operations[$scope.currentOperation].opFields);
      }
    }]);

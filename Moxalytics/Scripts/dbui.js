moxalytics.controller('DBUIController', ['$scope', function ($scope, $http) {
    $scope.TEXT1 = "DOOBY";
    $scope.databases = [];
    /*$http.get(DB1JSON).then(function (res) {
        $scope.dbjsonres = res.data;
    });*/

}]);

var DB1JSON = "{'DBName':'First Database', " +
    "'TableList': [" +
    "{'TableName': 'Table1', 'FieldList': [{'FieldName':'Field1'}, {'FieldName':'field2'}]}, " + 
    "{'TableName': 'Table2', 'FieldList': [{'FieldName':'Field1'}, {'FieldName':'field2'}]}, " +
    "]}";
moxalytics.controller('DBUIController', ['$scope', '$resource', function ($scope, $resource) {
    $scope.TEXT1 = "Database Selection and Report Builder Columns";
    $scope.databases = [];
    $resource('dbui.json').get(function (data) {
        $scope.databases = data;
    });
}]);
/*
var DB1JSON = '{"databases": [' +
    '{"name":"First Database",' +
    '"tables": [' +
        '{"name": "Table1",' +
        '"fields": [' +
            '{"name":"Field1", "value": "1"},' +
            '{"name":"field2", "value": "2"}' +
        ']},' +
        '{"name": "Table2",' +
        '"fields": [' +
            '{"name":"Field3", "value": "3"},' +
            '{"name":"field4", "value": "4"}' +
        ']}' +
    ']' +
    '}' + 
']}';
*/
app.factory('RiotApi', ['$resource', '$http', '$timeout', function($resource, $http, $timeout) {
    var getChampions = $resource('riotapi/champions', {}, {

    });

    return {
      getChampions: getChampions
    }
}]);
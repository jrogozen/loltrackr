app.factory('RiotApi', ['$resource', '$http', '$timeout', 
  function($resource, $http, $timeout) {

  return {
    getChampions: $resource('riotapi/champions', {}, {
      // query: {
      //   isArray: false
      // }
    })
  }

}]);


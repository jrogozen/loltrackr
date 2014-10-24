app.factory('RiotApi', ['$resource', '$http', '$timeout', 
  function($resource, $http, $timeout) {

    return {
      getChampions: $resource('riotapi/champions', {}, {
        // query: {
        //   isArray: false
        // }
      }),
      getRole: function(role) {
        console.log('get role');
        return $resource('riotapi/role/?q=' + role, {}, {
        })
      }
    }

}]);


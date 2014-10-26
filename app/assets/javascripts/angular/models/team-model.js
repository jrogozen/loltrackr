app.factory('Team', ['$resource', '$http', '$timeout', 
  function($resource, $http, $timeout) {

    return { 
      saveTeam: $resource('teams', {id: '@id'}, {
        // query: {
        //   isArray: false
        // }
      })
    }

}]);


app.factory('TeamStats', ['$resource', '$http', '$timeout', function($resource, $http, $timeout) {

    return {
      getStats: $resource('teams/', {}, {
        maxAttack: {
          isArray: false,
          url: 'teams/max-attack'
        },
        maxDefense: {
          isArray: false,
          url: 'teams/max-defense'
        }
      }),
    }

}]);


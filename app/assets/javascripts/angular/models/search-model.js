app.factory('Search', ['$resource', '$http', '$timeout', function($resource, $http, $timeout) {

    return {
      fetchSearch: $resource('search/', {}, {
        find: {
          method: 'get',
          isArray: true
        }
      })
    }

}]);
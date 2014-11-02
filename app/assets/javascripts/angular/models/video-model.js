app.factory('Video', ['$resource', '$http', '$timeout', function($resource, $http, $timeout) {

    return {
      fetch: $resource('videos/:id', {id: '@id'}, {

      }),
      findRelated: $resource('videos/:id/related/:filter', {id: '@id'}, {
        get: {
          isArray: true
        }
      })
    }

}]);
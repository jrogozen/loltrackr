app.factory('Video', ['$resource', '$http', '$timeout', function($resource, $http, $timeout) {

    return {
      upload: $resource('videos/', {id: '@id'}, {

      })
    }

}]);
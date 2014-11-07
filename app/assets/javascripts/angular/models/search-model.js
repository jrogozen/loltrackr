app.factory('Search', ['$resource', '$http', '$timeout', function($resource, $http, $timeout) {

  var searchResults = [];

  return {
    fetchSearch: $resource('search/', {}, {
      find: {
        method: 'get',
        isArray: true
      }
    }),
    searchQuery: function(data) {
      searchResults.length = 0;
      this.fetchSearch.find(data).$promise.then(function(result) {
        _.each(result, function(x) {
          searchResults.push(x);
        })
      })
    },
    searchResults: searchResults
  }

}]);
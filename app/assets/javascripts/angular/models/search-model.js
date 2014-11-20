app.factory('Search', ['$resource', '$http', '$timeout', function($resource, $http, $timeout) {

  var searchResults = [];

  var settings = {
    results: false
  }

  return {
    fetchSearch: $resource('search/', {}, {
      find: {
        method: 'get',
        isArray: true
      }
    }),
    searchQuery: function(data) {
      searchResults.length = 0;
      settings.results = false;
      this.fetchSearch.find(data).$promise.then(function(result) {
        if (result.length > 0) {
          _.each(result, function(x) {
            searchResults.push(x);
          })
          settings.results = true;
        } else {
          settings.result = false;
        }
      })
    },
    searchResults: searchResults,
    settings: settings
  }

}]);
app.controller('SearchCntrl', ['$scope', '$location', '$rootScope', '$routeParams', 'Video', 'Search', function($scope, $location, $rootScope, $routeParams, Video, Search) {

    $scope.find = function(data) {
      Search.fetchSearch.find(data).$promise.then(function(result) {
        $rootScope.searchResults = result
        $scope.search = '';
        $location.path('/search');
      });

    };

  }

]);
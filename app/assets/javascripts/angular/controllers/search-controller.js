app.controller('SearchCntrl', ['$scope', '$location', '$rootScope', '$route', '$routeParams', 'Video', 'Search', function($scope, $location, $rootScope, $route, $routeParams, Video, Search) {

    $scope.find = function(data) {
      Search.fetchSearch.find(data).$promise.then(function(result) {
        $rootScope.searchResults = result
        $scope.search = '';

        if ($location.path() === '/search') {
          $route.reload();
        } else {
          $location.path('/search');
        }
      });

    };

  }

]);
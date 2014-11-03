app.controller('HomeCntrl', ['$scope', '$rootScope', '$location', '$routeParams', 'Video', 'RiotApi', 'Search', function($scope, $rootScope, $location, $routeParams, Video, RiotApi, Search) {

    $scope.champions = RiotApi.getChampionsOnly.query();

    $scope.championImage = function(champImage) {
      return RiotApi.championImage(champImage);
    }

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
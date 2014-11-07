app.controller('SearchCntrl', ['$scope', '$location', '$rootScope', '$route', '$routeParams', 'Video', 'Search', function($scope, $location, $rootScope, $route, $routeParams, Video, Search) {

    $scope.find = function(data) {
      Search.searchQuery(data);
      $scope.search = {};
      $location.path('search');
    };

  }

]);
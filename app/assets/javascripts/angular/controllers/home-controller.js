app.controller('HomeCntrl', ['$scope', '$rootScope', '$location', '$routeParams', 'Video', 'RiotApi', 'Search', function($scope, $rootScope, $location, $routeParams, Video, RiotApi, Search) {

    $scope.champions = RiotApi.getChampionsOnly.query();

    $scope.championImage = function(champImage) {
      return RiotApi.championImage(champImage);
    }

    $scope.find = function(data) {
      Search.searchQuery(data);
      $scope.search = {};
      $location.path('search');
    };

  }

]);
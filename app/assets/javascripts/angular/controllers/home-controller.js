app.controller('HomeCntrl', ['$scope', '$rootScope', '$location', '$routeParams', 'Video', 'RiotApi', 'Search', function($scope, $rootScope, $location, $routeParams, Video, RiotApi, Search) {

    // just get RiotApi champions data (no extra info)
    $scope.champions = RiotApi.getChampionsOnly.query();

    $scope.championImage = function(champImage) {
      return RiotApi.championImage(champImage);
    }

    // handles champion search on home page
    // in the future, extract this and nav search into service model
    $scope.find = function(data) {
      Search.searchQuery(data);
      // reset search input field on submission
      $scope.search = {};
      // go to search view
      $location.path('search');
    };
    
  }

]);
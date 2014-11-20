app.controller('VideoCntrl', ['$scope', '$rootScope', '$location', '$routeParams', 'Video', 'Search', function($scope, $rootScope, $location, $routeParams, Video, Search) {

    $scope.videos = Video.fetch.query();

    $scope.searchResults = Search.searchResults;

    $scope.searchSettings = Search.settings;

    $scope.youtubeThumb = function(videoId) {
      return Video.youtubeThumb(videoId);
    }
  }

]);
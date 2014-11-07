app.controller('VideoCntrl', ['$scope', '$rootScope', '$location', '$routeParams', 'Video', 'Search', function($scope, $rootScope, $location, $routeParams, Video, Search) {

    $scope.videos = Video.fetch.query();

    $scope.searchResults = Search.searchResults;

    $scope.youtubeThumb = function(videoId) {
      if (videoId) {
        return 'http://img.youtube.com/vi/' + videoId + '/hqdefault.jpg';
      }
    }

  }

]);
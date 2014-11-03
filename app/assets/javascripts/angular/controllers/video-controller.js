app.controller('VideoCntrl', ['$scope', '$rootScope', '$location', '$routeParams', 'Video', function($scope, $rootScope, $location, $routeParams, Video) {

    $scope.videos = Video.fetch.query();

    $scope.searchResults = $rootScope.searchResults;
    
    $scope.youtubeThumb = function(videoId) {
      if (videoId) {
        return 'http://img.youtube.com/vi/' + videoId + '/hqdefault.jpg';
      }
    }

  }

]);
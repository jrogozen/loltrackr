app.controller('ViewVideoCntrl', ['$scope', '$location', '$routeParams', 'Video', function($scope, $location, $routeParams, Video) {

  $scope.video = Video.fetch.get({id: $routeParams.id});

  $scope.getIframeSrc = function(videoId) {
    return 'https://www.youtube.com/embed/' + videoId + '?rel=0&hd=1&modestbranding=1&showinfo=0';
  };


  }


]);
app.controller('NewVideoCntrl', ['$scope', '$location', '$routeParams', 'Video', function($scope, $location, $routeParams, Video) {

    $scope.submitVideo = function(data) {
      Video.fetch.save({video: data}, function() {
        $location.path('/videos');
      });
    }

  }
]);
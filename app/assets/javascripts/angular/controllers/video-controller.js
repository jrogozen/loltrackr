app.controller('VideoCntrl', ['$scope', '$location', '$routeParams', 'Video', function($scope, $location, $routeParams, Video) {

    $scope.submitVideo = function(data) {
      Video.upload.save({video: data}, function() {
        console.log('saved');
      });
    }

  }
]);
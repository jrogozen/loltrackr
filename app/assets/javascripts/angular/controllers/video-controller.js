app.controller('VideoCntrl', ['$scope', '$location', '$routeParams', 'Video', function($scope, $location, $routeParams, Video) {
    $scope.uploadFile = function(file) {
      console.log(file);
      Video.upload.save({data: file}, function(data) {
        console.log (data);
      })
    };
  }
]);
app.controller('StreamCntrl', ['$scope', '$location', '$route', '$routeParams', 'Stream', function($scope, $location, $route, $routeParams, Stream) {
    
  Stream.setup($routeParams.streamer);

  $scope.models = Stream.models;

  $scope.liveModels = Stream.liveModels;

}]);
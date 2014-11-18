app.controller('StreamCntrl', ['$scope', '$location', '$route', '$routeParams', 'Stream', function($scope, $location, $route, $routeParams, Stream) {
    
  Stream.setup($routeParams.streamer);

  $scope.settings = Stream.settings;

  $scope.models = Stream.models;

  $scope.liveModels = Stream.liveModels;

  $scope.playerModel = Stream.playerModel;

  $scope.getPlayerStats = function(playerId, champId) {
    Stream.getPlayerStats(playerId, champId);
  }

}]);
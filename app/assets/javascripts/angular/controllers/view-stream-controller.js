app.controller('ViewStreamCntrl', ['$scope', '$location', '$route', '$routeParams', 'Stream', 'Game', function($scope, $location, $route, $routeParams, Stream, Game) {
    
  Stream.setup($routeParams.streamer);

  Game.getLastGame($routeParams.streamer);

  $scope.settings = Stream.settings;

  $scope.models = Stream.models;

  $scope.gameModels = Game.models;

  $scope.liveModels = Stream.liveModels;

  $scope.playerModel = Stream.playerModel;

  $scope.getPlayerStats = function(playerId, champId) {
    Stream.getPlayerStats(playerId, champId);
  }

  $scope.addVote = function(team) {
    Game.addVote($routeParams.streamer, team);
  }

}]);
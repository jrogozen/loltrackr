app.controller('TeamStatsCntrl', ['$scope', '$location', '$routeParams', 'RiotApi', 'Team', 'TeamStats', function($scope, $location, $routeParams, RiotApi, Team, TeamStats) {
    $scope.maxOffense = TeamStats.getStats.maxAttack();
    $scope.maxDefense = TeamStats.getStats.maxDefense();
    $scope.imageUrl = "https://ddragon.leagueoflegends.com/cdn/4.20.1/img/champion/";
  }
]);
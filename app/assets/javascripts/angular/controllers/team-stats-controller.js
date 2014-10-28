app.controller('TeamStatsCntrl', ['$scope', '$location', '$routeParams', 'RiotApi', 'Team', 'TeamStats',
  function($scope, $location, $routeParams, RiotApi, Team, TeamStats) {
    $scope.maxOffense = TeamStats.getStats.maxAttack();
    $scope.maxDefense = TeamStats.getStats.maxDefense();
  }
]);
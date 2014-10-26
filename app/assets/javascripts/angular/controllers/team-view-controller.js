app.controller('TeamViewCntrl', ['$scope', '$location', '$timeout', '$routeParams', 'Team',
  function($scope, $location, $timeout, $routeParams, Team) {
    $scope.team = Team.team.get({id: $routeParams.id});
  }
])
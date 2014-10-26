app.controller('TeamViewCntrl', ['$scope', '$location', '$timeout', '$routeParams', 'Team',
  function($scope, $location, $timeout, $routeParams, Team) {

    Team.team.get({id: $routeParams.id}, function(data) {
      $scope.team = data["champions"];
      $scope.teamStats = data["info"];
    });
    
    

  }
])
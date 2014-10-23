app.controller('TeamBuilderCntrl', ['$scope', '$location', '$timeout', '$routeParams', 'RiotApi',
  function($scope, $location, $timeout, $routeParams, RiotApi) {
    $scope.champions = RiotApi.getChampions.query();

    $scope.addToTeam = function(champ) {
      if ($scope.team.length < 5) {
        $scope.team.push(champ);
      }
    }
  }
]);
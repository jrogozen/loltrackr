app.controller('TeamBuilderCntrl', ['$scope', '$location', '$timeout', '$routeParams', 'RiotApi',
  function($scope, $location, $timeout, $routeParams, RiotApi) {
    $scope.champions = RiotApi.getChampions.query();

    $scope.addToTeam = function(champ) {
      if ($scope.team.length < 5) {
        $scope.team.push(champ);

        for (var i = 0; i < $scope.champions.length; i++) {
          if ($scope.champions[i].champ) {
            // console.log($scope.champions.champ)
            if ($scope.champions[i].champ.key === champ.champ.key) {
              $scope.champions.splice(i, 1)
              break;
            }
          }
        }

      }
    }
  }
]);
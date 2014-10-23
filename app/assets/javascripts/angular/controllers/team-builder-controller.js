app.controller('TeamBuilderCntrl', ['$scope', '$location', '$timeout', '$routeParams', 'RiotApi',
  function($scope, $location, $timeout, $routeParams, RiotApi) {
    $scope.champions = RiotApi.getChampions.query();
  }
]);
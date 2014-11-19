app.controller('StreamCntrl', ['$scope', '$location', '$route', '$routeParams', 'Streams', function($scope, $location, $route, $routeParams, Streams) {

  Streams.setup();

  $scope.models = Streams.models;

}]);
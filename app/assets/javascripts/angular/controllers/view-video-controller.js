app.controller('ViewVideoCntrl', ['$scope', '$location', '$routeParams', 'Video', function($scope, $location, $routeParams, Video) {

    $scope.video = Video.fetch.get({id: $routeParams.id});

    $scope.relatedPlayer = false;
    $scope.relatedChampion = false;

    $scope.getIframeSrc = function(videoId) {
      return 'https://www.youtube.com/embed/' + videoId + '?rel=0&hd=1&modestbranding=1&showinfo=0';
    };

    $scope.getRelatedByPlayer = Video.findRelated.get({id: $routeParams.id, filter: 'player'});

    $scope.getRelatedByPlayer.$promise.then(function(data){
      if (data[0] !== undefined) {
        $scope.relatedPlayer = true;
      }
    });

    $scope.getRelatedByChampion = Video.findRelated.get({id: $routeParams.id, filter: 'champion'});

    $scope.getRelatedByChampion.$promise.then(function(data) {
      if (data[0] !== undefined) {
        $scope.relatedChampion = true;
      }
    });

  }

]);
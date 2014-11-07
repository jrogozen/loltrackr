app.controller('ViewVideoCntrl', ['$scope', '$location', 'anchorSmoothScroll', '$routeParams', 'Video', 'Youtube', function($scope, $location, anchorSmoothScroll, $routeParams, Video, Youtube) {

    Youtube.setup($routeParams.id);

    $scope.video = Youtube.models.video;
    $scope.settings = Youtube.settings;
    $scope.youtubeSettings = Youtube.youtubeSettings;
    $scope.plays = Youtube.models.plays;

    // scope for related videos
    $scope.getRelatedByPlayer = Youtube.models.relatedByPlayer;
    $scope.getRelatedByChampion = Youtube.models.relatedByChampion;

    $scope.startAddPlay = function() {
      Youtube.settings.playForm = true;
    }

    $scope.sendTime = function(time) {
      Youtube.changeTime(time);
      anchorSmoothScroll.scrollTo('video');
    };

    $scope.addPlay = function(play) {
      Youtube.addPlay(play, $routeParams.id);
    }

  }

]);
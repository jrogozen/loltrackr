app.controller('ViewVideoCntrl', ['$scope', '$location', 'anchorSmoothScroll', '$routeParams', 'Video', 'Youtube', function($scope, $location, anchorSmoothScroll, $routeParams, Video, Youtube) {

    // initialize Youtube player settings and load Video models
    Youtube.setup($routeParams.id);
    Video.setup($routeParams.id);
    
    /* set scopes. 
    look into bypassing this and referencing 
    models.modelName directly in HTML for easier data binding */
    $scope.video = Youtube.models.video;
    $scope.settings = Video.settings;
    $scope.youtubeSettings = Youtube.youtubeSettings;
    $scope.plays = Video.models.plays;

    // scope for related videos
    $scope.getRelatedByPlayer = Video.models.relatedByPlayer;
    $scope.getRelatedByChampion = Video.models.relatedByChampion;

    $scope.startAddPlay = function() {
      Video.settings.playForm = true;
    }

    $scope.sendTime = function(time) {
      Youtube.changeTime(time);
      // scroll to top of page(video) when play is clicked
      anchorSmoothScroll.scrollTo('video');
    };

    $scope.addPlay = function(play) {
      Video.addPlay(play, $routeParams.id);
    }

  }

]);
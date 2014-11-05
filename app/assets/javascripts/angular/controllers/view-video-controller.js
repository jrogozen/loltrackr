app.controller('ViewVideoCntrl', ['$scope', '$location', 'anchorSmoothScroll', '$routeParams', 'Video', function($scope, $location, anchorSmoothScroll, $routeParams, Video) {

    $scope.video = Video.fetch.get({id: $routeParams.id});

    $scope.relatedPlayer = false;
    $scope.relatedChampion = false;

    $scope.videoLoaded = false;

    $scope.video.$promise.then(function(data) {
      $scope.yt.videoid = data.info.youtube_id;
      $scope.videoLoaded = true;
    });

    $scope.yt = {
      width: 600, 
      height: 480,
      time: 0
    };

    $scope.sendTime = function (time) {
      var minutes = parseInt(time["minutes"]);
      var seconds = parseInt(time["seconds"]);

      $scope.yt.time = (minutes * 60) + seconds;

      anchorSmoothScroll.scrollTo('video');
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

    $scope.addPlay = function(play) {
      play_object = play
      play_object.video_id = $routeParams.id
      Video.savePlay(play_object).$promise.then(function() {
        // update scope by calling resource again
        $scope.plays = Video.play.query({video_id: $routeParams.id});
      });

    }

    $scope.plays = Video.play.query({video_id: $routeParams.id});

  }

]);
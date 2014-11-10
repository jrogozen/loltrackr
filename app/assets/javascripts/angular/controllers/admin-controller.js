app.controller('AdminCntrl', ['$scope', '$rootScope', '$location', '$route', '$routeParams', 'User', 'Video', function($scope, $rootScope, $location, $route, $routeParams, User, Video) {

    User.setup();

    $scope.currentUser = User.models.user
    $scope.settings = User.settings

    $scope.authUser = function(user) {
      User.login(user);
    }

    $scope.logOut = function() {
      User.logout();
    }

    $scope.delete = function(video) {
      video.$delete();
      $route.reload();
    }

    $scope.deletePlay = function(play, video) {
      x = Video.play.get({video_id: video.id, id: play.id}).$promise.then(function(p) {
        p.$delete();
        $route.reload();
      });
    }

    $scope.videos = Video.fetch.query();

  }

]);
app.controller('AdminCntrl', ['$scope', '$rootScope', '$location', '$routeParams', 'User', function($scope, $rootScope, $location, $routeParams, User) {

    User.setup();

    $scope.currentUser = User.models.user
    $scope.settings = User.settings

    $scope.authUser = function(user) {
      User.login(user);
    }

    $scope.logOut = function() {
      User.logout();
    }

  }

]);
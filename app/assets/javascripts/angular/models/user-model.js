app.factory('User', ['$resource', '$route', 'Video', function($resource, $route, Video) {

  var userResource = $resource('/user', {}, {
  });

  // model object holds user data that will be used in controller
  var models = {}

  // ngResource that creates and deletes rails sessions
  var sessionResource = $resource('/sessions', {}, {
    create: {
      method: 'post',
      url: 'login',
    },
    destroy: {
      method: 'get',
      url: 'logout'
    }
  });

  var login = function(user) {
    sessionResource.create(user).$promise.then(function() {
      settings.loggedIn = true;
      $route.reload();
    });
  }

  var currentUser = function() {
    models.user = userResource.get();
    models.user.$promise.then(function(data) {
      // check to see if the user has an id (exists)
      if (models.user.id) {
        // toggle settings to display different divs in view
        settings.loggedIn = true;
      }
    });
  };

  var logout = function() {
    sessionResource.destroy().$promise.then(function(){
      settings.loggedIn = false;
      $route.reload();
    });
  }

  var setup = function() {
    // initialize these functions when setup is run
    currentUser();
  }

  var settings = {
    loggedIn: false
  }

  return {
    login: login,
    logout: logout,
    setup: setup,
    settings: settings,
    models: models
  }

}]);
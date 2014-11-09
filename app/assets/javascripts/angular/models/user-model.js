app.factory('User', ['$resource', '$route', function($resource, $route) {

  var userResource = $resource('/user', {}, {
  });

  var models = {}

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
      if (models.user.id) {
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
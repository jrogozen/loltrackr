app.factory('Streams', ['$resource', '$route', '$sce', function($resource, $route, $sce) {

  var models = {};

  var fetch = $resource('streams/all', {}, {});

  var setup = function() {
    models.streams = fetch.query();
  }

  return {
    fetch: fetch,
    models: models,
    setup: setup
  }

}]);
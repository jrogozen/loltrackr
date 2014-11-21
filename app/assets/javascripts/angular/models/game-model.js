app.factory('Game', ['$resource', '$http', '$timeout', function($resource, $http, $timeout) {

  var models = {};

  var fetch = $resource('streams/:streamer/games/last', {}, {

  });

  var modify = $resource('streams/:streamer/games', {streamer: '@streamer'}, {
    add: {
      method: 'post'
    }
  })

  var getLastGame = function(stream) {
    models.game = fetch.get({streamer: stream});
  }

  var addVote = function(stream, team) {
    modify.add({streamer: stream, team: team})
  }

  return {
    fetch: fetch,
    models: models,
    getLastGame: getLastGame,
    addVote: addVote
  }

}]);
app.factory('Video', ['$resource', '$http', '$timeout', '$route', 'RiotApi', function($resource, $http, $timeout, $route, RiotApi) {

    var models = {};

    var fetch = $resource('videos/:id', {id: '@id'}, {

    });

    var findRelated = $resource('videos/:id/related/:filter', {id: '@id'}, {
      get: {
        isArray: true
      }
    });

    var play = $resource('videos/:video_id/plays/:id', {video_id: '@video_id', id: '@id'}, {
      query: {
        isArray: false
      }
    })

    var setup = function(videoId) {
      models.relatedByPlayer = findRelated.get({id: videoId, filter: 'player'});
      models.relatedByChampion = findRelated.get({id: videoId, filter: 'champion'});
      models.plays = play.query({video_id: videoId});

      models.relatedByPlayer.$promise.then(function(data){
        settings.relatedPlayer = !!data[0];
      });

      models.relatedByChampion.$promise.then(function(data) {
        settings.relatedChampion = !!data[0];
      });
    }

    var settings = {
      relatedPlayer: false,
      relatedChampion: false,
      playForm: false,
      videoLoaded: false
    }

    /* clean up these two functions */
    var savePlay = function(p) {
      play_object = {}

        // add player tags
        if (p.players) {
          var players = _.map(p.players.split(","), function(x) {return x.trim();});
          play_object.players = players;
        }

        // add description
        var description = p.description;
        play_object.description = description;

        play_object.minute = p.minute;
        play_object.second = p.second;

        return play.save({play: play_object, video_id: p.video_id});
    }

    var addPlay = function(play, videoId) {
      playObject = play
      playObject.video_id = videoId
      savePlay(playObject).$promise.then(function() {
        $route.reload();
      });
      settings.playForm = false;
    }

    return {
      setup: setup,
      settings: settings,
      fetch: fetch,
      models: models,
      findRelated: findRelated,
      addPlay: addPlay,
      play: play
    }

}]);


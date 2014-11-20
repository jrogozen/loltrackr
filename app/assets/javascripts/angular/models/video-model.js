app.factory('Video', ['$resource', '$http', '$timeout', '$route', 'RiotApi', function($resource, $http, $timeout, $route, RiotApi) {

    // object that holds what will later be turned into scope variables in controller
    var models = {};

    var fetch = $resource('videos/:id', {id: '@id'}, {
      latest: {
        url: "videos/latest",
        method: "get",
        isArray: true
      }
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

    var getLatest = function() {
      models.latestVideos = fetch.latest();
    }

    var youtubeThumb = function(videoId) {
      if (videoId) {
        return 'http://img.youtube.com/vi/' + videoId + '/hqdefault.jpg';
      }
    };

    var setup = function(videoId) {
      // grab related videos and plays
      models.relatedByPlayer = findRelated.get({id: videoId, filter: 'player'});
      models.relatedByChampion = findRelated.get({id: videoId, filter: 'champion'});
      models.plays = play.query({video_id: videoId});

      // handle display or related video view
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

    /* clean up following two functions */
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
      play: play,
      getLatest: getLatest,
      youtubeThumb: youtubeThumb
    }

}]);


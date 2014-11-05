app.factory('Video', ['$resource', '$http', '$timeout', 'RiotApi', function($resource, $http, $timeout, RiotApi) {

    return {
      fetch: $resource('videos/:id', {id: '@id'}, {

      }),
      findRelated: $resource('videos/:id/related/:filter', {id: '@id'}, {
        get: {
          isArray: true
        }
      }),
      play: $resource('videos/:video_id/plays', {video_id: '@video_id'}, {
        query: {
          isArray: false
        }
      }),
      savePlay: function(play) {
        play_object = {}

        // add player tags
        if (play.players) {
          var players = _.map(play.players.split(","), function(p) {return p.trim();});
          play_object.players = players;
        }

        // add description
        var description = play.description;
        play_object.description = description;

        play_object.minute = play.minute;
        play_object.second = play.second;

        console.log(play_object);

        return this.play.save({play: play_object, video_id: play.video_id});
      },
    }

}]);


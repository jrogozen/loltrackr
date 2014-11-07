app.factory('Youtube', ['Video', '$route', function(Video, $route) {

  var models = {};

  var youtubeSettings = {
    width: 600,
    height: 480,
    time: 0
  };

  var setup = function(videoId) {
    models.relatedByPlayer = Video.findRelated.get({id: videoId, filter: 'player'});
    models.relatedByChampion = Video.findRelated.get({id: videoId, filter: 'champion'});
    models.video = Video.fetch.get({id: videoId});
    models.plays = Video.play.query({video_id: videoId});

    models.relatedByPlayer.$promise.then(function(data){
      settings.relatedPlayer = !!data[0];
    });

    models.relatedByChampion.$promise.then(function(data) {
      settings.relatedChampion = !!data[0];
    });

    models.video.$promise.then(function(data) {
      youtubeSettings.videoid = data.info.youtube_id;
      settings.videoLoaded = true;
    });
  };

  var settings = {
    relatedPlayer: false,
    relatedChampion: false,
    videoLoaded: false,
    playForm: false
  };


  var changeTime = function(time) {
    var minutes = parseInt(time["minutes"]);
    var seconds = parseInt(time["seconds"]);

    if (!minutes) {
      minutes = 0;
    }

    youtubeSettings.time = (minutes * 60) + seconds;
  };

  var addPlay = function(play, videoId) {
    playObject = play
    playObject.video_id = videoId
    Video.savePlay(playObject).$promise.then(function() {
      $route.reload();
    });
    settings.playForm = false;
  }
  
  return {
    setup: setup,
    settings: settings,
    youtubeSettings: youtubeSettings,
    models: models,
    changeTime: changeTime,
    addPlay: addPlay
  };
}]);
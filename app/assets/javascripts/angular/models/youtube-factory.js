app.factory('Youtube', ['Video', '$route', function(Video, $route) {

  var models = {};

  var youtubeSettings = {
    width: 600,
    height: 480,
    time: 0
  };

  var setup = function(videoId) {
    models.video = Video.fetch.get({id: videoId});
   
    models.video.$promise.then(function(data) {
      youtubeSettings.videoid = data.info.youtube_id;
      Video.settings.videoLoaded = true;
    });
  };

  var changeTime = function(time) {
    var minutes = parseInt(time["minutes"]);
    var seconds = parseInt(time["seconds"]);

    if (!minutes) {
      minutes = 0;
    }

    youtubeSettings.time = (minutes * 60) + seconds;
  };

  return {
    setup: setup,
    youtubeSettings: youtubeSettings,
    models: models,
    changeTime: changeTime
  };
}]);
app.directive('youtube', ['$window', '$q', 'YouTubeLoader', function($window, $q, YouTubeLoader) {
  return {
    restrict: "E",

    scope: {
      height: "@",
      width: "@",
      videoid: "@",
      time: "@"
    },

    template: '<div></div>',

    link: function(scope, element) {

      var player;
      var loaded = false;

      YouTubeLoader.load.then(function() {

        player = new YT.Player(element.children()[0], {
          playerVars: {
            autoplay: 1,
            html5: 1,
            modestbranding: 1,
            iv_load_policy: 3,
            showinfo: 0,
            controls: 1,
            rel: 0
          },

          height: scope.height,
          width: scope.width,
          videoId: scope.videoid, 
          time: scope.time
        });

        scope.$watch('time', function(newValue, oldValue) {
          if (player && (newValue !== oldValue)) {
            player.seekTo(newValue, true);
          }
        }); 
       

      })

    }  
  };
}]);
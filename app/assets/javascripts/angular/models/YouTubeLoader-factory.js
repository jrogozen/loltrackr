app.factory('YouTubeLoader', ['$window', '$q', function($window, $q) {

  var load_youtube = function() {
    var tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    var deferred = $q.defer();

    $window.onYouTubeIframeAPIReady = function() {
      deferred.resolve();
    }

    return deferred.promise;

  }

  return {    

    load: load_youtube()

  }

}]);

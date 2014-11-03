app.factory('RiotApi', ['$resource', '$http', '$timeout', function($resource, $http, $timeout) {
    var getChampions = $resource('riotapi/champions', {}, {

    });

    return {
      getChampions: getChampions,
      championImage: function(champImage) {
        return "https://ddragon.leagueoflegends.com/cdn/4.18.1/img/champion/" + champImage;
      }
    }
}]);
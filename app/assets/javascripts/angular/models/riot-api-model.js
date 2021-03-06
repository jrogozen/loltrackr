app.factory('RiotApi', ['$resource', '$http', '$timeout', function($resource, $http, $timeout) {
    var getChampions = $resource('riotapi/champions', {}, {
      query: {
        isArray: false
      }
    });

    var getChampionsOnly = $resource('riotapi/champions-only', {}, {
      byId: {
        method: 'get',
        url: 'riotapi/champion-by-id'
      }
    });

    return {
      getChampions: getChampions,
      getChampionsOnly: getChampionsOnly,
      championImage: function(champImage) {
        return "https://ddragon.leagueoflegends.com/cdn/4.20.1/img/champion/" + champImage;
      }
    }
}]);
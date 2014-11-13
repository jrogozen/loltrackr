app.factory('Stream', ['$resource', '$route', '$sce', 'RiotApi', function($resource, $route, $sce, RiotApi) {

  var models = {
    gameData: {}
  }

  var liveModels = {
    displayTeams: {
      "one": [],
      "two": []
    }
  }

  var playerModel = {

  }

  var fetch = $resource('streams/:id', {id: '@id'}, {
    getGameData: {
      url: "streams/game_data",
      method: "get"
    },
    getPlayerData: {
      url: "riotapi/player-champion-stats",
      method: "get"
    }
  });

  var settings = {

  }

  var createPlayer = function(stream) {
    return '<object type="application/x-shockwave-flash" height="auto" width="auto" id="live_embed_player_flash" data="http://www.twitch.tv/widgets/live_embed_player.swf?channel=' + stream + '" bgcolor="#000000">' +
      '<param  name="allowFullScreen" value="true" />' +
      '<param  name="allowScriptAccess" value="always" />' +
      '<param  name="allowNetworking" value="all" />' +
      '<param  name="movie" value="http://www.twitch.tv/widgets/live_embed_player.swf" />' +
      '<param  name="flashvars" value="hostname=www.twitch.tv&channel=' + stream + '&auto_play=true" />' +
      '</object';
  }

  var getPlayerStats = function(playerId, champId) {
    stats = fetch.getPlayerData({player_id: playerId, champ_id: champId}).$promise;
    stats.then(function(data) {
      playerModel.stats = data;
    })
  }
 
  var setup = function(stream) {
    models.streamInfo = fetch.get({streamer: stream});
    models.player = $sce.trustAsHtml(createPlayer(stream));

    // set game information from third party API
    liveModels.data = fetch.getGameData({streamer: stream}).$promise.then(function(response) {

      if (response.data) {

        liveModels.teams = {};
        liveModels.teams["one"] = response.data.game.teamOne;
        liveModels.teams["two"] = response.data.game.teamTwo;
        liveModels.playerChampionSelections = response.data.game.playerChampionSelections;

        var pointer, player_champ_object;

        if (liveModels.displayTeams.one.length > 0) {
          liveModels.displayTeams.one.length = 0;
        } else if (liveModels.displayTeams.two > 0) {
          liveModels.displayTeams.two.length = 0;
        }

        _.each(liveModels.teams, function(team, num) {
          _.each(team, function(p) {
            champId = matchPlayersToChampions(p.summonerInternalName);
            liveModels.displayTeams[num].push({champ: champId, player: {name: p.summonerName, id: p.summonerId}});
            // pointer.then(function(data) {
            //   liveModels.displayTeams[num].push({champ: data, player: {name: p.summonerName, id: p.summonerId}});
            // });
          })
        });

      }

    });
        
  };

  var matchPlayersToChampions = function(internalName) {
    var selectedChamps = liveModels.playerChampionSelections;

    var match = _.filter(selectedChamps, function(p) {
      return p.summonerInternalName === internalName;
    });

    return match[0].championId;
  }

  return {
    fetch: fetch,
    models: models,
    liveModels: liveModels,
    playerModel: playerModel,
    setup: setup,
    getPlayerStats: getPlayerStats
  }

}]);
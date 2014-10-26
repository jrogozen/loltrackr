app.factory('Team', ['$resource', '$http', '$timeout', 
  function($resource, $http, $timeout) {

    return { 
      team: $resource('teams/:id', {id: '@id'}, {
        // query: {
        //   isArray: false
        // }
      }),
      calculateStats: function(team) {
        // team is an array of champions with API info
        var teamStats = {
          attack: 0,
          defense: 0,
          ap: 0,
          ad: 0
        };

        _.each(team, function(champ) {
          teamStats["attack"] = teamStats["attack"] + ((champ["stats"]["attackdamage"] + (champ["stats"]["attackdamageperlevel"] * 18)) + (champ["stats"]["attackspeedoffset"] + (champ["stats"]["attackspeedperlevel"] * 18)) + (champ["stats"]["mp"] + (champ["stats"]["mpperlevel"] * 18))) * 2.5;
          teamStats["defense"] = teamStats["defense"] + ((champ["stats"]["armor"] + (champ["stats"]["armorperlevel"] * 18)) + (champ["stats"]["hp"] + (champ["stats"]["hpperlevel"] * 18)) + (champ["stats"]["spellblock"] + (champ["stats"]["spellblockperlevel"] * 18)));

          var tags = _.sortBy(champ["tags"], function(tag) {
            return tag;
          });

          if (_.contains(tags, "Mage") && !(_.contains(tags, "Marksman"))) {
            teamStats["ap"] ++;
          } else {
            // console.log('not mage found!');
            teamStats["ad"] ++;
          }

        });
        return teamStats;
      },
      calculateComp: function(team) {
        var team_comp = [
          {name: "poke", count: 0}, 
          {name: "aoe", count: 0}, 
          {name: "pick", count: 0}, 
          {name: "engage", count: 0}, 
          {name: "protect", count: 0}, 
          {name: "push", count: 0}
        ];
       
       _.each(team, function(value, index) {
        if (value.role) {
          _.each(value.role, function(v, i) {
            if (v === 'Poke') {
              team_comp[0]["count"] ++;
            } else if (v === 'Aoe') {
              team_comp[1]["count"] ++;
            } else if (v === 'Pick') {
              team_comp[2]["count"] ++;
            } else if (v === 'Engage') {
              team_comp[3]["count"] ++;
            } else if (v === 'Protect') {
              team_comp[4]["count"] ++;
            } else if (v === 'Push') {
              team_comp[5]["count"] ++;
            }
          });
        }
       });
       return _.max(team_comp, function(comp){ return comp.count; });
      },
      addTeam: function(team, champions, filtered, champ) {
        if (team.length < 5) {
          team.push(champ);

          // delete from champions array
          for (var i = 0; i < champions.length; i++) {
            if (champions[i]) {
              if (champions[i].key === champ.key) {
                champions.splice(i, 1);
                break;
              }
            }
          }

          // delete from filtered array
          if (filtered) {
            for (var i = 0; i < filtered.length; i++) {
              if (filtered[i]) {
                if (filtered[i].key === champ.key) {
                  filtered.splice(i, 1);
                  break;
                }
              }
            }
          }
        }
      }


    }

}]);


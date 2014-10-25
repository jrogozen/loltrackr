app.controller('TeamBuilderCntrl', ['$scope', '$location', '$timeout', '$routeParams', 'RiotApi',
  function($scope, $location, $timeout, $routeParams, RiotApi) {

    $scope.imageUrl = "http://ddragon.leagueoflegends.com/cdn/4.18.1/img/champion/";

    $scope.champions = RiotApi.getChampions.query();

    $scope.showSuggestions = false;

    $scope.showChampions = true;

    var filterList = function(role) {
      $scope.filteredChampions = []
      _.each($scope.champions, function(champ) {
        if (_.contains(champ.role, role)) {

          $scope.filteredChampions.push(champ);
        }
      })
    }

    var checkTeamLength = function() {
      if ($scope.team.length >= 5) {
        $scope.showChampions = false;
      }
    }

    var calculateTeamStats = function() {
      var teamStats = {
        attack: 0,
        //attack + crit + attackspeed
        defense: 0,
        ap: 0,
        ad: 0
        //spellblock + armor + health
      };

      _.each($scope.team, function(champ) {
        teamStats["attack"] = teamStats["attack"] + ((champ["stats"]["attackdamage"] + (champ["stats"]["attackdamageperlevel"] * 18)) + (champ["stats"]["attackspeedoffset"] + (champ["stats"]["attackspeedperlevel"] * 18)) + (champ["stats"]["mp"] + (champ["stats"]["mpperlevel"] * 18)));
        teamStats["defense"] = teamStats["defense"] + ((champ["stats"]["armor"] + (champ["stats"]["armorperlevel"] * 18)) + (champ["stats"]["hp"] + (champ["stats"]["hpperlevel"] * 18)) + (champ["stats"]["spellblock"] + (champ["stats"]["spellblockperlevel"] * 18)));

        var tags = _.sortBy(champ["tags"], function(tag) {
          return tag;
        });

        _.all(tags, function(tag) {
          if (tag === "Mage") {
            teamStats["ap"] ++;
          } else {
            teamStats["ad"] ++;
          }
          return;
        });

      });

      $scope.teamStats = teamStats;
    }

    $scope.addToTeam = function(champ) {
      $scope.champ = {
        name: null
      }

      if ($scope.team.length < 5) {
        $scope.team.push(champ);

        // delete from champions array
        for (var i = 0; i < $scope.champions.length; i++) {
          if ($scope.champions[i]) {
            if ($scope.champions[i].key === champ.key) {
              $scope.champions.splice(i, 1);
              break;
            }
          }
        }

        // delete from filtered array
        if ($scope.filteredChampions) {
          for (var i = 0; i < $scope.filteredChampions.length; i++) {
            if ($scope.filteredChampions[i]) {
              if ($scope.filteredChampions[i].key === champ.key) {
                console.log($scope.filteredChampions[i]);
                console.log($scope.filteredChampions.length);
                $scope.filteredChampions.splice(i, 1);
                console.log($scope.filteredChampions.length);

                break;
              }
            }
          }
        }

        checkTeamLength();
        $scope.calculateTeamComp();
      } 
    };

    $scope.calculateTeamComp = function() {

      var team_comp = [
        {name: "poke", count: 0}, 
        {name: "aoe", count: 0}, 
        {name: "pick", count: 0}, 
        {name: "engage", count: 0}, 
        {name: "protect", count: 0}, 
        {name: "push", count: 0}
      ];

      $.each($scope.team, function( index, value ) {
        if (value.role) {
          $.each(value.role, function( i, v ) {
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
      
        var selected_role = _.max(team_comp, function(comp){ return comp.count; });

        $scope.role = selected_role.name;

        filterList($scope.role.charAt(0).toUpperCase() + $scope.role.slice(1));
        // $scope.filteredChampions = RiotApi.getRole($scope.role).query();

        $scope.showSuggestions = true;

        calculateTeamStats();

      });
    };

  




  }
]);
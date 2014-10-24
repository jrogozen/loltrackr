app.controller('TeamBuilderCntrl', ['$scope', '$location', '$timeout', '$routeParams', 'RiotApi',
  function($scope, $location, $timeout, $routeParams, RiotApi) {

    $scope.imageUrl = "http://ddragon.leagueoflegends.com/cdn/4.18.1/img/champion/";

    $scope.champions = RiotApi.getChampions.query();

    $scope.showSuggestions = false;

    $scope.showChampions = true;

    var checkTeamLength = function() {
      if ($scope.team.length >= 5) {
        $scope.showChampions = false;
      }
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

        // delete from selected array
        if ($scope.filteredChampions) {
          for (var i = 0; i < $scope.filteredChampions.length; i++) {
            if ($scope.filteredChampions[i]) {
              if ($scope.filteredChampions[i].key === champ.key) {
                $scope.filteredChampions.splice(i, 1);
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

      var team_comp = [{name: "poke", count: 0}, {name: "aoe", count: 0}, {name: "pick", count: 0}, {name: "engage", count: 0}, {name: "protect", count: 0}, {name: "push", count: 0}];

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
        $scope.filteredChampions = RiotApi.getRole($scope.role).query();
        $scope.showSuggestions = true;

      });
    };

  




  }
]);
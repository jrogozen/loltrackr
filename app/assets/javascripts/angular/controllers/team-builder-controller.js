app.controller('TeamBuilderCntrl', ['$scope', '$location', '$timeout', '$routeParams', 'RiotApi', 'Team',
  function($scope, $location, $timeout, $routeParams, RiotApi, Team) {

    $scope.imageUrl = "http://ddragon.leagueoflegends.com/cdn/4.18.1/img/champion/";

    $scope.champions = RiotApi.getChampions.query();

    $scope.showSuggestions = false;

    $scope.showChampions = true;

    $scope.showTeam = false;

    $scope.showCompleteTeam = false;

    $scope.showUrl = false;

    $scope.url = "";

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
        $scope.showCompleteTeam = true;
      }
    }

    var calculateTeamStats = function(team) {
      $scope.teamStats = Team.calculateStats(team);
    }

    $scope.saveTeam = function(teamData) {
      Team.team.save({team: teamData, stats: $scope.teamStats}, function(data) {
        $scope.url = data.urlhash;
        $scope.showUrl = true;
      });
    };

    $scope.addToTeam = function(champ) {
      $scope.champ = {
        name: null
      }

      Team.addTeam($scope.team, $scope.champions, $scope.filteredChampions, champ);

      $scope.showTeam = true;
      checkTeamLength();
      $scope.calculateTeamComp($scope.team);
    };

    $scope.calculateTeamComp = function(team) {
      $scope.role = Team.calculateComp(team).name;
      filterList($scope.role.charAt(0).toUpperCase() + $scope.role.slice(1));
      $scope.showSuggestions = true;
      calculateTeamStats($scope.team);
    };

  }
]);
app.filter('championToIcon', ['RiotApi', function(RiotApi) {
    var champions = RiotApi.getChampionsOnly.query();

    var byName = function(champ){
      return champ.key.toLowerCase() === this.filter.toLowerCase();
    }

    return function(item) {

      champion = champions.filter(byName, {"filter":item.trim()});

      if (champion[0]) {
        return '<img src="https://ddragon.leagueoflegends.com/cdn/4.18.1/img/champion/' + champion[0]["key"].replace(/'/g, '') + '.png">';
      }

    }
  }
]);


app.filter('playerTrim', [function() {
    return function(item) {
      return item.trim();
    }
  }
]);

app.filter('teamTrim', [function() {
    return function(item) {
      return item.trim();
    }
  }
]);
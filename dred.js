function dred(t1, t2) {
  // Keys
  // 0 = grass
  // 1 = defensive player
  // 2 = offensive line
  // 3 = ball
  // player|3 = player with the ball
  // player|03 = ball over a player
  // Games played twice the avg stats of t1 against t2 off vis versa
  // In meters
  this.field = _.chunk(_.fill(Array(110*49), 0), 49);
  var field = this.field;
  var chains = 50; // Ten meters so between 50 & 60 with 55 at 1/2
  var down = 1;
  // t1 <= 55 centers at 25
  //   d
  // -----
  //   o
  // t2 >= 56
  var t1D = avgTeam(t1); // 1
  var t2D = avgTeam(t2); // 2
  // Place defence
  //   [ y][ x]
  field[55][25] = 1; // center
  field[54][25] = 1; // player behind center
  field[55][26] = 1; // Right side line
  field[55][27] = 1;
  field[55][24] = 1; // Left side line
  field[55][23] = 1;
  field[52][35] = 1; // Right side corner 10yds from center
  field[52][15] = 1; // Left side corner
  field[50][30] = 1; // Right Wing
  field[50][20] = 1; // Left Wing
  field[45][25] = 1; // Safety 10 yards off

  // Place offence
  field[56][25] = "2|3"; // center starts with the ball
  field[56][26] = 2; // Right side line
  field[56][27] = "TE|0";
  field[56][24] = 2; // Left side line
  field[56][23] = 2;
  field[56][34] = "WR|1"; // Z 9yds from center
  field[56][16] = "WR|0"; // X corner
  field[57][31] = "RB|1"; // H
  field[57][19] = "RB|0"; // B
  field[60][25] = "QB|0"; // QB
  field[61][25] = "FLEX|0"; // a

  this.play = function () {
    for (var x = 0; x < field.length; x++) {
      for (var y = 0; y < field[0].length; y++) {
        var m = mS(x,y);
        if (m.hb || m.bo || m.b || m.o) {
          console.log(m);
        }
      }
    }
  }
  // meter stat
  function mS(x,y) {
    var res = {
      // Has Ball
      "hb": false,
      // Ball over
      "bo": false,
      // Blocked
      "b": false,
      // Open
      "o": false,
      // Position
      "p": ""
    };
    var m = field[x][y].toString();
    // Set the position
    res.p = m;
    // Skip if grass
    if (m != "0") {
      var s = m.split("|");
      if (s.length == 3) {
        // Player has ball or it is over him
        if (s[2] == "3") {
          res.hb = true;
        } else {
          res.bo = true;
        }
      }
      if (s.length == 2 && s[0] == "2") {
        // Center or lineman has ball or it is over him
        if (s[1] == "3") {
          res.hb = true;
        } else {
          res.bo = true;
        }
      }
      // Check to see if anyone is directly on him
      for (var xO = -1; xO < 1; xO++) {
        for (var yO = -1; yO < 1; yO++) {
          if (field[x+xO]) {
            if (field[x+xO][y+yO]) {
              if (field[x+xO][y+yO] == 1) {
                res.b = true;
              }
            }
          }
        }
      }
      // if blocked then not open duh
      if (!res.b) {
        res.o = true;
        // Check to see if anyone is one him with in 3m
        for (var xO = -3; xO < 3; xO++) {
          for (var yO = -3; yO < 3; yO++) {
            if (field[x+xO]) {
              if (field[x+xO][y+yO]) {
                if (field[x+xO][y+yO] == 1) {
                  res.o = false;
                }
              }
            }
          }
        }
      }
    }
    return res;
  }
  function avgTeam(team) {
    var teamStats = {"age": 0,"speed": 0,"strength": 0,"endurance": 0,"agilty": 0};
    for (var position in team) {
      var player = team[position];
      for (var i = 0; i < player.length; i++) {
        teamStats.age += player[i].age;
        teamStats.speed += player[i].speed;
        teamStats.strength += player[i].strength;
        teamStats.endurance += player[i].endurance;
        teamStats.agilty += player[i].agilty;
      }
    }
    teamStats.age = Math.floor(teamStats.age/14);
    teamStats.speed = Math.floor(teamStats.speed/14);
    teamStats.strength = Math.floor(teamStats.strength/14);
    teamStats.endurance = Math.floor(teamStats.endurance/14);
    teamStats.agilty = Math.floor(teamStats.agilty/14);
    return teamStats;
  }
}

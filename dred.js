function dred(t1, t2) {
  // Keys
  // 0 = grass
  // 1 = defensive player
  // 2 = offensive line
  // 3 = ball
  // player|3 = player with the ball
  // player|m|b|03 = ball over a player with slope and yint
  // 10|m|b|03 = ball over grass that belongs to defence with slope and yint
  // if -b the x goes back +b goes forward so Math.abs() the b every time should only happen on snap
  // Math.min(Math.max(b,-1),1) == (-1/1)
  // Games played twice the avg stats of t1 against t2 off vis versa
  // In meters
  this.field = [];
  for (var y = 0; y < 110; y++) {
    this.field[y] = [];
    for (var x = 0; x < 49; x++) {
      this.field[y].push(0);
    }
  }
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
  field[56][25] = "2|0|-25"; // center starts with the ball 0 slope and -25 yint;
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

  field[30][25] = "10|03"

  this.play = function () {
    var players = [];
    for (var x = 0; x < field.length; x++) {
      for (var y = 0; y < field[0].length; y++) {
        var m = mS(x,y);
        if (m.p != "0") {
          players.push([m,x,y]);
        }
      }
    }
    // Sort O & D;
    var offence;
    var ball;
    // [offence,defence]
    var od = [[],[]];
    for (var i = 0; i < players.length; i++) {
      var p = players[i][0];
      var index = parseInt(p.p.slice(0,1)) || Math.min(p.p.length,2);
      od[index-1].push(players[i]);
      if (p.hb || p.bo) {
        offence = index-1;
        ball = i;
      }
    }
    console.log(offence,od);
    var playing = true;
    while (playing) {
      if (players[ball][0]-10 < chains) {
        // 1st down
      } else if (down >= 4) {
        // Turn over
        playing = false;
      } else {

      }
      playing = false;
    }
  }
  // meter stat
  function mS(x,y) {
    //          Has Ball    Ball Over   Blocked    Position
    var res = {"hb": false,"bo": false,"b": false,"p": ""};
    var m = field[x][y].toString();
    // Set the position
    res.p = m;
    var b = parseInt(m.slice(0,1)) || Math.min(m.length,2);
    if (m != "0") {
      res.hb = m.split("|").pop() == "3";
      res.bo = m.split("|").pop() == "03";
      for (var xO = -1; xO < 2; xO++) {
        for (var yO = -1; yO < 2; yO++) {
          var block = field[Math.max(x+xO, 0)][Math.max(y+yO, 0)].toString();
          var t = parseInt(block.slice(0,1)) || Math.min(block.length,2);
          if (t != b && block != m && block != "0") {
            res.b = true;
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

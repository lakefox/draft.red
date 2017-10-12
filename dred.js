function dred(t1, t2) {
  // [[offence play, defence play, line, down, off]]
  var plays = [];
  var teams = [t1,t2];
  var scoreBoard = [0,0];
  var random = new alea(JSON.stringify(t1),JSON.stringify(t2));
  var coinflip = parseInt(random()*2);
  var off = coinflip;
  var line = 0;
  var down = 1;
  var ball = 50;
  console.log(off);

  var kicker = rate(teams[off].k[0]);
  var dist = Math.min((Math.round((random()+kicker)*5)+1)*10, 50); // calc kick
  if (dist < 50) {
    // Turn over
    off = Math.round(Math.abs(Math.min(Math.max(off,0.1),1)-1)); // Lol $) This just inverts the off 1=0 0=1
  } else {
    // Move the ball correctly + for t1 - for t2
    ball = ((dist+30)*((off*-2)+1));
    if (ball < 0) {
        ball = 100+ball;
    }
  }
  console.log(line,ball,off);
  // First half
  half();
  // Other team kicks
  off = Math.round(Math.abs(Math.min(Math.max(coinflip,0.1),1)-1));;
  line = 0;
  down = 1;
  ball = 50;
  console.log(off);

  var kicker = rate(teams[off].k[0]);
  var dist = Math.min((Math.round((random()+kicker)*5)+1)*10, 50); // calc kick
  if (dist < 50) {
    // Turn over
    off = Math.round(Math.abs(Math.min(Math.max(off,0.1),1)-1)); // Lol $) This just inverts the off 1=0 0=1
  } else {
    // Move the ball correctly + for t1 - for t2
    ball = ((dist+30)*((off*-2)+1));
    if (ball < 0) {
      ball = 100+ball;
    }
  }
  console.log(line,ball,off);
  // play the other half
  half();

  function half(){
    for (var q = 0; q < 2; q++) {
      for (var pc = 0; pc < 12; pc++) {
        if (down < 4) {
          // Gen the plays for o & d
          var p = genPlay();
          // Calc the yardge
          var d = play(p[0],p[1],Math.floor((random()+rate(avgTeam(teams[off])))*6));
          // Move the ball correctly - for t1 + for t2
          ball += d*((off*-2)+1);
          // Move the chains
          line += d;
          // Calc the down/turn over
          if (line < 10) {
            down += 1
          } else {
            down = 1;
            line = 0;
          }
          if (ball >= 100 || ball <= 0) {
            // Touchdown!!!
            scoreBoard[off] += 7;
            // Restart at 50
            line = 0;
            down = 1;
            ball = 50;
            // Turn over
            var kicker = rate(teams[coinflip].k[0]);
            dist = Math.min((Math.round((random()+kicker)*5)+1)*10, 50); // calc kick
            if (dist < 50) {
              // Turn over
              off = Math.round(Math.abs(Math.min(Math.max(off,0.1),1)-1)); // Lol $) This just inverts the off 1=0 0=1
            } else {
              // Move the ball correctly + for t1 - for t2
              ball = ((dist+30)*((off*-2)+1));
              if (ball < 0) {
                ball = 100+ball;
              }
            }
          }
        } else {
          // 4th Down Turn over
          down = 1;
          off = Math.round(Math.abs(Math.min(Math.max(off,0.1),1)-1));
        }
        console.log(scoreBoard, down, ball, line, off);
      }
    }
  }
  function rate(p) {
    var max = Math.max(p.speed,p.strength,p.endurance,p.agilty);
    var sum = p.speed+p.strength+p.endurance+p.agilty;
    var base = ((((sum-max)/3)+max)*(38-p.age));
    return (((sum-max)/3)+max)/base;
  }
  function play(o, d, roll) {
    roll = Math.max(Math.min(roll,5),0);
    var points = {
      "ir": {
        "rd": [-4,-2,0,0,2,4],
        "pd": [0,2,4,4,6,8],
        "bl": [0,2,4,6,6,8]
      },
      "or": {
        "rd": [-4,-2,0,0,4,6],
        "pd": [0,0,4,6,8,12],
        "bl": [-4,-2,0,0,4,8]
      },
      "sp": {
        "rd": [0,2,4,4,6,10],
        "pd": [-2,0,0,0,4,6],
        "bl": [-4,0,4,4,6,10]
      },
      "mp": {
        "rd": [0,0,6,6,8,16],
        "pd": [-4,-2,0,0,0,6],
        "bl": [-6,-4,-2,0,0,8]
      },
      "lp": {
        "rd": [-6,0,0,0,0,20],
        "pd": [-10,-6,-6,0,0,10],
        "bl": [-10,-10,-6,-6,0,0]
      }
    };
    return points[o][d][roll];
  }
  function genPlay() {
    //TODO: Generate wieghted plays for better/worst teams
    var o = ["ir","or","sp","mp","lp"][Math.floor(random()*5)];
    var d = ["rd","pd","bl"][Math.floor(random()*3)];
    return [o,d];
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

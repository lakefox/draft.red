function dred(t1, t2) {
  var teams = [t1,t2];
  var random = new alea(JSON.stringify(t1),JSON.stringify(t2));
  var coinflip = parseInt(random()*2);
  var off = coinflip;
  var line = 30;
  var down = 1;
  console.log(off);
  var kicker = rate(teams[coinflip].k[0]);
  var dist = (Math.floor((random()+kicker)*6)+1)*10; // calc kick
  if (dist < line) {
    // Turn over
    off = Math.round(Math.abs(Math.min(Math.max(off,0.1),1)-1)); // Lol $) This just inverts the off
    down += 1;
  } else {
    line += dist;
  }
  console.log(dist,off);
  // First half
  for (var q = 0; q < 2; q++) {
    for (var p = 0; p < 12; p++) {

    }
  }
  function rate(p) {
    var max = Math.max(p.speed,p.strength,p.endurance,p.agilty);
    var sum = p.speed+p.strength+p.endurance+p.agilty;
    var base = ((((sum-max)/3)+max)*(38-p.age));
    return parseFloat("0."+Math.floor(((((sum-max)/3)+max)/base)*100));
  }
}

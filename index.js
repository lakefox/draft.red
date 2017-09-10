function main() {
  if (detectmob()) {
  	// Is on mobile
    // Hide the desktop GUI
    document.querySelector("#landing-desktop").style.display = "none";
    if (window.location.hash.length > 1) {
      // Playing
      playMobile();
    }
  } else {
  	// Is on desktop
   // Hide the mobile GUI
   document.querySelector("#landing-mobile").style.display = "none";
    if (window.location.hash.length > 1) {
      // Playing
      playDesktop();
    }
  }
}
main();
function playDesktop() {
  document.querySelector("#landing-desktop").style.display = "none";
  document.querySelector("#portal-desktop").style.display = "inherit";
}
function playMobile() {
  document.querySelector("#landing-mobile").style.display = "none";
  document.querySelector("#portal-mobile").style.display = "inherit";
}
function start() {

}
function detectmob() {
  if(window.innerWidth <= 600 && window.innerHeight <= 800) {
    return true;
  } else {
    return false;
  }
}

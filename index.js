(() => {
  var last = window.scrollY;
  var direction = true;
  document.addEventListener("scroll",(e) => {
    if (window.scrollY < last) {
      direction = false;
    } else {
      direction = true;
    }
    last = window.scrollY;
    var s = window.scrollY%window.innerHeight;
    console.log(s);
    if (s+70 > window.innerHeight && direction) {
      var to = (Math.floor(window.scrollY/window.innerHeight)*window.innerHeight)+window.innerHeight;
      window.scrollTo(0,to);
    }
  });
})()

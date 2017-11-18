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
    if (s+70 > window.innerHeight && direction) {
      var to = (Math.floor(window.scrollY/window.innerHeight)*window.innerHeight)+window.innerHeight;
      window.scrollTo(0,to);
    }
  });
})()
function media(e) {
  var action = e.innerHTML.trim();
  var show = e.parentElement.previousElementSibling.querySelector(".show");
  if (action == "NEXT" && show.nextElementSibling) {
    show.nextElementSibling.setAttribute("class", "image show");
    show.setAttribute("class", "image");
  } else if (action == "PREV" && show.previousElementSibling) {
    show.previousElementSibling.setAttribute("class", "image show");
    show.setAttribute("class", "image");
  } else if (action == "VIEW") {
    e.parentElement.previousElementSibling.querySelector(".show").querySelector("a").click();
  }
}

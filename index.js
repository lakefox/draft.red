document.querySelector("#start").addEventListener("keyup", (e)=>{
  if (e.key == "Enter") {
    document.querySelector("#landing").style.display = "none";
    document.querySelector("#start").style.top = "35px";
    document.querySelector("#start").style.left = "135px";
    document.querySelector("#start").setAttribute("readonly","");
  }
});

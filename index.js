document.querySelector("#start").addEventListener("keyup", (e)=>{
  if (e.key == "Enter") {
    document.querySelector("#landing").style.display = "none";
  }
});

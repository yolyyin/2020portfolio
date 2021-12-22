{

  //hamburger toggle
    const hamburger=document.getElementById("hamburger");
    const navUL=document.getElementById("nav-ul");
    hamburger.addEventListener('click',()=>{
      navUL.classList.toggle("show");
    });

var frame=document.getElementById("myFrame");
var frameWidth=frame.getBoundingClientRect().width;
frame.style.height=frameWidth*1.77+"px";

window.addEventListener('resize',function(){
  var frameWidth=frame.getBoundingClientRect().width;
  frame.style.height=frameWidth*1.77+"px";
});

}

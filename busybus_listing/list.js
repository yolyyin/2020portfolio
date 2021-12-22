var visible=document.getElementById("myVisible");
var wrapperWidth=document.getElementById("myWrapper").getBoundingClientRect().width;
visible.style.height=1.435*wrapperWidth+"px";

window.addEventListener('resize',function(){
  var wrapperWidth=document.getElementById("myWrapper").getBoundingClientRect().width;
  visible.style.height=1.435*wrapperWidth+"px";
});

{
//hamburger toggle
  const hamburger=document.getElementById("hamburger");
  const navUL=document.getElementById("nav-ul");
  hamburger.addEventListener('click',()=>{
    navUL.classList.toggle("show");
  });



function parallax(element,distance,speed){
  const item = document.querySelector(element);
  item.style.transform = `translateY(${distance*speed}px)`;
}


window.addEventListener('scroll',function(){
  parallax("nav",window.scrollY,0.85);
  parallax("section.green", window.scrollY, 0.85);

  parallax("section.purple", window.scrollY, 0.5);
  parallax(".hack",window.scrollY,0.08);
  parallax("section.quick", window.scrollY, -0.1);
});

let brainOverlay = document.getElementById("brain_overlay");
let brain = document.querySelector(".brain");

let busOverlay = document.getElementById("bus_overlay");
let bus = document.querySelector(".bus");

let dataOverlay = document.getElementById("data_overlay");
let data = document.querySelector(".data");

listen(brain, brainOverlay);
listen(bus, busOverlay);
listen(data, dataOverlay);

function listen(listener,overlay){
  listener.addEventListener("mouseover",function(){
    overlay.style.zIndex = "0";
  });
  listener.addEventListener("mouseout",function(){
    overlay.style.zIndex = "10";
  });
}


}

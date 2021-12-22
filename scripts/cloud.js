{
  //hamburger toggle
    const hamburger=document.getElementById("hamburger");
    const navUL=document.getElementById("nav-ul");
    hamburger.addEventListener('click',()=>{
      navUL.classList.toggle("show");
    });
}

var wHeight=window.innerHeight;
document.getElementById("myNav").style.height= wHeight + "px";
let scene, camera, cloudParticles =[];
let myCanvas = document.getElementById('myCanvas');

function init(){
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(60,window.innerWidth/window.innerHeight,1,1000);
  //camera = new THREE.PerspectiveCamera(60,myCanvas.Width/myCanvas.Height,1,1000);
  camera.position.z =1;
  camera.rotation.x =1.16;
  camera.rotation.y = -0.12;
  camera.rotation.z = 0.27;

  let ambient = new THREE.AmbientLight(0x555555);
  scene.add(ambient);

  let directionalLight = new THREE.DirectionalLight(0xff8c19,1.2);
  directionalLight.position.set(0,0,1);
  scene.add(directionalLight);

  let orangeLight = new THREE.PointLight(0xcc6600,100,450,1.6);
  orangeLight.position.set(200,300,100);
  scene.add(orangeLight);
  let redLight = new THREE.PointLight(0xd8547e,10,450,2);
  redLight.position.set(100,300,100);
  scene.add(redLight);
  let blueLight = new THREE.PointLight(0x3677ac,100,450,1.6);
  blueLight.position.set(300,300,200);
  scene.add(blueLight);

  renderer = new THREE.WebGLRenderer({
    canvas:myCanvas
  });
  renderer.setSize(window.innerWidth,window.innerHeight);
  //renderer.setSize(myCanvas.Width,myCanvas.Height);
  //scene.fog = new THREE.FogExp2(0x03544e, 0.001);
  scene.fog = new THREE.FogExp2(0xAA28FF, 0.001);
  renderer.setClearColor(scene.fog.color);
  //document.body.appendChild(renderer.domElement);

  let loader = new THREE.TextureLoader();
  loader.load("images/smoke-1.png",function(texture){
    cloudGeo = new THREE.PlaneBufferGeometry(500,500);
    cloudMaterial =new THREE.MeshLambertMaterial({
      map:texture,
      transparent:true
    });

    for(let p=0; p<50; p++){
      let cloud = new THREE.Mesh(cloudGeo,cloudMaterial);
      cloud.position.set(
        Math.random()*800-400,500,Math.random()*500-500
      );
      cloud.rotation.x = 1.16;
      cloud.rotation.y = -0.12;
      cloud.rotation.z = Math.random()*2*Math.PI;
      cloud.material.opacity = 0.55;
      cloudParticles.push(cloud);
      scene.add(cloud);
    }
  });


  const bloomEffect = new POSTPROCESSING.BloomEffect({
    blendFunction: POSTPROCESSING.BlendFunction.COLOR_DODGE,
    kernelSize: POSTPROCESSING.KernelSize.SMALL,
    useLuminanceFilter:true,
    luminanceThreshold:0.5,
    luminanceSmoothing:0.75
  });
  bloomEffect.blendMode.opacity.value =0.5;

  let effectPass = new POSTPROCESSING.EffectPass(
    camera,
    bloomEffect,
  );
  effectPass.renderToScreen =true;

  composer = new POSTPROCESSING.EffectComposer(renderer);
  composer.addPass(new POSTPROCESSING.RenderPass(scene,camera));
  composer.addPass(effectPass);
  render();

  onWindowResize();
  window.addEventListener('resize', onWindowResize, false);
}

function onWindowResize(event) {
  let width = window.innerWidth;
  let height = window.innerHeight;

  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);

  document.getElementById("myNav").style.height= height + "px";

}

function render(){
  cloudParticles.forEach(p => {
    p.rotation.z -=0.001;
  });

  composer.render(0.1);
  requestAnimationFrame(render);
}
init();

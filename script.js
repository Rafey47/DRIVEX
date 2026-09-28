import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js";


// DRIVEX - basic setup
const container = document.getElementById("game-container");

   const loader = document.getElementById("loading-screen");

    
const scene = new THREE.Scene();
   
scene.background = new THREE.Color(0x10141a);

       // Camera

         const cam = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
cam.position.set(0, 3.5, 12);

cam.lookAt(0, 0, -20);

const ctx = new THREE.WebGLRenderer({ antialias: true });


      ctx.setPixelRatio(Math.min(window.devicePixelRatio, 2));

ctx.setSize(window.innerWidth, window.innerHeight);

  container.appendChild(ctx.domElement);


const ambLight = new THREE.AmbientLight(0xffffff, 1.5);
  scene.add(ambLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 2);


dirLight.position.set(5, 10, 5);
scene.add(dirLight);


            // floor


const floorGeo = new THREE.PlaneGeometry(100, 100);


const floorMat = new THREE.MeshStandardMaterial({ color: 0x20252b });

  const floor = new THREE.Mesh(floorGeo, floorMat);
floor.rotation.x = -Math.PI / 2;

scene.add(floor);

 //Road
     

 const roadGeo = new THREE.PlaneGeometry(12, 200);
const roadMat = new THREE.MeshStandardMaterial({color: 0x181a1d});
     

       const road = new THREE.Mesh(roadGeo, roadMat);
       road.rotation.x = -Math.PI / 2;
          

              road.position.y = 0.01;

scene.add(road);



        //ROAD EDGE LINES

              const edgeGeo = new THREE.PlaneGeometry(0.15, 200);
 const edgeMat = new THREE.MeshStandardMaterial({color: 0xffffff});
             
          const leftEdge = new THREE.Mesh(edgeGeo,edgeMat);
          leftEdge.rotation.x = -Math.PI / 2;
   
          
  leftEdge.position.set(-6, 0.02, 0);
    
  
        scene.add(leftEdge);
        const rightEdge = new THREE.Mesh(edgeGeo, edgeMat );

rightEdge.rotation.x = -Math.PI / 2;
         rightEdge.position.set(6, 0.02, 0);
         scene.add(rightEdge);

  // Lane Making
    
  

      const laneMarkGeo = new THREE.PlaneGeometry(0.12, 3);

      const laneMarkMat = new THREE.MeshStandardMaterial({color: 0xffffff});
      for (let z = -100; z < 100; z+= 6) { const mark = new THREE.Mesh(laneMarkGeo,laneMarkMat);
         mark.rotation.x = -Math.PI / 2;
         mark.position.set(0, 0.025, z);
         scene.add(mark); }
         

         //DRIVEX CAR

         const car = new THREE.Group ();
//car body
 const bodyGeo = new THREE.BoxGeometry(2.2, 0.55, 4.4);

       const bodyMat = new THREE.MeshStandardMaterial({color: 0x111111, metalness: 0.7, roughness: 0.25});
       const body = new THREE.Mesh(bodyGeo, bodyMat);


    body.position.y = 0.65;
    car.add(body);
    



    //Car cabin

  const cabinGeo = new THREE.BoxGeometry(1.7, 0.5, 2.0);
  const cabinMat = new THREE.MeshStandardMaterial({color : 0x080b0f, metalness: 0.3, roughness: 0.15});
  
  
  const cabin = new THREE.Mesh(cabinGeo, cabinMat);


  cabin.position.set(0, 1.05, -0.15); car.add(cabin);
//WHEELS
const wheelMat = new THREE.MeshStandardMaterial({
    color: 0x050505,
    roughness: 0.8
  


});


       const wheelGeo = new THREE.CylinderGeometry(0.42, 0.42, 0.28, 24);





function createWheel(x, z) { const wheel = new THREE.Mesh(wheelGeo, wheelMat);
    wheel.rotation.z = Math.PI / 2;

    wheel.position.set(x, 0.42, z);
    car.add(wheel);

}
createWheel(-1.05, 1.35);
createWheel(1.05, 1.35);
createWheel(-1.05, -1.35);
createWheel(1.05, -1.35);


                            //Car position
                            car.position.set(0, 0, 6);
                            scene.add(car);



window.addEventListener("resize", () => {


    cam.aspect = window.innerWidth / window.innerHeight;
    cam.updateProjectionMatrix();


    ctx.setSize(window.innerWidth, window.innerHeight);
});

function animate() {
    requestAnimationFrame(animate);



    ctx.render(scene, cam);
}
animate();

window.addEventListener("load", () => {


    setTimeout(() => {
        loader.style.opacity = "0";

        setTimeout(() => {
            loader.style.display = "none";
            
        }, 500);


    }, 800);
});

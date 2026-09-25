import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js";


// DRIVEX - basic setup
const container = document.getElementById("game-container");

const loader = document.getElementById("loading-screen");

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x10141a);

    // Camera


const cam = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
cam.position.set(0, 5, 10);

cam.lookAt(0, 0, 0);

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

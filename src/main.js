import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const canvas = document.querySelector('#canvas');

// Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color('#F0F0F0');

// Camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// Objects
const dodecahedron = new THREE.Mesh(
    new THREE.DodecahedronGeometry(),
    new THREE.MeshLambertMaterial({ color: '#468585', emissive: '#468585' })
);

const box = new THREE.Mesh(
    new THREE.BoxGeometry(2, 0.1, 2),
    new THREE.MeshLambertMaterial({ color: '#B4B4B3', emissive: '#B4B4B3' })
);
box.position.y = -1.5;

scene.add(dodecahedron, box);

// Lighting
const light = new THREE.SpotLight(0x006769, 100);
light.position.set(1, 1, 1);
scene.add(light);

// Renderer
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

const controls = new OrbitControls(camera , renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.enableZoom = true;
controls.enablePan = true;


// Animation Loop
function animate() {
    requestAnimationFrame(animate);
    dodecahedron.rotation.x += 0.01;
    dodecahedron.rotation.y += 0.01;

    
    box.rotation.y += 0.005;

    controls.update();

    renderer.render(scene, camera);
}



// Handle window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});


animate();


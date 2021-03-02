// Module imports
//

import * as THREE from 'https://unpkg.com/three@0.119.0/build/three.module.js';

import { GLTFLoader } from 'https://unpkg.com/three@0.119.0/examples/jsm/loaders/GLTFLoader.js';

import { OrbitControls } from 'https://unpkg.com/three@0.119.0/examples/jsm/controls/OrbitControls.js';

const myWorldObj = document.getElementById('myWorld');

// SCENE required 1 of 3
const scene = new THREE.Scene();
// customize some scene props
scene.background = new THREE.Color(0x649C82);

// Add Light to scene .. REQUIRED for 3d models
const ambLight = new THREE.AmbientLight(0x404040, 5 );
scene.add(ambLight);

const camera = new THREE.PerspectiveCamera(45, myWorldObj.scrollWidth / myWorldObj.scrollHeight, 2, 1000);

camera.position.z = 100;

// RENDER required 3 of 3
const renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setSize(myWorldObj.scrollWidth, myWorldObj.scrollHeight);
myWorldObj.appendChild(renderer.domElement);

let modelObj;

// Load a glTF resource
const loaderObj = new GLTFLoader().setPath('/models/robot/gltf/');
loaderObj.load(
  'wraith.gltf',
  function ( gltf ) {
    modelObj = gltf.scene;
    scene.add(modelObj);
    modelObj.position.y = -32.5;
  },
  // While loading is processing
  function ( xhr ) {
    console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
  },
  // called if loading error
  function ( error ) {
    console.log ('An error happened ' + error);
  }
);

function controlsRender() {
  renderer.render(scene, camera);
}

let controlsObj = new OrbitControls(camera, myWorldObj);
controlsObj.addEventListener('change', controlsRender);

// Auto LOOP
// Create JS function that auto LOOPS
const animate = function () {
  requestAnimationFrame(animate);

  
  if (modelObj) {
    modelObj.rotation.y += 0.01;
  }
  

  renderer.render(scene, camera);
};
animate();
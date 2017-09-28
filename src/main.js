import styles from "./styles/main.css"
import * as THREE from "three"
import threeOrbitControls from './js/utils/OrbitControls'

// attach orbit controls to THREE
const OrbitControls = threeOrbitControls(THREE)

// 3D env ? scene, renderer, camera, mesh (geometry + material)
const scene = new THREE.Scene() // our glorious scene

//field of view, aspect ratio (viewport size), near plane, far plane
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000) // our cam
camera.position.z = 5

//renderer
const renderer = new THREE.WebGLRenderer() // our renderer
renderer.setSize(window.innerWidth, window.innerHeight) // same size than our aspect ratio

//controls
const controls = new OrbitControls(camera, renderer.domElement)

//meshes
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({
  color: "blue"
});
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

document.body.appendChild(renderer.domElement) // append a canvas to body
const animate = timestamp => {
    renderer.render(scene, camera)
    requestAnimationFrame(animate)
}
animate()
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

// axis helper
const axisHelper = new THREE.AxisHelper(5)
scene.add(axisHelper)

//meshes
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({
  color: "blue"
});
const group = new THREE.Group()
const cube = new THREE.Mesh(geometry, material)
const cube2 = new THREE.Mesh(geometry, material);

cube2.position.set(0, 1, 0)
group.add(cube)
group.add(cube2)

scene.add(group)

document.body.appendChild(renderer.domElement) // append a canvas to body
let i = group.position.x
let lastTimeStamp = 0
const INTERVAL = 200

const animate = timestamp => {

    if(timestamp - lastTimeStamp > INTERVAL){
        group.position.x  = (i % 15)
        i+= 0.5
        lastTimeStamp = timestamp
    }

    renderer.render(scene, camera)
    requestAnimationFrame(animate)
}
animate()
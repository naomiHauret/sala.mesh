import styles from "./styles/main.css"
import background from "./assets/img/skybox.png"
import backgroundMusic from "./assets/sound/pallet-town.mp3"
import charmanderShout from "./assets/sound/charmander.ogg"
import * as THREE from "three"
import threeOrbitControls from './js/utils/OrbitControls'

// attach orbit controls to THREE
const OrbitControls = threeOrbitControls(THREE)

// 3D env ? scene, renderer, camera, mesh (geometry + material)
const scene = new THREE.Scene() // our glorious scene

//field of view, aspect ratio (viewport size), near plane, far plane
const camera = new THREE.PerspectiveCamera( 35, window.innerWidth / window.innerHeight, 0.1, 1000) // our cam
camera.position.z = 1
camera.position.y = 1
camera.position.x = 25

//renderer
const renderer = new THREE.WebGLRenderer({
    antialias: true
})
renderer.setSize(window.innerWidth, window.innerHeight) // same size than our aspect ratio
renderer.setClearColor(0xffffff, 0) //transparent background
renderer.shadowMap.enabled = true

//controls
const controls = new OrbitControls(camera, renderer.domElement)

// axis helper
const axisHelper = new THREE.AxisHelper(5)
//scene.add(axisHelper)

// materials
// materials
const orange = new THREE.MeshPhongMaterial({
  color: "#ff8d14",
  emissive: 0x000000,
  specular: 0x111111
})

const yellow = new THREE.MeshBasicMaterial({
  color: "#fff69b",
})

const red = new THREE.MeshBasicMaterial({
  color: "#FF4701",
})

const black = new THREE.MeshBasicMaterial({
  color: "#010000"
})

const white = new THREE.MeshPhongMaterial({
  color: "#ffffff",
    emissive: 0x000000,
  specular: 0x111111,
})

const grass = new THREE.MeshPhongMaterial({
  color: "#0fc162",
  emissive: 0x000000,
  specular: 0x111111,
  side: THREE.DoubleSide
})


// geometries
const boxSkull = new THREE.BoxGeometry(1.05, 1, 1)
const boxJaw = new THREE.BoxGeometry(0.85, 0.15, 0.95)
const boxMuzzle = new THREE.BoxGeometry(1.05, 0.15, 0.15);
const boxFangLeft = new THREE.ConeGeometry( 0.05, 0.1, 0.02 )
const boxFangRight = new THREE.ConeGeometry(0.05, 0.1, 0.02 )
const boxTorso = new THREE.BoxGeometry(0.65, 1.35, 0.65)
const boxAbs = new THREE.PlaneGeometry( 0.35, 0.85)
const boxLeftEye = new THREE.PlaneGeometry(0.1, 0.55)
const boxRightEye = new THREE.PlaneGeometry(0.1, 0.55)
const boxLeftLeg = new THREE.BoxGeometry(0.25, 0.25, 0.25)
const boxRightLeg = new THREE.BoxGeometry(0.25, 0.25, 0.25)
const boxLeftArm = new THREE.BoxGeometry(0.15, 0.75, 0.15);
const boxRightArm = new THREE.BoxGeometry(0.15, 0.75, 0.15)
const boxTailTip = new THREE.CylinderGeometry(0.065, 0.025, 0.55, 8)
const boxTailBase = new THREE.CylinderGeometry(0.085, 0.065, 0.55, 6)
const boxFlameBase = new THREE.OctahedronGeometry(0.25, 0)
const boxFlameSmall = new THREE.OctahedronGeometry(0.1, 0)

const boxFloor = new THREE.CircleGeometry(10, 10)

//meshes
const headGroup = new THREE.Group()
const fangsGroup = new THREE.Group()
const eyesGroup = new THREE.Group()
const legsGroup= new THREE.Group()
const armsGroup = new THREE.Group()
const bellyGroup = new THREE.Group()
const tailGroup = new THREE.Group()
const flamesGroup = new THREE.Group()

const skull = new THREE.Mesh(boxSkull, orange)
const muzzle = new THREE.Mesh(boxMuzzle, orange)
const jaw = new THREE.Mesh(boxJaw, orange)
const fangLeft = new THREE.Mesh(boxFangRight, white);
const fangRight = new THREE.Mesh(boxFangRight, white)

const leftEye = new THREE.Mesh(boxLeftEye, black)
const rightEye = new THREE.Mesh(boxRightEye, black)

const torso = new THREE.Mesh(boxTorso, orange)
const abs = new THREE.Mesh(boxAbs, yellow)

const leftLeg = new THREE.Mesh(boxLeftLeg, orange)
const rightLeg = new THREE.Mesh(boxRightLeg, orange)

const leftArm = new THREE.Mesh(boxLeftArm, orange)
const rightArm = new THREE.Mesh(boxRightArm, orange)

const tailTip = new THREE.Mesh(boxTailTip, orange)
const tailBase = new THREE.Mesh(boxTailBase, orange)

const flameBase = new THREE.Mesh(boxFlameBase, red)
const flameSmall = new THREE.Mesh(boxFlameSmall, red)

const floor = new THREE.Mesh(boxFloor, grass)

//groups

eyesGroup.add(leftEye)
eyesGroup.add(rightEye)

fangsGroup.add(fangRight)
fangsGroup.add(fangLeft)

headGroup.add(fangsGroup)
headGroup.add(skull)
headGroup.add(muzzle)
headGroup.add(jaw)
headGroup.add(eyesGroup)

bellyGroup.add(torso)
bellyGroup.add(abs)

legsGroup.add(leftLeg)
legsGroup.add(rightLeg)

armsGroup.add(rightArm)
armsGroup.add(leftArm)

flamesGroup.add(flameBase)
flamesGroup.add(flameSmall)

tailGroup.add(tailBase)
tailGroup.add(tailTip)
tailGroup.add(flamesGroup)

const salameche = new THREE.Group()
salameche.add(headGroup)
salameche.add(bellyGroup)
salameche.add(armsGroup)
salameche.add(legsGroup)
salameche.add(tailGroup)

salameche.traverse(m => (m.castShadow = true))

fangsGroup.position.z = 0.5
fangsGroup.position.y = -0.55
fangsGroup.rotateZ(3.125)
fangLeft.position.x = -0.2
fangRight.position.x = 0.2;

muzzle.position.z = 0.575
muzzle.position.y = -0.42
jaw.position.y = -0.58
bellyGroup.position.y = -1.33
bellyGroup.position.z = -0.15
abs.position.z = 0.35
abs.position.y = -0.15

leftEye.position.x = -0.2
rightEye.position.x = 0.2
eyesGroup.position.y = 0.05
eyesGroup.position.z = 0.55

leftLeg.position.x = -0.2
rightLeg.position.x = 0.2
legsGroup.position.y = -2.125
legsGroup.position.z = -0.15

armsGroup.position.y = -1.25
leftArm.position.x = -0.41
rightArm.position.x = 0.41

tailGroup.position.y = -1.55
tailGroup.position.z = -0.7
tailGroup.rotation.x = 2
tailTip.position.z = -0.2
tailTip.position.y= -0.3875
tailTip.rotation.x = 1

flameSmall.position.z = 0.25
flamesGroup.position.y= -0.55
flamesGroup.position.z = -0.45
flamesGroup.rotation.x = 2.5

salameche.rotateY(0.8)
salameche.position.y = 2.25
salameche.castShadow = true

floor.rotation.x = -Math.PI/2
floor.receiveShadow = true
salameche.receiveShadow
scene.add(floor)
scene.add(salameche)


// light
const light = new THREE.AmbientLight(0x404040)
const spotLight = new THREE.SpotLight(0xffffff)

scene.add(light)
spotLight.position.set(10, 15, 10)
spotLight.castShadow = true
scene.add(spotLight)

// spotlight helper
const spotLightHelper = new THREE.SpotLightHelper(spotLight)
//scene.add(spotLightHelper)

// background
const texture = new THREE.TextureLoader().load(background)
scene.background = texture

document.body.appendChild(renderer.domElement) // append a canvas to body
let i = flameSmall.position.z
let lastTimeStamp = 0
const INTERVAL = 5

const animate = timestamp => {
    if(timestamp - lastTimeStamp > INTERVAL){
        flameSmall.position.z = (i % 0.85)
        flameBase.position.z = (i % 0.75)
        i+= 0.05
        lastTimeStamp = timestamp
    }
    renderer.render(scene, camera)
    requestAnimationFrame(animate)
}
animate()

window.addEventListener('resize', () => {
  // Keep aspect ratio of the scene
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
})

const raycaster = new THREE.Raycaster()
const mouse = new THREE.Vector2()
let salamecheMeshes = []
salameche.traverse((node) => {
  if (node instanceof THREE.Mesh) {
    salamecheMeshes.push(node);
  }
});

let isHeadTilt = false
let isHeadStraight = true
let isHoveringSalameche = false
let hoverSalamecheCount = 0
let triggerModal = 0

window.addEventListener('mousemove', (e)=> {
  mouse.x = e.clientX / renderer.domElement.clientWidth * 2 - 1
  mouse.y = -(e.clientY / renderer.domElement.clientHeight) * 2 + 1
  raycaster.setFromCamera(mouse, camera)
  let intersects = raycaster.intersectObjects(salamecheMeshes)
  if (intersects.length > 0) {
    document.body.style.cursor = "pointer"
  }
  else{
    document.body.style.cursor = "initial"
  }
  if (intersects.length > 0 && !isHeadTilt) {
    headGroup.rotateY(0.35)
    isHeadTilt = true
    isHeadStraight = false
    isHoveringSalameche = true
    hoverSalamecheCount++

    if(hoverSalamecheCount == 1) {
      triggerModal = setTimeout(()  => {
        alert("Problem bro?")
      }, 10000)
    }
  }
  else if(intersects.length <= 0 && !isHeadStraight ){
    headGroup.rotateY(-0.35)
    isHeadTilt = false
    isHeadStraight = true
    isHoveringSalameche = false
    if(hoverSalamecheCount > 0) {
     clearTimeout(triggerModal);
    }
    hoverSalamecheCount = 0
  }
})

// music
const music = new Audio(backgroundMusic)
const doShout = new Audio(charmanderShout);
music.loop = true
//music.play()


window.addEventListener("click", e => {
  mouse.x = e.clientX / renderer.domElement.clientWidth * 2 - 1;
  mouse.y = -(e.clientY / renderer.domElement.clientHeight) * 2 + 1;
  raycaster.setFromCamera(mouse, camera);
  let intersects = raycaster.intersectObjects(salamecheMeshes);
  if (intersects.length > 0) {
    doShout.currentTime = 0;
    doShout.play();
  }
});


export default salameche
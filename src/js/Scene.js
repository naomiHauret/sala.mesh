import background from "./../assets/img/skybox.png"
import backgroundMusic from "./../assets/sound/pallet-town.mp3"
import * as THREE from "three"
import threeOrbitControls from "./utils/OrbitControls"
import Salameche from "./Salameche"
import Floor from "./Landscape"

class Scene {
  constructor(showAxisHelper, showSpotlightHelper) {
    this.showAxisHelper = showAxisHelper
    this.showSpotlightHelper = showSpotlightHelper
    this.scene = new THREE.Scene()
    this.light = new THREE.AmbientLight(0x404040)
    this.spotLight = new THREE.SpotLight(0xffffff)
    this.camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 1000) //field of view, aspect ratio (viewport size), near plane, far plane
    this.renderer = new THREE.WebGLRenderer({ antialias: true })

    return this.initialize()
  }

  initialize() {
    // controls
    const OrbitControls = threeOrbitControls(THREE)

    // background
    const texture = new THREE.TextureLoader().load(background)
    this.scene.background = texture

    // light
    this.scene.add(this.light)

    // spotlight
    this.spotLight.position.set(10, 15, 10)
    this.spotLight.castShadow = true
    this.scene.add(this.spotLight)

    // camera
    this.camera.position.z = 1
    this.camera.position.y = 1
    this.camera.position.x = 25

    // renderer
    this.renderer.setSize(window.innerWidth, window.innerHeight) // same size than our aspect ratio
    this.renderer.setClearColor(0xffffff, 0) //transparent background
    this.renderer.shadowMap.enabled = true

    // scene helpers
    this.spotLightHelper = new THREE.SpotLightHelper(this.spotLight)
    this.axisHelper = new THREE.AxisHelper(5)
    this.showSpotlightHelper=== true ? this.scene.add(this.spotLightHelper) : ""
    this.showAxisHelper === true ? this.scene.add(this.axisHelper) : ""

    // scene controls
    this.controls = new OrbitControls(this.camera, this.renderer.domElement)

    // mount scene
    const floor = new Floor()
    const salameche = new Salameche(this.renderer, this.camera, this.scene)
    this.addElement(salameche)
    this.addElement(floor)

    document.body.appendChild(this.renderer.domElement) // append a canvas to body

    this.handlers()
  }

  addElement(element) {
    this.scene.add(element)
  }

  toggleAxisHelper() {
    if (this.showAxisHelper === false) {
      this.scene.add(this.axisHelper)
      this.showAxisHelper = true
    } else {
      this.scene.remove(this.axisHelper)
      this.showAxisHelper = false
    }
  }

  toggleSpotLightHelper() {
    if (this.showSpotlightHelper === false) {
      this.scene.add(this.spotLightHelper)
      this.showSpotlightHelper = true
    } else {
      this.scene.remove(this.spotLightHelper)
      this.showSpotlightHelper = false
    }
  }

  handleResize() {
    // Keep aspect ratio of the scene
    this.camera.aspect = window.innerWidth / window.innerHeight
    this.camera.updateProjectionMatrix()
    this.renderer.setSize(window.innerWidth, window.innerHeight)
  }

  handlers() {
    window.addEventListener("resize", this.handleResize.bind(this))
  }
}

export default Scene


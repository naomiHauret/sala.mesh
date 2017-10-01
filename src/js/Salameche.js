import * as THREE from "three"
import charmanderShout from "./../assets/sound/charmander.ogg"

class Salameche {
    constructor(renderer, camera, scene) {
        this.renderer = renderer
        this.camera = camera
        this.scene = scene
        this.doShout = new Audio(charmanderShout)
        this.isHeadTilt = false
        this.isHeadStraight = true
        this.isHoveringSalameche = false
        this.hoverSalamecheCount = 0
        this.triggerModal = 0
        this.meshes = []
        this.materials = {}
        this.raycaster = new THREE.Raycaster()
        this.mouse = new THREE.Vector2()

        return this.initialize()
    }

    initialize() {
        // materials
        this.materials.orange = new THREE.MeshPhongMaterial({
            color: "#ff8d14",
            emissive: 0x000000,
            specular: 0x111111,
        })

        this.materials.yellow = new THREE.MeshBasicMaterial({
            color: "#fff69b",
        })

        this.materials.red = new THREE.MeshBasicMaterial({
            color: "#FF4701",
        })

        this.materials.black = new THREE.MeshBasicMaterial({
            color: "#010000",
        })

        this.materials.white = new THREE.MeshPhongMaterial({
          color: "#ffffff",
          emissive: 0x000000,
          specular: 0x111111,
        })

        // Groups
        this.salameche = new THREE.Group()
        this.headGroup = new THREE.Group()
        this.fangsGroup = new THREE.Group()
        this.eyesGroup = new THREE.Group()
        this.legsGroup = new THREE.Group()
        this.armsGroup = new THREE.Group()
        this.bellyGroup = new THREE.Group()
        this.tailGroup = new THREE.Group()
        this.flamesGroup = new THREE.Group()

        // Geometries
        this.boxSkull = new THREE.BoxGeometry(1.05, 1, 1)
        this.boxJaw = new THREE.BoxGeometry(0.85, 0.15, 0.95)
        this.boxMuzzle = new THREE.BoxGeometry(1.05, 0.15, 0.15)
        this.boxFangLeft = new THREE.ConeGeometry(0.05, 0.1, 0.02)
        this.boxFangRight = new THREE.ConeGeometry(0.05, 0.1, 0.02)
        this.boxTorso = new THREE.BoxGeometry(0.65, 1.35, 0.65)
        this.boxAbs = new THREE.PlaneGeometry(0.35, 0.85)
        this.boxLeftEye = new THREE.PlaneGeometry(0.1, 0.55)
        this.boxRightEye = new THREE.PlaneGeometry(0.1, 0.55)
        this.boxLeftLeg = new THREE.BoxGeometry(0.25, 0.25, 0.25)
        this.boxRightLeg = new THREE.BoxGeometry(0.25, 0.25, 0.25)
        this.boxLeftArm = new THREE.BoxGeometry(0.15, 0.75, 0.15)
        this.boxRightArm = new THREE.BoxGeometry(0.15, 0.75, 0.15)
        this.boxTailTip = new THREE.CylinderGeometry(0.065, 0.025, 0.55, 8)
        this.boxTailBase = new THREE.CylinderGeometry(0.085, 0.065, 0.55, 6)
        this.boxFlameBase = new THREE.OctahedronGeometry(0.25, 0)
        this.boxFlameSmall = new THREE.OctahedronGeometry(0.1, 0)

        // Meshes
        //- head
        this.skull = new THREE.Mesh(this.boxSkull, this.materials.orange)
        this.muzzle = new THREE.Mesh(this.boxMuzzle, this.materials.orange)
        this.jaw = new THREE.Mesh(this.boxJaw, this.materials.orange)
        this.fangLeft = new THREE.Mesh(this.boxFangRight, this.materials.white)
        this.fangRight = new THREE.Mesh(this.boxFangRight, this.materials.white)
        this.leftEye = new THREE.Mesh(this.boxLeftEye, this.materials.black)

        this.rightEye = new THREE.Mesh(this.boxRightEye, this.materials.black)
        //- belly
        this.torso = new THREE.Mesh(this.boxTorso, this.materials.orange)
        this.abs = new THREE.Mesh(this.boxAbs, this.materials.yellow)

        //- legs
        this.leftLeg = new THREE.Mesh(this.boxLeftLeg, this.materials.orange)
        this.rightLeg = new THREE.Mesh(this.boxRightLeg, this.materials.orange)

        //- arms
        this.leftArm = new THREE.Mesh(this.boxLeftArm, this.materials.orange)
        this.rightArm = new THREE.Mesh(this.boxRightArm, this.materials.orange)

        //- tail
        this.tailTip = new THREE.Mesh(this.boxTailTip, this.materials.orange)
        this.tailBase = new THREE.Mesh(this.boxTailBase, this.materials.orange)

        //- flames
        this.flameBase = new THREE.Mesh(this.boxFlameBase, this.materials.red)
        this.flameSmall = new THREE.Mesh(this.boxFlameSmall, this.materials.red)

        // buildings groups
        //- eyes
        this.eyesGroup.add(this.leftEye)
        this.eyesGroup.add(this.rightEye)

        //- fangs
        this.fangsGroup.add(this.fangRight)
        this.fangsGroup.add(this.fangLeft)

        //- head
        this.headGroup.add(this.fangsGroup)
        this.headGroup.add(this.skull)
        this.headGroup.add(this.muzzle)
        this.headGroup.add(this.jaw)
        this.headGroup.add(this.eyesGroup)

        //- belly
        this.bellyGroup.add(this.torso)
        this.bellyGroup.add(this.abs)

        //- legs
        this.legsGroup.add(this.leftLeg)
        this.legsGroup.add(this.rightLeg)

        //- arms
        this.armsGroup.add(this.rightArm)
        this.armsGroup.add(this.leftArm)

        //- flames
        this.flamesGroup.add(this.flameBase)
        this.flamesGroup.add(this.flameSmall)

        //- tail
        this.tailGroup.add(this.tailBase)
        this.tailGroup.add(this.tailTip)
        this.tailGroup.add(this.flamesGroup)

        this.salameche.add(this.headGroup)
        this.salameche.add(this.bellyGroup)
        this.salameche.add(this.armsGroup)
        this.salameche.add(this.legsGroup)
        this.salameche.add(this.tailGroup)

        // Positions
        this.fangsGroup.position.z = 0.5
        this.fangsGroup.position.y = -0.55
        this.fangsGroup.rotateZ(3.125)
        this.fangLeft.position.x = -0.2
        this.fangRight.position.x = 0.2

        this.muzzle.position.z = 0.575
        this.muzzle.position.y = -0.42

        this.jaw.position.y = -0.58

        this.leftEye.position.x = -0.2
        this.rightEye.position.x = 0.2
        this.eyesGroup.position.y = 0.05
        this.eyesGroup.position.z = 0.55

        this.bellyGroup.position.y = -1.33
        this.bellyGroup.position.z = -0.15
        this.abs.position.z = 0.35
        this.abs.position.y = -0.15

        this.leftLeg.position.x = -0.2
        this.rightLeg.position.x = 0.2
        this.legsGroup.position.y = -2.125
        this.legsGroup.position.z = -0.15

        this.armsGroup.position.y = -1.25
        this.leftArm.position.x = -0.41
        this.rightArm.position.x = 0.41

        this.tailGroup.position.y = -1.55
        this.tailGroup.position.z = -0.7
        this.tailGroup.rotation.x = 2
        this.tailTip.position.z = -0.2
        this.tailTip.position.y = -0.3875
        this.tailTip.rotation.x = 1

        this.flameSmall.position.z = 0.25
        this.flamesGroup.position.y = -0.55
        this.flamesGroup.position.z = -0.45
        this.flamesGroup.rotation.x = 2.5

        this.salameche.rotateY(0.8)
        this.salameche.position.y = 2.25

        // shadows
        this.salameche.castShadow = true
        this.salameche.receiveShadow
        this.salameche.traverse(node => (node.castShadow = true)) // so each object of salameche can cast shadow

        this.salameche.traverse(node => { // list of meshes
          if (node instanceof THREE.Mesh) {
            this.meshes.push(node)
          }
        })

        this.animate()
        this.handlers()
        return this.getModel()
    }

    animate() {
        let i = this.flameSmall.position.z
        let lastTimeStamp = 0
        const INTERVAL = 5

        const animateTailFlames = timestamp => {
          if (timestamp - lastTimeStamp > INTERVAL) {
            this.flameSmall.position.z = i % 0.85
            this.flameBase.position.z = i % 0.75
            i += 0.05
            lastTimeStamp = timestamp
          }
          this.renderer.render(this.scene, this.camera)
          requestAnimationFrame(animateTailFlames)
        }
        animateTailFlames()
    }

    getModel() {
        return this.salameche
    }

    handleHover(e) {
        this.mouse.x = e.clientX / this.renderer.domElement.clientWidth * 2 - 1
        this.mouse.y = -(e.clientY / this.renderer.domElement.clientHeight) * 2 + 1
        this.raycaster.setFromCamera(this.mouse, this.camera)
        let intersects = this.raycaster.intersectObjects(this.meshes)

        if (intersects.length > 0) {
          document.body.style.cursor = "pointer"
        } else {
          document.body.style.cursor = "initial"
        }

        if (intersects.length > 0 && this.isHeadTilt == false) {
          this.headGroup.rotateY(0.35)
          this.isHeadTilt = true
          this.isHeadStraight = false
          this.isHoveringSalameche = true
          this.hoverSalamecheCount++

          if (this.hoverSalamecheCount == 1) {
            this.triggerModal = setTimeout(() => {
              alert("Problem bro?")
            }, 10000)
          }
        } else if (intersects.length <= 0 && this.isHeadStraight == false) {
          this.headGroup.rotateY(-0.35)
          this.isHeadTilt = false
          this.isHeadStraight = true
          this.isHoveringSalameche = false

          if (this.hoverSalamecheCount > 0) {
            clearTimeout(this.triggerModal)
          }

          this.hoverSalamecheCount = 0
        }
    }

    handleClick(e) {
        this.mouse.x = e.clientX / this.renderer.domElement.clientWidth * 2 - 1
        this.mouse.y = -(e.clientY / this.renderer.domElement.clientHeight) * 2 + 1
        this.raycaster.setFromCamera(this.mouse, this.camera)

        let intersects = this.raycaster.intersectObjects(this.meshes)

        if (intersects.length > 0) {
          this.doShout.currentTime = 0
          this.doShout.play()
        }
    }

    handlers() {
        window.addEventListener("mousemove", this.handleHover.bind(this))
        window.addEventListener("click", this.handleClick.bind(this))
    }
}

export default Salameche


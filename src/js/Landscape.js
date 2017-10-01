
import * as THREE from "three"

class Floor {
    constructor() {
        this.material = new THREE.MeshPhongMaterial({
            color: "#0fc162",
            emissive: 0x000000,
            specular: 0x111111,
            side: THREE.DoubleSide,
        })
        this.box = new THREE.CircleGeometry(10, 10)
        this.mesh = new THREE.Mesh(this.box, this.material)
        this.meshesList = []

        return this.initialize()
    }

    initialize() {
        this.mesh.rotation.x = -Math.PI / 2
        this.mesh.receiveShadow = true

        this.mesh.traverse(node => {
          // list of meshes
          if (node instanceof THREE.Mesh) {
            this.meshesList.push(node)
          }
        })

        return this.mesh
    }
}

export default Floor


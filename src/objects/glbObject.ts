import { GameObject } from './object'
import * as THREE from 'three'
import {loader} from './loader'


export class GlbOject extends GameObject {
    path3D = '../../models/objects/gltf/barracks.gltf.glb' 
    defaultRotation = new THREE.Vector3(Math.PI / 2, 0, 0)
    name="glb"
    constructor() {
        super()
    }

    async loadModel(): Promise<void> {
        this.threeObject = await loader.loadGLB(this.path3D);
        console.log("glb loaded")
    }

}

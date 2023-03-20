
import { GameObject } from './object'
import * as THREE from 'three'

export class Crate extends GameObject{
    name="crate"
    defaultScale = 0.01
    constructor() {
        super()
       
    }
    async loadModel():  Promise<void> { 
        const texture = new THREE.TextureLoader().load('./models/textures/crate.gif');

        const geometry = new THREE.BoxGeometry(200, 200, 200);
        const material = new THREE.MeshBasicMaterial({ map: texture });

        const box = new THREE.Mesh(geometry, material);
        this.threeObject = new THREE.Object3D()
        this.threeObject.add(box);
        box.position.z = 100;
        console.log("crate loaded")
       //@ts-ignore
        window.create = this.threeObject
    }
            
        
}
/*

*/
import * as THREE from 'three'


export abstract class GameObject{
    threeObject: THREE.Object
    public isSpawned = false
    protected defaultScale = 1.
    protected defaultRotation = new THREE.Vector3(0., 0., 0.)
    public name="object"
    constructor() {
       
    }

    async loadModel():Promise<void> {
        return
    }

    async spawn(support: THREE.Object, x: number, y: number):Promise<THREE.Object> {

        await this.loadModel()

        this.threeObject.name = this.name
        support.add(this.threeObject)
        this.threeObject.position.set(x,y,0)
        this.threeObject.scale.set(this.defaultScale, this.defaultScale, this.defaultScale)
        this.threeObject.rotation.setFromVector3(this.defaultRotation)
        console.log(this.threeObject.position)
        console.log(this.threeObject.scale)
        console.log(this.threeObject.rotation)
        this.isSpawned = true
        //@ts-ignore
        window.glb = this.threeObject
        return this.threeObject
    }
}
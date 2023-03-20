

import * as THREE from 'three'

const basePath = "../../models/textures/skybox/";

export enum skyboxes {
    desert = "desert"
}

function createPathStrings(filename:string):Array<string> {
   
    const baseFilename = basePath + filename+"/";
    const fileType = ".jpeg";
    const sides = ["front", "back", "up", "down", "left", "right"];
    const pathStings = sides.map(side => {
        return baseFilename  + side + fileType;
    });

    return pathStings;
}

function createMaterialArray(filename: string): Array<THREE.MeshBasicMaterial> {
    const skyboxImagepaths = createPathStrings(filename);
    const materialArray = skyboxImagepaths.map(image => {
        let texture = new THREE.TextureLoader().load(image);

        return new THREE.MeshBasicMaterial({ map: texture, side: THREE.BackSide }); // <---
    });
    return materialArray;
}

export function getSkyBox(skyboxImage: skyboxes): THREE.Mesh{
    const materialArray = createMaterialArray(skyboxImage);
    const size = 100;
    const skyboxGeo = new THREE.BoxGeometry(size, size, size);
    const skybox = new THREE.Mesh(skyboxGeo, materialArray);
    const basis = new THREE.Object3D()
    basis.add(skybox)
    skybox.position.y= size/2
    return basis
}
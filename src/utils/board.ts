import * as THREE from 'three'

const basePath = "../../models/textures/";

export enum boardTextures{
    sand = "sand.jpeg",
    crate = "crate.gif"
}

export function getBoard(nbTiles: number, type: boardTextures) {
    const geometry = new THREE.PlaneGeometry(nbTiles, nbTiles);
    const texturePath = basePath + type
    console.log(texturePath)
    const texture = new THREE.TextureLoader().load(texturePath);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat = new THREE.Vector2(nbTiles, nbTiles)
    const material = new THREE.MeshBasicMaterial({ map: texture });
    const board = new THREE.Mesh(geometry, material);
    board.name = "board"
    return board
}
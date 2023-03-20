import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

class Loader {
    loadGLB(url): Promise<THREE.Object> {

        return new Promise((resolve, reject) => {
            const loader = new GLTFLoader();

            // Load a glTF resource
            loader.load(
                // resource URL
                url,
                // called when the resource is loaded
                function (gltf) {

                    resolve(gltf.scene)

                },
                // called while loading is progressing
                function (xhr) {

                    console.log((xhr.loaded / xhr.total * 100) + '% loaded');

                },
                // called when loading has errors
                function (error) {
                    reject(null)
                    console.log('An error happened');

                }
            );
        })

    }
}

export const loader = new Loader()
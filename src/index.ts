import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Crate } from './objects/crate'
import { GlbOject } from './objects/glbObject'
import { skyboxes,getSkyBox } from './utils/skybox'
import { boardTextures, getBoard } from './utils/board'

//https://threejs.org/manual/examples/game-conga-line.html
//https://www.mapeditor.org/
//https://www.npmjs.com/package/three-pathfinding
class Game{
    camera: THREE.camera
    scene: THREE.scene
    controls: OrbitControls
    renderer: THREE.renderer
    board:THREE.Object
    constructor(){
        console.log("new game !")
    }
    public async init() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000);
        const funCanvas = document.querySelector("#funCanvas")
        console.log(funCanvas)
        this.renderer = new THREE.WebGLRenderer({ canvas: funCanvas, antialias: true });
        this.renderer.setPixelRatio(window.devicePixelRatio)
        this.onResize()
        window.addEventListener("resize", this.onResize.bind(this))
       // document.body.appendChild(this.renderer.domElement);
        

        this.camera.position.set(0, 0, 50);


        const light = new THREE.AmbientLight(0x404040); // soft white light
        this.scene.add(light);

        const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444);
        hemiLight.position.set(0, 20, 0);
        this.scene.add(hemiLight);

        const dirLight = new THREE.DirectionalLight(0xffffff);
        dirLight.position.set(- 3, 10, - 10);
        dirLight.castShadow = true;
        dirLight.shadow.camera.top = 2;
        dirLight.shadow.camera.bottom = - 2;
        dirLight.shadow.camera.left = - 2;
        dirLight.shadow.camera.right = 2;
        dirLight.shadow.camera.near = 0.1;
        dirLight.shadow.camera.far = 40;
        this.scene.add(dirLight);


        //skybox
        const skybox = getSkyBox(skyboxes.desert)
        skybox.name = "skybox"
        this.scene.add(skybox)
        skybox.rotation.set(Math.PI / 2, 0,0)
        

        //fig
        this.scene.fog = new THREE.Fog(0xcccccc, 15, 1500);

        // add main plane
        this.board = getBoard(30,boardTextures.sand)
        this.scene.add(this.board);
        //plane.rotation.set(-Math.PI/2,0,0)

       
        const crate = new Crate()
        crate.spawn(this.board,1,1)
        const obj = new GlbOject()
        obj.spawn(this.board, 2, 2)

        this.controls = new OrbitControls(this.camera, this.renderer.domElement) 
        this.controls.maxDistance = 100
        this.controls.minDistance = 10
        //this.controls.maxAzimuthAngle = -Math.PI / 2
        
        this.controls.update();
        this.animate.bind(this)()

        this.expose()
    }

    private onResize() {
        console.log("onResize")       

        const canvasContainer = document.querySelector("#funCanvasContainer")
        this.camera.aspect = canvasContainer.clientWidth / canvasContainer.clientHeight;
        this.camera.updateProjectionMatrix();
        console.log(canvasContainer.clientWidth)
        this.renderer.setSize(canvasContainer.clientWidth, canvasContainer.clientHeight);
    }

    public expose() {
        //@ts-ignore
        window.scene = this.scene
         //@ts-ignore
        window.camera = this.camera
        //@ts-ignore
        window.THREE=THREE
        //@ts-ignore
        window.controls = this.controls
    }

    public animate() {

        requestAnimationFrame(this.animate.bind(this));

        // required if controls.enableDamping or controls.autoRotate are set to true
        this.controls.update();

        this.renderer.render(this.scene, this.camera);

    }
}



const game = new Game()
game.init()
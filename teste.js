let keyA, keyD, keyW, keyS, keyDown, keyUp, key_Down, key_Up, key_Left, key_Right = false;


const scene = new THREE.Scene();
const can = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

can.position.x = 1;
can.position.y = 2;
can.position.z = 4;
can.rotation.y=Math.PI;

renderer.setClearColor(0xadd8e6, 1);

const axel = new THREE.AxisHelper(300);
scene.add(axel);

function move() {
    
    if (keyA) { can.rotation.y+=Math.PI/40; }
    if (keyD) { can.rotation.y-=Math.PI/40; }
    if (keyW) {
        can.position.z-=Math.cos(can.rotation.y)
        can.position.x-=Math.sin(can.rotation.y)
    } 
    if (keyS) {
        can.position.z+=Math.cos(can.rotation.y)
        can.position.x+=Math.sin(can.rotation.y)
    } 
    
    if (key_Up) { can.position.y += 0.1 }
    if (key_Down) { can.position.y -= 0.1 }  
}
function animate() {
    move();
    renderer.render(scene, can);
    requestAnimationFrame(animate);
}
animate();

class light{
    lights = [];
    panel = 0;
    V = 0;
    aux = true

    constructor(V){

        this.V = V;

        const geometry_R = new THREE.PlaneGeometry( 1, 2 );
        const material = new THREE.MeshBasicMaterial( {color: 0x808080, side: THREE.DoubleSide} );
        const plane = new THREE.Mesh( geometry_R, material );
        scene.add( plane );
        this.panel = scene.children[scene.children.length-1]
        
        const geometry_C = new THREE.CircleGeometry( 0.2, 32 );

        const material_Y = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
        const Light_Y = new THREE.Mesh( geometry_C, material_Y );

        const material_R = new THREE.MeshBasicMaterial( { color: 0xff0000 } );
        const Light_R = new THREE.Mesh( geometry_C, material_R );

        const material_G = new THREE.MeshBasicMaterial( { color: 0x008000 } );
        const Light_G = new THREE.Mesh( geometry_C, material_G );
       
        scene.add( Light_G );
        scene.add( Light_Y );
        scene.add( Light_R );

        this.lights = [Light_G, Light_Y, Light_R];
        this.aux = V===1 ? true: false;

    }
    animation(arg) {
        let i = arg.aux===true ? 0 : 2
        let C = arg.aux===true ? {r: 0, g: 1, b: 0} : {r: 1, g: 0, b: 0}

        arg.lights[i].material.color = C
            if(arg.aux===true){ setTimeout(() =>{arg.lights[1].material.color = {r: 1, g: 1, b: 0}}, 3000)
                setTimeout(() => arg.lights[i].material.color = {r: 0, g: 0, b: 0}, 3000)
                setTimeout(() =>{arg.lights[1].material.color = {r: 0, g: 0, b: 0} }, 4000) }
        setTimeout(() => arg.lights[i].material.color = {r: 0, g: 0, b: 0}, 4000)
        arg.aux = !arg.aux
    }
}
const PI_1Q = (Math.PI/4)+(Math.PI/4);
const PI_1M = -Math.PI/2;

let lights =  [new light(1), new light(1), new light(0), new light(0)]

lights[0].lights[0].position.set(0,5.2,5)
lights[0].lights[1].position.set(0,4.6,5)
lights[0].lights[2].position.set(0,4  ,5)
lights[0].panel.position.set(0, 4.6, 4.9)

lights[1].lights[0].position.set(0,5.2,-5); lights[1].lights[0].rotation.y = -Math.PI
lights[1].lights[1].position.set(0,4.6,-5); lights[1].lights[1].rotation.y = -Math.PI
lights[1].lights[2].position.set(0,4  ,-5); lights[1].lights[2].rotation.y = -Math.PI
lights[1].panel.position.set(0, 4.6, -4.9);  lights[2].panel.rotation.y = -Math.PI

lights[2].lights[0].position.set(5,5.2,0); lights[2].lights[0].rotation.y = PI_1Q
lights[2].lights[1].position.set(5,4.6,0); lights[2].lights[1].rotation.y = PI_1Q
lights[2].lights[2].position.set(5,4  ,0); lights[2].lights[2].rotation.y = PI_1Q
lights[2].panel.position.set(4.9, 4.6, 0); lights[2].panel.rotation.y = PI_1Q

lights[3].lights[0].position.set(-5,5.2,0); lights[3].lights[0].rotation.y = -Math.PI/2;
lights[3].lights[1].position.set(-5,4.6,0); lights[3].lights[1].rotation.y = -Math.PI/2;
lights[3].lights[2].position.set(-5,4  ,0); lights[3].lights[2].rotation.y = -Math.PI/2;
lights[3].panel.position.set(-4.9, 4.6, 0); lights[3].panel.rotation.y = -Math.PI/2;

function loop(){
    for (j in lights){
        lights[j].animation(lights[j])
    }
    setTimeout(loop, 4000)
}
loop()

const light_L = new THREE.PointLight(0xffffff, 10);
light_L.position.set(40, 80, 20);
scene.add(light_L);


let street_1;
const loader = new THREE.GLTFLoader();
loader.load('street_1.glb', function (gltf){
    scene.add(gltf.scene);
    street_1 = scene.children[scene.children.length-1]
});
let street_2;
loader.load('street_2.glb', function (gltf){
    scene.add(gltf.scene);
    street_2 = scene.children[scene.children.length-1]
    street_2.position.x = 12;
});
let street_3;
loader.load('street_2.glb', function (gltf){
    scene.add(gltf.scene);
    street_3 = scene.children[scene.children.length-1]
    street_3.position.x = -12;
});
let street_4;
loader.load('street_2.glb', function (gltf){
    scene.add(gltf.scene);
    street_4 = scene.children[scene.children.length-1]
    street_4.rotation.y = PI_1Q;
    street_4.position.z = 12;
});
let street_5;
loader.load('street_2.glb', function (gltf){
    scene.add(gltf.scene);
    street_5 = scene.children[scene.children.length-1]
    street_5.rotation.y = PI_1Q;
    street_5.position.z = -12;
});
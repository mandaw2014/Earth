var scene, camera, renderer, earth, moon, manualControl = false;

init();

function init() {
    scene = new THREE.Scene();

    const envMap = new THREE.TextureLoader().load("map/space.jpg");

    scene.background = envMap;

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    const ambient = new THREE.HemisphereLight(0xffffbb, 0x080820, 0.5);
    scene.add(ambient);

    const light = new THREE.DirectionalLight(0xFFFFFF, 0.7);
    light.castShadow = true;
    light.shadow.mapSize.width = 1024;
    light.shadow.mapSize.height = 1024;
    light.shadow.near = 1;
    light.shadow.far = 100;
    const shadowSize = 5;
    light.shadow.left = -shadowSize;
    light.shadow.right = shadowSize;
    light.shadow.top = shadowSize;
    light.shadow.bottom = -shadowSize;
    light.position.set( -1, 10, 6);
    scene.add(light);

    camera.position.z = 12;

    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    const textureEarth = new THREE.TextureLoader().load("map/earth-map.jpg");
    const textureMoon = new THREE.TextureLoader().load("map/moon-map.jpg");

    const geometryEarth = new THREE.SphereGeometry(5, 32, 32);
    const materialEarth = new THREE.MeshBasicMaterial({map: textureEarth});
    earth = new THREE.Mesh(geometryEarth, materialEarth);

    const geometryMoon = new THREE.SphereGeometry(2, 32, 32);
    const materialMoon = new THREE.MeshBasicMaterial({map: textureMoon});
    moon = new THREE.Mesh(geometryMoon, materialMoon);
    moon.position.z = 100;
    earth.add(moon);

    scene.add(earth);

    window.addEventListener("resize", resize, false);

    update();
}

const btn = document.getElementById("btn");
const hde = document.getElementById("hide");

btn.addEventListener("click", function() {
    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.target.set(0,0,0);
    controls.update();
    manualControl = true;
    btn.style.display = "none";
    hde.style.display = "none";
});

hide.addEventListener("click", function() {
    btn.style.display = "none";
    hde.style.display = "none";
});

function update() {
    requestAnimationFrame(update);
    renderer.render(scene, camera);
    if(manualControl === false) {
        earth.rotation.y += 0.0009;
        moon.rotation.y += 0.01;
    }
}

function resize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}
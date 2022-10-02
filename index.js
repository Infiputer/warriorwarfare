const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87ceeb);
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
var myPoint = new THREE.Vector3(0, 0, 0);

centerlight = new THREE.PointLight(0xffffff, 2, 200);
centerlight.position.set(5, 10, 5);
scene.add(centerlight);

light = new THREE.PointLight(0xffffff, 2, 200);
light.position.set(5, 10, 5);
scene.add(light);

THREE.Cache.enabled = true ;

ground = null;

groundloader = new THREE.GLTFLoader();
groundloader.load(
    "assets/ground.glb",
    function (glb) {
        ground = glb.scene;
				ground.name = "The Ground"
        ground.scale.set(90, 90, 90);
        ground.position.y = -1.3;
        scene.add(ground);
    },
    function (xhr) {
			if((xhr.loaded / xhr.total)<0.99){
				document.getElementById("clickToStart").innerHTML = "Loading "
					+Math.round((xhr.loaded / xhr.total) * 100)+"%";
			}
			else{
				document.getElementById("clickToStart").innerHTML = "Click to begin, esc to exit";
			}
    },
    function (error) {
        console.log(error);
    }
);

var myGlb = null;
loader = [];
var peopleGLB = [];
var deadPeopleGLB = [];
var projectileGLB = [];
var carGLB = [];

function createPerson() {
		let nameTag = document.createElement("DIV");
		nameTag.innerText = "hello";
		document.body.appendChild(nameTag);	
		nameTag.className = "nameTags";
		nameTags.push(nameTag)
    i = loader.length - 1;
    loader[i] = new THREE.GLTFLoader();
		let appendPersonIndex = peopleGLB.length;
		peopleGLB[appendPersonIndex] = {"position":{}, "rotation":{}};
    loader[i].load(
        "assets/person.glb",
        function (glb) {
            person = glb.scene;
            peopleGLB[appendPersonIndex] = person;
            person.scale.set(5, 5, 5);
            person.position.x = 14;
            person.position.y = -0.5;
            person.position.z = -29
            scene.add(person);
        },
        function (xhr) {
        },
        function (error) {
            console.log(error);
        }
    );
    loader = [];
}

function createCar() {
    i = loader.length - 1;
    loader[i] = new THREE.GLTFLoader();
		let appendCarIndex = carGLB.length;
		carGLB[appendCarIndex] = {"position":{}, "rotation":{}};
    loader[i].load(
        "assets/car.glb",
        function (glb) {
            car = glb.scene;
            carGLB[appendCarIndex] = car;
            car.scale.set(40, 40, 40);
            car.position.x = 14;
            car.position.y = -0.5;
            car.position.z = -29
            scene.add(car);
        },
        function (xhr) {
        },
        function (error) {
            console.log(error);
        }
    );
    loader = [];
}

function createDeadPerson() {
    i = loader.length - 1;
    loader[i] = new THREE.GLTFLoader();
		let appendDeadPersonIndex = deadPeopleGLB.length;
		deadPeopleGLB[appendDeadPersonIndex] = {"position":{}, "rotation":{}};
    loader[i].load(
        "assets/deadperson.glb",
        function (glb) {
            person = glb.scene;
            deadPeopleGLB[appendDeadPersonIndex] = person;
            person.scale.set(5, 5, 5);
            person.position.x = 14;
            person.position.y = -0.5;
            person.position.z = -29
            scene.add(person);
        },
        function (xhr) {
        },
        function (error) {
            console.log(error);
        }
    );
    loader = [];
}

function createProjectile() {
    i = loader.length - 1;
    loader[i] = new THREE.GLTFLoader();
    loader[i].load(
        "assets/projectile.glb",
        function (glb) {
            projectile = glb.scene;
            projectileGLB.push(projectile);
            projectile.scale.set(5, 5, 5);
            projectile.position.x = 14;
            projectile.position.y = -0.5;
            projectile.position.z = -29
            scene.add(projectile);
        },
        function (xhr) {
        },
        function (error) {
            console.log(error);
        }
    );
    loader = [];
}

cameraAngle = 0;
camera.position.y = 0.5;

renderer.outputEncoding = THREE.sRGBEncoding;

function animate() {
    requestAnimationFrame(animate);

    // peopleGLB[0].position.x = myX;
    // peopleGLB[0].position.y = myY;
    // peopleGLB[0].position.z = myZ;
    // peopleGLB[0].rotation.y = myRotation;



    myPoint.x = myX + Math.sin(myRotationY) * 3;
    myPoint.y = myY + +Math.cos(myRotationX) * 3 + 1;
    myPoint.z = myZ + Math.cos(myRotationY) * 3;

    camera.position.x = myX + Math.sin(myRotationY) * 0.2;
    camera.position.y = myY + 0.8;
    camera.position.z = myZ + Math.cos(myRotationY) * 0.2;

    light.position.set(camera.position.x, camera.position.y, camera.position.z);
    cameraAngle += 0.01;

    camera.lookAt(myPoint);

    renderer.render(scene, camera);
}

animate();

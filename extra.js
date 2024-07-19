canvas = document.getElementsByTagName("canvas")[0];

canvas.onclick = function () {
    canvas.requestPointerLock();
    document.getElementById("clickToStart").innerHTML = "";
    clearInterval(preClickinterval);
    document.addEventListener("mousemove", mouseMove, false);
    socket.send("launch");
};

function mouseMove(e) {
    myRotationY -= e.movementX / 1000;
    myRotationX -= e.movementY / 1000;
}

function distance2d(ax, ay, bx, by) {
    dx = bx - ax;
    dy = by - ay;

    dist = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));

    return dist;
}

keymap = {};
function keyHandler() {
    prevMyX = myX;
    prevMyY = myY;
    prevMyZ = myZ;
    if (keymap[87]) {
        myZ += Math.cos(myRotationY) / 5;
        myX += Math.sin(myRotationY) / 5;
        sendPosition();
    }
    if (keymap[83]) {
        myZ -= Math.cos(myRotationY) / 5;
        myX -= Math.sin(myRotationY) / 5;
        sendPosition();
    }
    if (keymap[65]) {
        myZ += Math.cos(myRotationY + Math.PI / 2) / 5;
        myX += Math.sin(myRotationY + Math.PI / 2) / 5;
        sendPosition();
    }
    if (keymap[68]) {
        myZ += Math.cos(myRotationY - Math.PI / 2) / 5;
        myX += Math.sin(myRotationY - Math.PI / 2) / 5;
        sendPosition();
    }
    if (keymap[32]) {
        if (jumpStage == 0) {
            jumpStage = 0.1;
        }
    }
}
function toScreenPosition(obj, camera) {
    var vector = new THREE.Vector3();

    var widthHalf = 0.5 * renderer.getContext().canvas.width;
    var heightHalf = 0.5 * renderer.getContext().canvas.height;

    //obj.updateMatrixWorld();
    vector.setFromMatrixPosition(obj.matrixWorld);
    vector.project(camera);

    vector.x = (vector.x * widthHalf) + widthHalf;
    vector.y = - (vector.y * heightHalf) + heightHalf;

    return {
        x: vector.x,
        y: vector.y
    };

};

function createVector(x, y, z, camera, width, height) {

    widthHalf = width / 2,
        heightHalf = height / 2;
    var p = new THREE.Vector3(x, y, z);
    var vector = p.project(camera);

    vector.x = (vector.x * widthHalf) + widthHalf;
    vector.y = - (vector.y * heightHalf) + heightHalf;
    return vector;
}
function keypress(event) {
    key = event.keyCode;
    keymap[event.keyCode] = event.type == "keydown";
    for (k2 in keymap) {
        if (keymap[k2] == false) {
            delete keymap[k2];
        }
    }
}

function positionEvents() {
    if (distance2d(3.8818468489171045, 8.515078601014194, myX, myZ) < 0.5 && jumpStage == 0) {
        jumpStage = 0.1;
        jumpHeight = 20;
        jumpSpeed = 2;
    }
    if (jumpStage > 2.5) {
        jumpHeight = 1;
        jumpSpeed = 1;
    }
    if (distance2d(8.319638434234186, 9.916298402774055, myX, myZ) < 2.5 && myY > 2) {
        groundLevel = 3;
    }
    else if (distance2d(-1.635137643339542, 8.95462160397084, myX, myZ) < 2.5 && myY > 2) {
        groundLevel = 2.6;
    }
    else if (Math.abs(myZ + 9.4821728581) < 0.5 && myX < 0.9995 && myX > -4.395) {
        groundLevel = constrain(0, mathmap(myX, 0.99, -4.857, 0, 9), 7.97);
    }
    else if (distance2d(myX, myZ, -8.829392646534282, -9.10817161491205) < 5 && myY > 6) {
        groundLevel = 7.97;
    }
    else {
        groundLevel = 0;
    }
    fallGroundLevel = lerp(fallGroundLevel, groundLevel, 1)

    for (i in blockedPlaces) {
        if (distance2d(myX, myZ, blockedPlaces[i][0], blockedPlaces[i][2]) < blockedPlaces[i][3]) {
            myX = prevMyX;
            myY = prevMyY;
            myZ = prevMyZ;
        }
    }
}

function constrain(val, min_val, max_val) {
    return Math.min(max_val, Math.max(min_val, val))
}


function lerp(A, B, t) {
    return A + constrain((B - A), -1, 1) * t;
}

function resetScene() {
    for (x = 0; x < 3; x++) {
        for (i in scene.children) {
            if (scene.children[i].type == "Group" && scene.children[i].name != "The Ground") {
                scene.remove(scene.children[i])
            }
        }
    }
    peopleGLB = [];
    deadPeopleGLB = [];
    projectileGLB = [];
    carGLB = [];
}

function mathmap(x, in_min, in_max, out_min, out_max) {
    return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

document.addEventListener("keyup", keypress);
document.addEventListener("keydown", keypress);

setInterval(keyHandler, 100);
setInterval(positionEvents, 100);
setInterval(resetScene, 100000);

setInterval(function () {
    if (jumpStage != 0) {
        jumpStage += 0.07 / jumpSpeed;
        if (jumpStage > 3.143) {
            jumpStage = 0;
        }
        myY = Math.sin(jumpStage) * jumpHeight - 0.5 + fallGroundLevel;
        sendPosition();
    } else {
        myY = Math.sin(jumpStage) * jumpHeight - 0.5 + fallGroundLevel;
    }
}, 30)

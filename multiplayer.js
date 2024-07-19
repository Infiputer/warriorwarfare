var turnOnWS = new XMLHttpRequest();
turnOnWS.open("GET", "https://WebSocket3D.infiputer.repl.co", true);
turnOnWS.send();

let socket = new WebSocket("wss://warriorwarfarews.herokuapp.com/");
socket.onopen = function (e) {
    isconnected = true;
    console.log("[open] Connection established");
    socket.send("name " + myName);
};
socket.onmessage = function (event) {
    if (event.data == "die") {
        deadtextelement = document.createElement("div");
        deadtextelement.style.position = "absolute";
        deadtextelement.style.zIndex = 1;
        deadtextelement.style.fontSize = "100px";
        deadtextelement.style.width = 100;
        deadtextelement.style.height = 100;
        deadtextelement.style.color = "red";
        deadtextelement.innerHTML = "You died!";
        deadtextelement.style.top = 200 + "px";
        deadtextelement.style.left = 200 + "px";
        document.body.appendChild(deadtextelement);
        return;
    } else if (event.data.startsWith("id")) {
        myId = event.data.substring(3);
    }
    else if (event.data.startsWith("sound ")) {
        console.log("!")
        soundData = event.data.split(" ")
        playSound(soundData[1], soundData[2], soundData[3])
    } else if (true) {
        tempObjects = JSON.parse(event.data);
        tempPeople = tempObjects.filter(function (x) {
            return x.type == "person" && x.id != myId;
        });
        tempDeadPeople = tempObjects.filter(function (x) {
            return x.type == "deadperson" && x.id != myId;
        });
        tempProjectile = tempObjects.filter(function (x) {
            return x.type == "projectile";
        });
        tempCar = tempObjects.filter(function (x) {
            return x.type == "car";
        });
        if (tempPeople.length > peopleGLB.length) {
            createPerson();
        }
        if (tempPeople.length == 0) {
            for (removePerson in peopleGLB) {
                scene.remove(peopleGLB[removePerson])
            }
            peopleGLB = []
        }
        if (tempPeople.length < peopleGLB.length) {
            scene.remove(peopleGLB[peopleGLB.length - 1]);
            delete peopleGLB[peopleGLB.length - 1];
            peopleGLB.pop();
        }
        if (tempPeople.length < nameTags.length) {
            nameTags[nameTags.length - 1].innerHTML = "";
            document.body.removeChild(nameTags[nameTags.length - 1])
            nameTags.pop();
        }
        //
        if (tempCar.length > carGLB.length) {
            createCar();
        }
        if (tempCar.length < carGLB.length) {
            scene.remove(carGLB[carGLB.length - 1]);
            delete carGLB[carGLB.length - 1];
            carGLB.pop();
        }
        //
        if (tempDeadPeople.length > deadPeopleGLB.length) {
            createDeadPerson();
        }
        if (tempDeadPeople.length < deadPeopleGLB.length) {
            scene.remove(deadPeopleGLB[deadPeopleGLB.length - 1]);
            delete deadPeopleGLB[deadPeopleGLB.length - 1];
            deadPeopleGLB.pop();
        }
        //
        if (tempProjectile.length > projectileGLB.length) {
            createProjectile();
        }
        if (tempProjectile.length < projectileGLB.length) {
            scene.remove(projectileGLB[projectileGLB.length - 1]);
            delete projectileGLB[projectileGLB.length - 1];
            projectileGLB.pop();
        }
        for (i in tempPeople) {
            peopleGLB[i].position.x = tempPeople[i]["position"][0];
            peopleGLB[i].position.y = tempPeople[i]["position"][1];
            peopleGLB[i].position.z = tempPeople[i]["position"][2];
            peopleGLB[i].rotation.y = tempPeople[i]["position"][3];
            textLabelPosition = (createVector(
                tempPeople[i]["position"][0],
                tempPeople[i]["position"][1],
                tempPeople[i]["position"][2],
                camera,
                renderer.domElement.width,
                renderer.domElement.height
            ));
            textLabelPosition.x = Math.round(textLabelPosition.x);
            textLabelPosition.y = Math.round(textLabelPosition.y);
            nameTagTest = (textLabelPosition.z < 1) ? tempPeople[i]["name"] : ""
            if (nameTags[i].innerHTML != nameTagTest) {
                nameTags[i].innerHTML = nameTagTest
            }
            nameTags[i].style.left = textLabelPosition.x + "px";
            nameTags[i].style.top = (textLabelPosition.y - 50) + "px";
        }
        for (i in tempDeadPeople) {
            deadPeopleGLB[i].position.x = tempDeadPeople[i]["position"][0];
            deadPeopleGLB[i].position.y = tempDeadPeople[i]["position"][1];
            deadPeopleGLB[i].position.z = tempDeadPeople[i]["position"][2];
            deadPeopleGLB[i].rotation.y = tempDeadPeople[i]["position"][3];
        }
        for (i in tempCar) {
            carGLB[i].position.x = tempCar[i]["position"][0];
            carGLB[i].position.y = tempCar[i]["position"][1];
            carGLB[i].position.z = tempCar[i]["position"][2];
            carGLB[i].rotation.y = tempCar[i]["position"][3];
        }
        for (i in tempProjectile) {
            try {
                projectileGLB[i].position.x = tempProjectile[i]["position"][0];
                projectileGLB[i].position.y = tempProjectile[i]["position"][1];
                projectileGLB[i].position.z = tempProjectile[i]["position"][2];
                projectileGLB[i].rotation.x = tempProjectile[i]["position"][4];
                projectileGLB[i].rotation.y = tempProjectile[i]["position"][3];
            } catch (error) { }
        }
    }
};

function sendPosition() {
    socket.send("mv  " + myX + "," + myY + "," + myZ + "," + myRotationY + "," + myRotationX);
}
setInterval(sendPosition, 500);

myX = 0;
myY = 0;
myZ = 0;
prevMyX = 0;
prevMyY = 0;
prevMyZ = 0;
jumpStage = 0.1;
myRotationY = 0;
myRotationX = 4.5;
//jumpHeight = 3;
healthBarColors = ["red", "orange", "yellow", "green"];
myId = null;
groundLevel = 0;
fallGroundLevel = 5;
jumpSpeed = 1;
jumpHeight = 1;
preClickinterval = setInterval(function () {
    myRotationY += 0.01;
}, 100);

nameTags = [];

//
blockedPlaces = [
	[2.846906985225715, -0.5, -3.33478506703930, 0.3],
	[2.023598795519360, -0.5, 0.530419148400343, 0.2],
	[1.996813636176183, -0.5, 2.328480069770952, 0.2],
	[2.052706968915777, -0.5, 4.473201627173154, 0.2]
]
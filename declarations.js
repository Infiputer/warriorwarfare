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
	[2.846906985225715, -0.5, -3.334785067039, 0.3],//fountain
	[2.023598795519360, -0.5, 0.5304191484003, 0.2],//tree straight
	[1.996813636176183, -0.5, 2.3284800697709, 0.2],//tree straight
	[2.052706968915777, -0.5, 4.4732016271731, 0.2],//tree straight
	[-1.32583598603811, -0.5, 6.0422418179324, 0.4],//castle
	[-3.22542967079903, -0.5, 6.0466835017747, 0.4],//castle
	[-3.60104487604666, -0.5, 8.8086343126476, 0.4],//castle
	[0.67446891729462, -0.5, 11.0456302340490, 0.4],//castle
	[-4.3862610283141, -0.5, 11.9354946678005, 0.4],//castle
	[-0.9336514015465, -0.5, 11.7019120452485, 0.4],//castle
	[-3.7958287206177, -0.5, 8.47212385801061, 0.4],//castle
	[-3.795828720617741, -0.5, 8.472123858010, 0.4],
	[1.269263808174363, -0.5, 6.25590234493713, 0.4],//caste
	[12.465686553032073, -0.5, -9.15965750767897, 0.4],//house
	[7.756729370094649, -0.5, -10.165546368194008, 0.4],
	[7.614154193787929, -0.5, -8.338957488131573, 0.4],
	[7.772789822491229, -0.5, -10.998061362282051, 0.4],
	[12.222696152691592, -0.5, -11.00755586131805, 0.4]
]
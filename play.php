<!DOCTYPE html>
<html>
	<head>
		<link rel="icon" href="favicon.ico?v1" type="image/x-icon" />
<link rel="shortcut icon" href="favicon.ico?v1" type="image/x-icon" /> 
<link rel="stylesheet" type="text/css" href="style.css" media="screen" />
		<title>Warrior Warfare | In-game</title>
		<style>
			body { margin: 0; }
		</style>
	</head>
	<body>
		<script src="https://threejs.org/build/three.js"></script>
		<script src="https://cdn.jsdelivr.net/gh/mrdoob/three.js@master/examples/js/loaders/STLLoader.js"></script>
		<script src="https://cdn.jsdelivr.net/gh/mrdoob/three.js@master/examples/js/loaders/GLTFLoader.js"></script>
		<script src = "declarations.js"></script>
		<script src = "index.js"></script>
		<script src = "extra.js"></script>
		<script src = "soundeffects.js"></script>
		<script src = "multiplayer.js"></script>
		<img id = "crosshair" src = "assets/crosshair.svg">
		<div id = "clickToStart">Loading... <br>Click to begin<br> press esc to exit </div>
		<script>
			myName = <?php echo json_encode($_GET["name"]) ?>;
		</script>
	</body>
</html>

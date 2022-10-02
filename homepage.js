	tips = [
		"WASD to move",
		"Click to shoot",
		"Bounce on trampolines",
		"Hide in a castle or a house",
		"Made by Infiputer"
	]
	tipnum = Math.floor(Math.random()*tips.length);
	function showTip(){
		document.getElementById("tips").innerHTML = tips[tipnum];
		tipnum++;
		tipnum=tipnum%tips.length;
	}
	function changeTip(){
		for(deg = 0; deg<360;deg+=30){
			setTimeout(function(x){
				console.log(x)
				document.getElementById("tips").style.transform="rotateX("+x+"deg)";
			}, deg*10, deg)
		}
		setTimeout(showTip, 700);
	}
	changeTip();
	setInterval(changeTip, 5000);
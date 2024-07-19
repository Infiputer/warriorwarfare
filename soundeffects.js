function playSound(filename, x, z) {
    soundVolume = mathmap(distance2d(myX, myZ, x, z), 0, 10, 1, 0);
    soundeffectAudio = new Audio('/assets/sounds/' + filename);
    soundeffectAudio.volume = soundVolume;
    soundeffectAudio.play();
}

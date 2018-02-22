const {video, splayer} = require('./elements.js');

const togglePlayPause = function() {
    if (video.paused) {
        video.play();
    } else {
        video.pause();
    }
}

splayer.addEventListener('click', togglePlayPause, false);
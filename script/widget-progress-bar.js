const {progress_bar, video, splayer} = require('./elements.js');

let progress_interval;

const updateProgressElement = function() {
    let percentage = video.currentTime / video.duration;
    if(parseInt(percentage) === 1 && video.paused === true) {
        window.clearInterval(progress_interval); 
        return; 
    }
    progress_bar.style.width = percentage * 100 + '%';
}

const updateProgress = function() {
    progress_interval = window.setInterval(updateProgressElement, 100); 
}

video.addEventListener('loadedmetadata', updateProgress, false);
splayer.addEventListener('click', updateProgress, false);
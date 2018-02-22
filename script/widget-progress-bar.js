const {progress_bar, video} = require('./elements.js');

let progress_interval;

const updateProgressElement = function() {
    let percentage = video.currentTime / video.duration;
    // console.log(percentage);
    if(parseInt(percentage) === 1) {
        // console.log(percentage);
        window.clearInterval(progress_interval); 
        return; 
    }
    progress_bar.style.width = percentage * 100 + '%';
}

const updateProgress = function() {
    progress_interval = window.setInterval(updateProgressElement, 100); 
}


video.addEventListener('loadedmetadata', updateProgress, false);


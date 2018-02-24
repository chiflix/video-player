const {progress_bar, video, splayer, progress_hot_region, line_bar} = require('./elements.js');

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

const enlargeProgressBar = function() {
    line_bar.className = 'line-bar line-bar-mouseover';
}

const recoverProgressBar = function() {
    line_bar.className = 'line-bar';
}

video.addEventListener('loadedmetadata', updateProgress, false);
splayer.addEventListener('click', updateProgress, false);
progress_hot_region.addEventListener('mouseover', enlargeProgressBar, false);
progress_hot_region.addEventListener('mouseout', recoverProgressBar, false);
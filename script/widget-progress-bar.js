const {progress_bar, video, splayer, progress_area, bar_line, progress_background} = require('./elements.js');

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
    progress_interval = window.setInterval(updateProgressElement, 20); 
}

const enlargeProgressBar = function() {
    bar_line.className = 'bar-line bar-line--mouseover';
    progress_background.className = 'progress-background progress-background--mouseover';
}

const recoverProgressBar = function() {
    bar_line.className = 'bar-line';
    progress_background.className = 'progress-background';
}

video.addEventListener('loadedmetadata', updateProgress, false);
splayer.addEventListener('click', updateProgress, false);
progress_area.addEventListener('mouseover', enlargeProgressBar, false);
progress_area.addEventListener('mouseout', recoverProgressBar, false);
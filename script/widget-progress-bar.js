const {video, player, area_progress, progress_played, progress_line} = require('./elements.js');

let progress_interval;

const updateProgressElement = function() {
    let percentage = video.currentTime / video.duration;
    if(parseInt(percentage) === 1 && video.paused === true) {
        window.clearInterval(progress_interval);
        return;
    }
    progress_played.style.width = percentage * 100 + '%';
}

const updateProgress = function() {
    progress_interval = window.setInterval(updateProgressElement, 20);
}

const enlargeProgressBar = function() {
    progress_line.className = 'line line--mouseover';
}

const recoverProgressBar = function() {
    progress_line.className = 'line';
}

const changeProgress = function(event){
    console.log(event.offsetX);
    progress_played.style.width = event.offsetX + 'px';
}

video.addEventListener('loadedmetadata', updateProgress, false);
player.addEventListener('click', updateProgress, false);
area_progress.addEventListener('click',changeProgress,false);
area_progress.addEventListener('mouseover', enlargeProgressBar, false);
area_progress.addEventListener('mouseout', recoverProgressBar, false);

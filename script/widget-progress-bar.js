const {
    video,
    player,
    area_progress,
    progress_played,
    progress_bar,
    progress_line,
    progress_ready,
    progress_thumbnail
} = require('./elements.js');

let progress_interval;
let position = {
    offsetX: 0,
    state: 0,
    current_time: 0
}

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
    progress_ready.className = 'progress--ready mouseover';
}

const recoverProgressBar = function() {
    progress_line.className = 'line';
    progress_ready.className = 'progress--ready';
}

const changeProgress = function(event){
    video.currentTime = event.offsetX / area_progress.offsetWidth * video.duration;
    console.log(event.offsetX);
    position.state = 1;
    position.offsetX = event.offsetX;
    position.current_time = video.currentTime;
    console.log(video.duration);
}

const changeProgressByDrag = function(event){
    if(position.state){
        let adjusted_progress_width = (event.offsetX - position.offsetX) / area_progress.offsetWidth;
        let adjusted_video_current_time = adjusted_progress_width * video.duration;
        video.currentTime = position.current_time + adjusted_video_current_time;
    }
    else{
        progress_ready.style.width = event.offsetX + 'px';
        progress_thumbnail.style.opacity = 1;
        ctx = progress_thumbnail.getContext('2d');
        // ctx.drawImage(video,0,0,270,135);
        if(event.offsetX > progress_thumbnail.offsetWidth/2 &&
        progress_bar.offsetWidth - event.offsetX > progress_thumbnail.offsetWidth/2){
            progress_thumbnail.style.left = event.offsetX - (progress_thumbnail.offsetWidth / 2) + 'px';
        }
        else if(event.offsetX <= progress_thumbnail.offsetWidth/2){
                progress_thumbnail.style.left = 0;
        }
        else if(progress_bar.offsetWidth - event.offsetX <= progress_thumbnail.offsetWidth/2){
            progress_thumbnail.style.left = progress_bar.offsetWidth - progress_thumbnail.offsetWidth/2
        }
    }
}

video.addEventListener('loadedmetadata', updateProgress, false);
player.addEventListener('click', updateProgress, false);
document.addEventListener('mouseup',()=>{position.state = 0;},false);
progress_bar.addEventListener('mousedown',changeProgress,false);
progress_bar.addEventListener('mouseout',()=>{
    progress_thumbnail.style.opacity = 0;
    progress_ready.style.width = 0;
},false);
progress_bar.addEventListener('mousemove',changeProgressByDrag,false);
area_progress.addEventListener('mouseover', enlargeProgressBar, false);
area_progress.addEventListener('mouseout', recoverProgressBar, false);

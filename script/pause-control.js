const {area_playstate, video} = require('./elements.js');

const togglePlayState = function() {
    if(video.paused) {
        video.play();
    } else {
        video.pause();
    }
};
area_playstate.addEventListener('click', togglePlayState, false);

const listenSpaceKeyDown = function(event) {
    if(event.keyCode === 32){
        if(video.paused) {
            video.play();
        } else {
            video.pause();
        }
    }
};
//全局添加键盘监听
document.addEventListener('keydown', listenSpaceKeyDown, false);
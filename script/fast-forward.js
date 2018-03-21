const {video} = require('./elements.js');

let current_play_speed = 1;
const SPEED_LIST = [1, 1.5, 2.5, 5];
const STEP = 5

const adjustPlaySpeed = function(direction) {
    if(direction === 'forward') {
        const current_index = SPEED_LIST.indexOf(current_play_speed);
        if(current_index + 1 !== SPEED_LIST.length) {
            current_play_speed = SPEED_LIST[current_index + 1];
        }
    } else if(direction === 'backward') {
        current_play_speed = 1;
    }
    video.playbackRate = current_play_speed;
};

const listenLeftRightKeyDown = function(event) {
    if(event.keyCode === 37) {
        video.currentTime -= STEP;
        // adjustPlaySpeed('backward');
    } else if(event.keyCode === 39) {
        video.currentTime += STEP;
        // adjustPlaySpeed('forward');
    }
};

document.addEventListener('keydown', listenLeftRightKeyDown, false);

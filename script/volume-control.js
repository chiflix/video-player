const {video,volume_area,volume_icon,volume_current,volume_bar,volume_button} = require('./elements.js');

const VOLUME_VALUE = [0.0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0];

let isMute = false;

const getVolumeIndex = function() {
    const current_volume = video.volume;
    if(current_volume < 0.1) {
        return 0;
    } else if(current_volume < 0.2) {
        return 1;
    } else if(current_volume < 0.3) {
        return 2;
    } else if(current_volume < 0.4) {
        return 3;
    } else if(current_volume < 0.5) {
        return 4;
    } else if(current_volume < 0.6) {
        return 5;
    } else if(current_volume < 0.7) {
        return 6;
    } else if(current_volume < 0.8) {
        return 7;
    } else if(current_volume < 0.9) {
        return 8;
    } else {
        return 9;
    }
};

const adjustVolume = function(direction) {
    const volume_index = getVolumeIndex();
    //console.log(getVolumeIndex());
    if(direction === 'up') {
        if(volume_index + 1 < VOLUME_VALUE.length) {
            video.volume = VOLUME_VALUE[volume_index + 1];
        }
    } else if (direction === 'down') {
        if(volume_index > 0) {
            video.volume = VOLUME_VALUE[volume_index - 1];
        }
    }
    //console.log(video.volume);
};

const listenUpDownKeyDown = function(event) {
    if(event.keyCode === 38) {
        adjustVolume('up');
    } else if(event.keyCode === 40) {
        adjustVolume('down');
    }
};

const mute = function(){
    if(isMute){
        video.muted = true;
        isMute = false;
        volume_icon.innerHTML = '<embed src="image/icon-volume.svg" type="image/svg+xml">'
    }
    else{
        video.muted = false;
        isMute = true;
        volume_icon.innerHTML = '<embed src="image/icon-volume-mute.svg" type="image/svg+xml">'

    }
};

const highlight = function(){
    volume_bar.className = 'volume--bar volume--mouseover';
    volume_current.className = 'volume--current volume--mouseover';
    volume_button.className = 'volume--button volume--mouseover'
};
const recover = function(){
    volume_bar.className = 'volume--bar';
    volume_current.className = 'volume--current';
    volume_button.className = 'volume--button'
};

volume_icon.addEventListener('click', mute, false);
volume_area.addEventListener('mouseover', highlight, false);
volume_area.addEventListener('mouseout', recover, false);
document.addEventListener('keydown', listenUpDownKeyDown, false);

const {video,volume_area,volume_icon,volume_current,volume_bar,volume_slider,volume_slider_area} = require('./elements.js');

const VOLUME_VALUE = [0.0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0];

let isMute = false;
let position = {
        offsetY: 0, //鼠标相对于音量条的偏移Y值
        state: 0, //是否正处于拖拽状态，1表示正在拖拽，0表示释放
        current_height:0 //当前音量高度
    };
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
            volume_current.style.height =  video.volume * volume_bar.offsetHeight + 'px';
        }
    } else if (direction === 'down') {
        if(volume_index > 0) {
            video.volume = VOLUME_VALUE[volume_index - 1];
            volume_current.style.height =  video.volume * volume_bar.offsetHeight + 'px';
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
        video.muted = false;
        isMute = false;
        volume_icon.innerHTML = '<embed src="image/icon-volume.svg" type="image/svg+xml">';
        volume_current.style.height = position.current_height + 'px';
        volume_slider_area.style.height = position.current_height + 'px';
    }
    else{
        video.muted = true;
        isMute = true;
        volume_icon.innerHTML = '<embed src="image/icon-volume-mute.svg" type="image/svg+xml">'
        position.current_height = volume_current.offsetHeight;
        volume_current.style.height = 0;
        volume_slider_area.style.height = 0;
    }
};

const highlight = function(){
    volume_bar.className = 'volume--bar volume--mouseover';
    volume_current.className = 'volume--current volume--mouseover';
    volume_slider.className = 'volume--slider volume--mouseover';
};
const recover = function(){
    volume_bar.className = 'volume--bar';
    volume_current.className = 'volume--current';
    volume_slider.className = 'volume--slider';
};

const changeVolume = function(event) {
    if(isMute){
        video.muted = false;
        isMute = false;
        volume_icon.innerHTML = '<embed src="image/icon-volume.svg" type="image/svg+xml">'
    }

    let percent_of_volume = 1 - event.offsetY / volume_bar.offsetHeight;

    volume_current.style.height =  percent_of_volume * volume_bar.offsetHeight + 'px';
    volume_slider_area.style.height =  percent_of_volume * volume_bar.offsetHeight + 'px';

    video.volume = percent_of_volume;

    position.offsetY = event.offsetY;
    position.state = 1;
    position.current_height = volume_current.offsetHeight;
};

const changeVolumeByDrag = function(event){
    if(position.state){
        let adjusted_height = position.current_height + position.offsetY - event.offsetY;
        if(adjusted_height < volume_bar.offsetHeight && adjusted_height > 1){
            if(isMute){
                video.muted = false;
                isMute = false;
                volume_icon.innerHTML = '<embed src="image/icon-volume.svg" type="image/svg+xml">'
            }

            volume_current.style.height = adjusted_height + 'px';
            volume_slider_area.style.height = adjusted_height + 'px';

            video.volume = adjusted_height / volume_bar.offsetHeight;
        }
        else if(adjusted_height >= volume_bar.offsetHeight){
            volume_current.style.height = volume_bar.offsetHeight + 'px';
            volume_slider_area.style.height = volume_bar.offsetHeight + 'px';
            video.volume = 1;
        }
        else if(adjusted_height <= 1){
            volume_current.style.height = 0;
            volume_slider_area.style.height = 0;
            video.volume = 0;
            isMute = true;
            volume_icon.innerHTML = '<embed src="image/icon-volume-mute.svg" type="image/svg+xml">'
        }
    }
};

volume_area.addEventListener('mouseup',()=>{position.state = 0;},false);
volume_bar.addEventListener('mousemove',changeVolumeByDrag,false);
volume_bar.addEventListener('mousedown',changeVolume,false);
volume_icon.addEventListener('click', mute, false);
volume_area.addEventListener('mouseover', highlight, false);
volume_area.addEventListener('mouseout', recover, false);
document.addEventListener('keydown', listenUpDownKeyDown, false);

const {video, info_current_time, info_duration} = require('./elements.js');

let time_interval;

/**
 * 时间秒数格式化
 * @param s 时间戳（单位：秒）
 * @returns {*} 格式化后的时分秒
 */
const formatTime = function(time) {
    let formatted_time;
    if(time > -1) {
        let hour = parseInt(time / 3600);
        time -= hour * 3600;
        let minute = parseInt(time / 60);
        time -= minute * 60;
        let second = parseInt(time % 60);

        if(hour < 10) {
            formatted_time = '0'+ hour + ':';
        } else {
            formatted_time = hour + ':';
        }
        if(minute < 10) {
            formatted_time += '0' + minute + ':';
        } else {
            formatted_time += minute + ':';
        }
        if(second < 10) {
            formatted_time += '0' + second;
        } else {
            formatted_time += second;
        }
    }
    //console.log(formatted_time);
    return formatted_time;
};

const updateTimeElement = function(time, element) {
    const node = document.createTextNode(time);
    const childs = element.childNodes;
    for(let i = childs.length - 1; i >= 0; i--) {
        element.removeChild(childs.item(i));
    }
    element.appendChild(node);
};

const updateDuration = function() {
    const time = formatTime(video.duration);
    updateTimeElement(time, info_duration);
};

const updateCurrentTime = function() {
    const time = formatTime(video.currentTime);
    updateTimeElement(time, info_current_time);
};

const setUpdateInterval = function() {
    time_interval = window.setInterval(updateCurrentTime, 1000);
};

const clearUpdateInterval = function() {
    if(video.paused === true) {
        window.clearInterval(time_interval);
        return;
    }
};

video.addEventListener('loadedmetadata', updateDuration, false);
video.addEventListener('loadstart', setUpdateInterval, false);
video.addEventListener('play', setUpdateInterval, false);
video.addEventListener('pause', clearUpdateInterval, false);
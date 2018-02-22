const elements = require('./elements.js');

/**
 * 时间秒数格式化
 * @param s 时间戳（单位：秒）
 * @returns {*} 格式化后的时分秒
 */
const formatTime = function(time) {
    let formatted_time;
    if(time > -1) {
        let hour = parseInt(time / 3600);
        let minute = parseInt(time / 60);
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
}

function updateTimeElement(time, element) {
    const node = document.createTextNode(formatTime(time));
    const childs = element.childNodes;
    for(let i = childs.length - 1; i >= 0; i--) {    
        element.removeChild(childs.item(i));    
    } 
    element.appendChild(node);
}
function updateDuration() {
    updateTimeElement(elements.video.duration, elements.info_duration);
}

//为 <video> 元素添加 ontimeupdate 事件，如果当前播放位置改变则执行函数 
function updateCurrentTime() { 
    updateTimeElement(elements.video.currentTime, elements.info_current_time);
}

elements.video.addEventListener('loadedmetadata', updateDuration, false);
elements.video.addEventListener('timeupdate', updateCurrentTime, false);
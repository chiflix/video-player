const {ipcRenderer, remote} = require('electron');
const {video} = require('./elements.js');

/*
 *窗口大小控制
 */
const MIN_WIDTH = 320;
const MIN_HEIGHT = 180;
let [current_width, current_height] = [800, 600];
let [video_width, video_height] = [900, 600];
//获取当前窗口的大小
const getWindowSize = function() {
    [current_width, current_height] = remote.getCurrentWindow().getSize();
};
//获取当前播放视频的长宽
const getVideoSize = function() {
    video_width = video.videoWidth;
    video_height = video.videoHeight;
};
//打开新文件时，向主进程发出消息，调整窗口大小
const adjustWindowToNewVideo = function() {
    getWindowSize();
    getVideoSize();
    let new_width = current_width;
    let new_height = current_height;

    if(current_width < MIN_WIDTH) {
        new_width = MIN_WIDTH;
    }
    new_height = new_width * video_height / video_width;
    if(new_height < MIN_HEIGHT) {
        new_height = MIN_HEIGHT;
        new_width = new_height * video_width / video_height;
    }

    ipcRenderer.send('resize', {
        width: parseInt(new_width), 
        height: parseInt(new_height)
    });
};
//每当重新打开一个视频文件时获取其长宽
video.addEventListener('canplay', adjustWindowToNewVideo, false);

//设定了setAspectRatio，不再需要手动设置窗口宽高
//用户调整窗口大小时维持视频比例不变，同时保持窗口宽和高都大于等于最小值
const resizeWindow = function(event) {
    event.preventDefault();
    //setTimeout(() => {}, 0);//添加延时，使得拖放过程更美观
    getWindowSize();

    let new_width = current_width;
    let new_height = current_height;
    //如果当前宽高比比视频宽高比大
    if(current_width * video_height / video_width > current_height) {
        //以current_width为标准调整大小
        if(current_width < MIN_WIDTH) {
            new_width = MIN_WIDTH;
        }
        new_height = new_width * video_height / video_width;
        if(new_height < MIN_HEIGHT) {
            new_height = MIN_HEIGHT;
            new_width = new_height * video_width / video_height;
        }
    } else {
        //以current_height为标准调整大小
        if(current_height < MIN_HEIGHT) {
            new_height = MIN_HEIGHT;
        }
        new_width = new_height * video_width / video_height;
        if(new_width < MIN_WIDTH){
            new_width = MIN_WIDTH;
            new_height = new_width * video_height / video_width;
        }
    }

    ipcRenderer.send('resize', {
        width: parseInt(new_width), 
        height: parseInt(new_height)
    });
};
//监听窗体缩放
window.addEventListener('resize', resizeWindow, false);

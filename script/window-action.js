const {ipcRenderer, remote} = require('electron');
const {splayer, video} = require('./elements.js');

//设定拖放事件
//TODO: 判断拖放入窗口的文件是否是可播放的视频格式
splayer.addEventListener('dragenter', (event)=>{
    event.preventDefault();
}, false);
splayer.addEventListener('drop', (event)=>{
    event.stopPropagation();
    event.preventDefault();
    const file = event.dataTransfer.files[0];

    if(file){
        const fileURL = URL.createObjectURL(file);
        video.setAttribute('src', fileURL);
    }
}, false);
splayer.addEventListener('dragover', (event)=>{
    event.preventDefault();
}, false);

/*
 * 设定渲染进程监听
 * 'open': 打开新文件
 * 'toggle': 切换暂停开始播放
 */
const getVideoFile = function() {
    const files = remote.dialog.showOpenDialog(remote.getCurrentWindow(), {
        filters: [
            {name: 'Video Files', extensions: ['mp4', 'mkv', 'mov']}
        ],
        properties: ['openFile']
    });

    if(files) {
        return files[0];
    } else {
        return null;
    }
};
const openNewVideo = function() {
    const video_file = getVideoFile();
    if(video_file) {
        video.setAttribute('src', video_file);
    }
};
const togglePlayState = function() {
    if(video.paused) {
        video.play();
    } else {
        video.pause();
    }
};
ipcRenderer.on('open', openNewVideo);
ipcRenderer.on('toggle', togglePlayState);

//窗口大小控制
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

    //console.log(video_width + ' ' + video_height);
    //console.log(new_width + ' ' + new_height);
    ipcRenderer.send('resize', {
        width: parseInt(new_width), 
        height: parseInt(new_height)
    });
};
//用户调整窗口大小时维持视频比例不变，同时保持窗口宽和高都大于等于最小值
const resizeWindow = function(event) {
    event.preventDefault();
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
    
    /*
    let new_height = current_height;
    let new_width = current_width;
    if(current_width < MIN_WIDTH) {
        new_width = MIN_WIDTH;
    }
    new_height = new_width * video_height / video_width;
    if(new_height < MIN_HEIGHT) {
        new_height = MIN_HEIGHT;
        new_width = new_height * video_width / video_height;
    }*/

    ipcRenderer.send('resize', {
        width: parseInt(new_width), 
        height: parseInt(new_height)
    });
};

//每当重新打开一个视频文件时获取其长宽
video.addEventListener('canplay', adjustWindowToNewVideo, false);

window.addEventListener('resize', resizeWindow, false);
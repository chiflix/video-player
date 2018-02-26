const {ipcRenderer, remote} = require('electron');
const {splayer, video} = require('./elements.js');
const VALID_EXTENSION = ['mp4', 'mkv', 'mov'];

//设定拖放事件
const getFileExtension = function(file){
    let name = file.name.split('.');
    if(name.length === 1) {
        return 'None';
    } else {
        return name.pop();
    }
}
const processDrop = function(event) {
    event.stopPropagation();
    event.preventDefault();
    const file = event.dataTransfer.files[0];

    if(file){
        alert(file.type);
        let file_extension = getFileExtension(file);
        //拖放的文件不在支持格式列表中
        if(VALID_EXTENSION.indexOf(file_extension.toLowerCase()) === -1) {
            remote.dialog.showErrorBox('Oooooops!', 'Sorry, File Not Supported!');
        } else {
            const fileURL = URL.createObjectURL(file);
            video.setAttribute('src', fileURL);
        }
    }
};
const processDragOver = function(event) {
    event.preventDefault();
};
splayer.addEventListener('drop', processDrop, false);
splayer.addEventListener('dragover', processDragOver, false);

/*
 * 设定渲染进程监听
 * 'open': 打开新文件
 * 'toggle': 切换暂停开始播放
 */
const getVideoFile = function() {
    const files = remote.dialog.showOpenDialog(remote.getCurrentWindow(), {
        filters: [
            {name: 'Video Files', extensions: VALID_EXTENSION}
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
//每当重新打开一个视频文件时获取其长宽
video.addEventListener('canplay', adjustWindowToNewVideo, false);

//设定了setAspectRatio，不再需要手动设置窗口宽高
/*
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
*/

//禁止mac触摸板双指缩放
const forbidZoom = function(event) {
    if(event.deltaY % 1 !== 0) {
        event.preventDefault();
    }
};
document.addEventListener('mousewheel', forbidZoom, false);
const {ipcRenderer, remote} = require('electron');
const {splayer, video} = require('./elements.js');

function getVideoFile() {
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
}

//当渲染进程接受到来自主进程的action信息时，根据tag的内容进行不同的操作
function processMessage(event, tag) {
    switch(tag){
        case('open'): {
            const video_file = getVideoFile();
            //alert(video_file);
            if(video_file) {
                video.setAttribute('src', video_file);
            }
            break;
        }
    }
}

ipcRenderer.on('action', processMessage);

//给splayer模块添加拖放事件的响应
//当拖放了一个文件至窗口时，会自动开始播放
//TODO: 判断拖动的文件是否能够被播放，不能的话则不进行任何操作
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
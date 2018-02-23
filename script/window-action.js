const {ipcRenderer, remote} = require('electron');
const {splayer, video} = require('./elements.js');

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
}

const processMessage = function(event, tag) {
    //根据传入的tag而有不同的操作
    switch(tag){
        case('open'): {
            const video_file = getVideoFile();
            if(video_file) {
                video.setAttribute('src', video_file);
            }
            break;
        }
        case('pause'): {
            if(video.paused) {
                video.play();
            } else {
                video.pause();
            }
        }
        case('resize'): {
            const [currentWidth, currentHeight] = remote.getCurrentWindow().getSize();
            const originWidth = video.videoWidth;
            const originHeight = video.videoHeight;
            console.log(originWidth + ' ' + originHeight);
        }
    }
}

ipcRenderer.on('action', processMessage);

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
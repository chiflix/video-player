const {ipcRenderer, remote} = require('electron');
const {video} = require('./elements.js');
const VALID_EXTENSION = ['mp4', 'mkv', 'mov'];

/*
 * 设定渲染进程监听
 * 'open': 打开新文件
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
ipcRenderer.on('open', openNewVideo);

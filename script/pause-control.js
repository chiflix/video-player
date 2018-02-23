const {splayer} = require('./elements.js');
const {remote} = require('electron');
const currentWindow = remote.getCurrentWindow();

function togglePlayPause() {
    currentWindow.webContents.send('action', 'pause');
}

function listenSpaceKeyDown(event) {
    if(event.keyCode === 32){
        currentWindow.webContents.send('action', 'pause');
    }
}

splayer.addEventListener('click', togglePlayPause, false);

//全局添加键盘监听
document.addEventListener('keydown', listenSpaceKeyDown, false);
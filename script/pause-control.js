const {splayer} = require('./elements.js');
const {remote} = require('electron');
const currentWindow = remote.getCurrentWindow();

const togglePlayPause = function() {
    currentWindow.webContents.send('pause');
};

const listenSpaceKeyDown = function(event) {
    if(event.keyCode === 32){
        currentWindow.webContents.send('pause');
    }
};

splayer.addEventListener('click', togglePlayPause, false);

//全局添加键盘监听
document.addEventListener('keydown', listenSpaceKeyDown, false);
const {interactions_play} = require('./elements.js');
const {remote} = require('electron');
const current_window = remote.getCurrentWindow();

const togglePlayState = function() {
    current_window.webContents.send('toggle');
};

const listenSpaceKeyDown = function(event) {
    if(event.keyCode === 32){
        current_window.webContents.send('toggle');
    }
};

interactions_play.addEventListener('click', togglePlayState, false);

//全局添加键盘监听
document.addEventListener('keydown', listenSpaceKeyDown, false);
const {remote, ipcRenderer} = require('electron');
const {area_playstate} = require('./elements.js');
const current_window = remote.getCurrentWindow();

//全屏状态下按下ESC时退出全屏状态
const leaveFullScreen = function(event) {
    if(current_window.isFullScreen()) {
        if(event.keyCode === 27) {
            ipcRenderer.send('toggleFullScreenState');
        }
    }
};
document.addEventListener('keydown', leaveFullScreen, false);

//双击时切换全屏状态
const toggleFullScreen = function() {
    ipcRenderer.send('toggleFullScreenState');
};
area_playstate.addEventListener('dblclick', toggleFullScreen, false);
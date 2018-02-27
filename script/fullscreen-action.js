const {remote} = require('electron');
const current_window = remote.getCurrentWindow();

//全屏状态下按下ESC时退出全屏状态
const leaveFullScreen = function(event) {
	if(current_window.isFullScreen()) {
		if(event.keyCode === 27) {
			current_window.setFullScreen(false);
		}
	}
};

document.addEventListener('keydown', leaveFullScreen, false);
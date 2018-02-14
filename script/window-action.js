const {ipcRenderer, remote} = require('electron');
const {video} = require('./elements.js');

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

function processMessage(event, tag) {
    switch(tag){
        case('open'):
            const video_file = getVideoFile();
            if(video_file) {
            	video.setAttribute('src', video_file);
            }
            break;
    }
}

ipcRenderer.on('action', processMessage);
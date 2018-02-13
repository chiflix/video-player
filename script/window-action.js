const {ipcRenderer} = require('electron');

function processMessage(event, tag) {
    switch(tag){
        case('open'):
            //do something
            alert('This is a test.');
            break;
    }
}

ipcRenderer.on('action', processMessage);
const {remote} = ('electron');
const {video, player} = require('./elements.js');
const VALID_EXTENSION = ['mp4', 'mkv', 'mov'];

//目前是根据文件的扩展名判断视频是否能播放
//TODO: 根据视频文件的编码格式确定是否能播放

/*
 *设定拖放事件
 */
const getFileExtension = function(file){
    let name = file.name.split('.');
    if(name.length === 1) {
        return 'None';
    } else {
        return name.pop();
    }
};
const processDrop = function(event) {
    event.stopPropagation();
    event.preventDefault();
    const file = event.dataTransfer.files[0];

    if(file){
        //alert(file.type);
        let file_extension = getFileExtension(file);
        //拖放的文件不在支持格式列表中
        if(VALID_EXTENSION.indexOf(file_extension.toLowerCase()) === -1) {
            remote.dialog.showErrorBox('Oooooops!', 'Sorry, File Not Supported!');
        } else {
            const fileURL = URL.createObjectURL(file);
            video.setAttribute('src', fileURL);
        }
    }
};
const processDragOver = function(event) {
    event.preventDefault();
};
player.addEventListener('drop', processDrop, false);
player.addEventListener('dragover', processDragOver, false);
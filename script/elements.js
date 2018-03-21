const player = document.getElementById('player');
const video = document.getElementById('html-video-object');
const video_controller = document.getElementById('video-controller');

const area_playstate = document.getElementById('playstate');
const area_progress = document.getElementById('progress');

const progress_bar = document.getElementById('progress--bar');
const progress_played = document.getElementById('progress--played');
const progress_line = document.getElementById('progress--line');
const progress_ready = document.getElementById('progress--ready');
const progress_thumbnail = document.getElementById('progress--thumbnail');


const volume_slider = document.getElementById('volume--slider');
const volume_slider_area = document.getElementById('volume--slider--area');
const volume_bar = document.getElementById('volume--bar');
const volume_current = document.getElementById('volume--current');
const volume_icon = document.getElementById('volume--button');
const volume_area = document.getElementById('volume');

const info_timing_current = document.getElementById('timing--current');
const info_timing_total = document.getElementById('timing--total');


module.exports = {
    player: player,
    video: video,
    video_controller: video_controller,

    area_playstate: area_playstate,//鼠标控制暂停播放区域
    area_progress: area_progress, //鼠标置于此区域会显示进度条

    progress_bar: progress_bar,//可拖拽点按进度条区域
    progress_played: progress_played,//当前播放进度条的长度
    progress_line: progress_line,//进度条的发亮元素
    progress_ready: progress_ready,//预备播放的长度
    progress_thumbnail: progress_thumbnail,

    info_timing_current: info_timing_current,
    info_timing_total: info_timing_total,

    volume_icon: volume_icon, //音量图标
    volume_area: volume_area, //音量的可识别区域
    volume_current:volume_current, //当前音量的条条
    volume_bar:volume_bar, //音量条
    volume_slider: volume_slider,//音量滑块
    volume_slider_area:volume_slider_area //拖动音量的滑块
}

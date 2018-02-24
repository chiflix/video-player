const splayer = document.getElementById('splayer');
const widget = document.getElementById('widget');
const video = document.getElementById('video');
const button_play = document.getElementById('button-play');
const info_current_time = document.getElementById('info-current-time');
const info_duration = document.getElementById('info-duration');
const progress_bar = document.getElementById('progress-bar');
const progress_hot_region = document.getElementById('progress-hot-region');
const line_bar = document.getElementById('line-bar');

//module.exports.splayer = splayer;
module.exports = {
    splayer: splayer,
    widget: widget,
    video: video,
    button_play: button_play,
    info_current_time: info_current_time,
    info_duration: info_duration,
    progress_bar: progress_bar,
    progress_hot_region: progress_hot_region,
    line_bar: line_bar
}
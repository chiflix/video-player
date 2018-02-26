const splayer = document.getElementById('splayer');
const widget = document.getElementById('widget');
const video = document.getElementById('video');
const button_play = document.getElementById('button-play');
const info_current_time = document.getElementById('info-current-time');
const info_duration = document.getElementById('info-duration');
const progress_bar = document.getElementById('progress-bar');
const progress_area = document.getElementById('progress-area');
const bar_line = document.getElementById('bar-line');
const progress_background = document.getElementById('progress-background');
const interactions_play = document.getElementById('interactions-play');

//module.exports.splayer = splayer;
module.exports = {
    splayer: splayer,
    widget: widget,
    video: video,
    button_play: button_play,
    info_current_time: info_current_time,
    info_duration: info_duration,
    progress_bar: progress_bar,
    progress_area: progress_area,
    bar_line: bar_line,
    progress_background: progress_background,
    interactions_play: interactions_play
}
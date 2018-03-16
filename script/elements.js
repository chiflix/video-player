const player = document.getElementById('player');
const video = document.getElementById('html-video-object');
const video_controller = document.getElementById('video-controller');

const area_playstate = document.getElementById('playstate');

const area_progress = document.getElementById('progress');
const progress_played = document.getElementById('progress--played');
const progress_line = document.getElementById('progress--line');

const volume_button = document.getElementById('volume--button');
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
    area_playstate: area_playstate,
    area_progress: area_progress,
    progress_played: progress_played,
    progress_line: progress_line,
    info_timing_current: info_timing_current,
    info_timing_total: info_timing_total,
    volume_icon: volume_icon,
    volume_area: volume_area,
    volume_current:volume_current,
    volume_bar:volume_bar,
    volume_button:volume_button
}

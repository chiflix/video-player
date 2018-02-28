const {video_controller} = require('./elements.js');

const displayWidget = function() {
    video_controller.className = 'video-controller';
}
const hideWidget = function() {
    video_controller.className = 'video-controller video-controller--mouseout';
}

video_controller.addEventListener('mouseover', displayWidget, false);
video_controller.addEventListener('mouseout', hideWidget, false);
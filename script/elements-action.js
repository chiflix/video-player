const {widget, splayer, video} = require('./elements.js');

const displayWidget = function() {
    widget.className = 'widget-mouseover';
}

const hideWidget = function() {
    widget.className = 'widget';
}

const togglePlayPause = function() {
    if (video.paused) {
        video.play();
    } else {
        video.pause();
    }
}

splayer.addEventListener('mouseover', displayWidget, false);
splayer.addEventListener('mouseout', hideWidget, false);
splayer.addEventListener('click', togglePlayPause, false);
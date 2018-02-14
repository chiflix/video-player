const splayer = document.getElementById('splayer');
const widget = document.getElementById('widget');
const video = document.getElementById('video');

const displayWidget = function() {
    widget.style.display = 'block';
}

const hideWidget = function() {
    widget.style.display = 'none';
}

splayer.addEventListener('mouseover', displayWidget, false);
splayer.addEventListener('mouseout', hideWidget, false);

//module.exports.splayer = splayer;
module.exports = {
    splayer: splayer,
    video: video
}
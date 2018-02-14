const {widget, splayer} = require('./elements.js');

const displayWidget = function() {
    widget.style.display = 'block';
}

const hideWidget = function() {
    widget.style.display = 'none';
}

splayer.addEventListener('mouseover', displayWidget, false);
splayer.addEventListener('mouseout', hideWidget, false);
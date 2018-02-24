const {widget, splayer} = require('./elements.js');

const displayWidget = function() {
    widget.className = 'widget';
}
const hideWidget = function() {
    widget.className = 'widget widget-mouseout';
}

splayer.addEventListener('mouseover', displayWidget, false);
splayer.addEventListener('mouseout', hideWidget, false);
const {widget, splayer} = require('./elements.js');

const displayWidget = function() {
    widget.className = 'widget-mouseover';
}
const hideWidget = function() {
    widget.className = 'widget';
}

splayer.addEventListener('mouseover', displayWidget, false);
splayer.addEventListener('mouseout', hideWidget, false);
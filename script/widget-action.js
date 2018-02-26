const {widget} = require('./elements.js');

const displayWidget = function() {
    widget.className = 'widget';
}
const hideWidget = function() {
    widget.className = 'widget widget--mouseout';
}

widget.addEventListener('mouseover', displayWidget, false);
widget.addEventListener('mouseout', hideWidget, false);
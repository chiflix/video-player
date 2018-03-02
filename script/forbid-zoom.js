//禁止mac触摸板双指缩放
const forbidZoom = function(event) {
    if(event.deltaY % 1 !== 0) {
        event.preventDefault();
    }
};
document.addEventListener('mousewheel', forbidZoom, false);
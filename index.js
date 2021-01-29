// Lazy event listener association
window.addEventListener('load', function () {
    let map = document.getElementById('map');
    map.addEventListener('mousedown', panMap);
    map.addEventListener('wheel', zoomMap);
    document.getElementById('showMapTexture').addEventListener('click', toggleMapTexture);
    document.getElementById('showHexes').addEventListener('click', toggleHexOutlines);
});

// Attach layer toggles
function toggleMapTexture(clickEvent) {
    let layer = document.getElementById('mapTextureLayer');
    layer.style.display = this.checked ? "block" : "none";
}
function toggleHexOutlines(clickEvent) {
    let layer = document.getElementById('mapHexLayer');
    layer.style.display = this.checked ? "block" : "none";
}


// Map pan controls
function panMap(pushEvent) {
    let initialOffsetLeft = this.offsetLeft;
    let initialOffsetTop = this.offsetTop;
    const sizeX = this.clientWidth;
    const sizeY = this.clientHeight;

    function mapMover(moveEvent) {
        let deltaX = moveEvent.clientX - pushEvent.clientX;
        let deltaY = moveEvent.clientY - pushEvent.clientY;
        let newLeft = initialOffsetLeft + deltaX;
        let newTop = initialOffsetTop + deltaY;
        // Constraint motion so half of the map is still in frame
        if (-sizeX < newLeft && newLeft < 0) {
            this.style.left = newLeft + 'px';
        }
        if (-sizeY < newTop && newTop < 0) {
            this.style.top = newTop + 'px';
        }
    }
    map.addEventListener('mousemove', mapMover);

    // This ensures mouseup works throughout the entire document
    document.addEventListener('mouseup', function (releaseEvent) {
        map.removeEventListener('mousemove', mapMover);
    });
}

let zoomLevel = 0;

// Map zoom controls
function zoomMap(wheelEvent) {
    wheelEvent.preventDefault()
    // Adjust zoom velocity
    zoomLevel += wheelEvent.deltaY * -0.01;

    // Resize map
    this.style.transform = 'scale(' + (1 + 0.1 * zoomLevel) + ')';

}
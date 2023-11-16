
function createOverlayContent(place) {
    return `
        <div class="custom-overlay">
            <div class="overlay-inner">
                <h3>${place.name}</h3>
                <p>Address: ${place.address}</p>
                <p>StarRating: ${place.starRating}</p>
                <p>Number of StarRating Reviews: ${place.numberOfStarRatingReviews}</p>
                <p>Comments: ${place.comments}</p>
                <a href="view_details.html?id=${place.id}" target="_blank">More details</a>
                <button class="overlay-close-btn" onclick="window.closeCurrentOverlay()">Close</button>
            </div>
        </div>
    `;
}

function createAndShowOverlay(place, map) {
    var overlayContent = createOverlayContent(place);
    var overlay = new kakao.maps.CustomOverlay({
        content: overlayContent,
        map: map,
        position: new kakao.maps.LatLng(place.lat, place.lng),
        xAnchor: 0.5,
        yAnchor: 0.5
    });

    window.currentOverlay = overlay;
}

window.closeCurrentOverlay = function() {
    if (window.currentOverlay) {
        window.currentOverlay.setMap(null);
        window.currentOverlay = null;
    }
};

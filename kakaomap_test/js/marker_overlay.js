
// a href 부분 건드림 11-22, 02:33
function createOverlayContent(place) {

    const starRating = Number.isInteger(place.numberOfStarRating) ? `${place.numberOfStarRating}.0` : place.numberOfStarRating;

    return `
        <div class="custom-overlay">
            <div class="overlay-inner">
                <h3>${place.name}</h3>
                <p>${place.address}</p>
                <p>별점: ${starRating}</p>
                <p>별점 평가 횟수: ${place.numberOfStarRating}</p>
                <p>댓글: ${place.numberOfComments}</p>
                <a href="/viewdetails?id=${place.id}" target="_self" onclick="saveLastViewedPlace(${place.lat}, ${place.lng})">상세보기</a>
                <button class="overlay-close-btn" onclick="closeCurrentOverlay()">닫기</button>
            </div>
        </div>
    `;
}



function createPlaceOverlay(place, map) {
    var overlayContent = createOverlayContent(place);
    var overlay = new kakao.maps.CustomOverlay({
        content: overlayContent,
        map: map,
        position: new kakao.maps.LatLng(place.lat, place.lng),
        xAnchor: 0.3,
        yAnchor: 0.91
    });
    return overlay;
}

// This function needs to be in the global scope
function closeCurrentOverlay() {
    if (window.currentOverlay) {
        window.currentOverlay.setMap(null);
        window.currentOverlay = null;
    }
}

// Expose the function to the global scope
window.closeCurrentOverlay = closeCurrentOverlay;


function saveLastViewedPlace(lat, lng) {
    sessionStorage.setItem('lastViewedPlace', JSON.stringify({lat: lat, lng: lng}));
}

// Expose the function to the global scope
window.saveLastViewedPlace = saveLastViewedPlace;

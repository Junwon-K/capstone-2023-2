document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const placeId = urlParams.get('id');
    const amendLink = document.getElementById('amendLink');


    document.getElementById('backButton').addEventListener('click', function () {
        window.location.href = `/`; // 현재 창에서 index.html로 이동
    });

    amendLink.addEventListener('click', function (event) {
        // 기본 동작(링크 이동) 방지
        event.preventDefault();
        // window.open(`/amend_information?id=${placeId}`, '_blank');
        window.location.href = `/amend_information?id=${placeId}`;

    });


    //// 이 부분 추가함 11-19, 19시 38분
    function initMap(place) {
        var mapContainer = document.getElementById('map');
        var mapOption = {
            center: new kakao.maps.LatLng(place.latitude, place.longitude),
            level: 3,
            draggable: false // 드래그 기능 비활성화
        };

        var map = new kakao.maps.Map(mapContainer, mapOption);

        // 지도 중심에 마커 표시
        new kakao.maps.Marker({
            map: map,
            position: map.getCenter()
        });
    }

    //place details 준원
    fetch(`/place/detail?id=${placeId}`)
        .then(response => response.json())
        .then(place => {
            document.getElementById('placeName').textContent = place.name;
            document.getElementById('starRating').textContent = place.star_average;
            document.getElementById('address').textContent = place.address;
            //document.getElementById('toiletInfo').textContent = place.toiletInfo;


            initMap(place);

        })
        .catch(error => {
            console.error('Error:', error);
        });

    // 리뷰 받아오기
    fetch(`/comment/show?id=${placeId}`)
        .then(response => response.json())
        .then(comments => {
            const commentsContainer = document.getElementById('reviews');
            comments.forEach(comment => {
                const commentElement = document.createElement('p');
                commentElement.textContent = `${comment.username} : ${comment.content}`; // Assuming 'content' is a field in your comment object
                commentsContainer.appendChild(commentElement);
            });
        })
        .catch(error => {
            console.error('Error:', error);
        });

    // 제출 버튼 클릭
    document.getElementById('submitReview').addEventListener('click', function () {
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const reviewText = document.getElementById('reviewText').value;
        const commentData = {
            username: username,
            password: password,
            placeId: placeId,
            content: reviewText
        };

        console.log('Username:', username);
        console.log('Password:', password);
        console.log('Review:', reviewText);

        // 입력한 리뷰 보내기
        fetch('/comment/enroll', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(commentData)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(() => {
                //리뷰 창 업데이트?
                const commentsContainer = document.getElementById('reviews');
                const commentElement = document.createElement('p');
                commentElement.textContent = `Username: ${username}, Comment: ${reviewText}`;
                commentsContainer.appendChild(commentElement);
            })
            .catch(error => {
                console.error('Error:', error);
            });

        // 리뷰창 비우기
        document.getElementById('username').value = '';
        document.getElementById('password').value = '';
        document.getElementById('reviewText').value = '';

        location.reload();

        window.onclick = function (event) {
            let modal = document.getElementById('amendModal');
            if (event.target == modal) {
                modal.style.display = 'none';
            }
        };

    });


    // 별점 제출
    document.getElementById('submitRating').addEventListener('click', function () {
        const selectedRating = document.querySelector('input[name="rating"]:checked').value;
        const ratingData = {
            placeId: placeId,
            rating: selectedRating
        };

        console.log('Selected Star Rating:', selectedRating);

        // 백엔드 경로 설정 필요
        fetch(`/starrating/enroll`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(ratingData)

        })
            /*      
            .then(response => {
                      if (!response.ok) {
                          throw new Error('Network response was not ok');
                      }
                      return response.json();
                  })*/
            .then(() => {
                // alert으로 별점 제출 알림
                alert(`제출된 별점: ${selectedRating}점`);
                location.reload();
            })
            .catch(error => {
                console.error('Error:', error);
                alert('별점 제출 중 오류가 발생했습니다.');
            });
    });
});
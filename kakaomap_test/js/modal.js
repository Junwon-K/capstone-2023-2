// var modal = document.getElementById("filter-modal");
// var btn = document.getElementById("filter");
// var span = document.getElementsByClassName("close-button")[0];

// var mapContainer = document.getElementById("map-container");

// btn.onclick = function() {
//   modal.style.display = "block";
//   modal.style.height = mapContainer.offsetHeight + 'px'; // 맵 컨테이너의 높이에 맞춥니다.
//   modal.style.width = mapContainer.offsetWidth + 'px'; // 맵 컨테이너의 너비에 맞춥니다.
//   document.querySelector('.modal-content').style.bottom = '0';
// }


// span.onclick = function() {
//   modal.style.display = "none";
//   document.querySelector('.modal-content').style.bottom = '-100%';
// }

// window.onclick = function(event) {
//   if (event.target == modal) {
//     modal.style.display = "none";
//     document.querySelector('.modal-content').style.bottom = '-100%';
//   }
// }

// document.getElementById('apply-filters').addEventListener('click', function () {
//   // 필터 적용 로직 추가
//   console.log('필터가 적용되었습니다.');
//   modal.style.display = "none";
//   document.querySelector('.modal-content').style.bottom = '-100%';
// });


// 모달 가져오기
var modal = document.getElementById('myModal');

// 모달을 여는 버튼
var filter_button = document.getElementById('filter');

// 모달을 닫는 close 버튼
var close_button = document.getElementsByClassName('close')[0];

// 사용자가 버튼을 클릭하면 모달을 열기
filter_button.onclick = function() {
    modal.style.display = 'block';
}

// 모달을 닫기
close_button.onclick = function() {
    modal.style.display = 'none';
}

// 사용자가 모달 외부를 클릭하면 모달 닫기
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}

// 리셋 버튼
document.getElementById('reset-filter').addEventListener('click', function () {
    document.querySelectorAll('#myModal .content_body_choice input[type="checkbox"]').forEach(function(checkbox) {
        checkbox.checked = false;
    });
});

// 적용 버튼
document.getElementById('apply-filter').addEventListener('click', function () {
    // Create an object to hold the state of the checkboxes
    var filters = {
        disabled_person: document.getElementById('disabled_person').checked,
        changing_table_man: document.getElementById('changing_table_man').checked,
        changing_table_woman: document.getElementById('changing_table_woman').checked,
        emergency_bell_man: document.getElementById('emergency_bell_man').checked,
        emergency_bell_woman: document.getElementById('emergency_bell_woman').checked,
        emergency_bell_disabled: document.getElementById('emergency_bell_disabled').checked
    };

    console.log('Filters to send:', filters);

    fetch('/apply-filters', { // Your backend endpoint goes here
        method: 'POST', // or 'PUT' if your backend requires it
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(filters) // convert the JavaScript object to a JSON string
    })
    .then(response => response.json()) // parsing the JSON response from the server
    .then(data => {
        console.log('Response from backend:', data);
        // You can add code here to update the frontend with the response from the backend
    })
    .catch(error => {
        console.error('Error applying filters:', error);
    });

    modal.style.display = 'none';
});

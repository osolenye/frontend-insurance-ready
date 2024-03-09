document.addEventListener("DOMContentLoaded", function () {
    const sublimitsUrl = 'http://212.112.103.137:6457/api/sublimits/';
    const limitsUrl = 'http://212.112.103.137:6457/api/limits/';

    const token = localStorage.getItem("accessToken"); // Замените YOUR_AUTH_TOKEN на ваш токен авторизации

    const headers = {
        'Authorization': `Bearer ${token}`
    };



    // GET запрос к http://212.112.103.137:6457/api/sublimits/
    fetch(sublimitsUrl, {
        method: 'GET',
        headers: headers
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            localStorage.setItem("sublimits", JSON.stringify(data));
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });

    // GET запрос к http://212.112.103.137:6457/api/limits/
    fetch(limitsUrl, {
        method: 'GET',
        headers: headers
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            localStorage.setItem("limits", JSON.stringify(data));
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });


    var limits = JSON.parse(localStorage.getItem("limits"));
    var sublimits = JSON.parse(localStorage.getItem("sublimits"));
    console.log(limits.limits[0].id);
    console.log(sublimits.sublimits[0].id);
    for (var i = 0; i < sublimits.sublimits.length; i++) {
        for (var j = 0; j < limits.limits.length; j++) {
            if (sublimits.sublimits[i].limitID == limits.limits[j].id) {
                
            }
        }
    }
});

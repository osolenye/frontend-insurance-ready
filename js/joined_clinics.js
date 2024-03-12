document.addEventListener("DOMContentLoaded", function () {
    const token = localStorage.getItem("accessToken"); // замените на ваш реальный токен

    // fetch('http://212.112.103.137:6457/api/clinics/', {
    fetch('https://api.dms.insurance.kg:6458/api/clinis/', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // console.log(data); // обработка полученных данных
            var wrapper = document.querySelector(".wrapper");
            for (var i = 0; i < data.length; i++) {
                if (i % 2 == 0) {
                    // Создаем элемент div с классом clinic_info и идентификатором clinic_info
                    var clinicInfoDiv = document.createElement("div");
                    clinicInfoDiv.className = "clinic_info";
                    clinicInfoDiv.id = "clinic_info";

                    // Создаем элемент div с классом headers
                    var headersDiv = document.createElement("div");
                    headersDiv.className = "headers";

                    // Создаем параграфы для каждого заголовка и добавляем их в div с классом headers
                    var headersText = ["Название", "Адрес", "Телефон", "Время работы"];
                    headersText.forEach(function (header) {
                        var p = document.createElement("p");
                        p.textContent = header;
                        headersDiv.appendChild(p);
                    });
                    // Добавляем div с заголовками в div с классом clinic_info
                    clinicInfoDiv.appendChild(headersDiv);

                    // Создаем элемент div с классом headers
                    var headersDiv = document.createElement("div");
                    headersDiv.className = "headers";

                    // Создаем параграфы для каждого заголовка и добавляем их в div с классом headers
                    var headersText = [data[i].clinicName, data[i].address, data[i].contacts, data[i].inn];
                    headersText.forEach(function (header) {
                        var p = document.createElement("p");
                        p.textContent = header;
                        headersDiv.appendChild(p);
                    });

                    // Добавляем div с заголовками в div с классом clinic_info
                    clinicInfoDiv.appendChild(headersDiv);



                    // Добавляем созданный div в какой-то другой элемент, например, в body
                    wrapper.appendChild(clinicInfoDiv);

                } else {
                    // Создаем элемент div с классом clinic_info и идентификатором clinic_info
                    var clinicInfoDiv = document.createElement("div");
                    clinicInfoDiv.className = "clinic_info";
                    clinicInfoDiv.id = "clinic_info_background";

                    // Создаем элемент div с классом headers
                    var headersDiv = document.createElement("div");
                    headersDiv.className = "headers";

                    // Создаем параграфы для каждого заголовка и добавляем их в div с классом headers
                    var headersText = ["Название", "Адрес", "Телефон", "Время работы"];
                    headersText.forEach(function (header) {
                        var p = document.createElement("p");
                        p.textContent = header;
                        headersDiv.appendChild(p);
                    });
                    // Добавляем div с заголовками в div с классом clinic_info
                    clinicInfoDiv.appendChild(headersDiv);

                    // Создаем элемент div с классом headers
                    var headersDiv = document.createElement("div");
                    headersDiv.className = "headers";

                    // Создаем параграфы для каждого заголовка и добавляем их в div с классом headers
                    var headersText = [data[i].clinicName, data[i].address, data[i].contacts, data[i].inn];
                    headersText.forEach(function (header) {
                        var p = document.createElement("p");
                        p.textContent = header;
                        headersDiv.appendChild(p);
                    });

                    // Добавляем div с заголовками в div с классом clinic_info
                    clinicInfoDiv.appendChild(headersDiv);



                    // Добавляем созданный div в какой-то другой элемент, например, в body
                    wrapper.appendChild(clinicInfoDiv);
                }
            }
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        });

});

